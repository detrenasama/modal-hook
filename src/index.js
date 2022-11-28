import React from 'react';
import {createContext, useCallback, useContext, useState} from "react";
import Modal from "./components/Modal";

const ModalContext = createContext(undefined);

const ModalProvider = ({DefaultModalComponent = Modal, ...props}) => {
    const [modal, setModal] = useState()
    const [ContainerComponent, setContainerComponent] = useState(() => DefaultModalComponent)
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

    console.log(ContainerComponent)

    return <ModalContext.Provider value={{setModal, openModal, closeModal, setContainerComponent}} {...props}>
        {props.children}
        {ContainerComponent && modal && RenderModal(ContainerComponent,
                               modal,
                               unsetModal,
                               isOpening,
                               isClosing,
                               setIsOpening,
                               setIsClosing)}
    </ModalContext.Provider>
}

const RenderModal = (Container, modal, unsetModal, isOpening, isClosing, setIsOpening, setIsClosing) => {
    console.log(Container, modal)
    return <Container modal={modal} unsetModal={unsetModal} isOpening={isOpening} isClosing={isClosing} setIsOpening={setIsOpening} setIsClosing={setIsClosing} />
}

const useModal = (
    ModalComponent,
    props = {},
    ContainerComponent = undefined
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
        setContainerComponent(() => ContainerComponent)
        setModal(<ModalComponent {...props} />)
        openModal()
    }, [setModal, openModal, ContainerComponent])

    const close = useCallback(() => {
        closeModal()
    }, [closeModal])

    return [show, close]
}

export {ModalProvider, useModal}