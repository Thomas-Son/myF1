import mongoose from "mongoose";

export interface Teams extends mongoose.Document {
    name: string;
    point: string;
    active: string;
}

const TeamSchema = new mongoose.Schema<Teams>({
    name: {
        type: String,
        required: [true, "Entrer le nom de l'équipe."],
    },
    point: {
        type: String,
        required: [true, "Entrer le nombre de point de l'équipe."],
    },
    active: {
        type: String,
        required: [true, "Préciser si l'équipe est active'."],
    }
});

export default mongoose.models.Team || mongoose.model<Teams>("Team", TeamSchema);