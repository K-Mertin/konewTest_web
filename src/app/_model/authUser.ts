import { User } from './User';

export interface AuthUser {
    tokenString: string;
    id: number;
    username: string;
    role: string;
}
