import styles from './Mark.module.scss'
import variables from '../../../styles/colors.module.scss'


export const Mark = ({title, color}) => {
    let markColors = new Map();
    markColors.set('light-gray', variables.lightgraycolor)
    markColors.set('gray', variables.graycolor)
    markColors.set('brown', variables.browncolor)
    markColors.set('orange', variables.orangecolor)
    markColors.set('yellow', variables.yellowcolor)
    markColors.set('green', variables.greencolor)
    markColors.set('blue', variables.bluecolor)
    markColors.set('purple', variables.purplecolor)
    markColors.set('pink', variables.pinkcolor)
    markColors.set('red', variables.redcolor)

    return (
        <li 
            className={styles.title}
            style={{backgroundColor: markColors.get(color)}}
        >
            {title}
        </li>
    );
};