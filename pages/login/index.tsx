/** @format */
import type { NextPage } from "next";
import LoginForm from "../../components/forms/loginForm";
import SignUpForm from "../../components/forms/signUpForm";
import { GiArrowhead, GiRabbit } from "react-icons/gi";
import { useState } from "react";

const Login: NextPage = () => {
	const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

	const handleToggleFormState = () => {
		setIsLoginForm((prevState) => !prevState);
	};

	return (
		<main className='grid grid-cols-1 bg-gradient-to-r from-blue-300 to-blue-50 md:grid-cols-2 w-full h-fit md:h-screen'>
			<section className='w-full text-center flex flex-col justify-center items-center space-y-8'>
				<div className='flex flex-row'>
					<p className='text-2xl md:text-3xl font-bold font-serif flex '>
						Welcome Collectors
					</p>
					<GiArrowhead className='h-10 w-10 rotate-45 text-blue-400' />
				</div>

				<div className='mt-6 text-gray-700'>
					<span>{isLoginForm ? "Don't have" : "Already have"}</span> an account?{" "}
					<button
						className='hover:text-blue-300 text-blue-500 font-medium'
						onClick={handleToggleFormState}>
						{isLoginForm ? "Sign up now" : "Log in"}
					</button>
				</div>
			</section>
			<section className='flex flex-col  mx-auto justify-center  w-full max-w-md px-4 pb-4'>
				{isLoginForm ? <LoginForm /> : <SignUpForm />}
			</section>
		</main>
	);
};

export default Login;
