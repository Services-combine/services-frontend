import classes from './Toggle.module.scss'

export const Toggle = ({props, text, status, change}) => {
    return (
        <label className={classes.label}>
            {status === "checked"
                ? <input type="checkbox" onChange={change} defaultChecked className={classes.Tggl} {...props} />
                : <input type="checkbox" onChange={change} className={classes.Tggl} {...props} />
            }
            <span className={classes.TgglTxt}>{text}</span>
        </label>
    );
};