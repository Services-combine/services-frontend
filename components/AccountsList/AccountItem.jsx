import clsx from 'clsx';
import styles from './AccountsList.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react'
import { ModalConfirmAction } from '../ModalsForm/ModalConfirmAction';
import { ModalFormAccount } from '../ModalsForm/ModalFormAccount';
import { Modal } from '../UI/Modal';
import { BsCheckLg } from "react-icons/bs"
import { RiDeleteBinFill } from "react-icons/ri"

export const AccountItem = (props) => {
    const router = useRouter();
    const [modalDelete, setModalDelete] = useState(false);
    const [modalAccount, setModalAccount] = useState(false);

    const deleteAccount = () => {
        props.remove(props.account);
    }

    const getModalAction = (getAction) => {
        setModalDelete(false);
        if (getAction.action) {
            deleteAccount();
        }
    }

    const closeAfterSave = () => {
        setModalAccount(false)
        refreshData()
    }

    const refreshData = () => {
		router.replace(router.asPath);
	}
    
    return (
        <>
            <div className={clsx(styles.alert, "alert-secondary")}>
                <p className={styles.account__link} onClick={() => setModalAccount(true)}>
                    {props.index+1}. {props.account.name} (+{props.account.phone})
                </p>

                <div className={styles.actions}>
                    <div className={styles.actions__status}>
                        {props.account.status_block === "clean"
                            ? 
                            <h6 className={clsx(styles.status__block, styles.no__block)}>
                                <BsCheckLg />
                            </h6>
                            : 
                            <Tooltip content={props.account.status_block} rounded color="primary">
                                <h6 className={clsx(styles.status__block, styles.info__block)}>
                                    <FaInfoCircle />
                                </h6>
                            </Tooltip>
                        }

                        {props.account.launch &&
                            props.account.status_block === 'clean' &&
                                <h6 className={styles.status__launch}>&bull;</h6>
                        }
                    </div>

                    <button className={styles.delete} onClick={() => setModalDelete(true)}>
                        <RiDeleteBinFill className={styles.delete__icon} />
                    </button>
                </div>
            </div>

            <Modal title="Удаление аккаунта" visible={modalDelete} setVisible={setModalDelete}>
                <ModalConfirmAction description="Вы действительно хотите удалить аккаунт?" result={getModalAction}/>
            </Modal>

            <Modal title="Аккаунт" visible={modalAccount} setVisible={setModalAccount}>
                <ModalFormAccount 
                    account={props.account} 
                    accountsMove={props.accountsMove}
                    folderName={props.folderName}
                    closeAfterSave={closeAfterSave}
                />
            </Modal>
        </>
    );
};