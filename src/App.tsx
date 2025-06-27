import './App.css'
import CountryGrid from './components/CountryGrid'
import CountryInfo from './components/CountryInfo'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeProvider'
import ThemeToggle from './components/ThemeToggle'

function App() {

  return (
    <>
    <ThemeProvider>
      <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
    <Router>
      <Routes>
        <Route path="/" element={<CountryGrid/>} />
        <Route path="/country/:name" element={<CountryInfo />} />
      </Routes>
    </Router>
    </ThemeProvider>
    </>
  )
}

export default App
