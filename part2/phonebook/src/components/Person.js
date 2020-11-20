import phonebookService from "../services/phonebook";

const Person = ({ persons, setPersons, setMessage }) => {
  const handleDelete = (p) => {
    if (window.confirm(`Delete ${p.name}`)) {
      phonebookService.deletePerson(p).catch((e) =>
        setMessage({
          type: "error",
          content: `Information of ${p.name} has already been removed from server`,
        })
      );

      setPersons(persons.filter((person) => person.name !== p.name));
      setMessage({
        type: "success",
        content: `Deleted ${p.name}`,
      });
    }
  };

  return (
    <>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person)}>delete</button>
        </p>
      ))}
    </>
  );
};
export default Person;
