import pytesseract
from PIL import Image

img = Image.open('rotated.jpg')
data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)

for i, word in enumerate(data['text']):
    if 'etrernan' in word.lower() or 'heffer' in word.lower() or 'effernan' in word.lower() or 'enry' in word.lower() or 'inc' in word.lower():
        print(f"Found '{word}' at x={data['left'][i]}, y={data['top'][i]}, w={data['width'][i]}, h={data['height'][i]}")
