import { useState } from 'react';
import PropTypes from "prop-types";
import { nanoid } from 'nanoid';
import css from '../ContactForm/ContactForm.module.css'

export const ContactForm = ({addContact}) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        switch (name) {
            case 'contactName':
                setName(value)
                break;
            case 'contactNumber':
                setNumber(value)
                break;
            default:
                setName('')
                setNumber('')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        addContact(name, number);

        setName('')
        setNumber('')
    }

    const nameId = nanoid();
    const numberId = nanoid();
    
    return (<form onSubmit={handleSubmit} className={css.insertWrapper}>
        <label className={css.label} htmlFor={nameId}>Name</label>
        <input
            id={nameId}
            type="text"
            name="contactName"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder='Input name'
            className={css.input} />
        <label className={css.label} htmlFor={numberId}>Number</label>
        <input
            id={numberId}
            type="tel"
            name="contactNumber"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
                placeholder='Input number'
            className={css.input} />
        <button type='submit' className={css.button}>Add contact</button>
    </form>)
}

ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired,
}