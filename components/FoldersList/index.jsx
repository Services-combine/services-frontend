import React from 'react'
import clsx from 'clsx';
import styles from './FoldersList.module.scss';
import { FolderItem } from './FolderItem';

export const FoldersList = ({folders}) => {
    return (
        <div className={clsx(styles.folders, "btn-toolbar container")} role="toolbar">
            {folders.map(folder => 
                <FolderItem folder={folder} key={folder.id} />
            )}
        </div>
    );
};
