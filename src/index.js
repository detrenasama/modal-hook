import React, {createContext, useCallback, useContext, useState} from "react";
import Modal from "./components/Modal";

const ModalContext = createContext(undefined);

const ModalProvider = ({DefaultModalComponent = Modal, ...props}) => {
    const [modals, setModals] = useState([])
    const [closingModal, setClosingModal] = useState(null)
    const [openingModal, setOpeningModal] = useState(null)

    const addModal = useCallback((modal, Container) => {
        setModals(modals => [...modals, {key: "modal_" + new Date().getTime(), modal, Container}])
        setOpeningModal(modal)
    }, [])

    const unsetModal = (key) => {
        setModals(modals => {
            const index = modals.findIndex(e => e.key === key)
            if (index >= 0) {
                const newModals = [...modals]
                newModals.splice(index, 1)
                return newModals
            }

            return [...modals]
        })
    }

    const closeModal = (modal) => {
        setClosingModal(modal)
    }

    return <ModalContext.Provider value={{addModal, closeModal}} {...props}>
        {props.children}
        {modals.map(({key, modal, Container}) => {
            const ContainerComponent = Container ? Container : DefaultModalComponent
            return <ContainerComponent key={key} modal={modal}
                                       isOpening={modal === openingModal}
                                       stopOpening={() => setOpeningModal(null)}
                                       isClosing={modal === closingModal}
                                       closeModal={() => setClosingModal(modal)}
                                       stopClosing={() => {
                                           setClosingModal(null)
                                           unsetModal(key)
                                       }}
            />
        })}
    </ModalContext.Provider>
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
        addModal,
        closeModal,
    } = context

    const modal = <ModalComponent {...props} />

    const show = useCallback(() => {
        addModal(modal, ContainerComponent)
    }, [addModal, ModalComponent, ContainerComponent])

    const close = useCallback(() => {
        closeModal(modal)
    }, [closeModal, modal])

    return [show, close]
}

export {ModalProvider, useModal}