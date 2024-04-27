import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Attendre que l'API soit prête
WA.onInit().then(async () => {
    // Récupérer les éléments DOM
    const firstName = document.getElementById("nom") as HTMLTextAreaElement;
    const lastName = document.getElementById("prenom") as HTMLTextAreaElement;
    const doctorName = document.getElementById("medecin") as HTMLTextAreaElement;
    const doctorSalle = document.getElementById("salle") as HTMLTextAreaElement;
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

    //  WA.player.state.informations = {
    //     firstName: firstName.value,
    //     lastName: lastName.value,
    //     doctorName: doctorName.value,
    //     message: message.value,
    //     appointment: appointment.value,
    // }
    // WA.ui.modal.closeModal();
    // const websites = await WA.ui.website.getAll();
    // websites.map((web) => web.close());
    // const state = WA.state["room-state"] as {};
    // WA.state.saveVariable("room-state", {
    //     ...state,
    //     [WA.player.playerId]: WA.player.state.informations
    // }).catch(e => console.error('Something went wrong while saving variable waiting-room', e))
    // WA.controls.restorePlayerControls();

    // Ajouter l'écouteur d'événement pour le bouton de soumission
   

    // Ajouter l'écouteur d'événement pour le bouton patient
    submitButton.addEventListener("click", async () => {
        console.log('Patient button clicked');

        
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

    // Ajouter l'écouteur d'événement pour le bouton docteur
    doctorsubmitButton.addEventListener("click", async () => {
        console.log('Doctor button clicked');
        console.log(doctorName.value);
        
     
        if (doctorSalle.value == "Dr.Leroy") {
            WA.player.moveTo(450, 240, 10);
        } else if (doctorSalle.value == "Dr.Garcia") {
            WA.player.moveTo(440, 300, 10);
        } else if (doctorSalle.value == "Dr.Roux") {
            WA.player.moveTo(870, 300, 10);
        }else if (doctorSalle.value == "Dr.Fournier") {
            WA.player.moveTo(700, 300, 10);
        }else if (doctorSalle.value == "Dr.Lefebvre") {
            WA.player.moveTo(720, 240, 10);
        }
       
    });

 
}).catch(e => console.error(e));

// Initialiser l'API supplémentaire
bootstrapExtra().then(() => {
    console.log('Scripting API Extra ready');
}).catch(e => console.error(e));
