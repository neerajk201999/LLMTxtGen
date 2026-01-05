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
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      } else {
        const errorText = await response.text();
        throw new Error(`Server Error (${response.status}): ${errorText.substring(0, 100)}` || 'Unknown Server Error');
      }
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};