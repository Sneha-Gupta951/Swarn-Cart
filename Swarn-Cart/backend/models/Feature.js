import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
    icon: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    color: { type: String, required: true }
}, {
    timestamps: true
});

const Feature = mongoose.model('Feature', featureSchema);

export default Feature;
