
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true, enum: ['remote', 'onsite', 'hybrid'] },
    skills: [{ type: String, required: true }],
    description: { type: String, required: true },
    link: { type: String }, // ← Add this line
    createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model("job", jobSchema);
module.exports = { Job };