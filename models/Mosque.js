// models/Mosque.js
import mongoose from 'mongoose';

const MosqueSchema = new mongoose.Schema({
    name: String,
    address: String,
    rating: Number,
    placeId: String,
    userRatingsTotal: Number,
    openingHours: Object,
});

export default mongoose.models.Mosque || mongoose.model('Mosque', MosqueSchema);
