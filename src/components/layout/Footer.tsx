import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              TheCookbook.ai
            </h3>
            <p className="text-sm text-gray-600">
              Create amazing recipes with AI and share them with the world.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Discover
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/recipes" className="hover:text-orange-600">
                  Browse Recipes
                </Link>
              </li>
              <li>
                <Link href="/recipes?sort=popular" className="hover:text-orange-600">
                  Popular
                </Link>
              </li>
              <li>
                <Link href="/recipes?sort=newest" className="hover:text-orange-600">
                  Latest
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-orange-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/privacy" className="hover:text-orange-600">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-orange-600">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} TheCookbook.ai. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
