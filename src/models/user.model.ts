import mongoose, { Schema, Document, Types } from "mongoose";

export interface Iuser extends Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    designation: string;
    role: Types.ObjectId[];
    manager: Types.ObjectId;
    gender: string;
    dateOfBirth: Date;
    address: string;
    lastQualification: string;
    totalExperience: number;
    prevCompany: string;
    joinDate: Date;
    lastLogin: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: [{ type: Schema.Types.ObjectId, ref: "Role" }],
    manager: { type: Schema.Types.ObjectId, ref: "User" },
    designation: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    dateOfBirth: { type: Date },
    address: { type: String },
    lastQualification: { type: String },
    totalExperience: { type: Number },
    prevCompany: { type: String },
    joinDate: { type: Date },
    lastLogin: { type: Date }
});
export default mongoose.model<Iuser>("User", UserSchema);