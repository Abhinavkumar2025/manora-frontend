
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFolder, FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useGallery } from '../../../context/GalleryContext';
import EditAlbumModal from './EditAlbumModal';

const AlbumCard = ({ album }) => {
    const { deleteAlbum } = useGallery();
    const [showMenu, setShowMenu] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const toggleMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowMenu(false);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowMenu(false);
        if (window.confirm("Are you sure you want to delete this album? All photos inside it will be permanently deleted.")) {
            await deleteAlbum(album._id);
        }
    };

    return (
        <div className="relative group">
            <Link to={`/manora/gallery/${album._id}`} className="block">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:border-blue-500/50 transition-all"
                >
                    <div className="h-48 bg-gray-800 flex items-center justify-center relative overflow-hidden">
                        {album.coverImage ? (
                            <img
                                src={album.coverImage}
                                alt={album.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <FiFolder className="text-gray-600 w-16 h-16" />
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-4">
                            <h3 className="text-white text-lg font-bold truncate pr-6">{album.title}</h3>
                            <p className="text-gray-300 text-xs truncate">{new Date(album.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </motion.div>
            </Link>

            {/* Menu Button - Absolute positioned regarding the card wrapper */}
            <button
                onClick={toggleMenu}
                className="absolute top-2 right-2 p-2 z-20 rounded-full text-white opacity-100 transition-opacity"
                title="Album Options"
            >
                <FiMoreVertical />
            </button>

            {/* Menu Dropdown */}
            <AnimatePresence>
                {showMenu && (
                    <>
                        <div
                            className="fixed inset-0 z-20 cursor-default"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowMenu(false);
                            }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="absolute top-10 right-2 z-30 bg-gray-800 border border-gray-700 rounded-lg shadow-xl w-32 py-1 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={handleEdit}
                                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                            >
                                <FiEdit2 size={14} /> Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2"
                            >
                                <FiTrash2 size={14} /> Delete
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <EditAlbumModal
                album={album}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            />
        </div>
    );
};

export default AlbumCard;
