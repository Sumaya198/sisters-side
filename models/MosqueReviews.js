// models/MosqueReviews.js
import mongoose from 'mongoose';

const MosqueReviewsSchema = new mongoose.Schema({
    mosqueId: { type: String, ref: 'Mosque', required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hasSistersSide: { type: Boolean, required: false },
    hasLift: { type: String, required: false },
    cleanliness: { type: Number, required: false },
    reviewText: { type: String, required: false },
    recommend: { type: Boolean, required: false },
    images: [String], // Array of image URLs
}, { timestamps: true });

export default mongoose.models.MosqueReviews || mongoose.model('MosqueReviews', MosqueReviewsSchema);
