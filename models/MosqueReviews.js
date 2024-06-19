// models/MosqueReviews.js
import mongoose from 'mongoose';

const MosqueReviewsSchema = new mongoose.Schema({
    mosqueId: { type: String, ref: 'Mosque', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hasSistersSide: { type: Boolean, required: true },
}, { timestamps: true });

export default mongoose.models.MosqueReviews || mongoose.model('MosqueReviews', MosqueReviewsSchema);
