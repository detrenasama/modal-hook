import React, { ComponentType, createContext, ReactElement, useCallback, useState } from 'react'
import { ModalContainerComponent, ModalProviderProps } from '../../types'
import Modal from '../Modal'

export const ModalContext = createContext({
    addModal: (_modal: ReactElement, _Container?: ModalContainerComponent): void => {},
    closeModal: (_modal: ReactElement): void => {},
})

const modalProviderDefaultProps = {
    DefaultModalComponent: Modal,
}

const ModalProvider: ComponentType<ModalProviderProps> = (props: ModalProviderProps) => {
    const [modals, setModals] = useState<{ modal: ReactElement; key: string; Container?: ModalContainerComponent }[]>(
        [],
    )
    const [closingModal, setClosingModal] = useState<ReactElement | null>(null)
    const [openingModal, setOpeningModal] = useState<ReactElement | null>(null)

    const addModal = useCallback((modal: ReactElement, Container?: ModalContainerComponent) => {
        setModals((modals) => {
            const found = modals.find((e) => e.modal.type === modal.type)
            if (found) return modals

            return [...modals, { key: 'modal_' + new Date().getTime(), modal, Container }]
        })

        setOpeningModal(modal)
    }, [])

    const unsetModal = (key: string) => {
        setModals((modals) => {
            const index = modals.findIndex((e) => e.key === key)
            if (index >= 0) {
                const newModals = [...modals]
                newModals.splice(index, 1)
                return newModals
            }

            return [...modals]
        })
    }

    const closeModal = (modal: ReactElement) => {
        setClosingModal(modal)
    }

    return (
        <ModalContext.Provider value={{ addModal, closeModal }}>
            {props.children}
            {modals.map(({ key, modal, Container }) => {
                const ContainerComponent = Container ? Container : props.DefaultModalComponent
                return (
                    <ContainerComponent
                        key={key}
                        modal={modal}
                        isOpening={modal === openingModal}
                        stopOpening={() => setOpeningModal(null)}
                        isClosing={modal === closingModal}
                        closeModal={() => setClosingModal(modal)}
                        stopClosing={() => {
                            setClosingModal(null)
                            unsetModal(key)
                        }}
                    />
                )
            })}
        </ModalContext.Provider>
    )
}

ModalProvider.defaultProps = modalProviderDefaultProps

export default ModalProvider
