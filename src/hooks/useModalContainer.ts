import { ReactNode, useEffect, useRef, useState } from 'react'
import { ContainerInstance, Id, ModalComponentType, ModalContainerProps, ModalRecord } from '../types'
import { eventManager, Event } from '../core/eventManager'
import { v4 } from 'uuid'

const useModalContainer = (props: ModalContainerProps) => {
    const [openIds, setOpenIds] = useState<Id[]>([])
    const [closingIds, setClosingIds] = useState<Id[]>([])
    const modalRecords = useRef(new Map<Id, ModalRecord>()).current
    const instance: ContainerInstance = {
        props,
    }

    useEffect(() => {
        eventManager
            .on(Event.Declare, addModal)
            .on(Event.Show, openModal)
            .on(Event.Hide, closeModal)
            .on(Event.Unset, removeModal)

        return () => {
            modalRecords.clear()
            setClosingIds([])
            setOpenIds([])
            eventManager.off(Event.Declare).off(Event.Show).off(Event.Hide).off(Event.Unset)
        }
    }, [])

    useEffect(() => {
        instance.props = props
    })

    function getModalsToRender<T>(cb: (modalList: ModalRecord[]) => T) {
        const openModalRecords = Array.from(modalRecords.values()).filter(
            (item) => openIds.includes(item.key) || closingIds.includes(item.key),
        )

        return cb(openModalRecords)
    }

    function openModal(_result: ModalRecord, id: Id) {
        setOpenIds((prev) => [...prev, id])
        setClosingIds((prev) => prev.filter((e) => e !== id))
    }

    function closeModal(_result: ModalRecord, id: Id) {
        setOpenIds((prev) => prev.filter((e) => e !== id))
        setClosingIds((prev) => [...prev, id])

        const modal = modalRecords.get(id)

        const timeout = setTimeout(() => {
            eventManager.emit(Event.Unset, id)
            clearTimeout(timeout)
        }, modal?.container?.closingDelay)
    }

    const removeModal = (_result: ModalRecord, id: Id) => {
        modalRecords.delete(id)
        setOpenIds((prev) => prev.filter((e) => e !== id))
        setClosingIds((prev) => prev.filter((e) => e !== id))
    }

    function addModal(result: ModalRecord, modal: ReactNode, container?: ModalComponentType) {
        const key = v4()

        const containerComponent = container || instance.props.defaultModalComponent

        modalRecords.set(key, {
            key,
            modal,
            container: containerComponent,
        })

        result.key = key
        result.modal = modal
        result.container = containerComponent
    }

    return {
        getModalsToRender,

        openIds,
        closingIds,
    }
}
export default useModalContainer
