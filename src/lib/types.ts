export type Leaf = {
  class: string;
  probability: number;
};

export interface Prediction {
  class: string;
  probability: number;
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
