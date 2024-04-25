import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

const formContainer =document.getElementById("formContainer");
const firstName = document.getElementById("nom") as HTMLTextAreaElement;
const lastName = document.getElementById("prenom") as HTMLTextAreaElement;
const doctorName = document.getElementById("medecin") as HTMLTextAreaElement;
const message = document.getElementById("message") as HTMLTextAreaElement;

const submitButton = document.getElementById("submitButton") as HTMLButtonElement;

// Fonction pour vérifier si les données de l'utilisateur existent déjà dans le stockage local
function checkUserData() {
    const userData = localStorage.getItem('patientData');
    if (userData) {
        const parsedData = JSON.parse(userData);
        const userId = WA.player.id;
        const userDataExists = parsedData.some((data: any) => data.id === userId);
        if (userDataExists) {
            // Masquer le formulaire
            formContainer.style.display = "none";
        }
    }
}

// Fonction pour ajouter les données des patients au stockage local du navigateur
function addDataToLocal(data: any) {
    let existingData = localStorage.getItem('patientData');
    if (existingData) {
        existingData = JSON.parse(existingData);
    } else {
        existingData = [];
    }
    existingData.push(data);
    localStorage.setItem('patientData', JSON.stringify(existingData));
}

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready  formualire ts');

    // Vérifier si les données de l'utilisateur existent déjà
    checkUserData();
    let noteWebsite: any;



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
    firstName.value = (WA.state.firstName ?? "") as string;
    lastName.value = (WA.state.lastName ?? "") as string;
    doctorName.value = (WA.state.doctorName ?? "") as string;
    message.value = (WA.state.message ?? "") as string;

    submitButton.addEventListener("click", () => {
        WA.state.firstName = firstName.value;
        WA.state.lastName = lastName.value;
        WA.state.doctor = doctorName.value;
        WA.state.message = message.value;

        // Créer un objet pour stocker les informations du patient
        const patientData = {
            firstName: firstName.value,
            lastName: lastName.value,
            doctor: doctorName.value,
            message: message.value,
            id: WA.player.id // Ajouter l'ID de l'utilisateur
        };

        // Ajouter les données au stockage local du navigateur
        addDataToLocal(patientData);

        // Afficher les valeurs dans la console
        console.log("Nom:",  patientData.firstName);
        console.log("Prénom:", patientData.lastName);
        console.log("Médecin sélectionné:", patientData.doctor);
        console.log("Message:", patientData.message);

        formContainer.style.display = "none";
        WA.controls.restorePlayerControls();
    });

}).catch(e => console.error(e));

bootstrapExtra().then(() => {
    console.log('Scripting API Extra ready');
}).catch(e => console.error(e));

export {};
