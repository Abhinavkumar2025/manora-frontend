
import React from 'react';
import { Link } from 'react-router-dom';
import { FiImage, FiUploadCloud } from 'react-icons/fi';
import { motion } from 'framer-motion';

const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900/50 p-8 rounded-full mb-6 border-2 border-dashed border-gray-700"
            >
                <FiImage className="text-gray-500 w-16 h-16" />
            </motion.div>

            <h3 className="text-2xl font-bold text-white mb-2">No Memories Yet</h3>
            <p className="text-gray-400 max-w-md mb-8">
                Your gallery is empty. Start capturing your travel moments and save them here forever.
            </p>

            <Link
                to="/manora/gallery/upload"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
            >
                <FiUploadCloud size={20} />
                Upload Your First Photo
            </Link>
        </div>
    );
};

export default EmptyState;
