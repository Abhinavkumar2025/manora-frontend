
import axios from 'axios';

const API_URL = 'http://localhost:5000/manora/gallery';

export const uploadPhoto = async (formData, token) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, formData, config);
    return response.data;
};

export const getMyPhotos = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`${API_URL}/mine`, config);
    return response.data;
};

export const deletePhoto = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data;
};

export const uploadMultiplePhotos = async (formData, token) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(`${API_URL}/batch`, formData, config);
    return response.data;
};

export const deleteMultiplePhotos = async (photoIds, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(`${API_URL}/delete-batch`, { photoIds }, config);
    return response.data;
};

export const updatePhoto = async (id, caption, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(`${API_URL}/${id}`, { caption }, config);
    return response.data;
};
