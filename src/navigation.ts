const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
}

const getHospitalNumber = (url: string) => {
    const parts = url.split('/');
    const hospitalPart = parts.find(part => part.startsWith('hopital-'));
    if (hospitalPart) {
        return hospitalPart
    } else {
        return null;
    }
}

export const initState = () => {
    // Teleport to the PNJ
    WA.player.teleport(160, 195);

    if(WA.state["room-state"] === undefined) {
        WA.state["room-state"] = {};
    }
    const waitingRoom = WA.state.loadVariable("waiting-room")
    const hospital = getHospitalNumber(WA.room.id)
    if (!waitingRoom) {
        WA.state.saveVariable("waiting-room", {
            actualRoom: hospital
        }).catch(e => console.error('Something went wrong while saving variable waiting-room', e));
    }
}

export const onEntryRegister = () => {
    WA.room.area.onEnter("register").subscribe(() => {
        const userInfo = WA.player.state.informations;
        if(!userInfo) {
            WA.controls.disablePlayerControls();
            WA.ui.openPopup("registerPopup", "Bienvenue dans Virtual Health", [
                {
                    "label": "Suivant",
                    className: "normal",
                    callback: ((p) => {
                        p.close()
                        WA.ui.openPopup("registerPopup", "Vous pouvez commencer par remplir notre formulaire qu'on sache si vous êtes un patient ou un médécin.", [
                            {
                                "label": "Suivant",
                                className: "normal",
                                callback: (a) => { 
                                    a.close()
                                    // Move to register information panel
                                    WA.player.moveTo(76, 273);
                                }
                            }
                        ])
                    })
                }
            ])
        }
    })
}

export const onEntryNavigationStairs = () => {
    WA.room.onEnterLayer("stairs_zone").subscribe(() => {
        const room = `hopital-${generateRandomNumber()}`
        WA.state.saveVariable("waiting-room", {
            actualRoom: room
        }).catch(e => console.error('Something went wrong while saving variable waiting-room', e));
        WA.nav.goToRoom(`https://play.workadventu.re/_/${room}/localhost:5173/map.tmj`)
    })
}