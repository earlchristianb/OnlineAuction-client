/** @format */

import { useForm } from "react-hook-form";
import FormField from "../formFields";
import { useRouter } from "next/router";
import { API_Login } from "../../api";
import React from "react";
import { LoginResult } from "../../libs/types";
export type FormData = {
	email: string;
	hash: string;
};

const LoginForm = () => {
	const {
		register,
		getValues,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			email: "",
			hash: "",
		},
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const result: LoginResult = await API_Login(getValues());
		sessionStorage.setItem("user", JSON.stringify(result.user));
		sessionStorage.setItem("token", JSON.stringify(result.token));
	};

	const router = useRouter();

	return (
		<div className='h-screen flex flex-col my-auto justify-center'>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col max-w-lg w-full space-y-6 p-5 shadow-xl shadow-sky-200 bg-white h-72 justify-center '>
				<div className='space-y-2'>
					<FormField label='Email'>
						<input
							{...register("email")}
							className='border border-blue-300 h-9 outline-none focus:border-2 appearance-none'
							type='email'
						/>
					</FormField>

					<FormField label='Pasword'>
						<input
							{...register("hash")}
							className='border border-blue-300 h-9 outline-none focus:border-2 appearance-none'
							type='password'
						/>
					</FormField>
				</div>

				<button
					type='submit'
					className='bg-blue-400 mt-8 rounded-sm p-2 text-white font-medium hover:shadow-md hover:text-gray-800 hover:bg-blue-500'>
					Log in
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
