import {ComponentType, createElement, useCallback, useMemo, useRef} from 'react'
import {Id, ModalComponentType} from '../types'
import {closeModal, declareModal, openModal} from "../core/modal";

const useModal = (ModalComponent: ComponentType, props: object = {}, ContainerComponent?: ModalComponentType) => {

    const ref = useRef<Id>("")

    const createdModal = useMemo(() => {
        return createElement(ModalComponent, props)
    }, [ref])

    const show = useCallback(() => {
        if (ref.current?.length === 0)
            ref.current = declareModal(createdModal, ContainerComponent)

        openModal(ref.current)
    }, [ref, declareModal, ContainerComponent, createdModal])

    const close = useCallback(() => {
        closeModal(ref.current)
        ref.current = ''
    }, [ref, closeModal, ContainerComponent])

    return [show, close]
}

export default useModal
