import { useContext, useEffect, useState } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
    const {
        activeAppointments,
        getActiveAppointments,
        appoitmentLoadingStatus,
    } = useContext(AppointmentContext);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

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
            {activeAppointments.map((item) => (
                <AppointmentItem
                    key={item.id}
                    {...item}
                    openModal={setIsOpen}
                    selectedId={() => setSelectedId(item.id)}
                />
            ))}

            <CancelModal
                handleClose={setIsOpen}
                selectedId={selectedId}
                isOpen={isOpen}
            />
        </>
    );
}

export default AppointmentList;
