<p align="center">
  <a href="" rel="noopener">
 <img width="200px" height="200px" src="arachnoid.jpg" alt="Project logo" /></a>
</p>

<h2 align="center">Arachnoid</h2>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/suhanbangera/arachnoid.svg)](https://github.com/suhanbangera/arachnoid/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/suhanbangera/arachnoid.svg)](https://github.com/suhanbangera/arachnoid/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A small, fast and scalable barebones react state-management library using an easy to understand flux-like principles. 
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](./TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

<p>Arachnoid is a small, fast and scalable solution for react based state-management library, using a simplified, easy to understand flux-like principles. </p>
<p>It helps you write applications that are fast and scalable throughout the project, where you can create decentralized and well-modularized states that guarantees consistent behavior throughout the scope of its usage, all the while maintaining its elegant simplicity. </p> 

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites

You should have react setup and running

Using vite

```
npm create vite
```

Using CRA

```
npm create react-app
```

### Installing


Install Arachnoid using npm

```
npm install arachnoid
```

Or Yarn

```
yarn add arachnoid
```
## 🎈 Usage <a name="usage"></a>

### First create a store

```javascript
import { createStore } from "arachnoid"

const useCountStore = createStore({
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
```

### Then bind your components, and that's it!!
Use the hook anywhere, no providers are needed. Dispatch the actions and et'voila! The component will re-render on the changes.

```javascript
const Test = () => {

    const instance1 = useCountStore();
    return (
        <h1 onClick={() => instance1.dispatch('increment')}>
            Hello {instance1.getState().count}
        </h1>
    )
}
```

### Dealing with asynchronous functions
To use deal with asynchronous function, we can use the function ```createAsyncAction``` and use it along with regular archanoid actions. 

```javascript
import { createStore, createAsyncAction } from "arachnoid";

const useAsyncStateStore = createStore({
    state: {
        todo: [],
    },

    actions: {
        asyncFetch: (get, set, { num }) => createAsyncAction(async ({ num }) => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${num}`);
            return await res.json();
        }, (asyncResponse) => {
            const { data, isLoading, isError } = asyncResponse;

            if (!isLoading && !isError) {
                set(state => ({
                    todo: [...state.todo, ...data],
                }))
            }
        }, { num })
    }
})
```
The data returned by the async function can be accessed from ```asyncResponse``` inside the callback function. We can pass any additional require as a payload while dispatching.  

We can then dispatch this asynchronous action like we always do!!

```javascript
const Test = () => {

    const instance1 = useAsyncStateStore();
    return (<>
        <h1 onClick={() => instance1.dispatch('asyncFetch')}>
            Add Todo
        </h1>
        <ol>
            {
                instance1.getState().todo.map(ele=>(<li>ele.title</li>));
            }
        </ol>
    </>)
}
```


### Using Middlewares
Arachnoid provides bare-bones middleware support for its stores using ```createArachnoidMiddleware``` function. 

```javascript
import { createStore, createArachnoidMiddleware } from "arachnoid";

const middleware1 = createArachnoidMiddleware((get, set, action)=>{
    console.log (`${action.name} has been called with payload ${JSON.stringify(action.payload)}`);
})

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
```

We can prevent certain actions from using middlewares by passsing ignore actions array to ```createArrachnoidMiddleware```. 

```javascript
import { createStore, createArachnoidMiddleware } from "arachnoid";

const middleware1 = createArachnoidMiddleware((get, set, action)=>{
    console.log (`${action.name} has been called with payload ${JSON.stringify(action.payload)}`);
}, ["decrement"])

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
        decrement: (get, set) => {
            set((state) => ({
                ...state,
                count: state.count - 1,
            })
            )
        }
    }
}, [middleware1]);
```
Here all the actions except decrement will execute the ```middleware1```.

### Adding Listeners
Arachnoid providers bare-bones support for listeners subscribing to the state changes. 

We can define listeners while creating the store. 

```javascript 
const store = createStore({
    state: {
        count: 0,
    },

    actions: {
        increment: (get, set) => {
            set({
                ...get(),
                count: get().count + 1,
        })
        }
    },
    listeners: {
        test: (get)=>{
            console.table(get())
        }
    }
});
```

In here the listener ```test``` will listen to all the state changes, and execute itself then. 

OR 

We can also subscribe or unsubscribe to a listener inside a component. 
 
 ```javascript 
 const Test = () => {

    const instance1 = store();

    useEffect(()=>{
        instance.subscribe("test2", get=>console.log(get()))
        instance.unsubscribe('test');
    }, [])

    const handleClick = () => instance2.dispatch('increment')
    return (
        <h1 onClick={handleClick}>
            Hello {instace1.getState().count} {instance2.getState().count}
        </h1>
    )
}
```

## ⛏️ Built Using <a name = "built_using"></a>

- [React](https://react.dev/) - Base Library

## ✍️ Authors <a name = "authors"></a>

- [@spyder01](https://github.com/spyder01) - Idea, Initial Work & Lead Contributor
- [@SuhanBangera](https://github.com/SuhanBangera) - Maintainer

See also the list of [contributors](https://github.com/SuhanBangera/arachnoid/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References
