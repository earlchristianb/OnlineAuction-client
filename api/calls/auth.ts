import { LoginCredentials, LoginResult } from "../../libs/types";
import { SignUpCredentials } from "../../libs/types/signup";
import API from "../axios"

export const API_Login = async(data:LoginCredentials) => {
    try {
    const {data:loginResult} = await API.post('auth/login', data);
    return loginResult
    } catch (error) {
        console.log(error);
    }
}

export const signUp = async (data: SignUpCredentials) => {
    const signUpResult:LoginResult = await API.post('auth/signup', data);
    return signUpResult;
}
