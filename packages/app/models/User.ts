import mongoose from "mongoose";

export interface Users extends mongoose.Document {
    alias: string;
    team: string;
    email: string;
    pwd: string
}

const UserSchema = new mongoose.Schema<Users>({
    alias: {
        type: String,
        required: [true, "Entrer le nom du joueur."],
    },
    team: {
        type: String,
        required: [true, "Entrer le nom de l'equipe."],
    },
    email: {
        type: String,
        required: [true, "Entrer un email."],
    },
    pwd: {
        type: String,
        required: [true, "Entrer un mot de passe."],
    }
});

export default mongoose.models.User || mongoose.model<Users>("User", UserSchema);