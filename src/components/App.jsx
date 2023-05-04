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

  addContact = data => {
    const idData = nanoid();
    const { name, number } = data;

    const isContactExsist = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isContactExsist) {
      return alert(`${name} to already in contacts`);
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

  componentDidMount = () => {
    const contacts = localStorage.getItem('Contact');
    const parseContacts = JSON.parse(contacts);
    this.setState({
      contacts: parseContacts,
    });
  };

  componentDidUpdate = () => {
    localStorage.setItem('Contact', JSON.stringify(this.state.contacts));
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
