// Use runtime environment variable from vite-plugin-runtime-env
// Default to /api/v1 if not provided
import defaultConfig from './config.json';

let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const fetchConfig = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/config`);
        if (!response.ok) {
            throw new Error(`Failed to fetch config: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error(`Expected JSON response but got ${contentType}`);
        }

        const data = await response.json();

        // Note: We still return data, but API_BASE_URL is now primarily 
        // controlled via environment variable. 
        // We could still override it from config if we wanted:
        if (data.api_base_url) {
            API_BASE_URL = data.api_base_url;
        }

        return data;
    } catch (error) {
        console.warn('Backend config fetch failed, using default config:', error);
        return defaultConfig;
    }
};

export const submitStory = async (storyData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/submissions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(storyData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Submission failed:', error);
        throw error;
    }
};
