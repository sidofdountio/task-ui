import { AuthenticationResponse } from "./authentication-response";
import { Task } from "./task";
import { User } from "./user";

export interface CustormResponse {
    timeStamp: string;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data:
    {
        tasks?:Task[], task?:Task
    }
}
