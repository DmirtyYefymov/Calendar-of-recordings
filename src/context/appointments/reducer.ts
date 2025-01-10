import { TAppointmentAction, ActionsTypes } from "./actions";
import { IAppointment, ActiveAppointment } from "../../shared/interfaces/appointment.interface";
import { loadingStatusOptions } from "../../hooks/http.hook";

export interface IAppointmentState {
    allAppointments: IAppointment[] | [];
    activeAppointments: ActiveAppointment[] | [];
    appoitmentLoadingStatus: loadingStatusOptions;
}

export default function reducer(state: IAppointmentState, action: TAppointmentAction): IAppointmentState {
    switch (action.type) {
        case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
            return {
                ...state,
                activeAppointments: action.payload,
                appoitmentLoadingStatus: "idle"
            };
        case ActionsTypes.SET_ALL_APPOINTMENTS:
            return {
                ...state,
                allAppointments: action.payload,
                appoitmentLoadingStatus: "idle"
            };
        case ActionsTypes.FETCHING_APPOINTMENTS:
            return {
                ...state,
                appoitmentLoadingStatus: "loading"
            };
        case ActionsTypes.ERROR_FETCHING_APPOINTMENTS:
            return {
                ...state,
                appoitmentLoadingStatus: "error"
            };
        default:
            return state;
    }
}