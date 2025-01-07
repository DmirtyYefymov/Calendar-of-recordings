import React, { createContext, useReducer } from "react";
import reducer, { IInitialState } from "./reducer";

import useAppointmentService from "../../services/AppointmentService";

import { ActionsTypes } from "./actions";

const initialState: IInitialState = {
    allAppointments: [],
    activeAppoitments: [],
};

interface IProviderProps {
    children: React.ReactNode;
}

interface IAppointmentContextValue extends IInitialState {
    getAppointments: () => void;
    getActiveAppointments: () => void;
}

export const AppointmentContext = createContext<IAppointmentContextValue>({
    allAppointments: initialState.allAppointments,
    activeAppoitments: initialState.activeAppoitments,
    getAppointments: () => {},
    getActiveAppointments: () => {},
});

const AppointmentContextProvider = ({ children }: IProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loadingStatus, getAllAppointments, getAllActiveAppointments } =
        useAppointmentService();

    const value: IAppointmentContextValue = {
        allAppointments: state.allAppointments,
        activeAppoitments: state.activeAppoitments,
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
