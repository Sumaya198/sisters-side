// app/components/MosqueDetailsPage.js
"use client"
import { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import axios from 'axios';

const MosqueDetailsPage = ({ mosqueId }) => {
    const [mosqueDetails, setMosqueDetails] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchMosqueDetails = async () => {
            try {
                const response = await axios.get(`/api/mosques/${mosqueId}`);
                setMosqueDetails(response.data);
            } catch (error) {
                console.error('Error fetching mosque details:', error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/api/mosque-reviews?mosqueId=${mosqueId}`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchMosqueDetails();
        fetchReviews();
    }, [mosqueId]);

    const handleNewReview = (newReview) => {
        setReviews((prevReviews) => [newReview, ...prevReviews]);
    };

    if (!mosqueDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{mosqueDetails.name}</h1>
            <p>{mosqueDetails.address}</p>
            <ReviewForm
                mosqueId={mosqueId}
                onNewReview={handleNewReview}
            />
            <h2>Reviews</h2>
            <div>
                {reviews.map((review) => (
                    <div key={review._id}>
                        <p><strong>{review.userId.name}</strong></p>
                        <p>Sister's Side: {review.hasSistersSide ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MosqueDetailsPage;
