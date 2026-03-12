import os
from PIL import Image

image_mapping = {
    'Whisk_600efa4b7d3b549bc1042a505b4ce476dr.png': 'jal-hero.webp',
    'Whisk_29c32e771e096cebe4548adc457f3826dr.png': 'jal-origami.webp',
    'Whisk_772483522eec9acb844416f8623ba0e7dr.png': 'jal-kimono.webp',
    'Whisk_46f4b31de96a24eafe3461dc0b9844ebdr.jpeg': 'jal-sakura.webp',
    'Whisk_e2c40651ccc965192214590f9e5ccc30dr.png': 'jal-floating.webp'
}

base_dir = r"c:\projetPerso\presentationPerso\_images"

for old_name, new_name in image_mapping.items():
    old_path = os.path.join(base_dir, old_name)
    new_path = os.path.join(base_dir, new_name)
    if os.path.exists(old_path):
        img = Image.open(old_path)
        img.save(new_path, "WEBP", quality=80)
        os.remove(old_path)
        print(f"Converted and removed {old_name} to {new_name}")
    else:
        print(f"File not found: {old_name}")
