import createStore from "../lib/store";
import type { Store } from "../lib/store";
import type { Setter } from '../lib/types';

const store: Store<any> = {
    state: {
        count: 1,
    },

    actions: {
        increment: (get, set) => {
            set((state: any) => {
                console.table(state)
                return {
                    ...state,
                    count: state.count + 1
                }
            })
        },
    },
    asyncActions: {
        increment: (get, set, response) => {
            console.log (response?.isLoading)
            set((state: any) => {
                console.table(state)
                return {
                    ...state,
                    count: state.count + 1
                }
            })
        }
    },
}

const useTestStore = createStore(store);

export default useTestStore;