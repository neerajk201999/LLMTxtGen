import { GenerationResult } from '../types';

export const generateLLMsTxt = async (url: string): Promise<GenerationResult> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate content');
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};