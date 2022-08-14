import Link from "next/link"
import styles from './FoldersList.module.scss';
import { AiFillFolder } from "react-icons/ai"

export const FolderItem = (props) => {
    return (
        <div>
            <Link href={`/folder/${props.folder.id}`}>
                <div className={styles.folder}>
                    <AiFillFolder className={styles.folder__icon}/>
                    <h6 className={styles.folder__name}>{props.folder.name}</h6>
                </div>
            </Link>
        </div>
    );
};
