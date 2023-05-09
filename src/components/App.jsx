import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount = () => {
    const contacts = localStorage.getItem('Contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({
        contacts: parseContacts,
      });
    }
  };

  componentDidUpdate = prevState => {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('Contacts', JSON.stringify(this.state.contacts));
    }
  };

  addContact = data => {
    const idData = nanoid();
    const { name, number } = data;
    const { contacts } = this.state;

    const isContactExsist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    const isNumberExsist = contacts.some(
      contact => contact.number.toLowerCase() === number.toLowerCase()
    );

    if (isContactExsist) {
      return alert(`${name} to already in contacts`);
    }
    if (isNumberExsist) {
      return alert(`${number} to already in contacts`);
    }

    const newContact = {
      id: idData,
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  fiterChange = evt => {
    this.setState({
      filter: evt.currentTarget.value,
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();
    const visibleContact = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );

    return (
      <div className="generalContainet">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.fiterChange} />
        <ContactList
          contactNames={visibleContact}
          deleteItem={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
