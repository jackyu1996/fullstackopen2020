import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import phonebookService from "./services/phonebook";
import "./index.css";
import Message from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({ type: "success", content: "" });

  useEffect(() => {
    phonebookService
      .getAllPersons()
      .then((persons) => setPersons(persons))
      .catch((e) => setMessage({ type: "error", content: e.message }));
  }, []);

  return (
    <>
      <h2>Phonebook</h2>
      <Message message={message} setMessage={setMessage} />
      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />

      <h3>Numbers</h3>
      <Person
        persons={persons.filter((p) => p.name.toLowerCase().includes(filter))}
        setPersons={setPersons}
        setMessage={setMessage}
      />
    </>
  );
};

export default App;
