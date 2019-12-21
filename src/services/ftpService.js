import axios from 'axios';
import fileDownload from 'js-file-download';

const BASE_URL = 'https://ftp-client-backend.herokuapp.com';

const connectToFtp = async connectionData => {
    const response = await axios.post(`${BASE_URL}/api/ftp/connect`, { ...connectionData });
    return response.data;
};

const getDirContent = async (connectionData, directory) => {
    const response = await axios.post(`${BASE_URL}/api/ftp/get_dir`, {
        ...connectionData,
        dir: directory
    });
    return response.data;
};

const downloadFile = async (connectionData, dir, filename) => {
    const response = await axios.post(`${BASE_URL}/api/ftp/download`, { ...connectionData, dir, filename });
    fileDownload(response.data, filename);
}

export default {
    connectToFtp,
    getDirContent,
    downloadFile
};