import type { ReactNode } from "react";
import type { UseQueryOptions, Query, UseQueryResult } from "react-query";

export type Getter<State> = () => State;
export type StateAction<State> = (prevHook: State) => State;
export type Setter<State> = (newState: State | StateAction<State>) => void;
export type Action<State> = (get: Getter<State>, set: Setter<State>, payload?: any) => any;
export type Actions<State> = Record<string, Action<State>>
export type AsyncAction<State> = (get: Getter<State>, set: Setter<State>, response?: UseQueryResult) => any;
export type AsyncActions<State> = Record<string, AsyncAction<State>>
export type AsyncActionCallback<State> = (get: Getter<State>, set: Setter<State>, response: Response) => void;




export type SpyAsyncActionQueryOptions<T> = Omit<UseQueryOptions<T, unknown, T, string[]>, "queryKey" | "queryFn"> & {
  refetchInterval?: number | false | ((data: T | undefined, query: Query<T, unknown, T, string[]>) => number | false);
};

export interface Store<State> {
  state: State
  actions?: Actions<State>
  asyncActions?: AsyncActions<State>
}

export interface SpyStoreProviderProps {
  children: ReactNode
}



export interface Status {
  success: boolean;
  error: boolean;
}

export interface Response {
  data: any;
  status: Status
}