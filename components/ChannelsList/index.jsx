import styles from './ChannelsList.module.scss';
import { ChannelItem } from './ChannelItem';

export const ChannelsList = ({channels, marks, filter}) => {
    return (
        <div className={styles.channels}>
            {channels.map(channel => 
                channel.mark === filter
                    ? <ChannelItem channel={channel} marks={marks} key={channel.id} />
                    : filter === 'all' &&
                        <ChannelItem channel={channel} marks={marks} key={channel.id} />
            )}
        </div>
    );
};
