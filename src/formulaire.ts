import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { RoomState } from "./navigation";

const addOptionToForm = (select: HTMLSelectElement) => {
    const player = WA.player;

    const option = document.createElement("option");
    option.value = "Dr" + player.name;
    option.text = "Dr" + player.name;
    option.setAttribute("data-id", player.playerId.toString());
    select.insertBefore(option, select.firstChild)
}

const addOptionsToDoctorForm = (select: HTMLSelectElement) => {
    const state = WA.state["room-state"] as RoomState;

    for (let i = 0; i < state.doctors.length; i++) {
        const element = state.doctors[i];
        const option = document.createElement("option");
        option.value = "Dr" + element.name;
        option.text = "Dr" + element.name;
        option.setAttribute("data-id", element.id.toString());
        select.insertBefore(option, select.firstChild)
        
    }
}

const assignDoctorToFirstEmptyRoom = () => {
    const state = WA.state["room-state"] as RoomState;
    for (let key in state) {
        if (state.hasOwnProperty(key) && state[key].doctor === null) {
            return key;
        }
    }
    return null;
}

const findDoctorRoom = (id: number) => {
    const state = WA.state["room-state"] as RoomState;
    for (let key in state) {
        if (state.hasOwnProperty(key) && state[key].doctor !== null && state[key].patient === null && state[key].doctor?.id === id) {
            return state[key].coordinates;
        }
    }
    return "";
}

// Attendre que l'API soit prête
WA.onInit().then(async () => {
    // Récupérer les éléments DOM
    const firstName = document.getElementById("nom") as HTMLTextAreaElement;
    const lastName = document.getElementById("prenom") as HTMLTextAreaElement;
    const doctorName = document.getElementById("medecin") as HTMLSelectElement;
    const doctorSalle = document.getElementById("salle") as HTMLSelectElement;
    const message = document.getElementById("message") as HTMLTextAreaElement;
    const appointment = document.getElementById("appointment") as HTMLTextAreaElement;
    const submitButton = document.getElementById("submitButton") as HTMLButtonElement;

    const doctorsubmitButton = document.getElementById("doctorSubmitButton") as HTMLButtonElement;

    // Récupérer les boutons
    const patientButton = document.getElementById("patientButton");
    const doctorButton = document.getElementById("doctorButton");

    // Récupérer les formulaires
    const patientForm = document.getElementById("patientForm");
    const doctorForm = document.getElementById("doctorForm");

    // Si les éléments sont trouvés
    if (patientButton && doctorButton && patientForm && doctorForm) {

        addOptionToForm(doctorSalle);
        addOptionsToDoctorForm(doctorName)
        // Ajouter un écouteur d'événement pour le bouton patient
        patientButton.addEventListener("click", () => {
            patientForm.style.display = "block"; // Afficher le formulaire patient
            doctorForm.style.display = "none"; // Masquer le formulaire médecin
        });

        // Ajouter un écouteur d'événement pour le bouton médecin
        doctorButton.addEventListener("click", () => {
            patientForm.style.display = "none"; // Masquer le formulaire patient
            doctorForm.style.display = "block"; // Afficher le formulaire médecin
        });
    } else {
        console.error("One or more elements not found.");
    }

    // Ajouter l'écouteur d'événement pour le bouton patient
    submitButton.addEventListener("click", async () => {
        WA.player.state.informations = {
            firstName: firstName.value,
            lastName: lastName.value,
            doctorName: doctorName.value,
            message: message.value,
            appointment: appointment.value,
            id: WA.player.playerId
        }

        const state = WA.state["room-state"] as RoomState;

        WA.state.saveVariable("room-state", {
            ...state,
            patients: [
                ...state.patients,
                WA.player.state.informations
            ]
        }).catch(e => console.error('Something went wrong while saving variable waiting-room', e))

        WA.controls.restorePlayerControls();
        const index = doctorName.selectedIndex;
        const option = doctorName.options[index]
        const id = option.getAttribute("data-id")
        if(id !== null) {
            const room = findDoctorRoom(parseInt(id))
            if(room !== "") {
                const splitedRoom = state[room].coordinates.split(",");
                WA.player.moveTo(parseInt(splitedRoom[0].trim()), parseInt(splitedRoom[1].trim()), 10);
            } else {
                WA.player.moveTo(457, 191, 10)
            }
        }
    });

    // Ajouter l'écouteur d'événement pour le bouton docteur
    doctorsubmitButton.addEventListener("click", async () => {
        const state = WA.state["room-state"] as RoomState;
        const room = assignDoctorToFirstEmptyRoom();
        WA.state.saveVariable("room-state", {
            ...state,
            doctors: [
                ...state.patients,
                {
                    name: WA.player.name,
                    id: WA.player.playerId,
                    room
                }
            ]
        }).catch(e => console.error('Something went wrong while saving variable waiting-room', e))

        if (room !== null) {
            const splitedRoom = state[room].coordinates.split(",");
            WA.player.moveTo(parseInt(splitedRoom[0].trim()), parseInt(splitedRoom[1].trim()), 10);
        }

        WA.controls.restorePlayerControls()

    });


}).catch(e => console.error(e));

// Initialiser l'API supplémentaire
bootstrapExtra().then(() => {
    console.log('Scripting API Extra ready');
}).catch(e => console.error(e));
