import { useState, useEffect } from 'react';
import personServ from './services/persons.js';
import Success from './components/success.jsx'

const Persons = ({ persons, onDelete }) => (
  <ul>
    {persons.map(({ id, name, number }) => (
      <li key={id}>
        {name}, {number}
        <button onClick={() => onDelete(id)}>delete</button>
      </li>
    ))}
  </ul>
);

const PersonForm = ({ onSubmit, name, onNameChange, number, onNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={name} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={number} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Filter = ({ value, onChange }) => (
  <div>
    filter shown with: <input value={value} onChange={onChange} />
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    personServ.getAll().then(response => {
      setPersons(response.data);
    });
  }, []);

  const handleAddPerson = (event) => {
    event.preventDefault();
    const existing = persons.find(p => p.name === newName);
    const personObject = { name: newName, number: newNumber };

    if (existing) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {
        personServ.update(existing.id, personObject)
          .then(response => {
            setPersons(persons.map(p => p.id !== existing.id ? p : response.data));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            alert(`Information of ${newName} has already been removed from server`);
            setPersons(persons.filter(p => p.id !== existing.id));
          });
      }
    } else {
      personServ.create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
        });
      
      setSuccess(personObject.name)
      setTimeout(() => setSuccess(null), 5000)
    }
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id);
    if (person && window.confirm(`Delete ${person.name}?`)) {
      personServ.eleminate(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
        })
        .catch(error => {
          console.error("Delete failed:", error);
        });
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Success name={success}/>
      <Filter value={filter} onChange={handleFilterChange} />

      <h2>Add a New</h2>
      <PersonForm
        onSubmit={handleAddPerson}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
