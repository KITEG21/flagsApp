import type { CountryFrameInfo, CountryInfo } from "../types/types"

export async function fetchCountryData(name: string) {
    name = name.toLowerCase().trim();
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${name}`)
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json() 

            const result : CountryInfo = {
                Flag: data[0].flags.png,
                Name: data[0].name.common,
                NativeName: (Object.values(data[0].name.nativeName)[0] as any)?.common || data[0].name.common,
                Population: data[0].population,
                Region: data[0].region,
                SubRegion: data[0].subregion,
                Capital: Array.isArray(data[0].capital) ? data[0].capital[0] : data[0].capital,
                Domain: data[0].tld ? data[0].tld[0] : "",
                Currencies: Object.values(data[0].currencies || {}).map((curr: any) => curr.name).join(', '),
                Languages: Object.values(data[0].languages || {}).join(', ')
            } 
            return result;


        } catch (error) {
            console.log(error)
        }

}

export async function fetchAllCountry(): Promise<CountryFrameInfo[]>{
    try{
        const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population`)
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        
        const results : CountryFrameInfo[] = data.map((country: any) => ({
            Flag: country.flags.png,
            Name: country.name.common,
            Population: country.population,
            Region: country.region,
            Capital: Array.isArray(country.capital) ? country.capital[0] : country.capital || ""
        }));
        
        return results;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function fetchCountryRegion(region: string) {
    try{
        const response = await fetch(`https://restcountries.com/v3.1/region/${region}?fields=name,capital,flags,region,population`)
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();

        const results : CountryFrameInfo[] = data.map((country: any) => ({
            Flag: country.flags.png,
            Name: country.name.common,
            Population: country.population,
            Region: country.region,
            Capital: Array.isArray(country.capital) ? country.capital[0] : country.capital || ""
        }));
        
        return results;
    } catch (error) {
        console.log(error);
        return [];
    }

}

export async function fetchCountryFrameData(name: string) {
    name = name.toLowerCase().trim();
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${name}`)
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json() 

            const result : CountryFrameInfo[] = data.map((country: any) => ({
                Flag: country.flags.png,
                Name: country.name.common,
                Population: country.population,
                Region: country.region,
                Capital: Array.isArray(country.capital) ? country.capital[0] : country.capital,
            }));
            return result;


        } catch (error) {
            console.log(error)
        }

}
