// app/api/mosques/[id]/route.js
import dbConnect from '../../../../utils/dbConnect';
import Mosque from '../../../../models/Mosque';

export async function GET(req) {
    await dbConnect();

    const id = req.nextUrl.pathname.split('/').pop();

    try {
        const mosque = await Mosque.findOne({ placeId: id });

        if (!mosque) {
            return new Response(JSON.stringify({ error: 'Mosque not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(mosque), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
