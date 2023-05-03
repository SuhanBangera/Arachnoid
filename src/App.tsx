import React, { useState } from 'react'
import { store } from './test/store';
import Test from './test/test';

function App() {
  const {getState} = store();
  return (
      <div className="App">
        <Test />
        <h1>{getState().count}</h1>
      </div>
  )
}

export default App
