import { createStore } from "arachnoid"

export const store = createStore({
    state: {
        count: 0,
    },

    actions: {
        increment: (get, set) => {
            set((state) => ({
                ...state,
                count: state.count + 1,
            })
            )
        }
    }
});
