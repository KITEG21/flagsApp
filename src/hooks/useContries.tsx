import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCountry, fetchCountryFrameData, fetchCountryRegion } from "../api/service";

export function useCountries() {
  const [filter, setFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Query for all countries (enabled when no filter or search is active)
  const { data: allCountries, isLoading: isLoadingAll } = useQuery({
    queryKey: ['countries', 'all'],
    queryFn: fetchAllCountry,
    enabled: !filter && !searchTerm,
  });

  // Query for filtered countries by region
  const { data: filteredCountries, isLoading: isLoadingFiltered } = useQuery({
    queryKey: ['countries', 'region', filter],
    queryFn: () => fetchCountryRegion(filter),
    enabled: !!filter && filter !== "None",
  });

  // Query for search results
  const { data: searchResults, isLoading: isLoadingSearch } = useQuery({
    queryKey: ['countries', 'search', searchTerm],
    queryFn: () => fetchCountryFrameData(searchTerm),
    enabled: !!searchTerm,
  });


  // Determine which data to display
  const displayData = (() => {
    if (searchTerm && searchResults) return searchResults;
    if (filter && filteredCountries) return filteredCountries;
    return allCountries || [];
  })();

  const isLoading = isLoadingAll || isLoadingFiltered || isLoadingSearch;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      setFilter(""); 
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilter(value);
    setSearchTerm(""); 
  };

  return { 
    isLoading, 
    displayData, 
    filter, 
    searchTerm, 
    handleFilterChange, 
    handleSearch 
  };
}