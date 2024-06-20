"use client";
import { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import axios from 'axios';

const MosqueDetailsPage = ({ mosqueId }) => {
    const [mosqueDetails, setMosqueDetails] = useState(null);
    const [reviews, setReviews] = useState([]);

    // Load reviews from local storage
    useEffect(() => {
        const storedReviews = localStorage.getItem(`reviews-${mosqueId}`);
        if (storedReviews) {
            setReviews(JSON.parse(storedReviews));
        }

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
                // Save fetched reviews to local storage
                localStorage.setItem(`reviews-${mosqueId}`, JSON.stringify(response.data));
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchMosqueDetails();
        fetchReviews();
    }, [mosqueId]);

    const handleNewReview = (newReview) => {
        setReviews((prevReviews) => {
            const updatedReviews = [newReview, ...prevReviews];
            // Update local storage
            localStorage.setItem(`reviews-${mosqueId}`, JSON.stringify(updatedReviews));
            return updatedReviews;
        });
    };

    if (!mosqueDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{mosqueDetails.name}</h1>
            <p>{mosqueDetails.address}</p>
            <ReviewForm mosqueId={mosqueId} onNewReview={handleNewReview} />
            <h2>Reviews</h2>
            <div>
                {reviews.map((review) => (
                    <div key={review._id}>
                        <p><strong>{review.userId.name}</strong></p>
                        <p>Sister's Side: {review.hasSistersSide ? 'Yes' : 'No'}</p>
                        <p>Lift: {review.hasLift}</p>
                        <p>Cleanliness: {review.cleanliness}</p>
                        <p>Review: {review.reviewText}</p>
                        <p>Recommend: {review.recommend ? 'Yes' : 'No'}</p>
                        {review.images.length > 0 && (
                            <div>
                                {review.images.map((image, index) => (
                                    <img key={index} src={image} alt="Review Image" width="100" />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MosqueDetailsPage;
