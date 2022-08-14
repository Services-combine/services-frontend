import styles from './Modal.module.scss'
import { GrFormClose } from 'react-icons/gr'


export const Modal = ({title, children, visible, setVisible}) => {

    const rootClasses = [styles.modal]
    if (visible) {
        rootClasses.push(styles.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={styles.modal__content} onClick={(e) => e.stopPropagation()}>
                <div className={styles.head}>
                    {title}
                    <GrFormClose onClick={() => setVisible(false)} className={styles.close}/>
                </div>

                {children}
            </div>
        </div>
    );
};