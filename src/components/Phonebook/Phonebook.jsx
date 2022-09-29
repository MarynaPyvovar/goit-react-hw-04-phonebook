import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './Phonebook.module.css'

export const Phonebook = () => {
    const [contacts, setContacts] = useState(() => {return JSON.parse(window.localStorage.getItem('contacts')) ?? []});
    const [filter, setFilter] = useState('');

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts))
    }, [contacts])

    const handleChange = (e) => {
        setFilter(e.target.value)
    }

    const getFilteredContacts = () => {
        if (!filter) {
            return contacts;
        }
        
        return contacts.filter(({name}) => name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    }

    const removeContact = (contactId) => {
        setContacts(prev => prev.filter(item => item.id !== contactId))
    }

    const contactAlreadyExists = (name, number) => {
    return contacts.find((item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase() || item.number === number);
    }

    const addContact = (name, number) => {
        if (contactAlreadyExists(name, number)) {
        return alert(`${name} ${number} is already in Phonebook`);
        }

        setContacts(prev => [{ id: nanoid(), name, number }, ...prev])
    }

    return <>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm addContact={addContact} />

        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onChange={handleChange} />
        <ContactList contacts={getFilteredContacts()} onClick={removeContact} />
    </>
}