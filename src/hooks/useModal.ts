import { ComponentType, createElement, useCallback, useContext, useMemo } from 'react'
import { ModalContext } from '../components/ModelProvider'
import { ModalContainerComponent } from '../types'

const useModal = (ModalComponent: ComponentType, props: object = {}, ContainerComponent?: ModalContainerComponent) => {
    const context = useContext(ModalContext)
    if (context === undefined) throw new Error('useModal must be used within a ModalProvider')

    const { addModal, closeModal } = context

    const createModal = useMemo(() => {
        return createElement(ModalComponent, props)
    }, [ModalComponent, props])

    const show = useCallback(() => {
        addModal(createModal, ContainerComponent)
    }, [addModal, ContainerComponent, createModal])

    const close = useCallback(() => {
        closeModal(createModal)
    }, [closeModal, createModal])

    return [show, close]
}

export default useModal
