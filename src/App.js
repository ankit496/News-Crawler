import React from 'react'
import Navbar2 from './components/Navbar2'
import News from './components/News'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
const apiKey=process.env.REACT_APP_API_KEY
const App=()=>{
  return (
    <BrowserRouter>
    <div>
        <Navbar2/>
    <Routes>
      <Route exact path="/" element={<News key="general" apiKey={apiKey} category="general" country="in"></News>}></Route>
      <Route exact path="/sports" element={<News key="sports" apiKey={apiKey} category="sports" country="in"></News>}></Route>
      <Route exact path="/entertainment" element={<News key="entertainment apiKey={apiKey}"category="entetainment" country="in"></News>}></Route>
      <Route exact path="/business" element={<News key="business" apiKey={apiKey} category="business" country="in"></News>}></Route>
      <Route exact path="/health" element={<News key="health" apiKey={apiKey} category="health" country="in"></News>}></Route>
      <Route exact path="/technology" element={<News key="technology" apiKey={apiKey} category="technology" country="in"></News>}></Route>
      <Route exact path="/science" element={<News key="science" apiKey={apiKey} category="science" country="in"></News>}></Route>
    </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App
