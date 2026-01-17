// Test script to check available Gemini models
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Read .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/GEMINI_API_KEY=(.+)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

async function testGemini() {
  if (!apiKey) {
    console.error('GEMINI_API_KEY not found in .env.local');
    process.exit(1);
  }

  console.log('Testing Gemini API...');
  console.log('API Key:', apiKey.substring(0, 15) + '...' + apiKey.substring(apiKey.length - 5));

  const genAI = new GoogleGenerativeAI(apiKey);

  // Try gemini-1.5-flash-latest with full error
  try {
    console.log(`\nTrying model: gemini-1.5-flash-latest`);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    const result = await model.generateContent('Say hello');
    const response = await result.response;
    const text = response.text();
    console.log(`✓ Model works!`);
    console.log(`Response: ${text}`);
  } catch (error) {
    console.log(`✗ Failed with full error:`);
    console.log(error);

    if (error.response) {
      console.log('\nResponse data:');
      console.log(error.response);
    }
  }
}

testGemini().catch(console.error);
