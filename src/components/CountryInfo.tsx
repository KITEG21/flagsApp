import { useEffect, useState } from "react"
import { fetchCountryData } from "../api/service";
import type { CountryInfo } from "../types/types";
import { useParams, Link } from "react-router-dom";

export default function CountryInfo() {
    const [info, setInfo] = useState<CountryInfo>();
    const { name } = useParams<{ name: string }>();

    useEffect(() => {
        const fetchData = async () => {
            if (!name) return;
            try {
                const data = await fetchCountryData(name);
                setInfo(data);
            } catch (error) {
                console.error("Error fetching country data:", error);
            }
        };
        window.scrollTo(0, 0);
        fetchData();
    }, [name]);

    if (!info) {
        return (
            <div className="min-h-screen bg-slate-800 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-slate-400"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen dark:bg-slate-800 bg-white text-gray-900 dark:text-white p-4 sm:p-8">
            <div className="max-w-7xl mx-auto mb-8">
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 px-6 py-2 dark:bg-slate-700 rounded-md shadow hover:bg-slate-600 transition-colors duration-200 font-medium dark:text-slate-100 bg-gray-300 text-black dark:text-gray-1200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back
                </Link>
            </div>

            <main className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Flag Image */}
                    <div className="w-full flex justify-center items-center">
                        <div className="dark:bg-slate-900 bg-gray-300 rounded-lg shadow-xl p-6 w-full">
                            <img 
                                alt={`Flag of ${info.Name}`} 
                                src={info.Flag}
                                className="w-full h-auto object-cover rounded-md aspect-video"
                            />
                        </div>
                    </div>

                    {/* Country Details */}
                    <div className="w-full flex flex-col justify-center ">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-10">{info.Name}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 mb-8 text-base">
                            <p><span className="font-semibold dark:text-slate-100 text-gray-1200">Native Name:</span> <span className="dark:text-slate-300 text-gray-900 ">{info.NativeName || 'N/A'}</span></p>
                            <p><span className="font-semibold dark:text-slate-100 text-gray-1200">Top Level Domain:</span> <span className="dark:text-slate-300 text-gray-900">{info.Domain || 'N/A'}</span></p>
                            <p><span className="font-semibold dark:text-slate-100 text-gray-1200">Population:</span> <span className="dark:text-slate-300 text-gray-900">{info.Population?.toLocaleString() || 'N/A'}</span></p>
                            <p><span className="font-semibold dark:text-slate-100 text-gray-1200">Currencies:</span> <span className="dark:text-slate-300 text-gray-900">{info.Currencies || 'N/A'}</span></p>
                            <p><span className="font-semibold dark:text-slate-100 text-gray-1200">Region:</span> <span className="dark:text-slate-300 text-gray-900">{info.Region || 'N/A'}</span></p>
                            <p><span className="font-semibold dark:text-slate-100 text-gray-1200">Languages:</span> <span className="dark:text-slate-300 text-gray-900">{info.Languages || 'N/A'}</span></p>
                            <p><span className="font-semibold dark:text-slate-100 text-gray-1200">Sub Region:</span> <span className="dark:text-slate-300 text-gray-900">{info.SubRegion || 'N/A'}</span></p>
                            <p><span className="font-semibold dark:text-slate-100 text-gray-1200">Capital:</span> <span className="dark:text-slate-300 text-gray-900">{info.Capital || 'N/A'}</span></p>
                        </div>
                        
                    </div>
                </div>
            </main>
        </div>
    );
}