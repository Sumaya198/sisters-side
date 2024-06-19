// app/api/admin/reviews/route.js
import dbConnect from '../../../../utils/dbConnect';
import MosqueReviews from '../../../../models/MosqueReviews';
import Mosque from '../../../../models/Mosque'; // Import the Mosque model
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req) {
    await dbConnect();

    let session;
    try {
        session = await getServerSession({ req, ...authOptions });
    } catch (error) {
        console.error('Error getting session:', error);
        return new Response(JSON.stringify({ error: 'Failed to get session' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (!session || !session.user || !session.user.isAdmin) {
        console.error('Unauthorized access attempt.');
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    try {
        const reviews = await MosqueReviews.find({ status })
            .populate('userId', 'name')
            .populate('mosqueId', 'name address'); // Populate mosque details
        return new Response(JSON.stringify(reviews), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
