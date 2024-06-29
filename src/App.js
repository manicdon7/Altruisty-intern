import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import PostForm from './Pages/PostForm';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/Postjob' element={<PostForm />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App