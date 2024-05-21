from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
from joblib import load
from rembg import remove
from sklearn.preprocessing import OneHotEncoder

app = Flask(__name__)
CORS(app)

# Load models
svm_classifier = load('svm_2.1.6_GRS-001.joblib')
rfc = load('rfc_2.1.6_GRS.joblib')
enc = load('enc_2.1.6_GRS.joblib')

def preprocess_image(image):
    if image is None:
        print(f"Error: Unable to read image from {image}")
        return None

    # Convert BGR to RGB
    resized_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # Resize image
    resized_image = cv2.resize(resized_image, (266, 266), fx=0.1, fy=0.1)
    print(f"Shape of resized image: {resized_image.shape}")
    
    # Remove background
    # resized_image = remove(resized_image)
       
    return resized_image

# Function to extract features using HOG
def extract_features(image):
    return image.flatten()

@app.route('/predict', methods=['POST'])
def predict():
    print("Working on it.")

    data = request.get_json()
    print("Data received.")

    image_data = data['image']
    # Decode base64 image
    image_data = image_data.split(',')[1]
    img_bytes = base64.b64decode(image_data)
    img_array = np.frombuffer(img_bytes, dtype=np.uint8)
    input_image = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    input_image = preprocess_image(input_image)
    print("Image loaded.")

    if input_image is not None:
        
        input_image = preprocess_image(input_image)
        print(f"Shape of input_features: {input_image.shape}")
        
        input_features = input_image.flatten().reshape(1, -1)
        print(f"Shape of input_features: {input_features.shape}") 
        
        svm_pred = svm_classifier.predict(input_features)[0]
        rfc_pred = rfc.predict(input_features)[0]

        print("SVM PRED test:", svm_pred)
        print("RFC PRED test:", rfc_pred)


        # Create a one-hot encoded array from the svm_pred value
        svm_pred_one_hot = np.zeros((1, len(enc.categories_[0])))
        svm_pred_one_hot[0, svm_pred] = 1

        # Convert the predictions back to class labels
        svm_pred_label = enc.inverse_transform(svm_pred_one_hot)[0][0]
        rfc_pred_label = enc.categories_[0][rfc_pred]

        # Print SVM and RFC Predictions
        print("\nSVM PRED:", svm_pred_label)
        print("RFC PRED:", rfc_pred_label)

        # Incorporate top 3 predictions
        svm_pred_proba = svm_classifier.predict_proba(input_features)[0] * 100
        rfc_pred_proba = rfc.predict_proba(input_features)[0] * 100  # Get the 1D array of class probabilities

        # top 3 svm
        svm_top3_indices = np.argsort(svm_pred_proba)[::-1][:3]
        svm_top3_classes = svm_classifier.classes_[svm_top3_indices]
        svm_top3_proba = svm_pred_proba[svm_top3_indices]

        # top 3 rfc
        rfc_top3_indices = np.argsort(rfc_pred_proba)[::-1][:3]  # Get indices of top 3 probabilities
        rfc_top3_classes = [enc.categories_[0][idx] for idx in rfc_top3_indices]  # Get class names
        rfc_top3_proba = rfc_pred_proba[rfc_top3_indices]  # Get top 3 probabilities
        
        # Normalize top 3 probabilities to sum to 100%
        svm_top3_proba_normalized = svm_top3_proba / np.sum(svm_top3_proba) * 100
        rfc_top3_proba_normalized = rfc_top3_proba / np.sum(rfc_top3_proba) * 100

        # Create dictionaries for normalized SVM predictions
        svm_predictions = [{'class': enc.categories_[0][svm_top3_indices[i]], 'probability': svm_top3_proba_normalized[i]} for i in range(len(svm_top3_indices))]
        
        # Create dictionaries for normalized RFC predictions
        rf_predictions = [{'class': rfc_top3_classes[i], 'probability': rfc_top3_proba_normalized[i]} for i in range(len(rfc_top3_classes))]
        

        # Print SVM Predictions
        print("\nSVM Top 3 Predictions:")
        for prediction in svm_predictions:
            print(f"{prediction['class']}: {prediction['probability']:.2f}%")
        
        # Print Random Forest Predictions
        print("\nRFC Top 3 Predictions:")
        for prediction in rf_predictions:
            print(f"{prediction['class']}: {prediction['probability']:.2f}%")

        return jsonify({
            'svm_predictions': svm_predictions,
            'rf_predictions': rf_predictions
        })
        
    else:
        print("Error: Unable to read input image")
    

if __name__ == '__main__':
    app.run(debug=True)
