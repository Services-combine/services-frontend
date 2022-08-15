import styles from './AccountsList.module.scss';
import clsx from 'clsx';
import { AccountItem } from './AccountItem';

export const AccountsList = ({accounts, accountsMove, folderName, remove, sendCodeParsing, parsingApi, sendCodeSession, createSession}) => {
    return (
        <div className={clsx(styles.accounts, "container")}>
            {accounts.map((account, index) => 
                <AccountItem 
                    account={account} 
                    accountsMove={accountsMove} 
                    folderName={folderName}
                    remove={remove} 
                    sendCodeParsing={sendCodeParsing} 
                    parsingApi={parsingApi} 
                    sendCodeSession={sendCodeSession} 
                    createSession={createSession} 
                    index={index} 
                    key={index} 
                />
            )}
        </div>
    );
};
