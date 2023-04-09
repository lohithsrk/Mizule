import React from 'react';

const FormInput = ({
	label,
	placeholder,
	value,
	error,
	touched,
	type,
	...rest
}) => {
	return (
		<div
			className={`pt-2 text-white ${
				error && touched === true ? 'pb-0' : 'pb-2'
			}`}
		>
			<p className='mb-1 text-base'>{label}</p>
			<input
				type={type}
				value={value}
				label={label}
				placeholder={placeholder}
				{...rest}
				className='w-full bg-white/20 border border-zinc-700 rounded-md py-2 px-3 outline-transparent'
			/>
			{error && touched === true && (
				<p className='text-red-800 text-sm mt-1 font-bold'>{error}</p>
			)}
		</div>
	);
};

export default FormInput;
