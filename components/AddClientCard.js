import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styles from './styles/AddClientCard.module.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import useHandleFormAddClient from './hooks/useHandleFormAddUser';
import { addClientSchema, addClientValidationSchema, disableSchema } from './hooks/useHandleFormAddUser';
import cn from 'classnames';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const AddClientCard = ({openAddClientCard, urlEndPoint, title}) => {
    const [handleOnChange, state, disable] = useHandleFormAddClient(addClientSchema, addClientValidationSchema, disableSchema);
    const {firstname, lastnameFather, lastnameMother, gender, date, phoneNumber} = state;
    const { enqueueSnackbar } = useSnackbar();
    const [isThereError, setIsThereError] = useState(false);

    const handleOnSubmit = (e) => {
        setIsThereError(true)
        e.preventDefault();
        axios({
            method: 'post',
            data: {
                firstname: firstname.value,
                lastnameFather: lastnameFather.value,
                lastnameMother: lastnameMother.value,
                gender: gender.value,
                date: date.value,
                phoneNumber: phoneNumber.value
            },
            url: urlEndPoint
        })
        .then((res) => {
            enqueueSnackbar(res.data, { variant: 'success', anchorOrigin: { vertical: 'bottom', horizontal: 'left'}});
            openAddClientCard();
        })
        .catch((error) => {
            if (error.response) {
                enqueueSnackbar(error.response.data, { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'left'}});
            }
        })
    }

    const errorForm = isThereError && disable.disable ? <span className={styles.errorForm}>{disable.error}</span> : null;

    return (
        <div className={styles.addClientCardContainer}>
            <div className={styles.addClientCardModal}></div>
            <div className={styles.addClientCard}>
                <div className={styles.addClientCardHeader}>
                    <h3>{title}</h3>
                    <IconButton onClick={openAddClientCard}>
                        <CloseIcon fontSize='small'/>
                    </IconButton>
                </div>
                <form className={styles.addClientCardForm} onSubmit={(e) => {handleOnSubmit(e)}}>
                    {errorForm}
                    <input type='text' placeholder='Nombre(s)' name='firstname' value={firstname.value} onChange={(e) => {handleOnChange(e)}} className={
                        cn({
                            [styles.successInput]: firstname.errorfield === 'successInput',
                            [styles.errorInput]: firstname.errorfield === 'errorInput'
                        })
                    }/>
                    <input type='text' placeholder='Apellido paterno' name='lastnameFather' value={lastnameFather.value} onChange={(e) => {handleOnChange(e)}} className={
                        cn({
                            [styles.successInput]: lastnameFather.errorfield === 'successInput',
                            [styles.errorInput]: lastnameFather.errorfield === 'errorInput'
                        })
                    }/>
                    <input type='text' placeholder='Apellido materno' name='lastnameMother' value={lastnameMother.value} onChange={(e) => {handleOnChange(e)}} className={
                        cn({
                            [styles.successInput]: lastnameMother.errorfield === 'successInput',
                            [styles.errorInput]: lastnameMother.errorfield === 'errorInput'
                        })
                    }/>
                    <div className={
                        cn({
                            [styles.successInput]: gender.errorfield.errorfield === 'successInput',
                            [styles.errorInput]: gender.errorfield === 'errorInput'
                        })
                    }>
                        <RadioGroup row={true} name='gender' value={gender.value} onChange={(e) => {handleOnChange(e)}}>
                            <FormControlLabel aria-setsize='small' value='Mujer' label='Mujer' control={<Radio size='small' style={{color: '#0095f6'}}/>}/>
                            <FormControlLabel value='Hombre' label='Hombre' control={<Radio size='small' style={{color: '#0095f6'}}/>}/>
                        </RadioGroup>
                    </div>
                    <input type='date'  name='date' value={date.value} onChange={(e) => {handleOnChange(e)}} className={
                        cn({
                            [styles.successInput]: date.errorfield === 'successInput',
                            [styles.errorInput]: date.errorfield === 'errorInput'
                        })
                    }/>
                    <input type='text'  placeholder='Número de teléfono' name='phoneNumber' value={phoneNumber.value} onChange={(e) => {handleOnChange(e)}} className={
                        cn({
                            [styles.successInput]: phoneNumber.errorfield === 'successInput',
                            [styles.errorInput]: phoneNumber.errorfield === 'errorInput'
                        })
                    }/>
                    <div className={styles.buttonFlex}>
                        <button className={styles.submitButton} type='submit'>{title}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddClientCard;