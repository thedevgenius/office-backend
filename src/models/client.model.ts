import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
    name: string;
    company: string;
}

const ClientSchema: Schema = new Schema({
    name: { type: String, required: true },
    company: {type: String, required: true }
});

export default mongoose.model<IClient>('Client', ClientSchema);
