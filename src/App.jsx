import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import SideBar from './components/SideBar';
import Home from './pages/Home';
import Tasks from './pages/Tasks';

function App() {

  return (
    <>
      <div className='min-h-screen bg-white flex flex-col lg:flex-row'>
        <Router>
          <SideBar />

          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/Tasks' element={<Tasks/>} />
          </Routes>
        </Router>
      </div>
        
    </>
  )
}

export default App
