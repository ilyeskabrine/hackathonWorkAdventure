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
    submitButton.addEventListener("click", () => {

        WA.player.state.firstName = firstName.value;
        WA.player.state.lastName = lastName.value;
        WA.player.state.doctorName = doctorName.value;
        WA.player.state.message = message.value;
        WA.player.state.appointment = appointment.value;
        console.log('First Name:',   WA.player.state.firstName);
        console.log('Last Name:', WA.player.state.lastName);
        console.log('Doctor Name:', WA.player.state.doctorName);
        console.log('Message:', WA.player.state.message);
        console.log('Appointment:', WA.player.state.appointment);
    });

}).catch(e => console.error(e));

bootstrapExtra().then(() => {
    console.log('Scripting API Extra ready');
}).catch(e => console.error(e));

export {};
