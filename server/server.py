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

    oauth_token = "v^1.1#i^1#p^1#f^0#I^3#r^0#t^H4sIAAAAAAAAAOVYe2xTVRhfH0MXHoaXLAuDchGHw7bnPvq6oZXSDlaBtdDKo4aR03tP2WXtvdd7TtkKxMyRLMTEPzRBExBciC4hikKIiRhkShQTXIhR5KHxD1AiJhgMKCSgxnvbMrpJAFkTl9h/mvOd73zn9/ud7zvn3AO6xtQ09jT3XB9vesjc2wW6zCYTPRbUjKmeN8FirquuAmUOpt6ux7qs3ZaL8zHMZlR+BcKqImNk68xmZMwXjH4qp8m8ArGEeRlmEeaJwMeDy5byjAPwqqYQRVAylC0S9lPQ5fFBD8tCF+dlaNatW+VbMROKnxIFDnhpl+hiIPBAyOr9GOdQRMYEysRPMYDh7ICxMyBBe3mG5jnO4fGyScq2EmlYUmTdxQGoQAEuXxirlWG9O1SIMdKIHoQKRIKL4tFgJNzUkpjvLIsVKOkQJ5Dk8NBWSBGRbSXM5NDdp8EFbz6eEwSEMeUMFGcYGpQP3gLzAPALUtNpL8d6RFYEjJsFKboiUi5StCwkd8dhWCTRni648kgmEsnfS1FdjdQGJJBSq0UPEQnbjL/lOZiR0hLS/FTTwuCaYCxGBaK4HWpSDNn15BJzAhHtsRVhe8rLpEGKpRk7BCm3KAK6NFExWknmYTOFFFmUDNGwrUUhC5GOGg3Xhi7TRneKylEtmCYGojI/BtzS0ONNGotaXMUcaZONdUVZXQhboXnvFRgcTYgmpXIEDUYY3lGQSC8rVZVEanhnIRdL6dOJ/VQbISrvdHZ0dDg6WIeirXcyANDO1cuWxoU2lIWU7mvUetFfuvcAu1SgIiB9JJZ4kld1LJ16ruoA5PVUgPP6PB6mpPtQWIHh1n8Yyjg7h1ZEpSrEDWGKFVyCz+2BtJcTKlEhgVKSOg0cKAXz9izU2hFRM1BAdkHPs1wWaZLIs640w3rTyC66fWk750un7SmX6LbTaYQAQqmU4PP+nwrlflM9jgQNkYrkesXyfNWGzo1MTI5nm5MbkzKW1Kc3eJYEFy5pUeZ5lyWS0TUZRuhsWypHEee/32q4I/lQRtKVSejzV0IAo9YrJ0KzggkSR0QvLigqiikZSciPrgVmNTEGNZKPo0xGN4yIZFBVI5XZqytG719uEw/Gu3Jn1H90Pt2RFTZSdnSxMsZjPQBUJYdxAjkEJes0al2B+vXDMK8roB4Rb0m/uY4q1jrJIltJLF45HQW6DrxRcGgIKzlNv207osYNLKG0I1k/z4imZDJIWzmyvDbqOZvNEZjKoNFW2BVIcAmOssOW9gAv52JZwI2Il1A4SteNti2pEluxdfEDXqudQz/yA1WFH91tOgq6TUfMJhOYD+bQs8GsMZZnrJZxdVgiyCHBtANL62X921VDjnaUV6GkmSdXXdmzvTlU1xR9tXFzIv/lzs+rxpW9MfSuBbWDrww1Fnps2ZMDmH67p5p+ZNp4hgMMA2gvQ3NcEsy+3WulH7VO+fTgllh4OpkBn+x+6Xzu5juxI8/2gvGDTiZTdZW121Q1zzOwt2/x6f2LVqt/BK9Wn726u2GVdcC2J/XV9sljv5mx772mOTMX+A+Yzn0X6Qsfe9+y57X+5uQM27RN9b6vbR++2LSlYdJhqX7ipYY35p4Mnu8XF/xpe2vVR43XXq97+0JzTyh0tn+f+9f24I7T+2tP7ro43Wz+5Ym6z25YF+z8/ad3L+UvPPIXJeCBx639Z45/PPX6tkg3Hz9n3f7Bz+d9M5//0VJv3prf9vCEmutTNl1jT/XMVc3Ovi+Oth7m0G+Hdr/SFd71cvSprX3C3MabAVvrpF0/9FyuD/t3HP925+UzoRtrB04cOtYKaw9+wtUdZd5s3/v9KXzgROukvudeWD61YdbESO3mK51Himv5NyJ+Y0z9EQAA"
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

