// app/components/SearchForm.js
'use client';

import { useState } from 'react';
import axios from 'axios';
import MosqueCard from './MosqueCard';
import { useSession } from 'next-auth/react';

const SearchForm = () => {
  const { data: session } = useSession();
  const [searchData, setSearchData] = useState({
    country: '',
    state: '',
    city: '',
  });
  const [mosques, setMosques] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get('/api/mosques', {
      params: searchData,
    });
    setMosques(response.data.mosques);
    console.log('response', response);
  };

  return (
    <div>
      {session && (
        <div>
          <h1>Welcome, {session.user.name}!</h1>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={searchData.country}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={searchData.state}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={searchData.city}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      <div className="mosque-cards">
        {mosques.map((mosque) => (
          <MosqueCard key={mosque.place_id} mosque={mosque} />
        ))}
      </div>
    </div>
  );
};

export default SearchForm;
