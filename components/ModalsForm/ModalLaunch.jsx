import clsx from 'clsx';
import styles from './ModalsForm.module.scss';
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Api } from '../../utils/api';
import { Button } from '../UI/Button';


export const ModalLaunch = ({launch, folder}) => {
    const router = useRouter();
    const [isError, setIsError] = useState(null);
    const timeout = 3000;

    async function checkBlock(e) {
        e.preventDefault()
        try {
			const response = await Api().inviting.checkBlock(router.query.id);
            launch();
		} catch (e) {
			setIsError(e.response?.data?.message);
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
    }

    async function launchInviting(e) {
        e.preventDefault()
        try {
			const response = await Api().inviting.launchInviting(router.query.id);
            launch('inviting');
		} catch (e) {
			setIsError(e.response?.data?.message);
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
    }

    async function launchMailingUsernames(e) {
        e.preventDefault()
        try {
			const response = await Api().inviting.launchMailingUsernames(router.query.id);
            launch('mailing_usernames');
		} catch (e) {
			setIsError(e.response?.data?.message);
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
    }

    async function launchMailingGroups(e) {
        e.preventDefault()
        try {
			const response = await Api().inviting.launchMailingGroups(router.query.id);
            launch('mailing_groups');
		} catch (e) {
			setIsError(e.response?.data?.message);
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
    }

    if (!folder.inviting && !folder.mailing_usernames && !folder.mailing_groups) {
        return (
            <form className={clsx(styles.launch__btns, "btn-toolbar")} role="toolbar">   
                <Button onClick={checkBlock}><i className="fas fa-user-lock"></i> Блокировка</Button>
                <Button onClick={launchInviting}><i className="fas fa-play"></i> Инвайтинг</Button>
                <Button onClick={launchMailingUsernames}><i className="fas fa-play"></i> Рассылка пользователям</Button>
                <Button onClick={launchMailingGroups}><i className="fas fa-play"></i> Рассылка в группы</Button>
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
