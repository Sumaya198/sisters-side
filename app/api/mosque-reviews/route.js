// app/api/mosque-reviews/route.js
import dbConnect from '../../../utils/dbConnect';
import MosqueReviews from '../../../models/MosqueReviews';
import Mosque from '../../../models/Mosque'; // Import the Mosque model
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
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

    if (!session) {
        console.error('No session found. User must be logged in to submit a review.');
        return new Response(JSON.stringify({ error: 'You must be logged in to submit a review' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    let reviewData;
    try {
        reviewData = await req.json();
    } catch (error) {
        console.error('Error parsing request body:', error);
        return new Response(JSON.stringify({ error: 'Invalid request body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { mosqueId, hasSistersSide, hasLift, cleanliness, reviewText, recommend, images } = reviewData;
    console.log('Received review data:', { mosqueId, hasSistersSide, hasLift, cleanliness, reviewText, recommend, images });

    // Validate mosqueId
    let mosque;
    try {
        mosque = await Mosque.findOne({ placeId: mosqueId });
        if (!mosque) {
            return new Response(JSON.stringify({ error: 'Invalid mosque ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error('Error finding mosque:', error);
        return new Response(JSON.stringify({ error: 'Invalid mosque ID' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const newReview = new MosqueReviews({
        mosqueId: mosque._id,
        userId: session.user.id,
        hasSistersSide,
        hasLift,
        cleanliness,
        reviewText,
        recommend,
        images,
    });

    try {
        const savedReview = await newReview.save();
        console.log('Review saved successfully:', savedReview);
        return new Response(JSON.stringify(savedReview), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error saving review:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const mosqueId = searchParams.get('mosqueId');

    if (!mosqueId) {
        return new Response(JSON.stringify({ error: 'Mosque ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const reviews = await MosqueReviews.find({ mosqueId: mongoose.Types.ObjectId(mosqueId) }).populate('userId', 'name');
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
