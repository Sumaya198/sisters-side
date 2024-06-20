import dbConnect from '../../../../utils/dbConnect';
import MosqueReviews from '../../../../models/MosqueReviews';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function DELETE(req, { params }) {
    await dbConnect();

    const { id } = params;
    console.log('Received request to delete review with ID:', id);

    let session;
    try {
        session = await getServerSession({ req, ...authOptions });
        console.log('Session retrieved:', session);
    } catch (error) {
        console.error('Error getting session:', error);
        return new Response(JSON.stringify({ error: 'Failed to get session' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (!session) {
        return new Response(JSON.stringify({ error: 'You must be logged in to delete a review' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const review = await MosqueReviews.findById(id);
        if (!review) {
            console.error('Review not found for ID:', id);
            return new Response(JSON.stringify({ error: 'Review not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Allow only the user who left the review or an admin to delete it
        if (review.userId.toString() !== session.user.id && !session.user.isAdmin) {
            console.error('User does not have permission to delete this review. User ID:', session.user.id, 'Review User ID:', review.userId.toString());
            return new Response(JSON.stringify({ error: 'You do not have permission to delete this review' }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        await MosqueReviews.findByIdAndDelete(id);
        console.log('Review deleted successfully:', id);
        return new Response(JSON.stringify({ message: 'Review deleted successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error deleting review:', error);
        return new Response(JSON.stringify({ error: 'An error occurred while deleting the review' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
