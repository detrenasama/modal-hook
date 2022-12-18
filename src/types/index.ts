import { ComponentType, PropsWithChildren, ReactNode } from 'react'

export type ModalContainerComponent = ComponentType<ModalContainerProps>
export interface ModalContainerProps extends PropsWithChildren {
    modal: ReactNode
    isClosing: boolean
    closeModal: () => void
    stopClosing: () => void
    isOpening: boolean
    stopOpening: () => void
}
export interface ModalProviderProps extends PropsWithChildren {
    DefaultModalComponent?: ModalContainerComponent
}
