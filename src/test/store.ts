import { createStore, createArachnoidMiddleware } from "arachnoid";

const middleware1 = createArachnoidMiddleware((get, set, action)=>{
    console.log (`${action.name} has been called.`);
}, ['increment'])

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
}, [middleware1]);
