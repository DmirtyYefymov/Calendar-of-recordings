import { useContext, useEffect } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
    const { activeAppoitments, getActiveAppointments } =
        useContext(AppointmentContext);

    useEffect(() => {
        getActiveAppointments();
    }, []);

    return (
        <>
            {activeAppoitments.map((item) => (
                <AppointmentItem key={item.id} {...item} />
            ))}
        </>
    );
}

export default AppointmentList;
