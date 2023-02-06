import {ReactNode} from "react";
import {Id, ModalComponentType} from "../types";
import {eventManager, Event} from "./eventManager";

function declareModal(
    modal: ReactNode,
    container?: ModalComponentType
): Id {
    const result = eventManager.emit(Event.Declare, modal, container);
    return result.key;
}

function unsetModal(id: Id) {
    eventManager.emit(Event.Unset, id)
}

function closeModal(id: Id) {
    eventManager.emit(Event.Hide, id)
}

function openModal(id: Id) {
    eventManager.emit(Event.Show, id)
}

export {
    declareModal,
    openModal,
    closeModal,
    unsetModal,
}