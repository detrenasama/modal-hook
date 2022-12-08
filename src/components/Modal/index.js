import React, {useEffect} from "react";
import styles from './styles.module.css';

const Modal = ({
    modal,
    isClosing,
    closeModal,
    stopClosing,
    isOpening,
    stopOpening,
}) => {

    // Opening animation
    useEffect(() => {
        if (!isOpening)
            return

        const timer = setTimeout(() => {
            stopOpening()
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [isOpening, stopOpening])

    // Closing animation
    useEffect(() => {
        if (!isClosing)
            return

        const timer = setTimeout(() => {
            stopClosing()
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [isClosing, stopClosing])

    const animationStyle = isOpening ? styles.opening : isClosing ? styles.closing : ""

    return <div className={`${styles.container} ${animationStyle}`} role="dialog" tabIndex="-1">
        <div className={styles.background}></div>
        <div className={styles.inner}>
            <div className={styles.body}>
                {modal}
            </div>
        </div>
    </div>
}

export default Modal
