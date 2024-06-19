// app/components/ReviewForm.js
'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ReviewForm = ({ mosqueId, onNewReview }) => {
    const { data: session, status } = useSession();
    const [formData, setFormData] = useState({
        hasSistersSide: null,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!session) {
            toast.error('You must be logged in to submit a review');
            return;
        }

        const reviewData = { ...formData, mosqueId };
        console.log('Submitting review with data:', reviewData);

        try {
            const response = await axios.post('/api/mosque-reviews', reviewData);
            console.log('Response from server:', response);

            if (response.status === 201) {
                toast.success('Review submitted successfully');
                onNewReview(response.data);
            } else {
                toast.error('An error occurred while submitting your review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('An error occurred while submitting your review');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Does the mosque have a sister’s side?
                <input
                    type="checkbox"
                    name="hasSistersSide"
                    checked={formData.hasSistersSide === true}
                    onChange={() => setFormData({ hasSistersSide: true })}
                /> Yes
                <input
                    type="checkbox"
                    name="hasSistersSide"
                    checked={formData.hasSistersSide === false}
                    onChange={() => setFormData({ hasSistersSide: false })}
                /> No
            </label>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
