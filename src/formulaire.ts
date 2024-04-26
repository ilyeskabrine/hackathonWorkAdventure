import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

const firstName = document.getElementById("nom") as HTMLTextAreaElement;
const lastName = document.getElementById("prenom") as HTMLTextAreaElement;
const doctorName = document.getElementById("medecin") as HTMLTextAreaElement;
const message = document.getElementById("message") as HTMLTextAreaElement;
const appointment = document.getElementById("appointment") as HTMLTextAreaElement;
const submitButton = document.getElementById("submitButton") as HTMLButtonElement;


// Waiting for the API to be ready
WA.onInit().then(() => {
    submitButton.addEventListener("click", async () => {

        WA.player.state.informations = {
            firstName: firstName.value,
            lastName: lastName.value,
            doctorName: doctorName.value,
            message: message.value,
            appointment: appointment.value,
        }
        WA.ui.modal.closeModal();
        const websites = await WA.ui.website.getAll();
        websites.map((web) => web.close());
        const state = WA.state["room-state"] as {};
        WA.state.saveVariable("room-state", {
            ...state,
            [WA.player.playerId]: WA.player.state.informations
        }).catch(e => console.error('Something went wrong while saving variable waiting-room', e))
        WA.controls.restorePlayerControls();
    });

}).catch(e => console.error(e));

bootstrapExtra().then(() => {
    console.log('Scripting API Extra ready');
}).catch(e => console.error(e));

export { };
