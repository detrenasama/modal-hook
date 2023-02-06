import {ComponentType, PropsWithChildren, ReactNode} from 'react'

export type Id = string

export type ModalComponentType = ComponentType<ModalProps> & {closingDelay: number}
export interface ModalProps extends PropsWithChildren {
    modal: ReactNode
    isClosing: boolean
    closeModal: () => void
    isOpening: boolean
}
export interface ModalContainerProps extends PropsWithChildren {
    defaultModalComponent: ModalComponentType
}


export interface ModalRecord {
    key: Id,
    modal: ReactNode,
    container: ModalComponentType,
}

export interface ContainerInstance {
    props: ModalContainerProps;
}