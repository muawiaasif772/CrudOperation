import './App.css';

import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './comonents/Home';
import Creat from './comonents/Creat';
import Read from './comonents/Read';
import Update from './comonents/Update';
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/creat' element={<Creat/>}/>
    <Route path='/read/:userid' element={<Read/>}/>
    <Route path='/update/:userid' element={<Update/>}/>


   </Routes>
   </BrowserRouter>
  );
}

export default App;
