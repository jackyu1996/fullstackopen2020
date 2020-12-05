import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const genConfig = () => {
  return {
    headers: { Authorization: token },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, genConfig());
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, genConfig());
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, genConfig());
  return response.data;
};

const createComment = async (id, newContent) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {
    content: newContent,
  });
  return response.data;
};

const getComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`);
  return response.data;
};

const blogService = {
  getAll,
  create,
  update,
  remove,
  setToken,
  createComment,
  getComments,
};

export default blogService;
