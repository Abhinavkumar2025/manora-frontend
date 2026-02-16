
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGallery } from '../../../context/GalleryContext';
import PhotoGrid from '../../../components/Manora/Gallery/PhotoGrid';
import { FiArrowLeft, FiPlus, FiTrash2, FiCheckSquare, FiX } from 'react-icons/fi';
import './AlbumView.css';


const AlbumView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentAlbum, fetchAlbumDetails, loading, deletePhoto, deleteAlbum, deleteMultiplePhotos } = useGallery();

    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedPhotos, setSelectedPhotos] = useState([]);

    useEffect(() => {
        fetchAlbumDetails(id);
        // Reset selection on album change
        setIsSelectMode(false);
        setSelectedPhotos([]);
    }, [id]);

    const handleDeleteAlbum = async () => {
        if (window.confirm("Are you sure you want to delete this album? All photos inside it will be permanently deleted.")) {
            const success = await deleteAlbum(id);
            if (success) {
                navigate('/manora/gallery');
            }
        }
    };

    const toggleSelectMode = () => {
        setIsSelectMode(!isSelectMode);
        setSelectedPhotos([]);
    };

    const togglePhotoSelection = (photoId) => {
        setSelectedPhotos(prev => {
            if (prev.includes(photoId)) {
                return prev.filter(id => id !== photoId);
            } else {
                return [...prev, photoId];
            }
        });
    };

    const handleDeleteSelected = async () => {
        if (selectedPhotos.length === 0) return;

        if (window.confirm(`Are you sure you want to delete these ${selectedPhotos.length} photos?`)) {
            const success = await deleteMultiplePhotos(selectedPhotos);
            if (success) {
                // Exit select mode or clear selection? Let's keep select mode but clear selection
                setSelectedPhotos([]);
                if (currentAlbum?.photos?.length - selectedPhotos.length === 0) {
                    setIsSelectMode(false);
                }
            }
        }
    };

    if (loading || !currentAlbum) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const { album, photos } = currentAlbum;

    return (
        <div className="w-full m-0 px-4 py-8 min-h-screen bg-white">
            <Link to="/manora/gallery" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 ">
                <FiArrowLeft /> Back to Albums
            </Link>

            <div className="bg-gray-900 rounded-xl p-8 mb-8 border border-gray-800">
                <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white title mb-4">{album.title}</h1>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">{album.description}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Action Buttons */}
                        {isSelectMode ? (
                            <>
                                <button
                                    onClick={handleDeleteSelected}
                                    disabled={selectedPhotos.length === 0}
                                    className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${selectedPhotos.length === 0
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                        : 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
                                        }`}
                                >
                                    <FiTrash2 /> Delete Selected ({selectedPhotos.length})
                                </button>
                                <button
                                    onClick={toggleSelectMode}
                                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold flex items-center gap-2"
                                >
                                    <FiX /> Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to={`/manora/gallery/${id}/upload`}
                                    className="px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/20 flex items-center gap-2"
                                >
                                    <FiPlus /> Add Photos
                                </Link>
                                {photos.length > 0 && (
                                    <button
                                        onClick={toggleSelectMode}
                                        className="px-6 py-3 bg-gray-500 hover:bg-gray-400 text-white font-semibold flex items-center gap-2"
                                    >
                                        <FiCheckSquare /> Select
                                    </button>
                                )}
                                <button
                                    onClick={handleDeleteAlbum}
                                    className="px-6 py-3 bg-red-800 hover:bg-red-700 text-red-200 hover:text-white border border-red-800 rounded-xl font-semibold flex items-center gap-2 transition-colors"
                                >
                                    <FiTrash2 /> Delete Album
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {photos.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                    <p className="text-xl">No photos in this album yet.</p>
                </div>
            ) : (
                <PhotoGrid
                    photos={photos}
                    onDelete={deletePhoto}
                    isSelectMode={isSelectMode}
                    selectedPhotos={selectedPhotos}
                    onToggleSelect={togglePhotoSelection}
                />
            )}
        </div>
    );
};

export default AlbumView;
