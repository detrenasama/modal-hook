import React, { useEffect } from 'react'
import './styles.css'
import { ModalContainerComponent, ModalContainerProps } from '../../types'

const Modal: ModalContainerComponent = (props: ModalContainerProps) => {
    const { isOpening, stopOpening, isClosing, stopClosing } = props

    // Opening animation
    useEffect(() => {
        if (!isOpening) return

        const timer = setTimeout(() => {
            stopOpening()
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [isOpening, stopOpening])

    // Closing animation
    useEffect(() => {
        if (!isClosing) return

        const timer = setTimeout(() => {
            stopClosing()
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [isClosing, stopClosing])

    const animationStyle = props.isOpening ? 'modalHook--opening' : props.isClosing ? 'modalHook--closing' : ''

    return (
        <div className={`modalHook--container ${animationStyle}`} role='dialog' tabIndex={-1}>
            <div className='modalHook--background'></div>
            <div className='modalHook--inner'>
                <div className='modalHook--body'>{props.modal}</div>
            </div>
        </div>
    )
}

export default Modal
