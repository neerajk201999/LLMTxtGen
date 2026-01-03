export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

export interface UsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
}

export interface GenerationResult {
  content: string;
  groundingMetadata?: {
    groundingChunks?: GroundingChunk[];
  };
  usageMetadata?: UsageMetadata;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}