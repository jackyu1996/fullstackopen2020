import { useState } from "react";
import phonebookService from "../services/phonebook.js";

const PersonForm = ({ persons, setPersons, setMessage }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const cleanUp = () => {
    setNewName("");
    setNewNumber("");
  };

  const promptAndUpdate = (found) => {
    if (
      window.confirm(
        `${found.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      phonebookService
        .updatePerson(found, newNumber)
        .catch((e) => setMessage({ type: "error", content: e.message }));

      setPersons(
        persons.map((p) =>
          p.name === found.name ? { ...found, number: newNumber } : p
        )
      );

      setMessage({ type: "success", content: `Updated ${newName}` });
      cleanUp();
    } else {
      return;
    }
  };

  const addPerson = (e) => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    let found = persons.find(
      (p) => p.name === newName && p.number !== newNumber
    );

    if (found) {
      promptAndUpdate(found);
    } else {
      phonebookService
        .createPerson(personObject)
        .catch((e) => setMessage({ type: "error", content: e.message }));

      setPersons(persons.concat(personObject));
      setMessage({ type: "success", content: `Added ${newName}` });
      cleanUp();
    }
  };
  return (
    <form onSubmit={addPerson}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
