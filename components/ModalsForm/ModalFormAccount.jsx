import { useState } from 'react';
import styles from './ModalsForm.module.scss';
import { Api } from '../../utils/api';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { Select } from '../UI/Select';
import { FaRandom } from "react-icons/fa"


export const ModalFormAccount = ({account, accountsMove, folderName, closeAfterSave}) => {
    const [name, setName] = useState(account.name);
    const [interval, setInterval] = useState(account.interval);
    const [folder, setFolder] = useState(account.folder);
    console.log(accountsMove)

    async function saveSettings(e) {
        try {
            e.preventDefault();
			await Api().inviting.saveSettingsAccount(account.folder, account.id, name, interval, folder);
            closeAfterSave()
		} catch (error) {
			console.log(error)
		}
    }

    const randomInterval = (e) => {
        e.preventDefault()
        const min = 15;
        const max = 40;
        const rand = Math.floor(min + Math.random() * (max - min));
        setInterval(rand);
    }

    return (
        <form className={styles.form__account}>
            <div className={styles.name__account}>
                <h6 className={styles.title}>Название аккаунта</h6>
                <Input 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type='text' 
                    placeholder='Введите название' 
                />
            </div>
            
            <h6 className={styles.title}>Номер телефона - +{account.phone}</h6>

            <h6 className={styles.title}>Интервал</h6>
            <div className={styles.interval}>
                <Input 
                    value={interval}
                    onChange={e => setInterval(e.target.value)}
                    type='text' 
                    placeholder='Введите интервал' 
                />
                <Button mode='outline' className={styles.generate} onClick={randomInterval}>
                    <FaRandom className={styles.generate__icon} />
                </Button>
            </div>

            <h6 className={styles.title}>Папка</h6>
            <Select
                defaultName={folderName}
                options={accountsMove}
                value={folder} 
                onChange={folder => setFolder(folder)}
            />

            <Button mode='fill' onClick={saveSettings}>Сохранить</Button>
        </form>
	);
}
