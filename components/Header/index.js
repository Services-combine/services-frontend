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
import { AiOutlineBell, AiOutlineUser } from "react-icons/ai"
import { BiExit, BiSearch } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import { FiSettings } from "react-icons/fi"
import { Button } from "../UI/Button"
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export const Header = () => {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(selectUserData);
    const router = useRouter();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    async function logout() {
        destroyCookie(null, 'token')
        dispatch(setUserData(null));
        router.push("/login")
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
                        <>
                            <div
                                onClick={handleClick}
                                className={styles.dropdown__btn}
                            >
                                <div className={styles.profile__icon}>
                                    <AiOutlineUser/>
                                </div>
                            </div>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                className={styles.actions}
                            >
                                <MenuItem 
                                    className={styles.action__item} 
                                    onClick={logout}
                                >
                                    <BiExit className={styles.action__icon} /> Выйти
                                </MenuItem>
                            </Menu>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};
