import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import styles from "./MainLayout.module.scss";


export function MainLayout({children}) {
    const userData = useAppSelector(selectUserData);

    return (
        <main className={styles.content}>
            {children}
        </main>
    );
}