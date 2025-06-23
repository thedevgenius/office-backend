import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRole extends Document {
    name: string;
    permissions: string[];
}

const RoleSchema: Schema = new Schema({
    name: { type: String, required: true },
    permissions: { type: [String], default: [] }
});

export default mongoose.model<IRole>("Role", RoleSchema);