import classes from './Loader.module.css'

export const Loader = () => {
    return (
		<div className={classes.loader}>
			<div className={classes.preloader}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
		</div>
    );
};