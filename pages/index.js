import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import ClientCard from '../components/ClientCard';
import AddClientCard from '../components/AddClientCard';
import ClientResume from '../components/ClientResume';
import Image from 'next/image';
import { getSession } from 'next-auth/client';

const App = ({data, session}) => {
    const [isAddClientCard, setIsAddClientCard] = useState(false);
    const [client, setClient] = useState(null);

    const openAddClientCard = () => {
        if (isAddClientCard) {
            setIsAddClientCard(false)
        } else {
            setIsAddClientCard(true)
        }
    }

    const getIdByClient = async (e, id) => {
        e.preventDefault();
        const data = await fetch(`/api/get_client?id=${id}`);
        const clientById = await data.json();
        setClient(clientById);
    }

    const addClientCard = isAddClientCard ? <AddClientCard title={'Agregar cliente'} urlEndPoint={'/api/add_client'} openAddClientCard={openAddClientCard}/> : null;
    const isThereClient = client !== null ? <ClientResume client={client}/> : <Image src='/avatar.svg' alt='Tu avatar' width={100} height={200} objectFit='contain'/> 
    return (
        <Layout openAddClientCard={openAddClientCard} img={session.user.image}>
            {addClientCard}
            <div className={styles.homeContainer}>
                <div className={styles.clientLayoutLeft}>
                    <h3>Clientes -</h3>
                    {
                        data.map((client) => {
                            return (
                                <ClientCard key={client._id}
                                firstname={client.nombre}
                                getClientId={getIdByClient}
                                Id={client._id}/>
                            )
                        })
                    }
                </div>
                <div className={styles.clientLayoutRight}>
                    <div className={styles.resumeClientFixed}>
                        {isThereClient}
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export async function getServerSideProps({req, res}) {
    const response = await fetch(`${process.env.BASE_URL}/api/get_clients`);
    const data = await response.json();

    const session = await getSession({req});

    if (!session && req) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    if (!data) {
        return {
            noFound: true
        }
    }

    return {
        props: {data, session}
    }
}


export default App;