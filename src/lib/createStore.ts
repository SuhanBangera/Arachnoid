import { useMemo, useState } from "react";
import mitt from 'mitt';
import { Store, Getter, Setter, StateAction, ArachnoidMiddleware } from "./types"
import { ActionNotFoundError } from "./errors";

const createStore = <State>(store: Store<State>, middlewares:ArachnoidMiddleware[]=[]) => {

    const emitter = mitt(); 

    return () => {
        const [_, setCount] = useState<number>(0);
        useMemo(() => {
            for (const actionName in store.actions) {
                emitter.on(actionName, () => {
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
                middlewares.forEach(middleware=>{
                    if (!middleware.ignore?.includes(actionName)) {
                        middleware.middleware(getState, setState, {name:actionName, payload})
                    }
                })
                store.actions![actionName](getState, setState, payload)
                emitter.emit(actionName);
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
