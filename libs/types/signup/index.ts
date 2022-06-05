import { Gender } from "../../enum";


export type SignUpCredentials = {
    name: string;
    email: string;
    dob: string;
    imageLink?: string|null;
    gender: Gender;
    hash: string;
    address: string;
    confirmPassword: string;
}