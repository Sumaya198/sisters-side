// app/components/ReviewList.js
"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = ({ mosqueId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/api/reviews?mosqueId=${mosqueId}`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [mosqueId]);

    if (!Array.isArray(reviews)) {
        return <p>No reviews available.</p>;
    }

    return (
        <div>
            {reviews.map((review) => (
                <div key={review._id} className="review">
                    <p>Has sister's side: {review.hasSistersSide ? 'Yes' : 'No'}</p>
                    <p>Has stairs: {review.hasStairs ? 'Yes' : 'No'}</p>
                    <p>Cleanliness: {review.cleanliness}</p>
                    <p>Has lift: {review.hasLift}</p>
                    <p>Review: {review.reviewText}</p>
                    {review.images && review.images.map((image, index) => (
                        <img key={index} src={image} alt="Review image" />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
