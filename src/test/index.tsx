import type {FC} from 'react';

import SpyStoreProvider from "../lib/provider";
import useTestStore from './store';

const Test:FC = ()=>{
    const {getState, dispatch, asyncDispatch} = useTestStore()
    const {count} = getState()
    const asyncIncrement = async ()=>{
        console.log ('Hello, async rules!!');
    }
    return (
        <SpyStoreProvider>
            <h1
            onClick={()=>dispatch('increment', asyncIncrement)}
            >{count}</h1>
        </SpyStoreProvider>
    )
}


export default Test;