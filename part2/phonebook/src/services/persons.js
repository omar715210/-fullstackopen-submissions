import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseURL)
}

const create = (Obj) => {
  return axios.post(baseURL,Obj)
}

const eleminate = (id) =>{
  return axios.delete(`${baseURL}/${id}`)
} 

const update = (id, newObject) => {
  return axios.put(`${baseURL}/${id}`, newObject);
};

export default { getAll, create, eleminate, update };
