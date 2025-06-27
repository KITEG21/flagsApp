import type { CountryFrameInfo } from "../types/types";
import { Link } from "react-router-dom";

export default function CountryFrame(info: CountryFrameInfo) {
  return (
    <Link to={`/country/${info.Name}`} className="block group">
      <div className="dark:bg-slate-700 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform group-hover:-translate-y-2">
        {/* Flag Image */}
        <div className="relative overflow-hidden">
          <img 
            alt={`${info.Name} flag`} 
            src={info?.Flag}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold dark:text-gray-400 text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
            {info?.Name || "Loading..."}
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center dark:text-gray-400 text-gray-600">
              <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">
                <span className="font-medium">Population:</span> {info?.Population?.toLocaleString() || "N/A"}
              </span>
            </div>
            
            <div className="flex items-center dark:text-gray-400 text-gray-600">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">
                <span className="font-medium">Region:</span> {info?.Region || "N/A"}
              </span>
            </div>
            
            <div className="flex items-center dark:text-gray-400 text-gray-600">
              <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm6 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">
                <span className="font-medium">Capital:</span> {info?.Capital || "N/A"}
              </span>
            </div>
          </div>

          {/* Hover indicator */}
          <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-sm font-medium">View details</span>
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}