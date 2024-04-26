import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

const firstName = document.getElementById("nom") as HTMLTextAreaElement;
const lastName = document.getElementById("prenom") as HTMLTextAreaElement;
const doctorName = document.getElementById("medecin") as HTMLTextAreaElement;
const message = document.getElementById("message") as HTMLTextAreaElement;
const appointment =document.getElementById("appointment") as HTMLTextAreaElement;
const submitButton = document.getElementById("submitButton") as HTMLButtonElement;


// Waiting for the API to be ready
WA.onInit().then(() => {
    let rediractionPopup;
    submitButton.addEventListener("click",  () => {

        WA.player.state.firstName = firstName.value;
        WA.player.state.lastName = lastName.value;
        WA.player.state.doctorName = doctorName.value;
        WA.player.state.message = message.value;
        WA.player.state.appointment = appointment.value;
        console.log(doctorName.value);
        if (doctorName.value == "Dr.Leroy") {
            WA.player.moveTo(450, 240, 10);
        } else if (doctorName.value == "Dr.Garcia") {
            WA.player.moveTo(440, 300, 10);
        } else if (doctorName.value == "Dr.Roux") {
            WA.player.moveTo(870, 300, 10);
        }else if (doctorName.value == "Dr.Fournier") {
            WA.player.moveTo(700, 300, 10);
        }else if (doctorName.value == "Dr.Lefebvre") {
            WA.player.moveTo(720, 240, 10);
        }




    });

    WA.room.area.onEnter("getinfo").subscribe(() => {
        rediractionPopup = WA.ui.openPopup("popupRectangle", 'Hello world!', [{
            label: "Close",
            className: "primary",
            callback: (popup) => {
                popup.close();
            }

        }]);
        WA.player.moveTo(250, 250, 10);


    });

// Close the popup when we leave the zone.
    WA.room.onLeaveLayer("myZone").subscribe(() => {
        rediractionPopup.close();
    })
}).catch(e => console.error(e));

bootstrapExtra().then(() => {
    console.log('Scripting API Extra ready');
}).catch(e => console.error(e));

export {};
