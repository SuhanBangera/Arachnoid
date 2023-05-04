import React from 'react';
import { store } from './store';


const Test = () => {

    const instace1 = store();
    const instance2 = store();

    const handleClick = () => instance2.dispatch('increment')
    return (
        <h1 onClick={handleClick}>
            Hello {instace1.getState().count} {instance2.getState().count}
        </h1>
    )
}


export default Test;

