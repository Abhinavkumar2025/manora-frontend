import React, { useState, useEffect } from 'react';
import { useGallery } from '../../../context/GalleryContext';
import { FiX, FiUpload, FiImage } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const EditAlbumModal = ({ album, isOpen, onClose }) => {
    const { updateAlbum, loading } = useGallery();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (album && isOpen) {
            setTitle(album.title);
            setDescription(album.description);
            setPreview(album.coverImage);
            setCoverImage(null);
            setError(null);
        }
    }, [album, isOpen]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);

        if (coverImage) {
            formData.append('coverImage', coverImage);
        } else if (!preview && album.coverImage) {
            // If no new image and no preview (meaning it was removed) and there was an original image
            formData.append('removeCoverImage', 'true');
        }

        const success = await updateAlbum(album._id, formData);
        if (success) {
            onClose();
        } else {
            setError("Failed to update album. Please try again.");
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-gray-900 rounded-xl max-w-lg w-full border border-gray-800 shadow-2xl overflow-hidden"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-gray-800">
                            <h3 className="text-xl font-bold text-white">Edit Album</h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                                <FiX size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {error && (
                                <div className="p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Album Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="3"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Cover Image</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-24 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 border border-gray-700 relative">
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-600">
                                                <FiImage size={24} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-col flex gap-2">
                                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-700">
                                            <FiUpload size={18} />
                                            <span>{preview ? 'Change Cover' : 'Upload Cover'}</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                        {preview && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setCoverImage(null);
                                                    setPreview(null);
                                                }}
                                                className="px-4 py-2 bg-red-900/40 hover:bg-red-900/60 text-red-200 border border-red-900/50 rounded-lg transition-colors text-sm"
                                            >
                                                Remove Cover Image
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 ml-28">Recommended size: 800x600px.</p>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EditAlbumModal;
