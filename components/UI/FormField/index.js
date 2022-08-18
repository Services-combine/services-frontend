import { useFormContext } from "react-hook-form";
import styles from "./FormField.module.scss";
import TextField from '@mui/material/TextField';


export function FormField({name, label, type, ...props}) {
    const { register, formState } = useFormContext();

    return (
        <TextField
            {... register(name)}
            name={name}
            type={type}
            label={label}
            variant="outlined"
            size='small'
            error={!!formState.errors[name]?.message}
            helperText={formState.errors[name]?.message}
            className={styles.form__input}
            {... props}
        />
    );
}