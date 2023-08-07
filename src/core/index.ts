import { ComponentProps, ComponentType, createElement } from 'react'
import { Id, ModalComponentType } from '../types'
import { Event, eventManager } from './eventManager'

export function declare<C extends ComponentType>(
    modalComponent: C,
    props: ComponentProps<C>,
    containerComponent?: ModalComponentType,
): Id {
    const modal = createElement(modalComponent, props)

    const result = eventManager.emit(Event.Declare, modal, containerComponent)
    return result.key
}

export function open(id: Id) {
    eventManager.emit(Event.Show, id)
}

export function close(id: Id) {
    eventManager.emit(Event.Hide, id)
}
