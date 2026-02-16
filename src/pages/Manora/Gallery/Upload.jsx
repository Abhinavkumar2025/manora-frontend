
import React from 'react';
import UploadForm from '../../../components/Manora/Gallery/UploadForm';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const Upload = () => {
    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="mb-8">
                <Link
                    to="/manora/gallery"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
                >
                    <FiArrowLeft /> Back to Gallery
                </Link>
            </div>

            <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                    <UploadForm />
                </div>
            </div>
        </div>
    );
};

export default Upload;
