import { Priority } from "./enume/priority";
import { TaskStatus } from "./enume/task-status";
import { User } from "./user";

export interface TaskRequest {
    id?:number;
    title:string;
    status:TaskStatus;
    description:string;
    priority:Priority;
    dueDate: Date | string;
    assignee:User ;
}
