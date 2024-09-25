import mongoose from "mongoose";

export interface Drivers extends mongoose.Document {
    name: string;
    team: string;
    number: number;
    point: number;
    active: string;
}

const DriverSchema = new mongoose.Schema<Drivers>({
    name: {
        type: String,
        required: [true, "Entrer le nom du pilote."],
    },
    team: {
        type: String,
        required: [true, "Entrer l'équipe' du pilote."],
    },
    number: {
        type: Number,
        required: [true, "Entrer le numéro du pilote."],
    },
    point: {
        type: Number,
        required: [true, "Entrer le nombre de point du pilote."],
    },
    active: {
        type: String,
        required: [true, "Préciser si le pilote est actif."],
    }
});

export default mongoose.models.Driver || mongoose.model<Drivers>("Driver", DriverSchema);