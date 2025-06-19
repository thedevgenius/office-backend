import mongoose, { Schema, Document } from 'mongoose';
import { Iuser } from './user.model';

export interface IProject extends Document {
    name: string;
    manager: Iuser['_id'];
}

const ProjectSchema: Schema = new Schema({
    name: { type: String, required: true },
    manager: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    
});

export default mongoose.model<IProject>('Project', ProjectSchema);
