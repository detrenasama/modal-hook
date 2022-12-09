import { ComponentType, ComponentProps, PropsWithChildren, ReactNode } from "react"

export type ModalContainerComponent = ComponentType<ModalContainerProps>
interface ModalContainerProps extends PropsWithChildren
{
    modal: ReactNode
    isClosing: boolean
    closeModal: () => void
    stopClosing: () => void
    isOpening: boolean
    stopOpening: () => void
}

interface ModalProviderProps extends PropsWithChildren
{
    DefaultModalComponent?: ModalContainerComponent
}

export function useModal<M extends ComponentType>(
    Modal: M,
    props: ComponentProps<M>,
    Container?: ModalContainerComponent
):
    [() => void, () => void]

export declare const ModalProvider: ComponentType<ModalProviderProps>;