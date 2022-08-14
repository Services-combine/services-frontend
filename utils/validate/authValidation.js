import * as yup from "yup"

export const LoginFormSchema = yup.object({
    username: yup.string().min(1, 'Логин не менее 1 символа').required('Логин обязательный'),
    password: yup.string().min(6, "Пароль не менее 6 символов").required('Пароль обязательный'),
});