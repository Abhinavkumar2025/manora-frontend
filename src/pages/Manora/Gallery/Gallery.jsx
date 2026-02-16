
import React, { useEffect } from 'react';
import { useGallery } from '../../../context/GalleryContext';
import AlbumCard from '../../../components/Manora/Gallery/AlbumCard';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.css';

const Gallery = () => {
    const { albums, loading, error, fetchAlbums } = useGallery();

    useEffect(() => {
        fetchAlbums();
    }, []);

    if (loading && albums.length === 0) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className=" w-full bg-slate-50 px-4 py-8 min-h-screen text-black">
            <div className="flex justify-between items-center mb-8">
                <div className='heading_gallery'>
                    <h1 className="text-3xl mb-2">My Trips</h1>
                    <p className="text-gray-400">Collections of your travel memories</p>
                </div>
                <Link
                    to="/manora/gallery/create"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/20"
                >
                    <FiPlus />
                    <span className="hidden sm:inline ">New Album</span>
                </Link>
            </div>

            {error && (
                <div className="text-red-400 mb-4 text-center">{error}</div>
            )}

            {albums.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <p className="text-xl mb-4">No albums yet.</p>
                    <Link to="/manora/gallery/create" className="text-blue-400 hover:text-blue-300 underline">
                        Create your first trip album
                    </Link>
                </div>
            ) : (
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {albums.map((album) => (
                            <AlbumCard key={album._id} album={album} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
};

export default Gallery;
