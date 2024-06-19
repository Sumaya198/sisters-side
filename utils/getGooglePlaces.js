import axios from 'axios';

export async function getMosques(country, state, city) {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    if (!GOOGLE_API_KEY) {
        throw new Error('Google Places API key is missing');
    }

    const location = `${city}, ${state}, ${country}`;
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=mosques+in+${location}&key=${GOOGLE_API_KEY}`;

    try {
        const response = await axios.get(url);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching mosques from Google Places API:', error);
        return [];
    }
}
