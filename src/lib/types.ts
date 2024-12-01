export type Leaf = {
  class: string;
  probability: number;
};

export interface Prediction {
  label: string;
  confidence: number;
  leaf_detected: boolean;
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
