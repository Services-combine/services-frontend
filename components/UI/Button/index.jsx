import clsx from 'clsx';
import styles from './Button.module.scss'


export const Button = ({mode, children, ...props}) => {

	if (props.disabled) {
		return (
			<button className={clsx(styles.default, styles.disabled)} disabled>
				{children}
			</button>
		  );
	}

  	return (
		<button className={clsx(styles.default, mode === 'fill' ? styles.fill : styles.outline)} {...props}>
			{children}
		</button>
  	);
}