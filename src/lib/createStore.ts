import { useMemo, useState, useCallback } from "react";
import mitt from 'mitt';
import {produce} from 'immer';
import { Store, Getter, Setter, StateAction, ArachnoidMiddleware } from "./types"
import { ActionNotFoundError } from "./errors";

const createStore = <State>(store: Store<State>, middlewares: ArachnoidMiddleware[] = []) => {

    const emitter = mitt();

    return () => {
        const [_, setCount] = useState<number>(0);

        const onAction = useCallback(() => {
            setCount(c => (c + 1) % Number.MAX_SAFE_INTEGER);
        }, []);

        for (const actionName in store.actions) {
            emitter.on(actionName, onAction);
        }

        const getState: Getter<State> = useMemo(() => () => store.state, [store.state]);

        const setState: Setter<State> = (newState: State | StateAction<State>) => {
            if (typeof newState === 'function') {
                store.state = produce(store.state, newState as (state: State) => void);
            } else {
                store.state = produce(store.state, (draftState: State) => {
                    Object.assign((draftState as object), newState);
                });
            }
        };

        const hasOwnProperty = useMemo(() => Object.prototype.hasOwnProperty, []);
        const dispatch = useCallback((actionName: string, payload?: any) => {
            if (hasOwnProperty.call(store.actions, actionName)) {
                for (const middleware of middlewares) {
                    if (!middleware.ignore?.includes(actionName)) {
                        middleware.middleware(getState, setState, { name: actionName, payload })
                    }
                }
                store.actions![actionName](getState, setState, payload)
                emitter.emit(actionName);
            } else {
                throw new ActionNotFoundError(`Action ${actionName} not found in the store`);
            }
        }, [store.actions, getState, setState, middlewares, onAction])

        return useMemo(() => ({
            getState,
            dispatch
        }), [getState, dispatch]);
    }

}

export default createStore;

