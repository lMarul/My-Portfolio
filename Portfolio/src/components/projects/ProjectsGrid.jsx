import React from 'react';
import ProjectCard from './ProjectCard';

const projects = [
    {
        id: 1,
        title: 'Project One',
        description: 'Description for project one.',
        image: 'path/to/image1.jpg',
    },
    {
        id: 2,
        title: 'Project Two',
        description: 'Description for project two.',
        image: 'path/to/image2.jpg',
    },
    {
        id: 3,
        title: 'Project Three',
        description: 'Description for project three.',
        image: 'path/to/image3.jpg',
    },
    // Add more projects as needed
];

const ProjectsGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-visible">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
};

export default ProjectsGrid;