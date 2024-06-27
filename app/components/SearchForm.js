'use client';

import { useState } from 'react';
import axios from 'axios';
import MosqueCard from './MosqueCard';
import { useSession } from 'next-auth/react';
import Autosuggest from 'react-autosuggest';
import suggestionsList from '../../utils/suggestionsList'; // Import the suggestions list
import styles from './SearchForm.module.css'; // Import the CSS module
import Navbar from './Navbar';

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  const filteredSuggestions = inputLength === 0 ? [] : suggestionsList.filter(suggestion =>
    suggestion.toLowerCase().includes(inputValue)
  );
  return filteredSuggestions.slice(0, 10); // Limit to 10 suggestions
};

const getSuggestionValue = (suggestion) => suggestion;

const renderSuggestion = (suggestion) => (
  <div>
    {suggestion}
  </div>
);

const SearchForm = () => {
  const { data: session } = useSession();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [mosques, setMosques] = useState([]);
  const [noMosqueFound, setNoMosqueFound] = useState(false);

  const handleInputChange = (e, { newValue }) => {
    setSearchValue(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchValue) {
      setMosques([]);
      setNoMosqueFound(true);
      return;
    }
    const [city, state, country] = searchValue.split(',').map((item) => item.trim());
    if (!city || !state || !country) {
      setMosques([]);
      setNoMosqueFound(true);
      return;
    }
    try {
      const response = await axios.get('/api/mosques', {
        params: { country, state, city },
      });
      if (response.data.mosques.length === 0) {
        setNoMosqueFound(true);
      } else {
        setMosques(response.data.mosques);
        setNoMosqueFound(false);
      }
      console.log('response', response);
    } catch (error) {
      console.error('Error fetching mosques:', error);
      setMosques([]);
      setNoMosqueFound(true);
    }
  };

  return (
    <>
    <Navbar />
    <div className={styles.searchPage}>
      
      <div className={styles.searchFormContainer}>
      <h1>Enter your location</h1>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
            onSuggestionsClearRequested={() => setSuggestions([])}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: 'Enter country, state, and city',
              value: searchValue,
              onChange: handleInputChange,
              onKeyDown: (event) => {
                if (event.key === 'Enter') {
                  handleSubmit(event);
                }
              },
            }}
            theme={{
              input: styles.input,
              suggestionsContainer: styles.suggestionsContainer,
              suggestion: styles.suggestion,
              suggestionHighlighted: styles.suggestionHighlighted,
            }}
          />
          <button type="submit" className={styles.searchButton}>Search</button>
        </form>
      </div>
      <div className={styles.mosqueCards}>
        {mosques.length > 0 ? (
          mosques.map((mosque) => (
            <MosqueCard key={mosque.placeId} mosque={mosque} />
          ))
        ) : noMosqueFound ? (
          <p>No mosque found</p>
        ) : null}
      </div>
    </div>
    </>
  );
};

export default SearchForm;
