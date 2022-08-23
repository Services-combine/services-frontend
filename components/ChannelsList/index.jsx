import styles from './ChannelsList.module.scss';
import { ChannelItem } from './ChannelItem';

export const ChannelsList = ({channels}) => {
    return (
        <div className={styles.channels}>
            {channels.map(channel => 
                <ChannelItem channel={channel} key={channel.id} />
            )}
        </div>
    );
};
