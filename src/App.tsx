import './App.css'
import CountryGrid from './components/CountryGrid'
import CountryInfo from './components/CountryInfo'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeProvider'
import ThemeToggle from './components/ThemeToggle'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient()

  return (
    <>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
      <div className="flex justify-end mb-4 m-3">
            <ThemeToggle />
          </div>
    <Router>
      <Routes>
        <Route path="/" element={<CountryGrid/>} />
        <Route path="/country/:name" element={<CountryInfo />} />
      </Routes>
    </Router>
    </QueryClientProvider>
    </ThemeProvider>
    </>
  )
}

export default App
