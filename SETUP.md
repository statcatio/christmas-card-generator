# Christmas Card Generator - Setup Guide

## Quick Start

Your AI-powered Christmas card generator is ready! Here's how to get it running:

### 1. Upload Your Art Style Images to Imgur

1. Go to [Imgur](https://imgur.com/)
2. Upload your 3-5 example drawings/artworks
3. For each image, right-click and copy the direct image URL (should end in `.jpg`, `.png`, etc.)

### 2. Get a Replicate API Key

1. Go to [Replicate](https://replicate.com/)
2. Sign up for a free account
3. Go to your [Account Settings > API Tokens](https://replicate.com/account/api-tokens)
4. Copy your API token

### 3. Configure Your .env File

Open the `.env` file in this directory and update it:

```env
# Paste your Replicate API key here
VITE_REPLICATE_API_KEY=r8_your_actual_api_key_here

# Paste your Imgur image URLs here (3-5 images)
VITE_STYLE_IMAGE_1=https://i.imgur.com/abc123.jpg
VITE_STYLE_IMAGE_2=https://i.imgur.com/def456.png
VITE_STYLE_IMAGE_3=https://i.imgur.com/ghi789.jpg
VITE_STYLE_IMAGE_4=https://i.imgur.com/jkl012.jpg
VITE_STYLE_IMAGE_5=https://i.imgur.com/mno345.jpg
```

### 4. Run the App

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser!

## How It Works

1. **Left Side (Controls):**
   - Type your custom message
   - Describe the image you want (e.g., "snowman with presents in a snowy forest")
   - Click "Generate Card"
   - Click "Purchase Card" for $1 (demo mode - just shows an alert)
2. **Right Side (Preview):** See your Christmas card in real-time

## Features

- AI generates images in YOUR unique art style
- Custom messages overlaid on the card
- Fun example prompts to get you started
- Beautiful split-screen design (inspired by Partiful)
- Responsive design (works on mobile too!)
- Demo payment flow ($1)

## Notes

- This is a **demo version** - payment is simulated with an alert
- Generated images use your uploaded style reference images
- Each generation costs a few cents on Replicate (check their pricing)
- For production: you'll need a backend and real Stripe integration

## Troubleshooting

**Error: "Please configure your Replicate API key"**
- Make sure you've added your actual API key to `.env`
- Restart the dev server after changing `.env`

**Error: "No style reference images configured"**
- Make sure you've added at least one image URL to `.env`
- Check that the URLs are direct image links (end in .jpg, .png, etc.)
- Restart the dev server after changing `.env`

**Generation takes a long time**
- AI image generation typically takes 10-30 seconds
- Replicate's FLUX model is powerful but not instant

**Image doesn't match my style**
- Make sure your example images are clear and representative
- Try adding more style reference images (up to 5)
- Use more descriptive prompts

## Next Steps

For a production version, you would need to:
1. Set up a backend server (to keep API keys secure)
2. Integrate real Stripe payments
3. Add image storage (AWS S3, Cloudinary, etc.)
4. Add user accounts and order history
5. Generate downloadable PDFs

Enjoy creating beautiful Christmas cards! 🎄✨
