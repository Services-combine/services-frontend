import clsx from 'clsx';
import styles from './AccountsList.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react'
import { ModalConfirmAction } from '../ModalsForm/ModalConfirmAction';
import { ModalFormAccount } from '../ModalsForm/ModalFormAccount';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { Modal } from '../UI/Modal';
import { RiDeleteBinFill } from "react-icons/ri"
import { BsCheckLg } from "react-icons/bs"
import { FaInfoCircle } from "react-icons/fa"

export const AccountItem = (props) => {
    const router = useRouter();
    const [code, setCode] = useState("");
    const [modalDelete, setModalDelete] = useState(false);
    const [modalAccount, setModalAccount] = useState(false);

    const deleteAccount = () => {
        props.remove(props.account);
    }

    const sendCodeParsing = () => {
        props.sendCodeParsing(props.account.id);
    }

    const parsingApi = () => {
        props.parsingApi(props.account.id, code);
        setCode('');
    }

    const sendCodeSession = () => {
        props.sendCodeSession(props.account.id);
    }

    const createSession = () => {
        props.createSession(props.account.id, code);
        setCode('');
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
                    {props.account.api_id === 0
                        ?
                        <div className={styles.actions__parsing}>
                            <Button mode='fill' onClick={sendCodeParsing}>
                                <p className={styles.action__button}>
                                    Отпправить код
                                </p>
                            </Button>
                            <Input 
                                value={code}
                                onChange={e => setCode(e.target.value)}
                                type='text' 
                                placeholder='Код'
                            />
                             <Button mode='outline' onClick={parsingApi}>
                                <p className={styles.action__button}>
                                    Спарсить api
                                </p>
                            </Button>
                        </div>
                        :
                        props.account.verify !== true
                            ?
                            <div className={styles.actions__create}>
                                <Button mode='fill' onClick={sendCodeSession}>
                                    <p className={styles.action__button}>
                                        Отпправить код
                                    </p>
                                </Button>
                                <Input 
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                    type='text' 
                                    placeholder='Код'
                                />
                                <Button mode='outline' onClick={createSession}>
                                    <p className={styles.action__button}>
                                        Создать файл
                                    </p>
                                </Button>
                            </div>
                            :
                            <div className={styles.actions__status}>
                                {props.account.status_block === "clean"
                                    ? 
                                    <h6 className={clsx(styles.status__block, styles.no__block)}>
                                        <BsCheckLg />
                                    </h6>
                                    : 
                                    <h6 className={clsx(styles.status__block, styles.info__block)} unblocking={props.account.status_block}>
                                        <FaInfoCircle />
                                    </h6>
                                }

                                {props.account.launch &&
                                    props.account.status_block === 'clean' &&
                                        <h6 className={styles.status__launch}>&bull;</h6>
                                }
                            </div>
                    }

                    <button className={styles.delete} onClick={() => setModalDelete(true)}>
                        <RiDeleteBinFill className={styles.delete__icon} />
                    </button>
                </div>
            </div>

            <Modal title="Удаление аккаунта" visible={modalDelete} setVisible={setModalDelete}>
                <ModalConfirmAction result={getModalAction}/>
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