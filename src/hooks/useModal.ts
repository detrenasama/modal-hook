import {ComponentType, createElement, useCallback, useMemo, useRef} from 'react'
import {Id, ModalComponentType} from '../types'
import {closeModal, declareModal, openModal} from "../core/modal";

const useModal = (ModalComponent: ComponentType, props: object = {}, ContainerComponent?: ModalComponentType) => {

    const ref = useRef<Id>("")

    const createdModal = useMemo(() => {
        return createElement(ModalComponent, props)
    }, [ref.current, props])

    const show = useCallback(() => {
        if (ref.current?.length === 0)
            ref.current = declareModal(createdModal, ContainerComponent)

        openModal(ref.current)
    }, [ref.current, declareModal, ContainerComponent, createdModal])

    const close = useCallback(() => {
        closeModal(ref.current)
        ref.current = ""
    }, [ref.current, closeModal, ContainerComponent])

    return [show, close]
}

export default useModal
