import phonebookService from "../services/phonebook";

const Person = ({ persons, setPersons, setMessage }) => {
  const handleDelete = (p) => {
    if (window.confirm(`Delete ${p.name}`)) {
      phonebookService
        .deletePerson(p)
        .then(() => {
          setPersons(persons.filter((person) => person.name !== p.name));
          setMessage({
            type: "success",
            content: `Deleted ${p.name}`,
          });
        })
        .catch((err) => {
          if (err.response.status) {
            setMessage({ type: "error", content: err.response.data.error });
          }
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
