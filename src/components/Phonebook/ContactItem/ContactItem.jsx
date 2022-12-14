import React from 'react';
import PropTypes from "prop-types";
import css from '../ContactItem/ContactItem.module.css'

export const ContactItem = ({ data, onClick }) => {
    const { id, name, number } = data;
    return <li className={css.contactItem}>
        <p className={css.contactText}>{name}: {number}</p>
        <button type='button' className={css.contactBtn} onClick={() => onClick(id)}>Delete</button>
    </li>
}

ContactItem.propTypes = {
    data: PropTypes.objectOf(PropTypes.string.isRequired,),
    onClick: PropTypes.func.isRequired,
}