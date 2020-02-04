import mongoose from "mongoose";

const jokesSchema = new mongoose.Schema({
    overskrift: {
        type: String,
        required: true
    },
    jokeTekst: {
        type: String,
        required: true
    },
    dato: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export default mongoose.model("Jokes", jokesSchema);