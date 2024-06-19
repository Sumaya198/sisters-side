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
        hasLift: '',
        cleanliness: 0,
        reviewText: '',
        recommend: null,
        images: [],
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleRecommendChange = (value) => {
        setFormData({
            ...formData,
            recommend: value,
        });
    };

    const handleImageUpload = async (e) => {
        const files = e.target.files;
        const uploadedImages = [];

        for (const file of files) {
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);
            uploadFormData.append('upload_preset', 'default_preset'); // Replace with your actual upload preset
            uploadFormData.append('api_key', 949124738873524); // Replace with your actual API key

            try {
                const res = await axios.post('https://api.cloudinary.com/v1_1/dhtp8p6oa/image/upload', uploadFormData); // Replace with your actual cloud name
                uploadedImages.push(res.data.secure_url);
            } catch (error) {
                console.error('Image upload failed:', error);
                toast.error('Image upload failed');
                return;
            }
        }

        setFormData({ ...formData, images: uploadedImages });
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
                    type="radio"
                    name="hasSistersSide"
                    checked={formData.hasSistersSide === true}
                    onChange={() => setFormData({ hasSistersSide: true })}
                /> Yes
                <input
                    type="radio"
                    name="hasSistersSide"
                    checked={formData.hasSistersSide === false}
                    onChange={() => setFormData({ hasSistersSide: false })}
                /> No
            </label>
            <label>
                Does the mosque have a lift?
                <select name="hasLift" value={formData.hasLift} onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="no_lift_required">No lift required</option>
                </select>
            </label>
            <label>
                How clean is the mosque?
                <input
                    type="range"
                    name="cleanliness"
                    min="0"
                    max="5"
                    value={formData.cleanliness}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Write a review:
                <textarea
                    name="reviewText"
                    value={formData.reviewText}
                    onChange={handleInputChange}
                ></textarea>
            </label>
            <label>
                Do you recommend this mosque?
                <input
                    type="radio"
                    name="recommend"
                    checked={formData.recommend === true}
                    onChange={() => handleRecommendChange(true)}
                /> Yes
                <input
                    type="radio"
                    name="recommend"
                    checked={formData.recommend === false}
                    onChange={() => handleRecommendChange(false)}
                /> No
            </label>
            <label>
                Upload images:
                <input type="file" multiple onChange={handleImageUpload} />
            </label>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
