"""
Generate high-fidelity Chhath Puja launcher icons for Android.
Draws:
- Radiant Sunrise (Bhagwan Surya)
- Divine Sunrays
- Sacred Sugarcane Stalks (Eekh/Ganna)
- Bamboo Daura / Soop (Arghya patra)
- Sacred Kalash & Burning Devotional Diya (Prasad Deep)
- Holy River Ganga waves
- Traditional Sindoor & Haldi borders
"""
import os
import math
from PIL import Image, ImageDraw, ImageFilter

def create_chhath_icon(size, is_foreground=False, is_round=False):
    # Canvas size: draw at 4x resolution for super-sampling antialiasing
    canvas_size = 1024
    img = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    cx, cy = 512, 512

    if not is_foreground:
        # Background gradient circle or rounded rect
        # Deep devotional crimson to radiant saffron gradient
        for r in range(500, 0, -2):
            factor = r / 500.0
            # From crimson #831843 / #991B1B at edge to golden orange #F59E0B / #FBBF24 in center
            red = int(245 - factor * (245 - 140))
            green = int(120 - factor * (120 - 15))
            blue = int(15 - factor * (15 - 15))
            draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(red, green, blue, 255))
        
        # Golden ornamental ring
        draw.ellipse([cx - 480, cy - 480, cx + 480, cy + 480], outline=(254, 240, 138, 230), width=16)
        draw.ellipse([cx - 460, cy - 460, cx + 460, cy + 460], outline=(245, 158, 11, 180), width=6)

    # Offset artwork if foreground (keep inside 72% safe zone = radius 360 in 1024)
    scale = 0.85 if is_foreground else 0.95
    center_y = 512 if not is_foreground else 520

    # 1. Divine Sun Rays (Surya Kiranein)
    ray_center_y = int(center_y - 80 * scale)
    num_rays = 18
    for i in range(num_rays):
        angle = math.pi * (i + 0.5) / num_rays + math.pi
        r_inner = 130 * scale
        r_outer = 260 * scale
        x1 = cx + math.cos(angle) * r_inner
        y1 = ray_center_y + math.sin(angle) * r_inner
        x2 = cx + math.cos(angle) * r_outer
        y2 = ray_center_y + math.sin(angle) * r_outer
        draw.line([x1, y1, x2, y2], fill=(254, 240, 138, 180), width=int(8 * scale))

    # 2. Rising Sun (Surya Bhagwan)
    sun_radius = int(115 * scale)
    for r in range(sun_radius, 0, -2):
        f = r / sun_radius
        # Center: bright golden-white (255, 253, 235) to edge (245, 158, 11)
        red = int(255 - f * 10)
        green = int(245 - f * 87)
        blue = int(180 - f * 169)
        draw.ellipse([cx - r, ray_center_y - r, cx + r, ray_center_y + r], fill=(red, green, blue, 255))
    draw.ellipse([cx - sun_radius, ray_center_y - sun_radius, cx + sun_radius, ray_center_y + sun_radius],
                 outline=(254, 240, 138, 255), width=int(6 * scale))

    # 3. Arched Sugarcane Stalks (Pavitra Ganna/Eekh)
    cane_color_dark = (54, 83, 20, 255)
    cane_color_light = (101, 163, 13, 255)
    
    # Left cane curve
    left_points = []
    right_points = []
    for t in range(0, 101):
        p = t / 100.0
        # Quadratic curve arching inwards
        lx = 240 + p * (480 - 240) - math.sin(p * math.pi) * 80
        ly = (center_y + 320) - p * 520
        left_points.append((lx, ly))
        
        rx = 784 - p * (784 - 544) + math.sin(p * math.pi) * 80
        ry = (center_y + 320) - p * 520
        right_points.append((rx, ry))
    
    draw.line(left_points, fill=cane_color_dark, width=int(22 * scale))
    draw.line(left_points, fill=cane_color_light, width=int(14 * scale))
    draw.line(right_points, fill=cane_color_dark, width=int(22 * scale))
    draw.line(right_points, fill=cane_color_light, width=int(14 * scale))

    # Cane joint notches
    for notch_p in [0.25, 0.45, 0.65, 0.82]:
        idx = int(notch_p * 100)
        lx, ly = left_points[idx]
        rx, ry = right_points[idx]
        draw.line([lx - 12, ly, lx + 12, ly], fill=(254, 240, 138, 240), width=int(5 * scale))
        draw.line([rx - 12, ry, rx + 12, ry], fill=(254, 240, 138, 240), width=int(5 * scale))

    # Cane leaves crossing at top apex
    draw.line([(cx - 40, center_y - 200), (cx + 50, center_y - 250)], fill=cane_color_light, width=int(10 * scale))
    draw.line([(cx + 40, center_y - 200), (cx - 50, center_y - 250)], fill=cane_color_light, width=int(10 * scale))

    # 4. Sacred Ganga Waves (Arghya Jal)
    wave_y = int(center_y + 140 * scale)
    water_pts = [(0, 1024)]
    for wx in range(0, 1025, 10):
        wy = wave_y + math.sin(wx * 0.02) * 16 * scale + math.cos(wx * 0.04) * 8 * scale
        water_pts.append((wx, wy))
    water_pts.append((1024, 1024))
    
    # Draw water depth
    draw.polygon(water_pts, fill=(124, 45, 18, 255))
    
    # Secondary ripple
    water_pts2 = [(0, 1024)]
    for wx in range(0, 1025, 10):
        wy = wave_y + 35 * scale + math.sin((wx + 80) * 0.025) * 14 * scale
        water_pts2.append((wx, wy))
    water_pts2.append((1024, 1024))
    draw.polygon(water_pts2, fill=(80, 20, 10, 255))

    # 5. Traditional Bamboo Soop (Chhath Daura / Arghya Soop)
    soop_top = int(center_y + 80 * scale)
    soop_bot = int(center_y + 240 * scale)
    soop_w = int(220 * scale)
    
    # Soop body polygon
    soop_poly = [
        (cx - soop_w, soop_top),
        (cx - int(soop_w * 0.8), soop_bot),
        (cx + int(soop_w * 0.8), soop_bot),
        (cx + soop_w, soop_top),
        (cx, soop_top + int(25 * scale))
    ]
    draw.polygon(soop_poly, fill=(180, 83, 9, 255), outline=(253, 230, 138, 255))
    # Bamboo weave texture lines
    for off_y in range(soop_top + 25, soop_bot, int(20 * scale)):
        p_factor = (off_y - soop_top) / (soop_bot - soop_top)
        cur_w = soop_w * (1.0 - p_factor * 0.2)
        draw.line([(cx - cur_w + 10, off_y), (cx + cur_w - 10, off_y)], fill=(120, 53, 15, 230), width=int(4 * scale))
    # Vertical ribbing
    for rib_x in [-120, -60, 0, 60, 120]:
        rx = cx + int(rib_x * scale)
        draw.line([(rx, soop_top + 15), (int(cx + rib_x * scale * 0.8), soop_bot - 8)], fill=(146, 64, 14, 200), width=int(4 * scale))

    # Soop border rim (golden bamboo trim)
    draw.line([(cx - soop_w, soop_top), (cx - int(soop_w * 0.8), soop_bot), 
               (cx + int(soop_w * 0.8), soop_bot), (cx + soop_w, soop_top)], 
              fill=(254, 240, 138, 255), width=int(8 * scale))

    # 6. Sacred Kalash / Lota (Offering Pot in center)
    kalash_cx = cx
    kalash_cy = int(center_y + 110 * scale)
    kw = int(45 * scale)
    kh = int(55 * scale)
    draw.ellipse([kalash_cx - kw, kalash_cy - kh, kalash_cx + kw, kalash_cy + kh], fill=(217, 119, 6, 255), outline=(254, 240, 138, 255), width=int(5 * scale))
    # Kalash neck & rim
    draw.rectangle([kalash_cx - int(25 * scale), kalash_cy - kh - int(12 * scale), 
                    kalash_cx + int(25 * scale), kalash_cy - kh], fill=(245, 158, 11, 255), outline=(254, 240, 138, 255), width=int(3 * scale))
    draw.ellipse([kalash_cx - int(30 * scale), kalash_cy - kh - int(16 * scale), 
                  kalash_cx + int(30 * scale), kalash_cy - kh - int(8 * scale)], fill=(254, 240, 138, 255))

    # 7. Divine Akhand Diya (Devotional Oil Lamp)
    diya_y = int(center_y + 80 * scale)
    diya_w = int(40 * scale)
    diya_h = int(18 * scale)
    # Clay diya bowl
    draw.arc([cx - diya_w, diya_y - diya_h, cx + diya_w, diya_y + diya_h], 0, 180, fill=(180, 83, 9, 255), width=int(10 * scale))
    draw.polygon([(cx - diya_w + 4, diya_y), (cx + diya_w - 4, diya_y), (cx, diya_y + diya_h + 4)], fill=(146, 64, 14, 255))
    
    # Holy Flame (Jyoti)
    flame_tip_y = diya_y - int(55 * scale)
    flame_poly_outer = [
        (cx, flame_tip_y),
        (cx + int(18 * scale), diya_y - int(22 * scale)),
        (cx + int(10 * scale), diya_y - int(6 * scale)),
        (cx - int(10 * scale), diya_y - int(6 * scale)),
        (cx - int(18 * scale), diya_y - int(22 * scale)),
    ]
    draw.polygon(flame_poly_outer, fill=(239, 68, 68, 255))
    
    flame_poly_inner = [
        (cx, flame_tip_y + int(12 * scale)),
        (cx + int(10 * scale), diya_y - int(18 * scale)),
        (cx + int(5 * scale), diya_y - int(6 * scale)),
        (cx - int(5 * scale), diya_y - int(6 * scale)),
        (cx - int(10 * scale), diya_y - int(18 * scale)),
    ]
    draw.polygon(flame_poly_inner, fill=(254, 240, 138, 255))
    # Pure white core
    draw.ellipse([cx - int(4 * scale), diya_y - int(22 * scale), cx + int(4 * scale), diya_y - int(10 * scale)], fill=(255, 255, 255, 255))

    # 8. Sacred Prasad Offerings (Thekua & Fruits on the Soop)
    # Coconut (Nariyal)
    draw.ellipse([cx - int(80 * scale), soop_top + int(15 * scale), cx - int(45 * scale), soop_top + int(50 * scale)], 
                 fill=(120, 53, 15, 255), outline=(254, 240, 138, 200), width=int(3 * scale))
    # Thekua / Sweet offerings (golden-brown stamped disks)
    draw.ellipse([cx + int(45 * scale), soop_top + int(18 * scale), cx + int(80 * scale), soop_top + int(46 * scale)], 
                 fill=(217, 119, 6, 255), outline=(254, 240, 138, 200), width=int(3 * scale))
    # Red sacred Sindoor / Roli mark on Soop
    draw.line([(cx - 15, soop_top + 8), (cx + 15, soop_top + 8)], fill=(220, 38, 38, 255), width=int(5 * scale))

    # If round icon requested, apply round mask
    if is_round:
        mask = Image.new("L", (canvas_size, canvas_size), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.ellipse([cx - 490, cy - 490, cx + 490, cy + 490], fill=255)
        # Apply anti-aliased mask
        img.putalpha(mask)

    # High-quality resize to target size
    result = img.resize((size, size), Image.Resampling.LANCZOS)
    return result

def main():
    base_res_dir = r"C:\Users\ASHIR\.gemini\antigravity\scratch\chhath-parv-app\android\app\src\main\res"
    
    # Densities and corresponding standard / round icon sizes
    densities = {
        "mipmap-mdpi": {"icon": 48, "fg": 108},
        "mipmap-hdpi": {"icon": 72, "fg": 162},
        "mipmap-xhdpi": {"icon": 96, "fg": 216},
        "mipmap-xxhdpi": {"icon": 144, "fg": 324},
        "mipmap-xxxhdpi": {"icon": 192, "fg": 432}
    }

    for folder, sizes in densities.items():
        folder_path = os.path.join(base_res_dir, folder)
        os.makedirs(folder_path, exist_ok=True)
        
        # 1. Standard ic_launcher.png
        icon = create_chhath_icon(sizes["icon"], is_foreground=False, is_round=False)
        icon.save(os.path.join(folder_path, "ic_launcher.png"), "PNG")
        
        # 2. Round ic_launcher_round.png
        round_icon = create_chhath_icon(sizes["icon"], is_foreground=False, is_round=True)
        round_icon.save(os.path.join(folder_path, "ic_launcher_round.png"), "PNG")
        
        # 3. Adaptive Foreground ic_launcher_foreground.png
        fg_icon = create_chhath_icon(sizes["fg"], is_foreground=True, is_round=False)
        fg_icon.save(os.path.join(folder_path, "ic_launcher_foreground.png"), "PNG")
        
        print(f"Generated icons for {folder}: {sizes['icon']}x{sizes['icon']} (fg: {sizes['fg']}x{sizes['fg']})")

    # Also save a 512x512 master app icon for the web and repo
    master_icon = create_chhath_icon(512, is_foreground=False, is_round=False)
    master_icon.save(r"C:\Users\ASHIR\.gemini\antigravity\scratch\chhath-parv-app\public\icon-512.png", "PNG")
    print("Master 512x512 icon saved to public/icon-512.png")

if __name__ == "__main__":
    main()
