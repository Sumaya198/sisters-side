// app/api/mosques/route.js
import dbConnect from '../../../utils/dbConnect';
import Mosque from '../../../models/Mosque';
import { getMosques } from '../../../utils/getGooglePlaces';

export async function GET(req) {
    await dbConnect();

    const country = req.nextUrl.searchParams.get('country');
    const state = req.nextUrl.searchParams.get('state');
    const city = req.nextUrl.searchParams.get('city');

    const mosques = await getMosques(country, state, city);

    // Save mosques to MongoDB if necessary
    for (const mosqueData of mosques) {
        const existingMosque = await Mosque.findOne({ placeId: mosqueData.place_id });
        if (!existingMosque) {
            const newMosque = new Mosque({
                name: mosqueData.name,
                address: mosqueData.formatted_address,
                rating: mosqueData.rating,
                placeId: mosqueData.place_id,
                userRatingsTotal: mosqueData.user_ratings_total,
                openingHours: mosqueData.opening_hours,
            });
            await newMosque.save();
        }
    }

    return new Response(JSON.stringify({ mosques }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
