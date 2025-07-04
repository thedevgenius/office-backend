import mongoose, { Schema, Document, Types } from 'mongoose';
import { Iuser } from './user.model';
import { IClient } from './client.model';

interface Credential {
    title: string;
    url: string;
    username: string;
    password: string;
}

const CredentialSchema: Schema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
})


export interface IProject extends Document {
    name: string;
    manager: Types.ObjectId;
    client: Types.ObjectId;
    status: string;
    techstack: string[];
    credentials: Credential[];
    leadDeveloper?: Types.ObjectId;
    assignedTo?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const ProjectSchema: Schema = new Schema({
    name: { type: String, required: true },
    manager: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    status: { type: String, enum: ['Design', 'Development', 'Staging', 'Live'], default: 'Design' },
    techstack: [{ type: String }],
    credentials: [CredentialSchema],
    leadDeveloper: { type: Schema.Types.ObjectId, ref: 'User' },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IProject>('Project', ProjectSchema);
