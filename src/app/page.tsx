import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Create Amazing Recipes
          <br />
          <span className="text-blue-600">with AI</span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Chat with our AI to generate custom recipes, or browse thousands of
          recipes created by our community. Share your creations with the world.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/login">
            <Button size="lg" className="w-full sm:w-auto">
              Start Creating
            </Button>
          </Link>
          <Link href="/recipes">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Browse Recipes
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-600">
              Chat with Gemini to create custom recipes tailored to your taste
              and dietary needs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-xl font-semibold mb-2">Personal Cookbook</h3>
            <p className="text-gray-600">
              Save your favorite recipes to your personal cookbook and access
              them anytime.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold mb-2">Share & Discover</h3>
            <p className="text-gray-600">
              Share your recipes with the community and discover amazing dishes
              from around the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
