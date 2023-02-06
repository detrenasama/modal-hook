import {Id, ModalComponentType, ModalRecord} from "../types";
import {ReactNode} from "react";

export const enum Event {
    Show,
    Hide,
    Declare,
    Unset,
}

type OnShowCallback = (result: ModalRecord, id: Id) => void;
type OnHideCallback = (result: ModalRecord, id: Id) => void;
type OnUnsetCallback = (result: ModalRecord, id: Id) => void;
type OnDeclareCallback = (result: ModalRecord, modal: ReactNode, container?: ModalComponentType) => void;

type Callback = OnShowCallback | OnHideCallback | OnDeclareCallback | OnUnsetCallback;

interface EventManager {
    list: Map<Event, Callback[]>

    on(event: Event.Show, callback: OnShowCallback): EventManager;
    on(event: Event.Hide, callback: OnHideCallback): EventManager;
    on(event: Event.Declare, callback: OnDeclareCallback): EventManager;
    on(event: Event.Unset, callback: OnUnsetCallback): EventManager;
    off(event: Event, callback?: Callback): EventManager;
    emit(event: Event.Show, id: Id): ModalRecord;
    emit(event: Event.Hide, id: Id): ModalRecord;
    emit(event: Event.Declare, modal: ReactNode, container?: ModalComponentType): ModalRecord;
    emit(event: Event.Unset, id: Id): ModalRecord;
}

export const eventManager: EventManager = {
    list: new Map(),

    on(event: Event, callback: Callback) {
        this.list.has(event) || this.list.set(event, []);
        this.list.get(event)!.push(callback);
        return this;
    },

    off(event, callback) {
        if (callback) {
            const cb = this.list.get(event)!.filter((cb: Callback) => cb !== callback);
            this.list.set(event, cb);
            return this;
        }
        this.list.delete(event);
        return this;
    },

    emit(event: Event, ...args: any[]): ModalRecord {
        const result = {} as ModalRecord;

        this.list.has(event) &&
        this.list.get(event)!.forEach((callback: Callback) => {
            // @ts-ignore
            callback(result, ...args);
        });

        return result;
    },
}