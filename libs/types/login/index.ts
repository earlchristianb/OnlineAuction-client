import { User } from "../user";

export type LoginResult={
    user: User;
    token: string;
}

export type LoginCredentials = {
    email: string;
    hash: string;
}