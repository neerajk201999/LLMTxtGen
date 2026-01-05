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

    const responseText = await response.text();
    let data;

    try {
      data = JSON.parse(responseText);
    } catch (e) {
      // If response is not JSON, throw with the text body
      throw new Error(`API Request Failed: ${response.status} ${response.statusText} - ${responseText.slice(0, 100)}`);
    }

    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate content');
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};