import { User } from './User';

export interface SpiderRequest {
    requestType: string;
    searchKeys: string[];
    referenceKeys?: string[];
    requestStatus: string;
    requester: User;
    requestTime: Date;
}
