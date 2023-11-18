import { Role } from "./enume/role";

export interface User {
    id:any;
    name: string;
    email: string;
    role?:Role;
}
