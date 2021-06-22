import React from 'react';
import styles from './styles/ClientCard.module.css';
import Avatar from '@material-ui/core/Avatar';
import ClientOptions from './ClientOptions';

const ClientCard = ({firstname, getClientId, Id}) => {
    return (
        <div className={styles.clientCard}>
            <div className={styles.clientCardHeader}>
                <div className={styles.clientCardHeaderInf}>
                    <span onClick={(e) => {getClientId(e, Id)}}>{firstname}</span>
                </div>
                <div className={styles.clientCardHeaderIcon}>
                    <ClientOptions
                    Id={Id}/>
                </div>
            </div>
        </div>
    )
}

export default ClientCard;