import { useState } from "react"
import { ActionNotFoundError } from "./errors"
import { Actions, AsyncActions, Getter, SpyAsyncActionQueryOptions } from "./types"
import { useQuery } from "react-query"

export interface Store<State> {
    state: State
    actions?: Actions<State>
    asyncActions?: AsyncActions<State>
}


const createStore = <State>(store: Store<State>) => {


    return () => {
        const [state, setState] = useState<State>(store.state);

        const getState: Getter<State> = (): State => state;

        const dispatch = (actionName: string, payload?: any) => {
            if (Object.prototype.hasOwnProperty.call(store.actions, actionName)) {
                return store.actions![actionName](getState, setState, payload)
            } else {
                throw new ActionNotFoundError(`Action ${actionName} not found in the store`);
            }
        }

        const asyncDispatch = (actionName: string, asyncFunction:(payload?: any)=>Promise<any>, payload?:any, options?: SpyAsyncActionQueryOptions<any>) => {
            const response = useQuery([actionName], () => asyncFunction(payload), options);
            if (Object.prototype.hasOwnProperty.call(store.asyncActions, actionName)) {
                return store.asyncActions![actionName](getState, setState, response)
            } else {
                throw new ActionNotFoundError(`Async action ${actionName} not found in the store`);
            }
        }

        return {
            getState,
            asyncDispatch,
            dispatch
        }
    }

}

export default createStore;