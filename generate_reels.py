import urllib.request
import subprocess
import os

os.makedirs("client/public/videos", exist_ok=True)

reels = [
    {
        "id": "reel_worli_sea_face",
        "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
        "zoom": "min(zoom+0.0018,1.25)",
        "x": "iw/2-(iw/zoom/2)",
        "y": "ih/2-(ih/zoom/2)"
    },
    {
        "id": "reel_bandra_duplex",
        "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
        "zoom": "min(zoom+0.0015,1.22)",
        "x": "iw/2-(iw/zoom/2)+sin(in_time*0.5)*30",
        "y": "ih/2-(ih/zoom/2)"
    },
    {
        "id": "reel_dlf_camellias",
        "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
        "zoom": "min(zoom+0.0016,1.24)",
        "x": "iw/2-(iw/zoom/2)",
        "y": "ih/2-(ih/zoom/2)+cos(in_time*0.4)*20"
    },
    {
        "id": "reel_goa_beach_villa",
        "url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85",
        "zoom": "min(zoom+0.0020,1.26)",
        "x": "iw/2-(iw/zoom/2)",
        "y": "ih/2-(ih/zoom/2)"
    },
    {
        "id": "reel_bangalore_golfshire",
        "url": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=85",
        "zoom": "min(zoom+0.0014,1.20)",
        "x": "iw/2-(iw/zoom/2)",
        "y": "ih/2-(ih/zoom/2)"
    },
    {
        "id": "reel_palm_jumeirah",
        "url": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=85",
        "zoom": "min(zoom+0.0018,1.25)",
        "x": "iw/2-(iw/zoom/2)",
        "y": "ih/2-(ih/zoom/2)"
    },
    {
        "id": "reel_jubilee_hills",
        "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85",
        "zoom": "min(zoom+0.0016,1.22)",
        "x": "iw/2-(iw/zoom/2)",
        "y": "ih/2-(ih/zoom/2)"
    },
    {
        "id": "reel_south_delhi_bungalow",
        "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
        "zoom": "min(zoom+0.0015,1.22)",
        "x": "iw/2-(iw/zoom/2)",
        "y": "ih/2-(ih/zoom/2)"
    }
]

headers = {'User-Agent': 'Mozilla/5.0'}

for r in reels:
    img_path = f"client/public/videos/{r['id']}.jpg"
    out_mp4 = f"client/public/videos/{r['id']}.mp4"
    if not os.path.exists(img_path):
        print(f"Downloading {r['id']} image...")
        req = urllib.request.Request(r['url'], headers=headers)
        with urllib.request.urlopen(req) as resp, open(img_path, 'wb') as f:
            f.write(resp.read())
    
    if not os.path.exists(out_mp4):
        print(f"Encoding {out_mp4} with cinematic Ken Burns effect...")
        vf = f"scale=1400:-1,zoompan=z='{r['zoom']}':x='{r['x']}':y='{r['y']}':d=175:s=720x1280:fps=25"
        cmd = [
            "/opt/homebrew/bin/ffmpeg", "-y", "-loop", "1", "-i", img_path,
            "-vf", vf, "-c:v", "libx264", "-t", "7", "-pix_fmt", "yuv420p",
            out_mp4
        ]
        subprocess.run(cmd, check=True)
        print(f"Done: {out_mp4}")

print("All reels generated successfully!")
