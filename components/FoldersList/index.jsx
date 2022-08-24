import styles from './FoldersList.module.scss';
import { FolderItem } from './FolderItem';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

export const FoldersList = ({folders}) => {
    return (
        <ButtonToolbar className={styles.folders}>
            {folders.map(folder => 
                <FolderItem folder={folder} key={folder.id} />
            )}
        </ButtonToolbar>
    );
};
