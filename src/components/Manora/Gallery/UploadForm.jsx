
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGallery } from '../../../context/GalleryContext';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import { motion } from 'framer-motion';

const UploadForm = () => {
    const { uploadPhoto, uploadMultiplePhotos, loading, error } = useGallery();
    const navigate = useNavigate();
    const { id: albumId } = useParams();

    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [caption, setCaption] = useState('');
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            addFiles(selectedFiles);
        }
    };

    const addFiles = (newFiles) => {
        const validFiles = newFiles.filter(file => file.type.startsWith('image/'));
        setFiles(prev => [...prev, ...validFiles]);

        const newPreviews = validFiles.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            addFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (files.length === 0) return;

        // If simple upload (1 file), use old method or new? Use multiple for everything for consistency?
        // Let's use uploadMultiplePhotos for > 1, and uploadPhoto for 1 if we want to be strict, 
        // but backend supports batch for 1 too. However, to keep it simple:

        const formData = new FormData();
        if (albumId) {
            formData.append('albumId', albumId);
        }
        formData.append('caption', caption);

        let success;
        if (files.length === 1) {
            formData.append('image', files[0]);
            success = await uploadPhoto(formData);
        } else {
            files.forEach(file => {
                formData.append('images', file);
            });
            success = await uploadMultiplePhotos(formData);
        }

        if (success) {
            navigate(`/manora/gallery/${albumId}`);
        }
    };

    const clearSelection = () => {
        setFiles([]);
        setPreviews([]);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800 "
        >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Add Photos to Album</h2>

            {error && (
                <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload Area */}
                <div
                    className={`relative border-2 border-dashed rounded-xl transition-all duration-300 min-h-[250px] flex flex-col items-center justify-center p-4
                        ${dragActive ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 hover:border-blue-500 hover:bg-gray-800/50'}
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    {previews.length > 0 ? (
                        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {previews.map((src, index) => (
                                <div key={index} className="relative aspect-w-1 aspect-h-1 group">
                                    <img src={src} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded-lg" />
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <FiX size={12} />
                                    </button>
                                </div>
                            ))}
                            <div className="flex items-center justify-center border border-gray-700 rounded-lg h-24 cursor-pointer hover:bg-gray-800 transition-colors relative">
                                <FiImage className="text-gray-500 w-8 h-8" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            <FiImage className="w-12 h-12 text-gray-500 mb-4" />
                            <p className="text-gray-300 font-medium mb-1">Drag and drop your images here</p>
                            <p className="text-gray-500 text-sm mb-4">or click to browse multiple files</p>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </>
                    )}
                </div>

                {/* Caption Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Caption (Optional)</label>
                    <input
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Write something about these moments..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">This caption will be applied to all uploaded photos.</p>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-2">
                    <button
                        type="button"
                        onClick={() => navigate(`/manora/gallery/${albumId}`)}
                        className="flex-1 py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading || files.length === 0}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all
                            ${loading || files.length === 0
                                ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg shadow-blue-900/20'}
                        `}
                    >
                        {loading ? 'Uploading...' : <><FiUpload /> Upload {files.length > 0 ? `${files.length} Photos` : 'Photos'}</>}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default UploadForm;
