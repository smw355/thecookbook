import { PredictionServiceClient } from '@google-cloud/aiplatform';
import { google } from '@google-cloud/aiplatform/build/protos/protos';
import { storage } from '@/lib/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || '';
const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

// Initialize Vertex AI client
let predictionClient: PredictionServiceClient | null = null;

function getPredictionClient(): PredictionServiceClient {
  if (!predictionClient) {
    // Parse Firebase Admin credentials if available
    const adminKey = process.env.FIREBASE_ADMIN_KEY;

    if (adminKey) {
      const credentials = JSON.parse(adminKey);
      predictionClient = new PredictionServiceClient({
        credentials: {
          client_email: credentials.client_email,
          private_key: credentials.private_key,
        },
        projectId: credentials.project_id,
      });
    } else {
      // Fallback to default credentials
      predictionClient = new PredictionServiceClient();
    }
  }

  return predictionClient;
}

export type ImageGenerationParams = {
  prompt: string;
  negativePrompt?: string;
  aspectRatio?: '1:1' | '9:16' | '16:9' | '4:3' | '3:4';
  numberOfImages?: number;
  seed?: number;
};

export type GeneratedImage = {
  url: string;
  path: string;
  base64?: string;
};

/**
 * Generate an image using Imagen 3
 */
export async function generateImage(
  params: ImageGenerationParams
): Promise<GeneratedImage> {
  const {
    prompt,
    negativePrompt = 'blurry, low quality, distorted, unappetizing, messy',
    aspectRatio = '16:9',
    numberOfImages = 1,
    seed,
  } = params;

  try {
    const client = getPredictionClient();

    const endpoint = `projects/${projectId}/locations/${location}/publishers/google/models/imagen-3.0-generate-001`;

    // Prepare the request
    const instanceValue = {
      prompt,
      negativePrompt,
      aspectRatio,
      numberOfImages,
      ...(seed && { seed }),
    };

    const instance = google.protobuf.Value.fromObject(instanceValue);
    const instances = [instance];

    const parameter = {
      sampleCount: numberOfImages,
    };
    const parameters = google.protobuf.Value.fromObject(parameter);

    // Make the prediction request
    const [response] = await client.predict({
      endpoint,
      instances,
      parameters,
    });

    if (!response.predictions || response.predictions.length === 0) {
      throw new Error('No images generated');
    }

    // Get the first generated image
    const prediction = response.predictions[0];
    const imageData = prediction.structValue?.fields?.bytesBase64Encoded?.stringValue;

    if (!imageData) {
      throw new Error('No image data in response');
    }

    // For now, return the base64 data
    // In a production setup, you'd upload this to Cloud Storage
    return {
      url: `data:image/png;base64,${imageData}`,
      path: '',
      base64: imageData,
    };
  } catch (error) {
    console.error('Error generating image with Imagen:', error);
    throw new Error(`Failed to generate image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Upload a base64 image to Firebase Storage
 */
export async function uploadGeneratedImage(
  base64Data: string,
  path: string
): Promise<{ url: string; path: string }> {
  try {
    // Convert base64 to blob
    const response = await fetch(`data:image/png;base64,${base64Data}`);
    const blob = await response.blob();

    // Upload to Firebase Storage
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, blob, {
      contentType: 'image/png',
    });

    // Get download URL
    const url = await getDownloadURL(storageRef);

    return { url, path };
  } catch (error) {
    console.error('Error uploading generated image:', error);
    throw new Error('Failed to upload generated image');
  }
}

/**
 * Generate and upload a recipe image
 */
export async function generateRecipeImage(
  prompt: string,
  recipeId: string
): Promise<{ url: string; path: string }> {
  // Generate the image
  const generated = await generateImage({
    prompt,
    aspectRatio: '16:9',
    numberOfImages: 1,
  });

  if (!generated.base64) {
    throw new Error('No base64 data returned from image generation');
  }

  // Upload to Firebase Storage
  const path = `recipes/${recipeId}/ai-generated-${Date.now()}.png`;
  const uploaded = await uploadGeneratedImage(generated.base64, path);

  return uploaded;
}
