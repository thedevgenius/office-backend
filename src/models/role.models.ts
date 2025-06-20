import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRole extends Document {
    name: string;
    code: string;
    permissions: string[];
}

const RoleSchema: Schema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true, enum: ["admin", "manager", "user"] },
    permissions: { type: [String], default: [] }
});

export default mongoose.model<IRole>("Role", RoleSchema);