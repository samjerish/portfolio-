from PIL import Image, ImageDraw, ImageFont
import os

img_path = "static/models/Computer/baked_computer.jpg"
out_path = "/Users/samjerishd/.gemini/antigravity-ide/brain/cbb33b2e-6565-4800-9cd7-538905d8d64a/baked_computer_grid.jpg"

img = Image.open(img_path)
draw = ImageDraw.Draw(img)

width, height = img.size
step = 100

for x in range(0, width, step):
    draw.line([(x, 0), (x, height)], fill="red", width=2)
for y in range(0, height, step):
    draw.line([(0, y), (width, y)], fill="red", width=2)

for x in range(0, width, step):
    for y in range(0, height, step):
        draw.text((x + 5, y + 5), f"{x},{y}", fill="red")

img.save(out_path)
print("Saved grid image to", out_path)
