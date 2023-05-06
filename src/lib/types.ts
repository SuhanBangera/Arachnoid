import type { ReactNode } from "react";

export type Getter<State> = () => State;
export type StateAction<State> = (prevHook: State) => State;
export type Setter<State> = (newState: State | StateAction<State>) => void;
export type Action<State> = (get: Getter<State>, set: Setter<State>, payload?: any) => any;
export type Actions<State> = Record<string, Action<State>>
export type AsyncAction<State, T> = (get: Getter<State>, set:Setter<State>, response:AsyncResponse<T>, payload?:any) => any;
export type AsyncActions<State> = Record<string, Action<State>>;
export type AsyncActionCallback<State> = (get: Getter<State>, set: Setter<State>, response: Response) => void;
export type Middleware = <State>(get:Getter<State>, set:Setter<State>, middlewareAction:MiddlewareAction)=>void; 
export type AsyncFunction<T> = (payload?: any) => Promise<T>;
export type ArachnoidMiddleware = {
  middleware: Middleware, 
  ignore: string[]|undefined,
}


export interface MiddlewareAction {
  name: string
  payload?: any
}

export interface Store<State> {
  state: State
  actions?: Actions<State>
}

export interface SpyStoreProviderProps {
  children: ReactNode
}

export interface AsyncResponse<T> {
    data: T | null;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

export interface Status {
  success: boolean;
  error: boolean;
}

export interface Response {
  data: any;
  status: Status
}