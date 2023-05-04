import { createStore, createArachnoidMiddleware, createAsyncAction } from "arachnoid";

const middleware1 = createArachnoidMiddleware((get, set, action) => {
    console.log(`${action.name} has been called.`);
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
        },
        asyncIncrement: (get, set, payload) => createAsyncAction(async (payload) => {
            console.log("Async Action called")
            console.log(payload.hi)
            // setTimeout(()=>console.log ('timeout'), 3000);
            return { surplus: 1 }
        }, (asyncResponse) => {
            if (!asyncResponse.isLoading) {
                set({ count: get().count + asyncResponse.data!.surplus })
                console.log("Loading ended")
                payload.cb(asyncResponse.isLoading, asyncResponse.isError)
            }
        }, payload)
    },
}, [middleware1]);



