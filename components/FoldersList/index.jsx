import styles from './FoldersList.module.scss';
import { FolderItem } from './FolderItem';

export const FoldersList = ({folders}) => {
    return (
        <div className={styles.folders}>
            {folders.map(folder => 
                <FolderItem folder={folder} key={folder.id} />
            )}
        </div>
    );
};
