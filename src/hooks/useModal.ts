import {ComponentType, createElement, useCallback, useMemo, useRef} from 'react'
import {Id, ModalComponentType} from '../types'
import {closeModal, declareModal, openModal} from "../core/modal";

const useModal = (ModalComponent: ComponentType, props: object = {}, ContainerComponent?: ModalComponentType) => {

    const ref = useRef<Id>("")

    const createdModal = useMemo(() => {
        return createElement(ModalComponent, props)
    }, [ModalComponent, props])

    const show = useCallback(() => {
        ref.current = declareModal(createdModal, ContainerComponent)
        openModal(ref.current)
    }, [ref, declareModal, ContainerComponent, createdModal])

    const close = useCallback(() => {
        closeModal(ref.current)
    }, [ref, closeModal, ContainerComponent])

    return [show, close]
}

export default useModal
