// app/api/reviews/route.js
import dbConnect from '../../../../utils/dbConnect';
import Review from '../../../../models/Review';
import { getServerSession } from 'next-auth/react';

export async function POST(req) {
    await dbConnect();

    let session;
    try {
        session = await getServerSession({ req });
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

    const { mosqueId, mosqueName, mosqueCity, mosqueState, hasSistersSide, hasStairs, cleanliness, hasLift, reviewText, images } = reviewData;
    console.log('Received review data:', { mosqueId, mosqueName, mosqueCity, mosqueState, hasSistersSide, hasStairs, cleanliness, hasLift, reviewText, images });

    const newReview = new Review({
        mosqueId,
        mosqueName,
        mosqueCity,
        mosqueState,
        userId: session.user.id,
        userName: session.user.name,
        hasSistersSide,
        hasStairs,
        cleanliness,
        hasLift,
        reviewText,
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
        const reviews = await Review.find({ mosqueId });
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
