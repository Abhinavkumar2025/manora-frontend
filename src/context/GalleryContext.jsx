
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
    uploadPhoto as uploadPhotoService,
    getMyPhotos as getMyPhotosService,
    deletePhoto as deletePhotoService,
    uploadMultiplePhotos as uploadMultiplePhotosService,
    deleteMultiplePhotos as deleteMultiplePhotosService,
    updatePhoto as updatePhotoService,
} from '../services/galleryService';
import {
    createAlbum as createAlbumService,
    getAlbums as getAlbumsService,
    getAlbumDetails as getAlbumDetailsService,
    deleteAlbum as deleteAlbumService,
    updateAlbum as updateAlbumService,
} from '../services/albumService';

const GalleryContext = createContext();

export const useGallery = () => useContext(GalleryContext);

export const GalleryProvider = ({ children }) => {
    const { user } = useAuth();
    const [photos, setPhotos] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [currentAlbum, setCurrentAlbum] = useState(null); // { album, photos }
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch albums when user is logged in
    useEffect(() => {
        if (user) {
            fetchAlbums();
        } else {
            setAlbums([]);
            setPhotos([]);
        }
    }, [user]);

    const fetchAlbums = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const data = await getAlbumsService(token);
            setAlbums(data);
        } catch (err) {
            console.error("Error fetching albums:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAlbumDetails = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const data = await getAlbumDetailsService(id, token);
            setCurrentAlbum(data);
            setPhotos(data.photos); // Keep photos supported for grid
            return data;
        } catch (err) {
            console.error("Error fetching album details:", err);
            setError(err.response?.data?.message || "Failed to fetch album");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const createAlbum = async (albumData) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const newAlbum = await createAlbumService(albumData, token);
            setAlbums((prev) => [newAlbum, ...prev]);
            return newAlbum;
        } catch (err) {
            console.error("Error creating album:", err);
            setError(err.response?.data?.message || "Failed to create album");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const deleteAlbum = async (id) => {
        // Optimistic update
        const oldAlbums = [...albums];
        setAlbums((prev) => prev.filter((album) => album._id !== id));

        try {
            const token = localStorage.getItem('token');
            await deleteAlbumService(id, token);
            return true;
        } catch (err) {
            console.error("Error deleting album:", err);
            setError(err.response?.data?.message || "Failed to delete album");
            setAlbums(oldAlbums); // Revert
            return false;
        }
    };

    const updateAlbum = async (id, albumData) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const updatedAlbum = await updateAlbumService(id, albumData, token);

            // Update albums list
            setAlbums((prev) => prev.map(a => a._id === id ? updatedAlbum : a));

            // Update current album if looking at it
            if (currentAlbum && currentAlbum.album._id === id) {
                setCurrentAlbum(prev => ({ ...prev, album: updatedAlbum }));
            }
            return true;
        } catch (err) {
            console.error("Error updating album:", err);
            setError(err.response?.data?.message || "Failed to update album");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const uploadPhoto = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const newPhoto = await uploadPhotoService(formData, token);
            setPhotos((prev) => [newPhoto, ...prev]);
            // Update currentAlbum photos if applicable
            if (currentAlbum && newPhoto.album === currentAlbum.album._id) {
                setCurrentAlbum(prev => ({ ...prev, photos: [newPhoto, ...prev.photos] }));
            }
            return true;
        } catch (err) {
            console.error("Error uploading photo:", err);
            setError(err.response?.data?.message || "Failed to upload photo");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const uploadMultiplePhotos = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const newPhotos = await uploadMultiplePhotosService(formData, token);

            setPhotos((prev) => [...newPhotos, ...prev]);

            // Update currentAlbum photos if applicable
            if (currentAlbum && newPhotos.length > 0 && newPhotos[0].album === currentAlbum.album._id) {
                setCurrentAlbum(prev => ({ ...prev, photos: [...newPhotos, ...prev.photos] }));
            }

            return true;
        } catch (err) {
            console.error("Error uploading multiple photos:", err);
            setError(err.response?.data?.message || "Failed to upload photos");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deletePhoto = async (id) => {
        // Optimistic update
        const oldPhotos = [...photos];
        setPhotos((prev) => prev.filter((photo) => photo._id !== id));

        if (currentAlbum) {
            setCurrentAlbum(prev => ({ ...prev, photos: prev.photos.filter(p => p._id !== id) }));
        }

        try {
            const token = localStorage.getItem('token');
            await deletePhotoService(id, token);
            return true;
        } catch (err) {
            console.error("Error deleting photo:", err);
            setError(err.response?.data?.message || "Failed to delete photo");
            // Revert on failure
            setPhotos(oldPhotos);
            if (currentAlbum) {
                const albumPhotos = oldPhotos.filter(p => p.album === currentAlbum.album._id);
                setCurrentAlbum(prev => ({ ...prev, photos: albumPhotos })); // This might be slightly inaccurate if global photos state doesn't match album, but good enough for now
            }
            return false;
        }
    };

    const deleteMultiplePhotos = async (photoIds) => {
        // Optimistic update
        const oldPhotos = [...photos];
        setPhotos((prev) => prev.filter((photo) => !photoIds.includes(photo._id)));

        if (currentAlbum) {
            setCurrentAlbum(prev => ({ ...prev, photos: prev.photos.filter(p => !photoIds.includes(p._id)) }));
        }

        try {
            const token = localStorage.getItem('token');
            await deleteMultiplePhotosService(photoIds, token);
            return true;
        } catch (err) {
            console.error("Error deleting multiple photos:", err);
            setError(err.response?.data?.message || "Failed to delete photos");
            // Revert on failure involves complex state restoration, for now just reload or re-fetch might be safer but let's try revert
            setPhotos(oldPhotos);
            // Reverting currentAlbum is tricky without a fresh fetch, so maybe we should refetch on error
            if (currentAlbum) {
                fetchAlbumDetails(currentAlbum.album._id);
            }
            return false;
        }
    };

    const updatePhoto = async (id, caption) => {
        // Optimistic update
        const oldPhotos = [...photos];
        setPhotos((prev) => prev.map(p => p._id === id ? { ...p, caption } : p));

        if (currentAlbum) {
            setCurrentAlbum(prev => ({ ...prev, photos: prev.photos.map(p => p._id === id ? { ...p, caption } : p) }));
        }

        try {
            const token = localStorage.getItem('token');
            await updatePhotoService(id, caption, token);
            return true;
        } catch (err) {
            console.error("Error updating photo:", err);
            setError(err.response?.data?.message || "Failed to update photo");
            // Revert
            setPhotos(oldPhotos);
            if (currentAlbum) {
                // Revert current album photos (simplified)
                fetchAlbumDetails(currentAlbum.album._id);
            }
            return false;
        }
    };

    return (
        <GalleryContext.Provider
            value={{
                photos,
                albums,
                currentAlbum,
                loading,
                error,
                fetchAlbums,
                fetchAlbumDetails,
                createAlbum,
                deleteAlbum,
                updateAlbum,
                uploadPhoto,
                uploadMultiplePhotos,
                deletePhoto,
                deleteMultiplePhotos,
                updatePhoto,
            }}
        >
            {children}
        </GalleryContext.Provider>
    );
};
