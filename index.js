import React from 'react';
import {createContext, useCallback, useContext, useState} from "react";
import Modal from "./components/Modal";

const ModalContext = createContext(undefined);

const ModalProvider = ({DefaultModalComponent = Modal, ...props}) => {
    const [modal, setModal] = useState()
    const [ContainerComponent, setContainerComponent] = useState()
    const [isOpening, setIsOpening] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    const unsetModal = useCallback(() => {
        setModal(undefined)
    }, [setModal])

    const openModal = () => {
        setIsOpening(true)
    }

    const closeModal = () => {
        setIsClosing(true)
    }

    return <ModalContext.Provider value={{setModal, openModal, closeModal, setContainerComponent}} {...props}>
        {props.children}
        {modal && <RenderModal Container={ContainerComponent ? ContainerComponent : DefaultModalComponent}
                               modal={modal}
                               unsetModal={unsetModal}
                               isOpening={isOpening}
                               isClosing={isClosing}
                               setIsOpening={setIsOpening}
                               setIsClosing={setIsClosing} />}
    </ModalContext.Provider>
}

const RenderModal = ({Container, modal, unsetModal, ...props}) => {
    return <Container modal={modal} unsetModal={unsetModal} {...props} />
}

const useModal = (
    ModalComponent,
    props = {},
    ContainerComponent = null
) => {
    const context = useContext(ModalContext)
    if (context === undefined)
        throw new Error("useModal must be used within a ModalProvider")

    const {
        setModal,
        openModal,
        closeModal,
        setContainerComponent
    } = context

    const show = useCallback(() => {
        setContainerComponent(ContainerComponent)
        setModal(<ModalComponent {...props} />)
        openModal()
    }, [setModal, openModal, ContainerComponent])

    const close = useCallback(() => {
        closeModal()
    }, [closeModal])

    return [show, close]
}

export {ModalProvider, useModal}