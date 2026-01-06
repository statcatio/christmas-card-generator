import Replicate from 'replicate';

// Initialize Replicate client
const replicate = new Replicate({
  auth: import.meta.env.VITE_REPLICATE_API_KEY,
});

// Get style reference images from environment variables
const getStyleImages = () => {
  const images = [];
  for (let i = 1; i <= 5; i++) {
    const imageUrl = import.meta.env[`VITE_STYLE_IMAGE_${i}`];
    if (imageUrl && !imageUrl.includes('your_image')) {
      images.push(imageUrl);
    }
  }
  return images;
};

/**
 * Generate a Christmas card image using FLUX with style reference
 * @param {string} prompt - User's description of what they want in the image
 * @returns {Promise<string>} - URL of the generated image
 */
export async function generateChristmasCard(prompt) {
  // TEST MODE: Use placeholder image for testing watermark
  const TEST_MODE = true; // Set to false when you have API key

  if (TEST_MODE) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Return a test Christmas image
    return 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&h=1000&fit=crop';
  }

  try {
    const styleImages = getStyleImages();

    if (styleImages.length === 0) {
      throw new Error('No style reference images configured. Please add your Imgur URLs to .env file.');
    }

    // Enhanced prompt for Christmas theme
    const christmasPrompt = `${prompt}, Christmas themed, festive, holiday card style, high quality illustration`;

    // Use FLUX model with style reference
    // Note: Using black-forest-labs/flux-dev as the base model
    // You may need to adjust the model based on what's available
    const output = await replicate.run(
      "black-forest-labs/flux-dev",
      {
        input: {
          prompt: christmasPrompt,
          num_outputs: 1,
          aspect_ratio: "3:4", // Card-like aspect ratio
          output_format: "png",
          output_quality: 90,
        }
      }
    );

    // Output is typically an array with the image URL
    const imageUrl = Array.isArray(output) ? output[0] : output;

    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error(`Failed to generate image: ${error.message}`);
  }
}

/**
 * Check if Replicate is configured
 * @returns {boolean}
 */
export function isReplicateConfigured() {
  // TEST MODE: Always return true for testing
  const TEST_MODE = true; // Set to false when you have API key

  if (TEST_MODE) {
    return true;
  }

  const apiKey = import.meta.env.VITE_REPLICATE_API_KEY;
  const styleImages = getStyleImages();

  return apiKey &&
         !apiKey.includes('your_replicate_api_key') &&
         styleImages.length > 0;
}
