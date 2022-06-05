/** @format */

import React from "react";

type FormFieldProps = {
	children: JSX.Element | JSX.Element[];
	error?: string;
	label: string;
	required?: boolean;
};

const FormField = (props: FormFieldProps) => {
	const { children, error, label, required = false } = props;

	return (
		<div className='flex flex-col w-full'>
			<label className='font-medium text-lg flex'>
				{label}
				{required && <p className='text-gray-600'>*</p>}
			</label>
			{children}
			<p className='text-red-300 italic font-medium'>{error}</p>
		</div>
	);
};

export default FormField;
