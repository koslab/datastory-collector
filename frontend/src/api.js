const API_BASE_URL = 'http://localhost:8000/api/v1';

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
