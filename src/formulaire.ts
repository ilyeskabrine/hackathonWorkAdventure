import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

const formContainer =document.getElementById("formContainer");
const firstName = document.getElementById("nom") as HTMLTextAreaElement;
const lastName = document.getElementById("prenom") as HTMLTextAreaElement;
const doctorName = document.getElementById("medecin") as HTMLTextAreaElement;
const message = document.getElementById("message") as HTMLTextAreaElement;

const submitButton = document.getElementById("submitButton") as HTMLButtonElement;



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

     let patients = WA.state.patients;
     let t = Object.keys(patients).length;

    submitButton.addEventListener("click", () => {
        // Créer un objet pour stocker les informations du patient
        console.log('submitted');
        patients['patientData'+t] = {

        t: 'patientData' + t,
        firstName: firstName.value,
        lastName: lastName.value,
        doctor: doctorName.value,
        message: message.value,
        status: 'en attente',
        id: WA.player.id 
        };
   
    
        WA.state.saveVariable('patients', {patients}).catch(e => console.error('Something went wrong while saving variable', e));

        
        formContainer.style.display = "none";
        WA.controls.restorePlayerControls();
    });

    
        console.log(patients);


    WA.state.onVariableChange('patients').subscribe(() => {

        let patients=WA.state.loadVariable('patients');
        console.log(patients+'on change');


        // Parcourir les propriétés de patients
        // for (var key in patients) {
        //     if (patients.hasOwnProperty(key) ) {
        //         var patientsData = patients[key];
                
        //         // Parcourir les propriétés de patientsData
        //         for (var patientKey in patientsData) {
        //             if (patientsData.hasOwnProperty(patientKey)) {  
        //                 console.log(patientKey + ": ", patientsData[patientKey]);
        //             }
        //         }
        //     }
        // }
    })

}).catch(e => console.error(e));


        


export {};
