import React from 'react';
import styles from './styles/Layout.module.css';
import Image from 'next/image';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';

const Layout = ({children, openAddClientCard}) => {
    return (
        <div className={styles.layoutContainer}>   
            <header className={styles.layoutHeader}>
                <div className={styles.header}>
                    <div className={styles.logoHeader}>
                        <Image src='/vercel.svg' width={100} height={50}/>    
                    </div>
                    <div className={styles.headerIcons}>
                        <IconButton onClick={openAddClientCard} size='small'>
                            <AddCircleOutlineIcon/>
                        </IconButton>
                        <div className={styles.avatar}>
                            <Image className={styles.avatarRounded} src='/avatarMio.jpg' quality={100} objectFit='cover' layout='fill' />
                        </div>
                    </div>
                </div>
            </header>
            <div className={styles.contentContainerLayout}>
                <div className={styles.contentContainer}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;