import mongoose, { Schema, Document, Types } from "mongoose";

export interface Iuser extends Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: Types.ObjectId[];
    manager: Types.ObjectId;
    designation: string;
    gender: string;
    dateOfBirth: Date;
    address: string;
    joinDate: Date;
    lastLogin: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: [{ type: Schema.Types.ObjectId, ref: "Role" }], // Changed to array for multiple roles
    manager: { type: Schema.Types.ObjectId, ref: "User" },
    designation: { type: String },
    gender: { type: String },
    dateOfBirth: { type: Date },
    address: { type: String },
    joinDate: { type: Date },
    lastLogin: { type: Date }
});
export default mongoose.model<Iuser>("User", UserSchema);