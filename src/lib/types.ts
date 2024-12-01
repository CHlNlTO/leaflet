export type Leaf = {
  class: string;
  probability: number;
};

export interface Prediction {
  label: string;
  confidence: number;
  leaf_detected: boolean;
}

export interface PredictionResponse {
  svm_predictions: Prediction[];
  rf_predictions: Prediction[];
}

export type LeafImage = {
  image: File;
};

export interface IconProps {
  className?: string;
}

export interface Message {
  text: string;
  isUser: boolean;
}
