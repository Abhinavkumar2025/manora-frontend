import React, { useState, useEffect } from 'react';
import { FiTrash2, FiEdit2, FiCheck, FiX, FiMoreVertical, FiDownload, FiInfo } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useGallery } from '../../../context/GalleryContext';
import PhotoDetailsModal from './PhotoDetailsModal';

const PhotoCard = ({ photo, onDelete, isSelectMode, isSelected, onToggleSelect }) => {
    const { updatePhoto } = useGallery();
    const [isEditing, setIsEditing] = useState(false);
    const [caption, setCaption] = useState(photo.caption || "");
    const [showMenu, setShowMenu] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    useEffect(() => {
        setCaption(photo.caption || "");
    }, [photo.caption]);

    const handleSave = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (caption !== photo.caption) {
            await updatePhoto(photo._id, caption);
        }
        setIsEditing(false);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCaption(photo.caption || "");
        setIsEditing(false);
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(photo.image_url);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `manora-photo-${photo._id}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
        setShowMenu(false);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`group relative overflow-hidden rounded-xl bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 border ${isSelected ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-800'}`}
            onClick={() => isSelectMode ? onToggleSelect(photo._id) : setIsDetailsOpen(true)}
        >
            <div className="aspect-w-16 aspect-h-12 w-full overflow-hidden">
                <img
                    src={photo.image_url}
                    alt={photo.caption}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
            </div>

            {/* Selection Overlay */}
            {isSelectMode && (
                <div className="absolute top-2 right-2 z-10">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-600 border-blue-600' : 'bg-black/40 border-white hover:bg-black/60'}`}>
                        {isSelected && <div className="w-3 h-3 bg-white rounded-full" />}
                    </div>
                </div>
            )}

            {/* Menu Button - 3 Dots */}
            {!isSelectMode && !isEditing && (
                <div className="absolute top-2 right-2 z-30">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowMenu(!showMenu);
                        }}
                        className="p-2 rounded-full text-white"
                        title="Options"
                    >
                        <FiMoreVertical />
                    </button>
                    <AnimatePresence>
                        {showMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-40 cursor-default"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowMenu(false);
                                    }}
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    className="absolute right-0 mt-2 w-36 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-1 overflow-hidden z-50 text-left"
                                    onClick={(e) => e.stopPropagation()}
                                >

                                    <button
                                        onClick={() => { setShowMenu(false); setIsEditing(true); }}
                                        className="w-full px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                                    >
                                        <FiEdit2 size={14} /> Edit
                                    </button>
                                    <button
                                        onClick={handleDownload}
                                        className="w-full px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                                    >
                                        <FiDownload size={14} /> Download
                                    </button>
                                    <button
                                        onClick={() => { setShowMenu(false); onDelete(photo._id); }}
                                        className="w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2"
                                    >
                                        <FiTrash2 size={14} /> Delete
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            )}

            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 flex flex-col justify-end p-4 ${isSelectMode || isEditing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>

                {isEditing ? (
                    <div className="mb-2" onClick={(e) => e.stopPropagation()}>
                        <input
                            type="text"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="w-full bg-black/50 border border-gray-500 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-blue-500 mb-2"
                            placeholder="Enter caption..."
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                className="p-1 bg-green-600 rounded hover:bg-green-700 text-white"
                                title="Save"
                            >
                                <FiCheck size={14} />
                            </button>
                            <button
                                onClick={handleCancel}
                                className="p-1 bg-gray-600 rounded hover:bg-gray-700 text-white"
                                title="Cancel"
                            >
                                <FiX size={14} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="mb-2">
                        <p className="text-white font-medium truncate mb-1">
                            {photo.caption || <span className="text-gray-400 italic text-sm">No caption</span>}
                        </p>
                        <span className="text-xs text-gray-300">
                            {new Date(photo.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                )}
            </div>

            <PhotoDetailsModal
                photo={photo}
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
            />
        </motion.div>
    );
};

export default PhotoCard;
