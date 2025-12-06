// src/Homepage/SearchBar.jsx
import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef();
  const navigate = useNavigate();

  // Fetch suggestions as user types
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await axios.get(
          `/api/v1/hotels/search-hotels?location=${encodeURIComponent(query)}`
        );
        setSuggestions(response.data.hotels || []);
      } catch (err) {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Close suggestions if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (hotel) => {
    setQuery(hotel.location);
    navigate(`/search?q=${encodeURIComponent(hotel.location)}`);
    setShowSuggestions(false);
  };

  return (
    <div className="searchbar-wrapper" ref={suggestionsRef}>
      <form onSubmit={handleSubmit} className="searchbar-form" autoComplete="off">
        <input
          type="text"
          placeholder="Search location..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          className="searchbar-input"
        />
        <button type="submit" className="searchbar-button" aria-label="Search">
          <FiSearch />
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-dropdown">
          {suggestions.map((hotel) => (
            <li key={hotel.id} onClick={() => handleSelectSuggestion(hotel)}>
              {hotel.location} – {hotel.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
