// models/MosqueReviews.js
import mongoose from 'mongoose';

const MosqueReviewsSchema = new mongoose.Schema({
    mosqueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mosque', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hasSistersSide: { type: Boolean, required: true },
    hasLift: { type: String, required: true },
    cleanliness: { type: Number, required: true },
    reviewText: { type: String, required: true },
    recommend: { type: Boolean, required: true },
    images: { type: [String], required: true },
    status: { type: String, default: 'pending' },
}, { timestamps: true });

export default mongoose.models.MosqueReviews || mongoose.model('MosqueReviews', MosqueReviewsSchema);
