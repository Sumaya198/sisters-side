'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './ReviewForm.module.css'; // Import the CSS module

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
    const [uploading, setUploading] = useState(false);

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
        setUploading(true);
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
                setUploading(false);
                return;
            }
        }

        setFormData((prevData) => ({ ...prevData, images: uploadedImages }));
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!session) {
            toast.error('You must be logged in to submit a review');
            return;
        }

        if (uploading) {
            toast.error('Please wait for the images to finish uploading');
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
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>
                Does the mosque have a sister’s side?
                <div className={styles.radioGroup}>
                    <label>
                        <input
                            type="radio"
                            name="hasSistersSide"
                            checked={formData.hasSistersSide === true}
                            onChange={() => setFormData({ hasSistersSide: true })}
                        /> Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="hasSistersSide"
                            checked={formData.hasSistersSide === false}
                            onChange={() => setFormData({ hasSistersSide: false })}
                        /> No
                    </label>
                </div>
            </label>
            <label className={styles.label}>
                Does the mosque have a lift?
                <select name="hasLift" value={formData.hasLift} onChange={handleInputChange} className={styles.select}>
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="no lift required">No lift required</option>
                </select>
            </label>
            <label className={styles.label}>
                How clean is the mosque?
                <input
                    type="range"
                    name="cleanliness"
                    min="0"
                    max="5"
                    value={formData.cleanliness}
                    onChange={handleInputChange}
                    className={styles.range}
                />
            </label>
            <label className={styles.label}>
                Write a review:
                <textarea
                    name="reviewText"
                    value={formData.reviewText}
                    onChange={handleInputChange}
                    className={styles.textarea}
                ></textarea>
            </label>
            <label className={styles.label}>
                Do you recommend this mosque?
                <div className={styles.radioGroup}>
                    <label>
                        <input
                            type="radio"
                            name="recommend"
                            checked={formData.recommend === true}
                            onChange={() => handleRecommendChange(true)}
                        /> Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="recommend"
                            checked={formData.recommend === false}
                            onChange={() => handleRecommendChange(false)}
                        /> No
                    </label>
                </div>
            </label>
            <label className={styles.label}>
                Upload images:
                <input type="file" multiple onChange={handleImageUpload} className={styles.fileInput} />
            </label>
            <button type="submit" disabled={uploading} className={styles.button}>Submit Review</button>
        </form>
    );
};

export default ReviewForm;
