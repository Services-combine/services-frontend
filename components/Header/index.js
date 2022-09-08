import clsx from 'clsx';
import Link from "next/link";
import { useRouter } from 'next/router';
import { destroyCookie } from "nookies";
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import { useAppDispatch } from '../../redux/hooks';
import { setUserData } from '../../redux/slices/user';
import styles from "./Header.module.scss";
import { AiOutlineUser } from "react-icons/ai"
import { BiExit } from "react-icons/bi"
import { Dropdown } from "@nextui-org/react";


export const Header = () => {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(selectUserData);
    const router = useRouter();

    async function logout() {
        destroyCookie(null, 'token')
        dispatch(setUserData(null));
        router.push("/login")
    }

    const handleClickAction = (action) => {
        if (action === "logout") {
            logout()
        }
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
                        <Dropdown placement="bottom-right">
                            <Dropdown.Trigger>
                                <div className={styles.profile}>
                                    <div className={styles.profile__btn}>
                                        <div className={styles.profile__icon}>
                                            <AiOutlineUser/>
                                        </div>
                                    </div>
                                </div>
                            </Dropdown.Trigger>

                            <Dropdown.Menu 
                                color="primary" 
                                aria-label={userData.id}
                                onAction={action => handleClickAction(action)}
                            >
                                <Dropdown.Item key="profile" css={{ height: "$16" }}>
                                    <p>В системе как</p>
                                    <b>{userData.username}</b>
                                </Dropdown.Item>
                                <Dropdown.Item 
                                    key="logout" 
                                    color="error" 
                                    withDivider
                                    icon={<BiExit size={22}/>}
                                >
                                    Выйти
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                </div>
            </div>
        </div>
    );
};
