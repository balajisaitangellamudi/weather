import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { apiKey, fetcher } from "../Utils/Helpers";
import { useDispatch } from "react-redux";
import {
  clearCoordinates,
  setCoordinates,
} from "../Store/Slices/coordinatesSlice";
import { showSnackbar } from "../Store/Slices/snackbarSlice";

export const Spinner = () => {
  return (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState(null);
  const dispatch = useDispatch();

  // API fetch only when query exists
  const api = query
    ? `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`
    : null;

  const { data, error, isLoading } = useSWR(api, fetcher, {
    revalidateOnFocus: false,
  });

  // Load stored coordinates on first render
  useEffect(() => {
    const storedCoordinates = localStorage.getItem("coordinates");
    if (storedCoordinates) {
      try {
        const parsedCoordinates = JSON.parse(storedCoordinates);
        dispatch(setCoordinates(parsedCoordinates));
      } catch (error) {
        console.error("Invalid JSON in localStorage:", error);
        localStorage.removeItem("coordinates");
      }
    }
  }, [dispatch]);

  // Handle API response and update state + localStorage
  useEffect(() => {
    if (data) {
      dispatch(clearCoordinates());
      if (data.length > 0) {
        const newCoordinates = {
          lat: data[0].lat,
          lon: data[0].lon,
          city: query,
          country: data[0].country,
          state: data[0].state,
        };
        dispatch(setCoordinates(newCoordinates));

        // Store in localStorage as a JSON string
        localStorage.setItem("coordinates", JSON.stringify(newCoordinates));
      } else {
        dispatch(showSnackbar("No City Found!"));
      }
    }
  }, [data, dispatch]);

  // Trigger API fetch only on search button click
  const handleSearch = () => {
    if (searchInput.trim()) {
      setQuery(searchInput.charAt(0).toUpperCase() + searchInput.slice(1));
    }
  };

  return (
    <div className="search_container d-flex flex-row align-items-center">
      <input
        placeholder="Search City"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="border-0 w-100 px-1"
      />

      <div className="p-1">
        {isLoading ? (
          <Spinner />
        ) : (
          <i
            className="bi bi-search"
            style={{ display: "block", cursor: "pointer" }}
            onClick={handleSearch}
          ></i>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
