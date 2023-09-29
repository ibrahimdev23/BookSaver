import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Books from './components/Books';
import Add from './components/Add';
import Update from './components/Update';
import "./style.css"




function App() {
 // const [count, setCount] = useState(0)

  return (
    
      <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Books/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path='/update/:id'element={<Update/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
