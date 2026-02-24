# Marwin's Portfolio

## Overview
Marwin's Portfolio is a web application built using React, Tailwind CSS, and Framer Motion. The portfolio showcases various projects with a modern aesthetic, emphasizing a "Premium" look and "Glassmorphism" styling.

## Features
- **Static Grid Layout**: The project cards are arranged in a grid that remains static, ensuring a clean and organized presentation.
- **Hover Interaction**: Each project card features a hover effect that scales the card and reveals additional details without affecting the layout of neighboring cards.
- **Smooth Animations**: Utilizing Framer Motion, the transitions between the thumbnail and expanded states of the cards are smooth and visually appealing.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/lMarul/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Project Structure
- `src/components/projects/ProjectCard.jsx`: Defines the `ProjectCard` component for individual project cards.
- `src/components/projects/ProjectsGrid.jsx`: Contains the `ProjectsGrid` component that manages the layout of project cards.
- `src/App.jsx`: Main application component that renders the `ProjectsGrid` and other components.
- `src/index.jsx`: Entry point of the application.
- `tailwind.config.js`: Configuration for Tailwind CSS.
- `package.json`: npm configuration file listing dependencies and scripts.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.