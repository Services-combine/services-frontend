import styles from './ModalsForm.module.scss';
import { useRouter } from 'next/router'
import { Api } from '../../utils/api';
import { Button } from '../UI/Button';
import { BsFillPlayFill } from "react-icons/bs"
import { TbLock } from 'react-icons/tb'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar' 


export const ModalLaunch = ({launch, folder}) => {
    const router = useRouter();

    async function checkBlock(e) {
        e.preventDefault()
        try {
			const response = await Api().inviting.checkBlock(router.query.id);
            launch();
		} catch (e) {
			console.log(e.response?.data?.message)
		}
    }

    async function launchInviting(e) {
        e.preventDefault()
        try {
			const response = await Api().inviting.launchInviting(router.query.id);
            launch('inviting');
		} catch (e) {
			console.log(e.response?.data?.message)
		}
    }

    async function launchMailingUsernames(e) {
        e.preventDefault()
        try {
			const response = await Api().inviting.launchMailingUsernames(router.query.id);
            launch('mailing_usernames');
		} catch (e) {
			console.log(e.response?.data?.message)
		}
    }

    async function launchMailingGroups(e) {
        e.preventDefault()
        try {
			const response = await Api().inviting.launchMailingGroups(router.query.id);
            launch('mailing_groups');
		} catch (e) {
			console.log(e.response?.data?.message)
		}
    }

    if (!folder.inviting && !folder.mailing_usernames && !folder.mailing_groups) {
        return (
            <form className={styles.form__input}>   
                <ButtonToolbar className={styles.launch__actions}>
                    <Button mode='fill' onClick={checkBlock}>
                        <p className={styles.action__item}>
                            <TbLock className={styles.action__icon} />
                            Блокировка
                        </p>
                    </Button>
                    <Button mode='fill' onClick={launchInviting}>
                        <p className={styles.action__item}>
                            <BsFillPlayFill className={styles.action__icon} />
                            Инвайтинг
                        </p>
                    </Button>
                    <Button mode='fill' onClick={launchMailingUsernames}>
                        <p className={styles.action__item}>
                            <BsFillPlayFill className={styles.action__icon} />
                            Рассылка пользователям
                        </p>
                    </Button>
                    <Button mode='fill' onClick={launchMailingGroups}>
                        <p className={styles.action__item}>
                            <BsFillPlayFill className={styles.action__icon} />
                            Рассылка в группы
                        </p>
                    </Button>
                </ButtonToolbar>
            </form>
        );
    }
    else {
        return (
            <div style={{textAlign: "center"}}>
                {folder.inviting
                    ? <h5>У вас уже запущен инвайтинг</h5>
                    : <h5>У вас уже запущена рассылка</h5>
                }
            </div>
        );
    }
}
