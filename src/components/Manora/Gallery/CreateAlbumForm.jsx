
import React, { useState } from 'react';
import { useGallery } from '../../../context/GalleryContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CreateAlbumForm = () => {
    const { createAlbum, loading } = useGallery();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newAlbum = await createAlbum({ title, description });
        if (newAlbum) {
            navigate(`/manora/gallery/${newAlbum._id}`); // Go to new album
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md my-20 mx-auto bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800"
        >
            <h2 className="text-2xl font-bold text-white mb-6">Create New Trip Album</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-400 text-sm mb-1">Trip Name</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Goa 2024"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-400 text-sm mb-1">Whole Experience (Description)</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the entire trip..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-600 outline-none min-h-[100px]"
                        required
                    />
                </div>
                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/manora/gallery')}
                        className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
                    >
                        {loading ? 'Creating...' : 'Create Album'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default CreateAlbumForm;
