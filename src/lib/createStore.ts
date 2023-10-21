import { useMemo, useState, useCallback, useEffect } from "react";
import mitt from 'mitt';
import { Store, Getter, Setter, StateAction, ArachnoidMiddleware, Listener, Listeners, Actions } from "./types"
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

        const setState: Setter<State> = useCallback((newState: State | StateAction<State>) => {
            const oldState = store.state
            if (typeof newState === 'function') {
                store.state = {
                    ...store.state,
                    ...(newState as StateAction<State>)(store.state)
                };
            } else {
                store.state = {
                    ...store.state,
                    ...newState
                }
            }

            if (oldState !== store.state && !!store.listeners) {
                for (const listener of Object.values(store.listeners)) {
                    listener(getState);
                }
            }
        }, [store.state]);

        const hasOwnProperty = useMemo(() => Object.prototype.hasOwnProperty, []);

        const dispatch = useCallback((actionName: keyof Actions<State>, payload?: any) => {
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
        }, [store.actions, getState, setState, middlewares, onAction]);

        const subscribe = (name: string, listener: Listener<State>) => {
            store.listeners = {
                ...store.listeners,
                [name]: listener,
            };
        }

        const unsubscribe = (name: string) => {
            if (!store.listeners) {
                return;
            }

            if (name in store.listeners) {
                delete store.listeners[name];
            }
        }

        return useMemo(() => ({
            getState,
            dispatch,
            subscribe,
            unsubscribe
        }), [getState, dispatch, subscribe, unsubscribe]);
    }

}

export default createStore;

