from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
from joblib import load

app = Flask(__name__)
CORS(app)

# Load the models
svm_classifier = load('svm.joblib')
rfc = load('rfc.joblib')

def extract_features(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    hog = cv2.HOGDescriptor()
    features = hog.compute(gray)
    return features.flatten()

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
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

    print("Image loaded.")

    if img is None:
        return jsonify({'error': 'Invalid image file'}), 400

    # Resize image to 266x266
    img = cv2.resize(img, (266, 266))

    # Preprocess the image
    features = extract_features(img).reshape(1, -1)

    print("Features extracted.")

    # Predict using the SVM model
    svm_pred_proba = svm_classifier.predict_proba(features)[0] * 100  
    rfc_pred_proba = rfc.predict_proba(features)[0] * 100  

    # Top 3 svm
    svm_top3_indices = np.argsort(svm_pred_proba)[::-1][:3]
    svm_top3_classes = svm_classifier.classes_[svm_top3_indices]
    svm_top3_proba = svm_pred_proba[svm_top3_indices]

    # Top 3 rfc
    rfc_top3_indices = np.argsort(rfc_pred_proba)[::-1][:3]
    rfc_top3_classes = rfc.classes_[rfc_top3_indices]
    rfc_top3_proba = rfc_pred_proba[rfc_top3_indices]

    # Creating dictionaries for svm predictions
    svm_predictions = [{'class': svm_top3_classes[i], 'probability': svm_top3_proba[i]} for i in range(3)]

    print("SVM Predictions:")
    for prediction in svm_predictions:
        print(f"Class: {prediction['class']}, Probability: {prediction['probability']:.2f}%")    

    # Creating dictionaries for rfc predictions
    rf_predictions = [{'class': rfc_top3_classes[i], 'probability': rfc_top3_proba[i]} for i in range(3)]
    
    print("\nRandom Forest Predictions:")
    for prediction in rf_predictions:
        print(f"Class: {prediction['class']}, Probability: {prediction['probability']:.2f}%")

    return jsonify({
        'svm_predictions': svm_predictions,
        'rf_predictions': rf_predictions
    })

if __name__ == '__main__':
    app.run(debug=True)
