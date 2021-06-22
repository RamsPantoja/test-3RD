import React from 'react';
import styles from './styles/Layout.module.css';
import Image from 'next/image';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import image from 'next/image';
import { signOut } from 'next-auth/client';

const Layout = ({children, openAddClientCard, img}) => {
    return (
        <div className={styles.layoutContainer}>   
            <header className={styles.layoutHeader}>
                <div className={styles.header}>
                    <div className={styles.logoHeader}>
                        <Image src='/vercel.svg' alt='logo' width={100} height={50}/>    
                    </div>
                    <div className={styles.headerIcons}>
                        <IconButton onClick={openAddClientCard} size='small'>
                            <AddCircleOutlineIcon/>
                        </IconButton>
                        <div className={styles.avatar}>
                            <Image className={styles.avatarRounded} src={img} alt='tu avatar' quality={100} objectFit='cover' layout='fill' />
                        </div>
                        <button className={styles.buttonToLogOut} onClick={() => signOut()}>Sign out</button>
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