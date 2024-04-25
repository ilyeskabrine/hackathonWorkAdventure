import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

const formContainer =document.getElementById("formContainer");
const firstName = document.getElementById("nom") as HTMLTextAreaElement;
const lastName = document.getElementById("prenom") as HTMLTextAreaElement;
const doctorName = document.getElementById("medecin") as HTMLTextAreaElement;
const message = document.getElementById("message") as HTMLTextAreaElement;

const submitButton = document.getElementById("submitButton") as HTMLButtonElement
const closeButton = document.getElementById("ButtonClose") as HTMLButtonElement;



// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready  formualire ts');

    WA.room.area.onEnter('getinfo').subscribe(async () => {
        noteWebsite = await WA.ui.website.open({
            url: "./formulaire.html",
            position: {
                vertical: "top",
                horizontal: "middle",
            },
            size: {
                height: "100vh",
                width: "50vw",
            },
            margin: {
                top: "10vh",
            },
            allowApi: true,
        });
        WA.controls.disablePlayerControls();
    });
    closeButton.addEventListener("click", () => {
        formContainer.style.display = "none";
        WA.controls.restorePlayerControls();
    })
     let patients = WA.state.patients;
    submitButton.addEventListener("click", () => {
        let patientData = {
            firstName: firstName.value,
            lastName: lastName.value,
            doctor: doctorName.value,
            message: message.value,
            status: 'en attente',
            id: WA.player.id
        };

        // Vérifier s'il y a déjà des patients enregistrés
        let patients = WA.state.patients ? {...WA.state.patients} : {};

        // Ajouter les données du nouveau patient à l'objet patients
        patients['patientData' + Object.keys(patients).length] = patientData;

        // Enregistrer l'objet patients mis à jour
        WA.state.saveVariable('patients', patients)
            .then(() => {
                console.log("Patient data saved successfully:", patients);
            })
            .catch(e => console.error('Something went wrong while saving variable', e));

        // Cacher le formulaire et restaurer les contrôles du joueur
        
        
        WA.controls.restorePlayerControls();
    });


    



    WA.state.onVariableChange('patients').subscribe(() => {

        let patients=WA.state.loadVariable('patients');
        console.log(patients+'on change');
       
    })

}).catch(e => console.error(e));


        


export {};
