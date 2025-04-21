export interface Task {
    id: number;
    title: string;
}

export let tasks: Task[];
export let idCounter: number = 0;