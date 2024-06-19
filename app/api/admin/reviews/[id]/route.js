import dbConnect from '../../../../../utils/dbConnect';
import MosqueReviews from '../../../../../models/MosqueReviews';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';

export async function PATCH(req, { params }) {
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

    const { id } = params;
    const { status } = await req.json();

    try {
        const updatedReview = await MosqueReviews.findByIdAndUpdate(id, { status }, { new: true });
        return new Response(JSON.stringify(updatedReview), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error updating review:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function DELETE(req, { params }) {
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

    const { id } = params;

    try {
        await MosqueReviews.findByIdAndDelete(id);
        return new Response(null, {
            status: 204,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error deleting review:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
