import { JITSI_NAME, NUMBER_OF_CONSULTATION_ROOM, ROOMS_COORDINATES } from "./constants";

export type RoomState = {
    [x: string]: JitsiRoomState;
} & {
    patients: Patient[];
    doctors: Doctor[];
};

interface Patient {
    firstName: string;
    lastName: string;
    doctorName: string;
    message: string;
    appointment: string;
    id: number;
}

interface Doctor {
    name: string;
    id: number;
}

interface JitsiRoomState {
    patient: null | Patient;
    doctor: null | Doctor;
    coordinates: string;
}

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
    if (WA.state["room-state"] === undefined) {
        WA.state["room-state"] = {
            patients: [],
            doctors: []
        };
    }
    const waitingRoom = WA.state.loadVariable("waiting-room")
    const hospital = getHospitalNumber(WA.room.id)
    if (!waitingRoom) {
        WA.state.saveVariable("waiting-room", {
            actualRoom: hospital
        }).catch(e => console.error('Something went wrong while saving variable waiting-room', e));
    }

    // Init consultation rooms
    for (let i = 1; i <= NUMBER_OF_CONSULTATION_ROOM; i++) {
        const roomState = WA.state["room-state"] as RoomState;
        WA.state["room-state"] = {
            ...roomState,
            [`${JITSI_NAME}${i}`]: {
                ...roomState[`${JITSI_NAME}${i}`],
                patient: null,
                doctor: null,
                coordinates: ROOMS_COORDINATES[i - 1]
            }
        }
    }

    WA.ui.actionBar.addButton({
        id: 'change-btn',
        label: 'Change hospital',
        callback: () => {
            WA.player.teleport(361, 39)
        }
    });

}

export const onEntryRegister = () => {
    WA.room.area.onEnter("register").subscribe(() => {
        const userInfo = WA.player.state.informations;
        if (!userInfo) {
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
        const url = new URL(WA.room.id);
        const pathname = url.pathname;
        const indexHopital = pathname.indexOf('hopital-');
        if (indexHopital !== -1) { 
            const indexNextSlash = pathname.indexOf('/', indexHopital); 
            if (indexNextSlash !== -1) {
                const newPathname = pathname.substring(0, indexHopital) + room + pathname.substring(indexNextSlash);
                const newUrl = new URL(url.origin + newPathname + url.search);
                WA.nav.goToRoom(newUrl.href);
            }
        }
    })
}

export const onEntryEntryJistsiRooms = () => {
    for (let i = 1; i <= NUMBER_OF_CONSULTATION_ROOM; i++) {
        WA.room.area.onEnter(`${JITSI_NAME}${i}`).subscribe(() => {
            const roomState = WA.state["room-state"] as RoomState;
            const doctor = roomState.doctors.find((doctor) => doctor.id === WA.player.playerId)
            const patient = roomState.patients.find((patient) => patient.id === WA.player.playerId)
            const isDoctor = !!doctor
            WA.state["room-state"] = {
                ...roomState,
                [`${JITSI_NAME}${i}`]: {
                    ...roomState[`${JITSI_NAME}${i}`],
                    patient: !isDoctor ? patient : null,
                    doctor: isDoctor ? doctor : null
                }
            }

        })

        WA.room.area.onLeave(`${JITSI_NAME}${i}`).subscribe(() => {
            const roomState = WA.state["room-state"] as RoomState;
            const doctor = roomState.doctors.find((doctor) => doctor.id === WA.player.playerId)
            const patient = roomState.patients.find((patient) => patient.id === WA.player.playerId)
            const isDoctor = !!doctor
            
            WA.state["room-state"] = {
                ...roomState,
                [`${JITSI_NAME}${i}`]: {
                    ...roomState[`${JITSI_NAME}${i}`],
                    patient: !isDoctor ? null : patient,
                    doctor: isDoctor ? null : doctor
                }
            }

        })
    }
}