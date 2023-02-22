import {ComponentType, createElement, useCallback, useEffect, useMemo, useRef} from 'react'
import {Id, ModalComponentType, ModalRecord} from '../types'
import {closeModal, declareModal, openModal} from "../core/modal";
import {Event, eventManager} from "../core/eventManager";

const useModal = (ModalComponent: ComponentType, props: object = {}, ContainerComponent?: ModalComponentType) => {

    const ref = useRef<Id>("")
    const resetRef = (_result: ModalRecord, id: Id) => {
        if (id === ref.current)
            ref.current = ""
    }

    useEffect(() => {
        eventManager.on(Event.Unset, resetRef)

        return () => {
            eventManager.off(Event.Unset, resetRef)
        }
    }, [ref.current])

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
