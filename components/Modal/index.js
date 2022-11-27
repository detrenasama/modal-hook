import React, {useEffect} from "react";
import styles from './styles.module.css';

const Modal = ({modal, unsetModal, isOpening, isClosing, setIsOpening, setIsClosing}) => {

    // Opening animation
    useEffect(() => {
        if (!isOpening)
            return

        const timer = setTimeout(() => {
            setIsOpening(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [isOpening, setIsOpening])

    // Closing animation
    useEffect(() => {
        if (!isClosing)
            return

        const timer = setTimeout(() => {
            unsetModal()
            setIsClosing(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [isClosing, setIsClosing, unsetModal])

    const animationStyle = isOpening ? styles.opening : isClosing ? styles.closing : null

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