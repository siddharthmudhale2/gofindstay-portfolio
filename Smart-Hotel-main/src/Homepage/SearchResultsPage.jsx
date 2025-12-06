// src/Homepage/SearchResultsPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiMapPin } from "react-icons/fi";
import "./SearchResultsPage.css";

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `/api/v1/hotels/search-hotels?location=${encodeURIComponent(query)}`
        );
        setResults(response.data.hotels || []);
      } catch (error) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="search-results-page">
      <h2>
        {query
          ? <>Search Results for "<span style={{ color: "#007bff" }}>{query}</span>"</>
          : "Please enter a location to search."}
      </h2>
      {loading ? (
        <p>Loading results...</p>
      ) : !query ? (
        <p>Type a location in the search bar above.</p>
      ) : results.length === 0 ? (
        <p>No hotels found for this location.</p>
      ) : (
        <div className="results-grid">
          {results.map((hotel) => (
            <div
              key={hotel.id}
              className="result-card"
              onClick={() => navigate(`/hotel/${hotel.id}`)}
            >
              <img
                src={hotel.image_url || "https://via.placeholder.com/200"}
                alt={hotel.name}
                className="result-image"
              />
              <div className="result-info">
                <h3>{hotel.name}</h3>
                <p className="location">
                  <FiMapPin /> {hotel.location}
                </p>
                <p className="description">
                  {hotel.description?.slice(0, 100)}...
                </p>
                <p className="price">Price: ₹{hotel.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
