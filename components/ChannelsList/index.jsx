import styles from './ChannelsList.module.scss';
import { ChannelItem } from './ChannelItem';

export const ChannelsList = ({channels, marks}) => {    
    return (
        <div className={styles.channels}>
            {channels.map(channel => 
                <ChannelItem channel={channel} marks={marks} key={channel.id} />
            )}
        </div>
    );
};
