"use client";
import { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import axios from 'axios';
import Modal from 'react-modal';

const MosqueDetailsPage = ({ mosqueId }) => {
    const [mosqueDetails, setMosqueDetails] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [guidelinesAccepted, setGuidelinesAccepted] = useState(false);

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
        setModalIsOpen(false); // Close the modal after submitting the review
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleAcceptGuidelines = () => {
        setGuidelinesAccepted(true);
    };

    if (!mosqueDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{mosqueDetails.name}</h1>
            <p>{mosqueDetails.address}</p>
            <button onClick={openModal}>Leave a Review</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Leave a Review"
            >
                {!guidelinesAccepted ? (
                    <div>
                        <h2>Community Guidelines</h2>
                        <p>Please read and accept the community guidelines before leaving a review.</p>
                        <button onClick={handleAcceptGuidelines}>I Accept</button>
                        <button onClick={closeModal}>Close</button>
                    </div>
                ) : (
                    <div>
                        <h2>Leave a Review</h2>
                        <button onClick={closeModal}>Close</button>
                        <ReviewForm mosqueId={mosqueId} onNewReview={handleNewReview} />
                    </div>
                )}
            </Modal>
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
