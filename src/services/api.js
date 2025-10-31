import axios from 'axios'

const API_URL = 'https://6901e9d7b208b24affe43a38.mockapi.io/students'

export const getStudents = async () => {
  const { data } = await axios.get(API_URL)
  return data
}

export const getStudent = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`)
  return data
}

export const createStudent = async (payload) => {
  const { data } = await axios.post(API_URL, payload)
  return data
}

export const updateStudent = async (id, payload) => {
  const { data } = await axios.put(`${API_URL}/${id}`, payload)
  return data
}

export const deleteStudent = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`)
  return data
}
