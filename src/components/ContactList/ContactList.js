import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import ContactItem from 'components/ContactItem';

export const ContactList = ({ contactNames, deleteItem }) => {
  return (
    <ul className={css.contactList}>
      {contactNames.map(({ name, number, id }) => {
        return (
          <ContactItem
            name={name}
            number={number}
            key={id}
            deleteItem={() => deleteItem(id)}
          />
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contactNames: PropTypes.oneOfType([
    PropTypes.arrayOf({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
    PropTypes.array,
  ]).isRequired,
  deleteItem: PropTypes.func.isRequired,
};
