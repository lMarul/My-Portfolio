import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setTimeout(() => {
            setIsHovered(true);
        }, 150); // Debounce for hover intent
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <motion.div
            className={`relative transition-transform duration-300 ease-in-out ${isHovered ? 'scale-150 z-10' : 'scale-100 z-0'} glass gradient-border`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            layoutId={project.id}
            style={{ overflow: 'visible' }}
        >
            <motion.div
                className="thumbnail"
                initial={{ opacity: 1 }}
                animate={{ opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.2 }}
            >
                <img src={project.thumbnail} alt={project.title} />
                <h3>{project.title}</h3>
            </motion.div>
            {isHovered && (
                <motion.div
                    className="expanded-details"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <p>{project.description}</p>
                    <button className="btn">View Project</button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default ProjectCard;