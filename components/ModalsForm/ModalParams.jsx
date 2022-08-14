import React from 'react'
import styles from './ModalsForm.module.scss';

export const ModalParams = ({props}) => {

    return (
        <div className={styles.params}>
            <h4>Всего аккаунтов - {props.all}</h4>
            <h4>Чистых аккаунтов - {props.clean}</h4>
            <h4>Заблокированных аккаунтов - {props.block}</h4>
        </div>
	);
}
