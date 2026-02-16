import { motion } from "framer-motion";
import React from 'react'
import './Box.css'
const Box = ({ img, h3, p }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0px 4px 20px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className='feature-box px-4 py-4 rounded-2xl bg-white text-black w-full'
        >
            <div className='flex flex-col justify-center items-center text-center'>
                <img id="feature_box_img" src={img} alt="" />
                <h3>{h3}</h3>
                <p className='text-lg'>{p}</p>
            </div>
        </motion.div>
    );
};

export default Box



