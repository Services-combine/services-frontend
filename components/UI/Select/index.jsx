import React from 'react';
import styles from './Select.module.scss'

export const Select = ({options, defaultName, value, onChange}) => {
    return (
        <select 
            className={styles.Select}
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option value="">{defaultName}</option>
            {options.map(option => 
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};