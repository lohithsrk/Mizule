import * as Yup from 'yup';

export const createZuleSpotValidationSchema = Yup.object().shape({
	title: Yup.string()
		.trim()
		.min(3, 'Title should be minimum of 3 characters')
		.required('Title is required')
});

export const createZuleValidationSchema = Yup.object().shape({
	title: Yup.string()
		.trim()
		.min(5, 'Title should be minimum of 5 characters')
		.max(50, 'Title should have maximum of 50 characters')
		.required('Title is required'),
	description: Yup.string()
		.trim()
		.min(10, 'Description should be minimum of 5 characters')
		.max(200, 'Description should have maximum of 50 characters')
		.required('Description is required'),
});
