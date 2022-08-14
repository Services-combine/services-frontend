import { useState } from 'react'
import Link from "next/link"
import styles from './AccountsList.module.scss';
import clsx from 'clsx';
import { ModalConfirmAction } from '../ModalsForm/ModalConfirmAction';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { Modal } from '../UI/Modal';
import { RiDeleteBinFill } from "react-icons/ri"
import { BsCheck2 } from "react-icons/bs"
import { FaInfoCircle } from "react-icons/fa"
import { RiSendPlaneLine } from "react-icons/ri"
import { AiOutlineFileAdd } from "react-icons/ai"
import { TbApi } from "react-icons/tb"

export const AccountItem = (props) => {
    const [modalDelete, setModalDelete] = useState(false);
    const [code, setCode] = useState("");

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
    
    return (
        <>
            <div className={clsx(styles.alert, "alert-secondary")}>
                <Link href={`/account/${props.account.id}`}>
                    <p className={styles.account__link}>
                        {props.index+1}. {props.account.name} (+{props.account.phone})
                    </p>
                </Link>

                <div className={styles.actions}>
                    {props.account.api_id === 0
                        ?
                        <div className={styles.actions__parsing}>
                            <Button mode='fill' onClick={sendCodeParsing}>
                                <p className={styles.action__button}>
                                    <RiSendPlaneLine className={styles.action__icon} /> 
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
                                    <TbApi className={styles.action__icon} /> 
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
                                        <RiSendPlaneLine className={styles.action__icon} /> 
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
                                        <AiOutlineFileAdd className={styles.action__icon} /> 
                                        Создать файл
                                    </p>
                                </Button>
                            </div>
                            :
                            <div className={styles.actions__status}>
                                {props.account.status_block === "clean"
                                    ? 
                                    <h6 className={clsx(styles.status__block, styles.no__block)}>
                                        <BsCheck2 />
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

                    <button className={styles.delete} onClick={deleteAccount}>
                        <RiDeleteBinFill className={styles.delete__icon} />
                    </button>
                </div>
            </div>

            <Modal visible={modalDelete} setVisible={setModalDelete}>
                <ModalConfirmAction result={getModalAction}/>
            </Modal>
        </>
    );
};