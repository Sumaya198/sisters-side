// models/Review.js
import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    mosqueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mosque', required: true },
    mosqueName: { type: String, required: true },
    mosqueCity: { type: String, required: true },
    mosqueState: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    hasSistersSide: { type: Boolean, required: true },
    hasStairs: { type: Boolean, required: true },
    cleanliness: { type: Number, required: true, min: 0, max: 5 },
    hasLift: { type: String, required: true },
    reviewText: { type: String, required: true },
    images: { type: [String], required: false },
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
