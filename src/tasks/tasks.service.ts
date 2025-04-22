import { ITask, taskModel } from "../database/models/tasks.model";


export interface Tasks {
    tasks: ITask[];
    totalCount: number;
  }

export async function getAll(skip: number = 0, take: number = 10): Promise<Tasks>{

    const tasks = await taskModel.find()
    .skip(skip)
    .limit(take)
    .lean()
    .exec();

    const totalCount = await taskModel.countDocuments().exec();

    return {tasks: tasks, totalCount: totalCount}
}

export async function getById(id: string): Promise<ITask | null> {
    
    const task = await taskModel.findById({_id: id}).lean().exec();

    return task;
}

export async function deleteById(id: string): Promise<ITask | null>{

    const task = await taskModel.findByIdAndDelete({_id: id}).lean().exec();
    
    return task;
}

export async function addTask(title : string): Promise<ITask | null> {

    const task = new taskModel({title});

    task.save();
    return task;
}