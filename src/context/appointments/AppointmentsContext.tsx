import React, { createContext, useReducer } from "react";
import reducer, { IAppointmentState } from "./reducer";

import useAppointmentService from "../../services/AppointmentService";

import { ActionsTypes } from "./actions";

const initialState: IAppointmentState = {
    allAppointments: [],
    activeAppointments: [],
    appoitmentLoadingStatus: "idle",
};

interface IProviderProps {
    children: React.ReactNode;
}

interface IAppointmentContextValue extends IAppointmentState {
    getAppointments: () => void;
    getActiveAppointments: () => void;
}

export const AppointmentContext = createContext<IAppointmentContextValue>({
    allAppointments: initialState.allAppointments,
    activeAppointments: initialState.activeAppointments,
    appoitmentLoadingStatus: initialState.appoitmentLoadingStatus,
    getAppointments: () => {},
    getActiveAppointments: () => {},
});

const AppointmentContextProvider = ({ children }: IProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loadingStatus, getAllAppointments, getAllActiveAppointments } =
        useAppointmentService();

    const value: IAppointmentContextValue = {
        allAppointments: state.allAppointments,
        activeAppointments: state.activeAppointments,
        appoitmentLoadingStatus: loadingStatus,
        getAppointments: () => {
            getAllAppointments().then((data) =>
                dispatch({
                    type: ActionsTypes.SET_ALL_APPOINTMENTS,
                    payload: data,
                })
            );
        },
        getActiveAppointments: () => {
            getAllActiveAppointments().then((data) =>
                dispatch({
                    type: ActionsTypes.SET_ACTIVE_APPOINTMENTS,
                    payload: data,
                })
            );
        },
    };

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    );
};

export default AppointmentContextProvider;
