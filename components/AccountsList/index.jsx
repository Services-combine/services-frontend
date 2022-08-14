import styles from './AccountsList.module.scss';
import clsx from 'clsx';
import { AccountItem } from './AccountItem';

export const AccountsList = ({accounts, remove, sendCodeParsing, parsingApi, sendCodeSession, createSession}) => {
    return (
        <div className={clsx(styles.accounts, "container")}>
            {accounts.map((account, index) => 
                <AccountItem remove={remove} account={account} sendCodeParsing={sendCodeParsing} parsingApi={parsingApi} sendCodeSession={sendCodeSession} createSession={createSession} index={index} key={index} />
            )}
        </div>
    );
};
