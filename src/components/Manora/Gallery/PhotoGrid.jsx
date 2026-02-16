
import React from 'react';
import PhotoCard from './PhotoCard';
import { motion, AnimatePresence } from 'framer-motion';

const PhotoGrid = ({ photos, onDelete, isSelectMode, selectedPhotos, onToggleSelect }) => {
    return (
        <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4"
        >
            <AnimatePresence>
                {photos.map((photo) => (
                    <PhotoCard
                        key={photo._id}
                        photo={photo}
                        onDelete={onDelete}
                        isSelectMode={isSelectMode}
                        isSelected={selectedPhotos?.includes(photo._id)}
                        onToggleSelect={onToggleSelect}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default PhotoGrid;
