from PIL import Image, ImageDraw, ImageFont
import os

img = Image.open('rotated.jpg')
draw = ImageDraw.Draw(img)

# Bounding box of the original text in the rotated image
x0, y0 = 2520, 1360
x1, y1 = 2800, 1450

# Sample the background color from just outside the bounding box
bg_color = img.getpixel((x0 - 10, y0 - 10))

# Paint over the old logo
draw.rectangle([x0, y0, x1, y1], fill=bg_color)

# Try to load a default font, or fallback to default
try:
    font_large = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 36)
    font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 20)
except:
    font_large = ImageFont.load_default()
    font_small = ImageFont.load_default()

text_color = (60, 60, 60) # Dark gray

# Draw new text
draw.text((x0 + 10, y0 + 10), "SAM JERISH D", fill=text_color, font=font_large)
draw.text((x0 + 50, y0 + 55), "sam jerish d inc", fill=text_color, font=font_small)

# Rotate back 180 degrees to restore original orientation
final_img = img.rotate(180)

# Save over the original baked texture
final_img.save('static/models/Computer/baked_computer.jpg')
print("Texture updated successfully!")
