# DataStory

DataStory is a modern web application designed to help teams capture, refine, and manage "Data Stories" — structured requirements for data products. It acts as a bridge between business users and data engineering teams by ensuring that requirements are clear, consistent, and actionable.

## 🚀 Features

-   **Interactive Wizard**: A step-by-step guide to help users define their data needs, including metrics, dimensions, filters, and business value.
-   **Live Logic Preview**: Real-time feedback that displays the constructed story in a readable format as you type.
-   **EDW Bus Matrix**: Automatically generates a bus matrix to visualize the relationship between user stories and data dimensions, aiding in dimensional modeling.
-   **Management View**: A centralized dashboard to view, edit, and manage all captured user stories.
-   **YAML Export**: Generates structured YAML output of all stories, ready for integration with data engineering pipelines or documentation.
-   **Library Memory**: Learns from inputs to suggest metrics, dimensions, and sources, creating a shared vocabulary over time.
-   **Local Storage**: Automatically saves your work locally, so you never lose your progress.
-   **Responsive Design**: Built with a mobile-first approach, ensuring usability across all devices.

## 🛠️ Technology Stack

-   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Deployment**: GitHub Pages

## 📦 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/datastory.git
    cd datastory
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 🔨 Build & Deploy

To build the project for production:

```bash
npm run build
```

The build artifacts will be located in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## 📄 License

This project is licensed under the [AGPLv3 License](LICENSE).
