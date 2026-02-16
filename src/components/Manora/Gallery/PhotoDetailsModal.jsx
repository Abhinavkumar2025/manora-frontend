import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload, FiCalendar, FiType } from 'react-icons/fi';

const PhotoDetailsModal = ({ photo, isOpen, onClose }) => {
    if (!isOpen || !photo) return null;

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
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                        >
                            <FiX size={24} />
                        </button>

                        {/* Image Section */}
                        <div className="w-full md:w-2/3 h-[50vh] md:h-auto bg-black flex items-center justify-center">
                            <img
                                src={photo.image_url}
                                alt={photo.caption}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="w-full md:w-1/3 p-6 flex flex-col border-l border-gray-800">
                            <h2 className="text-2xl font-bold text-white mb-6">Photo Details</h2>

                            <div className="space-y-6 flex-1">
                                <div>
                                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                                        <FiType />
                                        <span className="text-sm font-medium">Caption</span>
                                    </div>
                                    <p className="text-gray-200 text-lg leading-relaxed">
                                        {photo.caption || <span className="italic text-gray-500">No caption provided</span>}
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                                        <FiCalendar />
                                        <span className="text-sm font-medium">Date Added</span>
                                    </div>
                                    <p className="text-gray-200">
                                        {new Date(photo.createdAt).toLocaleDateString(undefined, {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleDownload}
                                className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                            >
                                <FiDownload size={20} />
                                Download Photo
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PhotoDetailsModal;
