import { User } from './User';

export interface SpiderRequest {
    requestId: string;
    requestType: string;
    searchKeys: string[];
    referenceKeys?: string[];
    status: string;
    requester: User;
    createDate: Date;
}
