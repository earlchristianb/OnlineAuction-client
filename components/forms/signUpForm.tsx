/** @format */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Gender } from "../../libs/enum";
import { SignUpCredentials } from "../../libs/types/signup";
import FormField from "../formFields";
import { format } from "date-fns";
import signUpSchema from "../../libs/schema/signupSchema/signUpSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const SignUpForm = () => {
	const {
		register,
		setValue,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<SignUpCredentials>({
		// defaultValues: {
		// 	email: "",
		// 	hash: "",
		// 	imageLink: null,
		// 	dob: "",
		// 	address: "",
		// 	gender: Gender.Male,
		// 	name: "",
		// 	confirmPassword: "",
		// },
		reValidateMode: "onChange",
		mode: "onChange",
		resolver: yupResolver(signUpSchema),
	});

	const [image, setImage] = useState<string | null>(null);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submitting", getValues());
	};

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length == 1) {
			const file = e.target.files[0];
			convertFile(file);
		}
	};

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		// console.log(format(new Date(e.target.value), "dd-MM-yyyy"));
		console.log(format(new Date(), "dd-MM-yyyy"));
		const newDate = new Date("2022-07-05");
		console.log(newDate.toLocaleString());

		console.log(getValues("dob"));
	};
	const convertFile = (file: File) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setValue("imageLink", String(reader.result));
			setImage(String(reader.result));
		};
	};
	return (
		<form
			onSubmit={onSubmit}
			className='flex flex-col max-w-lg space-y-2 p-5 shadow-xl shadow-sky-200 bg-white '>
			<FormField error={errors.name?.message} label='Name' required={true}>
				<input
					{...register("name")}
					className='border border-blue-300 h-9 outline-none focus:border-2 appearance-none'
					type='text'
				/>
			</FormField>
			<FormField error={errors.email?.message} label='Email' required={true}>
				<input
					{...register("email")}
					className='border border-blue-300 h-9 outline-none focus:border-2 appearance-none'
					type='email'
				/>
			</FormField>
			<div className='flex flex-col md:flex-row w-full md:space-x-2 space-x-0'>
				<FormField
					error={errors.hash?.message}
					label='Password'
					required={true}>
					<input
						{...register("hash")}
						className='border border-blue-300 h-9 outline-none focus:border-2 appearance-none'
						type='password'
					/>
				</FormField>
				<FormField
					error={errors.confirmPassword?.message}
					label='Confirm Password'
					required={true}>
					<input
						{...register("confirmPassword")}
						className='border border-blue-300 h-9 outline-none focus:border-2 appearance-none'
						type='password'
					/>
				</FormField>
			</div>
			<FormField label='Date of Birth' required={true}>
				<input
					{...register("dob")}
					className='border border-blue-300 h-9 outline-none focus:border-2 appearance-none'
					type='date'
					onChange={handleDateChange}
				/>
			</FormField>

			<FormField label='Upload an Image'>
				<input
					className='text-gray-600 mt-2'
					max-size='100'
					multiple={false}
					type='file'
					accept='image/*'
					onChange={handleFileInputChange}></input>
			</FormField>
			{image !== null && (
				<div className='flex justify-center mx-auto items-center p-2'>
					<img src={image} className='rounded h-40 w-40' alt='' />
				</div>
			)}

			<button
				type='submit'
				className='bg-blue-400 rounded-sm p-2 text-white font-medium hover:shadow-md hover:text-gray-800 hover:bg-blue-500'>
				Create Account
			</button>
		</form>
	);
};

export default SignUpForm;
