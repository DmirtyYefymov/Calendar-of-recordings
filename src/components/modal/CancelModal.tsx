import Portal from "../portal/portal";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./modal.scss";

interface IModalProps {
    handleClose: (state: boolean) => void;
    selectedId: number;
    isOpen: boolean;
}

function CancelModal({ handleClose, selectedId, isOpen }: IModalProps) {
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
        <Portal>
            <CSSTransition
                in={isOpen}
                timeout={{ enter: 500, exit: 500 }}
                unmountOnExit
                classNames="modal"
                nodeRef={nodeRef}
            >
                <div className="modal" ref={nodeRef}>
                    <div className="modal__body">
                        <span className="modal__title">
                            Are you sure you want to delete the appointment?
                            {selectedId}
                        </span>
                        <div className="modal__btns">
                            <button className="modal__ok">Ok</button>
                            <button
                                className="modal__close"
                                onClick={() => handleClose(false)}
                            >
                                Close
                            </button>
                        </div>
                        <div className="modal__status">Success</div>
                    </div>
                </div>
            </CSSTransition>
        </Portal>
    );
}

export default CancelModal;
