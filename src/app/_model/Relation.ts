export interface Party {
    name: string;
    idNumber: string;
    memo: string;
    relationType: any[];
}

export interface Relation {
    reason: string;
    subjects: Party[];
    objects: Party[];
    createDate: string;
    createUser: string;
    modifyDate: string;
    modifyUser: string;
}