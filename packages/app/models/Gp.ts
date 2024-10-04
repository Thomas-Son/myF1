import mongoose from "mongoose";

export interface Gps extends mongoose.Document {
    name: string;
    track: string;
    state: string;
    first: string;
    second: string;
    third: string;
}

const GpSchema = new mongoose.Schema<Gps>({
    name: {
        type: String,
        required: [true, "Entrer le nom de l'équipe."],
    },
    track: {
        type: String,
    },
    state: {
        type: String
    },
    first: {
        type: String
    },
    second: {
        type: String
    },
    third: {
        type: String
    },
});

export default mongoose.models.Gp || mongoose.model<Gps>("Gp", GpSchema);