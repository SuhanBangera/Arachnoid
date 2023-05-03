import { useMemo, useState } from "react";
import { Store, Getter, Setter, StateAction } from "./types"
import EventEmitter from "./even-emitter"
import { ActionNotFoundError } from "./errors";

const createStore = <State>(store: Store<State>) => {

    const instance = new EventEmitter();

    return () => {
        const [_, setCount] = useState<number>(0);
        useMemo(() => {
            for (const actionName in store.actions) {
                instance.addEventListener(actionName, () => {
                    setCount(c => (c + 1) % Number.MAX_SAFE_INTEGER);
                })
            }
        }, [store.actions]);

        const getState: Getter<State> = () => store.state;

        const setState: Setter<State> = (newState: State | StateAction<State>) => {
            if (typeof newState === 'function') {
                const nextState = (newState as  StateAction<State>)(store.state);
                store.state = { ...store.state, ...nextState };
            } else {
                store.state = { ...store.state, ...newState };
            }
        };

        const dispatch = (actionName: string, payload?: any) => {
            if (Object.prototype.hasOwnProperty.call(store.actions, actionName)) {
                store.actions![actionName](getState, setState, payload)
                instance.emit(actionName);
            } else {
                throw new ActionNotFoundError(`Action ${actionName} not found in the store`);
            }
        }

        return {
            getState,
            dispatch
        }
    }

}


export default createStore; 