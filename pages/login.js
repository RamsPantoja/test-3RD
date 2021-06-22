import React from 'react';
import styles from '../styles/Login.module.css';
import { getSession, signIn } from 'next-auth/client'

const LogIn = () => {
    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <h2>CRUD Login</h2>
                <button onClick={() => signIn('google')}>Sign In with Google</button>
            </div>
        </div>
    )
}

export async function getServerSideProps ({req, res}) {
    const session = await getSession({req});
    
    if (session && req) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

export default LogIn;