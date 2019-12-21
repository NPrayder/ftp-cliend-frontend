import axios from 'axios';

const BASE_URL = 'https://ftp-client-backend.herokuapp.com';

const getConnections = async () => {
    const response = await axios.get(`${BASE_URL}/api/connections`);
    return response.data;
};

const addConnection = async data => {
    const response = await axios.post(`${BASE_URL}/api/connections`, {...data});
    return response.data;
};

const editConnection = async data => {
    const response = await axios.put(`${BASE_URL}/api/connections/${data.id}`, {...data});
    return response.data;
};

const deleteConnection = async id => {
    await axios.delete(`${BASE_URL}/api/connections/${id}`);
};

export default {
    getConnections,
    addConnection,
    editConnection,
    deleteConnection
};