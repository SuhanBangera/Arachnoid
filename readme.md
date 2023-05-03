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
