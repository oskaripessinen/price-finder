from flask import Flask, jsonify, request
import os
from bs4 import BeautifulSoup
from base64 import urlsafe_b64encode
import base64
import requests
from googletrans import Translator
from PIL import Image
import io



app = Flask(__name__)

UPLOAD_FOLDER = 'kuvat'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def translate_text(text, target_language='fi'):
    translator = Translator()
    translation = translator.translate(text, dest=target_language)
    return translation.text


def fetch_data(img_path):

    target_size=(600, 1000)

    with open(img_path, 'rb') as f:
        original_image = Image.open(io.BytesIO(f.read()))
    
    resized_image = original_image.resize(target_size)

    
    buffered = io.BytesIO()
    resized_image.save(buffered, format="JPEG")

    
    image_b64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

    oauth_token = "token"     
    ebay_api_url = "https://api.ebay.com/buy/browse/v1/item_summary/search_by_image?limit=1"


    headers = {
        "Authorization": f"Bearer {oauth_token}",
        "Content-Type": "application/json",
    }


    data = {
        "image": image_b64
            }

    response = requests.post(ebay_api_url, json=data, headers=headers)
    
    
    

    if response.status_code == 200:
        
            
        results = response.json()['itemSummaries']
        result = results[0].get('title')
        

        

        print(result)
        
        
        
            
        
        result.replace("-", "")
        result.replace("/", "")
        title_list = result.split()
        
        
        
        three_words = " ".join(title_list[:3])


        return three_words
    
    else:
        return 'error'






@app.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return 'No file part', 400

    image_file = request.files['image']

    if image_file.filename == '':
        return 'No selected file', 400


    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'uploaded_image.jpg')
    image_file.save(image_path)



    data = fetch_data(image_path)

    return data, 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

