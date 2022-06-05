import * as yup from 'yup'

const signUpSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email')
        .max(255, 'Email too long!')
        .required('Required'),
    name: yup
        .string()
        .matches(/^[aA-zZ\s]+$/, 'Only Letters are allowed ')
        .min(8)
        .required('Required'),
    password: yup
        .string()
        .min(8)
        .required('Required'),
    confirmPassword: yup
        .string()
        .min(8)
        .oneOf([yup.ref('password')], 'Passwords must match'),
    dob: yup
        .date()
        .required(),
    imageLink: yup
        .string()
        .nullable(true)
});

export default signUpSchema