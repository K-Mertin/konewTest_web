import { User } from "./User";

export interface Party {
    name: string;
    idNumber: string;
}

export interface Relation {
    subject: Party[]
    relation: string
    object: Party[]
    createDate: Date
    createUser: User
    modifyDate: Date
    modifyUser: User
}
