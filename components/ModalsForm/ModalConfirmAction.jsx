import styles from "./ModalsForm.module.scss"
import { Button } from '../UI/Button';

export const ModalConfirmAction = ({result}) => {
    
    const addResultAction = (action) => {
		const newAction = {
            action, id: Date.now()
        }
        result(newAction)
	}

    return (
        <div className={styles.form__confirm}>
            <h5 className={styles.confirm__title}>Вы уверены?</h5>

            <div className={styles.actions}>
                <Button onClick={() => addResultAction(true)}>Да</Button>
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
