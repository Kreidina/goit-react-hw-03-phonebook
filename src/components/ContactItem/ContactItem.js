import PropTypes from 'prop-types';
import css from './ContactItem.module.css';

const ContactItem = ({ name, number, deleteItem }) => {
  return (
    <li className={css.contactItem}>
      <span>{name}</span>: <span>{number}</span>
      <button className={css.deleteBtn} type="button" onClick={deleteItem}>
        Delete
      </button>
    </li>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
