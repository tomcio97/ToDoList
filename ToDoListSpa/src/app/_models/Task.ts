export interface Task {
    id: number;
    name: string;
    description: string;
    createDate: Date;
    deathLine: Date;
    isDone: boolean;
}