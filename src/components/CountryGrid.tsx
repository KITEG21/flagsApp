import { useEffect, useState } from "react"
import { fetchAllCountry, fetchCountryFrameData, fetchCountryRegion } from "../api/service"
import CountryFrame from "./CountryFrame"
import type { CountryFrameInfo } from "../types/types"
import { Link } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"

export default function CountryGrid() {
  const [info, setInfo] = useState<CountryFrameInfo[]>([])
  const [filter, setFilter] = useState<string>("")

  useEffect(() => {
    if (!filter || filter == "None") {
      const fetchData = async () => {
        const data = await fetchAllCountry()
        setInfo(data)
        console.log(data)
      }
      fetchData()
    }
    else {
      const fetchData = async () => {
        const data = await fetchCountryRegion(filter)
        setInfo(data)
        console.log(data)
      }
      fetchData()
    }
  }, [filter])

  const onHandleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = await fetchCountryFrameData(e.target.value);
    if (data) {
      setInfo(data);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="pt-12 pb-8 px-6">
        <div className="max-w-7xl mx-auto text-center">          
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
            Countries of the World
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover information about countries around the globe
          </p>
          <div className="flex justify-center mb-6">
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="mb-4 mr-4 p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white dark:bg-gray-700 shadow-lg text-gray-700 dark:text-gray-200">
              <option value="None">None</option>
              <option value="Europe">Europe</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Africa">Africa</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>

          <div className="relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              onChange={async (e) => onHandleSearch(e)}
              className="w-full pl-10 pr-4 py-4 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Search for a country..."
            />
          </div>
        </div>
      </div>

      <div className="px-6 pb-12 text-gray-800 dark:text-gray-200">
        <div className="max-w-7xl mx-auto">
          {info.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {info.map((country) => (
                <Link key={country.Name} to={`/country/${country.Name}`} className="transform hover:scale-105 transition-all duration-300">
                  <CountryFrame {...country} />
                </Link>
              ))}
            </div>
          )}

          {/* Results count */}
          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Showing <span className="font-semibold text-blue-600 dark:text-blue-400">{info.length}</span> countries
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}