import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home.jsx'
import Create from './components/Create.jsx'
import Read from './components/Read.jsx'
import Update from './components/Update.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/create' element={<Create/>}></Route>
          <Route path='/read/:id' element={<Read/>}></Route>
          <Route path='/edit/:id' element={<Update/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
