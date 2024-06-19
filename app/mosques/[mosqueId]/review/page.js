// app/mosques/[mosqueId]/review/page.js
"use client";
import ReviewForm from '../../../components/ReviewForm';

const ReviewPage = ({ params }) => {
    const { mosqueId } = params;

    const handleNewReview = (newReview) => {
        // Handle new review logic
    };

    return (
        <div>
            <h1>Submit a Review</h1>
            <ReviewForm mosqueId={mosqueId} onNewReview={handleNewReview} />
        </div>
    );
};

export default ReviewPage;
