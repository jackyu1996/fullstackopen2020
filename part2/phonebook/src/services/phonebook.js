import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const createPerson = (p) => {
  return axios.post(baseUrl, p);
};

const deletePerson = (p) => {
  return axios.delete(`${baseUrl}/${p.id}`);
};

const updatePerson = (p, newNumber) => {
  const changedPerson = { ...p, number: newNumber };
  return axios.put(`${baseUrl}/${p.id}`, changedPerson);
};

const phonebookService = {
  getAllPersons,
  createPerson,
  deletePerson,
  updatePerson,
};

export default phonebookService;
