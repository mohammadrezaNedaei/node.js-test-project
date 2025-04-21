
export interface Task {
    id: number;
    title: string;
}

export interface tasks {
    tasks: Task[];
    totalCount: number
}

export let tasks: Task[] = [];
let idCounter: number = 0

export function getAll(skip: number = 0, take: number = 10): tasks{

    return {tasks: tasks.slice(skip, skip + take), totalCount: tasks.length};

}

export function getById(id: number): Task | null {
    
    const theId: number = tasks.findIndex((task) => {
        return task.id === id; });

    if (theId === -1)
        return null

    return tasks[theId]; 
}

export function deleteById(id: number): Task | null{

    const theId: number = tasks.findIndex((task) => {
        return task.id === id; });

    if (theId === -1)
        return null

    const task = { ...tasks[theId] };
    tasks.splice(theId, 1);
    return task;
}

export function addTask(title : string): Task {

    const task: Task = {id: idCounter++, title: title}
    tasks.push(task)
    return task;
}