import { useState, forwardRef, useImperativeHandle } from 'react';
import classes from './Snackbar.module.scss'
import { GrFormClose } from 'react-icons/gr'


export const Snackbar = forwardRef((props, ref) => {
    const [show, setShow] = useState(false);
    const timeout = 5000;
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    useImperativeHandle(ref, () => ({
        show(message, type) {
            setMessage(message);
            setType(type);

            setShow(true);
            setTimeout(() => {
                setShow(false)
            }, timeout)
        }
    }));
    
    return (
        show &&
            <div
                className={classes.snackbar}
                id={type === "error" ? classes.error : classes.success}
            >
                <div className={classes.message}>{message}</div>
                <GrFormClose onClick={() => setShow(false)} className={classes.close}/>
            </div>
    );
})