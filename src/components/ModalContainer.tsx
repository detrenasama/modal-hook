import React, {FC} from 'react';
import {ModalComponentType, ModalContainerProps} from "../types";
import {createElement} from "react";
import useModalContainer from "../hooks/useModalContainer";
import {closeModal} from "../core/modal";

const ModalContainer: FC<ModalContainerProps> = (props) => {

    const {getModalsToRender, openIds, closingIds } = useModalContainer(props);

    return <div className="Modals">
        {getModalsToRender((modalList) => {
            return modalList.map((modalRecord) => {
                const { key, modal, container } = modalRecord;
                const ContainerComponent: ModalComponentType = container

                return createElement(ContainerComponent, {
                    key,
                    modal,
                    isOpening: openIds.includes(key),
                    isClosing: closingIds.includes(key),
                    closeModal: () => closeModal(key),
                })
            })
        })}
    </div>
}

export default ModalContainer