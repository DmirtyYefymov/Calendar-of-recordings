import { useContext, useEffect } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
    const {
        activeAppoitments,
        getActiveAppointments,
        appoitmentLoadingStatus,
    } = useContext(AppointmentContext);

    useEffect(() => {
        getActiveAppointments();
    }, []);

    if (appoitmentLoadingStatus === "loading") {
        return <Spinner />;
    } else if (appoitmentLoadingStatus === "error") {
        return (
            <>
                <Error />
                <button
                    className="schedule__reload"
                    onClick={getActiveAppointments}
                >
                    Reload
                </button>
            </>
        );
    }

    return (
        <>
            {activeAppoitments.map((item) => (
                <AppointmentItem key={item.id} {...item} />
            ))}
        </>
    );
}

export default AppointmentList;
