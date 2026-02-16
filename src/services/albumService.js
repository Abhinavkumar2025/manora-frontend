
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/manora/albums`;

export const createAlbum = async (albumData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, albumData, config);
    return response.data;
};

export const getAlbums = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};

export const getAlbumDetails = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`${API_URL}/${id}`, config);
    return response.data;
};

export const deleteAlbum = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data;
};

export const updateAlbum = async (id, albumData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    };
    const response = await axios.put(`${API_URL}/${id}`, albumData, config);
    return response.data;
};
