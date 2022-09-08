import styles from "./ModalsForm.module.scss"
import { Button } from '../UI/Button';

export const ModalConfirmAction = ({description, result}) => {
    
    const addResultAction = (action) => {
		const newAction = {
            action, id: Date.now()
        }
        result(newAction)
	}

    return (
        <div className={styles.form__confirm}>
            <p className={styles.confirm__title}>{description}</p>

            <div className={styles.actions}>
                <Button mode='fill'  onClick={() => addResultAction(true)}>Да</Button>
                <Button 
                    mode='outline' 
                    className={styles.button__cancel} 
                    onClick={() => addResultAction(false)}
                >
                    Отмена
                </Button>
            </div>
        </div>
	);
}
