import { Priority } from "./enume/priority";
import { TaskStatus } from "./enume/task-status";
import { User } from "./user";

export interface Task {
    [x: string]: any;
    id?:number;
    title:string;
    status:TaskStatus;
    description:string;
    priority:Priority;
    dueDate: Date | string;
    user?:User
}
