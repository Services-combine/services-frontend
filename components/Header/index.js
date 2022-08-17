import clsx from 'clsx';
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { destroyCookie } from "nookies";
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import { useAppDispatch } from '../../redux/hooks';
import { setUserData } from '../../redux/slices/user';
import styles from "./Header.module.scss";
import { Button } from '../UI/Button';
import { AiOutlineUser } from "react-icons/ai"
import { BiExit } from "react-icons/bi"


export const Header = () => {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(selectUserData);
    const router = useRouter();
    const [profileMenuActive, setProfileMenuActive] = useState(false);

    async function logout() {
        destroyCookie(null, 'token')
        dispatch(setUserData(null));
        router.push("/login")
    }

    const handleClickLogout = () => {
        logout()
        setProfileMenuActive(false)
    }

    return (
        <div className={clsx(styles.header, 'd-flex w100')}>
            <div className={clsx(styles.container, 'd-flex justify-between align-center')}>
                <div className={styles.header__left}>
                    <Link href='/'>
                        <h3 className={styles.logo}>Сервисы</h3>
                    </Link>
                </div>

                <div className={clsx(styles.header__right, 'd-flex align-center')}>
                    {userData &&
                        <div className={styles.profile}>
                            <div
                                onClick={() => setProfileMenuActive(!profileMenuActive)}
                                className={styles.profile__btn}
                            >
                                <div className={styles.profile__icon}>
                                    <AiOutlineUser/>
                                </div>
                            </div>

                            <div className={profileMenuActive ? clsx(styles.profile__menu, styles.active) : styles.profile__menu}>
                                <div className={styles.profile__actions}>
                                    <div className={styles.profile__item} onClick={handleClickLogout}>
                                        <BiExit className={styles.profile__icon} /> Выйти
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};
