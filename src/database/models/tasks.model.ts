import { Document, model, Schema } from "mongoose";


export interface ITask extends Document {
    id: number;
    title: string;
}

const taskSchema = new Schema<ITask>({
    title: {type: String, required: true},
});

export const taskModel = model<ITask>('tasks', taskSchema);