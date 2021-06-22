import React, { useState, Fragment, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './styles/ClientOptions.module.css';
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useHandleOnClickOutside from './hooks/useHandleOnClickOutside';
import AddClientCard from './AddClientCard';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const ClientOptions = ({Id}) => {
    const wrapperRef = useRef(null);
    const [open, isOnfocus, openMenu] = useHandleOnClickOutside(wrapperRef);
    const [formToEditClient, setFormToEditClient] = useState(false); 
    const { enqueueSnackbar } = useSnackbar();

    const varians ={
        open: {
            display: 'flex',
            x: 25,
            y: -35,
            opacity: 1,
        },
        closed: {
            x: 25,
            y: -35,
            opacity: 0,
            transitionEnd: {
                display: 'none'
            }
        }
    }

    const showFormToEditClient = () => {
        if (formToEditClient) {
            setFormToEditClient(false)
        } else {
            setFormToEditClient(true)
        }
    }

    const handleOnClickDelete = () => {
        axios({
            method: 'get',
            url: `/api/delete_client?id=${Id}`
        })
        .then((res) => {
            enqueueSnackbar(res.data, { variant: 'success', anchorOrigin: { vertical: 'bottom', horizontal: 'left'}})
        })
        .catch((error) => {
            if (error.response) {
                enqueueSnackbar(error.response.data, { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'left'}});
            }
        })
    }

    const isFormToEditClient = formToEditClient ? <AddClientCard title={'Editar cliente'} urlEndPoint={`/api/edit_client?id=${Id}`} openAddClientCard={showFormToEditClient}/> : null;

    return (
        <Fragment>
            {isFormToEditClient}
            <IconButton onClick={openMenu} ref={wrapperRef} style={{backgroundColor: `${isOnfocus}`}}>
                <MoreHorizIcon/>
            </IconButton>
            <motion.ul className={styles.clientOptionsList}
            animate={open ? 'open' : 'closed'}
            variants={varians}
            initial={{
                display: 'none'
            }}>
                <motion.li className={styles.clientOptions} onClick={showFormToEditClient}>Editar</motion.li>
                <motion.li className={styles.clientOptionsDelete} onClick={handleOnClickDelete}>Eliminar</motion.li>
            </motion.ul>
        </Fragment>
    )
}

export default ClientOptions;