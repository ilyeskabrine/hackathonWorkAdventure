/// <reference types="@workadventure/iframe-api-typings" />

import { Popup } from "@workadventure/iframe-api-typings";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";



console.log('Script started successfully');
let currentPopup : Popup | undefined;
const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
}

const initState = () => {
    const waitingRoom = WA.state.loadVariable("waiting-room")
    if (!waitingRoom) {
        WA.state.saveVariable("waiting-room", {
            actualRoom: "hopital-1"
        });
    }
}

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    initState()
    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    console.log('Player ID: ', WA.player.id);
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
    });
    WA.room.area.onLeave("getinfo").subscribe(() => {
        noteWebsite.close();
    });




    WA.room.onEnterLayer("stairs_zone").subscribe(() => {
        const room = `hopital-${generateRandomNumber()}`
        WA.state.saveVariable("waiting-room", {
            actualRoom: room
        });
        WA.nav.goToRoom(`https://play.workadventu.re/_/${room}/localhost:5173/map.tmj`)
    })

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));



WA.room.area.onEnter('test-area').subscribe(() => {
    currentPopup = WA.ui.openPopup("clockPopup", "Bienvenue dans la magie clinique", []);
    console.log("Here welcome");
})

WA.room.area.onLeave('test-area').subscribe(closePopup);

function closePopup() {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export { };










var Patient1 = {
    id:'1',
    nom: 'nom',
    prenom: 'prenom',
    age: 'age',
    symptomes: 'symptome'
};
var Patient2 = {
    id:'1',
    nom: 'nom',
    prenom: 'prenom',
    age: 'age',
    symptomes: 'symptome'
};


WA.state.saveVariable('patients', {
    Patient1,
    Patient2
 
}).catch(e => console.error('Something went wrong while saving variable', e));

//let pat=JSON.stringify(WA.state.patients);
let patt=WA.state.patients;
console.log(patt.Patient1);
console.log("jhgf");

// let pat=JSON.stringify(patt);
// console.log(pat);

 

WA.room.area.onEnter("visibleNote").subscribe(async () => {
    console.log("Entering visibleNote layer");

});
export {};
