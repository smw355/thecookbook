'use client';

import { Recipe } from '@/hooks/useChat';
import { Button } from '@/components/ui/Button';
import { Clock, Users, ChefHat } from 'lucide-react';

type RecipePreviewProps = {
  recipe: Recipe | null;
  onSave?: () => void;
  isSaving?: boolean;
};

export function RecipePreview({ recipe, onSave, isSaving = false }: RecipePreviewProps) {
  if (!recipe) {
    return (
      <div className="flex items-center justify-center h-full text-center p-8">
        <div>
          <div className="text-6xl mb-4">👨‍🍳</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Recipe Yet
          </h3>
          <p className="text-gray-600">
            Start chatting with the AI to generate your recipe, and it will
            appear here in real-time.
          </p>
        </div>
      </div>
    );
  }

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {recipe.title}
              </h2>
              <p className="text-gray-600">{recipe.description}</p>
            </div>
            {onSave && (
              <Button
                onClick={onSave}
                disabled={isSaving}
                className="ml-4"
              >
                {isSaving ? 'Saving...' : 'Save Recipe'}
              </Button>
            )}
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4" />
              <span>
                {totalTime} min ({recipe.prepTime}m prep, {recipe.cookTime}m cook)
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="w-4 h-4" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <ChefHat className="w-4 h-4" />
              <span className="capitalize">{recipe.difficulty}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
              {recipe.cuisine}
            </span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
              {recipe.category}
            </span>
            {recipe.dietaryTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Ingredients
          </h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-gray-700"
              >
                <span className="text-orange-600 mt-1">•</span>
                <span>
                  <strong>
                    {ingredient.amount} {ingredient.unit}
                  </strong>{' '}
                  {ingredient.name}
                  {ingredient.notes && (
                    <span className="text-gray-600 italic">
                      {' '}
                      ({ingredient.notes})
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Instructions
          </h3>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction) => (
              <li
                key={instruction.step}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {instruction.step}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-gray-700">{instruction.instruction}</p>
                  {(instruction.time || instruction.temperature) && (
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                      {instruction.time && (
                        <span>⏱️ {instruction.time} minutes</span>
                      )}
                      {instruction.temperature && (
                        <span>🌡️ {instruction.temperature}</span>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Tips */}
        {recipe.tips && recipe.tips.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Chef's Tips
            </h3>
            <ul className="space-y-2">
              {recipe.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-orange-600 mt-1">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
