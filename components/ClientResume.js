import React from 'react';
import styles from './styles/ClientResume.module.css';


const ClientResume = ({client}) => {
    const {nombre, apellidoPaterno, apellidoMaterno, genero, fecha, numero} = client;
    
    return (
        <div className={styles.resumeContainer}>
            <h4>Resume del cliente</h4>
            <ul className={styles.resumeList}>
                <li className={styles.resumeItem}>{nombre}</li>
                <li className={styles.resumeItem}>{apellidoPaterno}</li>
                <li className={styles.resumeItem}>{apellidoMaterno}</li>
                <li className={styles.resumeItem}>{genero}</li>
                <li className={styles.resumeItem}>{fecha}</li>
                <li className={styles.resumeItem}>{numero}</li>
            </ul>
        </div>
    )
}

export default ClientResume;