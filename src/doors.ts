import { NUMBER_OF_ROOM, DOOR_OPEN_NAME, DOOR_CLOSE_NAME, DOOR_ENTRY_ACTION, DOOR_POINT_NAME, DOOR_EXIT_ACTION, JITSI_NAME } from "./constants";
import { RoomState } from "./navigation";

type DoorProps = {
    doorState: boolean
    nbrOfUsers: number
}


export const initAllDoors = () => {
    for(let i = 1; i <= NUMBER_OF_ROOM; i++) {
        WA.room.showLayer(`dors/${DOOR_CLOSE_NAME}${i}`);
        WA.room.hideLayer(`dors/${DOOR_OPEN_NAME}${i}`);

        WA.state[`${DOOR_POINT_NAME}${i}`] = {
            doorState: false,
            nbrOfUsers: 0
        };

    }
}

export const onEntryDoorsPoint = async () => {
    for(let i = 1; i <= NUMBER_OF_ROOM; i++) {
        WA.room.onEnterLayer(`floor_entry_exit/${DOOR_ENTRY_ACTION}${i}`).subscribe( async () => {
            const roomProperties = WA.state[`${DOOR_POINT_NAME}${i}`] as DoorProps
            if (roomProperties && roomProperties.nbrOfUsers < 2) {
                const isUserADoctor = checkIfUSerIsDoctor()
                const isDoctorInRoom = checkIfRoomAlreadyContainDoctor(i)
                const isPatientInRoom = checkIfRoomAlreadyContainPatient(i)

                if ((isUserADoctor && !isDoctorInRoom) || (!isUserADoctor && !isPatientInRoom)) {
                    WA.state[`${DOOR_POINT_NAME}${i}`] = {doorState: !roomProperties?.doorState, nbrOfUsers: roomProperties?.nbrOfUsers}
                }
            }
        })

        WA.room.onEnterLayer(`floor_entry_exit/${DOOR_EXIT_ACTION}${i}`).subscribe( async () => {
            const roomProperties = WA.state[`${DOOR_POINT_NAME}${i}`] as DoorProps
            if (roomProperties) {
                WA.state[`${DOOR_POINT_NAME}${i}`] = {doorState: !roomProperties?.doorState, nbrOfUsers: roomProperties?.nbrOfUsers + 1}
            }

            if (roomProperties.nbrOfUsers === 2) {
                WA.state[`${DOOR_POINT_NAME}${i}`] = {doorState: !roomProperties?.doorState, nbrOfUsers: roomProperties?.nbrOfUsers - 1}
            }
        })
    }
}

export const listenDoorsVariables = () => {
    for(let i = 1; i <= NUMBER_OF_ROOM; i++) {
        WA.state.onVariableChange(`${DOOR_POINT_NAME}${i}`).subscribe((doorProps: any) => {
            if (doorProps.doorState) {
                WA.room.showLayer(`dors/${DOOR_OPEN_NAME}${i}`);
                WA.room.hideLayer(`dors/${DOOR_CLOSE_NAME}${i}`);
            } else {
                WA.room.showLayer(`dors/${DOOR_CLOSE_NAME}${i}`);
                WA.room.hideLayer(`dors/${DOOR_OPEN_NAME}${i}`);
            }
        }); 
    }
}

export const checkIfUSerIsDoctor = () => {
    const roomDoctors = WA.state['room-state'] as RoomState
    const userId = WA.player.playerId
    
    const filterDoctorsWithPlayerId = roomDoctors.doctors.filter((doctor) => {
        if (doctor.id === userId) {
            return doctor
        }
        return
    })

    console.log(filterDoctorsWithPlayerId, 'doctors')

    return filterDoctorsWithPlayerId.length
}

export const checkIfRoomAlreadyContainDoctor = (roomIndex: number) => {
    const rooms = WA.state['room-state'] as RoomState
    const room = rooms[`${JITSI_NAME}${roomIndex}`]
    return room.doctor !== null
}

export const checkIfRoomAlreadyContainPatient = (roomIndex: number) => {
    const rooms = WA.state['room-state'] as RoomState
    const room = rooms[`${JITSI_NAME}${roomIndex}`]
    return room.patient !== null
}