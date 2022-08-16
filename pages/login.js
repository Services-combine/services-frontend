import { useRef } from 'react'
import Head from 'next/head'
import { setCookie } from "nookies";
import { useRouter } from 'next/router'
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "../styles/Auth.module.scss"
import { Api } from '../utils/api';
//import { useAppDispatch } from '../redux/hooks';
//import { setUserData } from '../redux/slices/user';
import { LoginFormSchema } from "../utils/validate/authValidation";
import { Button } from '../components/UI/Button'
import { FormField } from '../components/UI/FormField'
import Snackbar from "../components/UI/Snackbar";


export default function Login() {
    //const dispatch = useAppDispatch();
    const snackbarRef = useRef(null);
    const router = useRouter()
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(LoginFormSchema)
    });

    async function loginUser(data) {
        try {
            const response = await Api().auth.login(data)
            setCookie(null, 'token', response.data.accessToken, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            })
            //dispatch(setUserData(response.data));
            router.push("/");
        } catch (e) {
            if (e.response !== undefined && e.response.data  !== undefined && e.response.data.message  !== undefined) {
                snackbarRef.current.show(e.response.data.message, 'error');
            }
            else {
                snackbarRef.current.show('Ошибка подключения к серверу', 'error');
            }
        }
	}

    return (
        <div className={styles.auth}>
            <Head>
				<title>Авторизация</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

            <FormProvider {... form}>
                <form onSubmit={form.handleSubmit(loginUser)} className={styles.form}>
                    <h2>Авторизация</h2>

                    <FormField name='username' label='Логин' type='text' />
                    <FormField name='password' label='Пароль' type='password' />

                    <Button 
                        disabled={!form.formState.isValid || form.formState.isSubmitting}
                        mode='fill' 
                        type='submit'
                    >
                        Войти
                    </Button>
                </form>
            </FormProvider>

            <Snackbar ref={snackbarRef} />
        </div>
    );
}