# TheCookbook.ai 🍳🤖

An AI-powered recipe platform built with Next.js 14, Firebase, and Google Gemini AI. Create custom recipes through conversational AI, share them with the community, and build your personal cookbook.

## Features

- 🤖 **AI Recipe Generation** - Chat with Gemini 1.5 Pro to create custom recipes
- 📸 **Dual Image Support** - Upload your own photos or generate with Imagen 3
- 🔐 **Multi-Provider Auth** - Google, Facebook, and Apple sign-in via Firebase Auth
- 📖 **Personal Cookbooks** - Save and organize your favorite recipes
- 🌍 **Community Sharing** - Discover and share recipes with the world
- ⭐ **Ratings & Reviews** - Rate and review recipes from the community
- 🔍 **Smart Search** - Full-text search powered by Algolia
- 📱 **Responsive Design** - Beautiful UI that works on all devices

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Database:** Firestore (NoSQL)
- **Authentication:** Firebase Auth (Google, Facebook, Apple)
- **Storage:** Cloud Storage
- **Hosting:** Cloud Run (containerized)
- **LLM:** Google Gemini 1.5 Pro
- **Image Generation:** Google Imagen 3 (Vertex AI)
- **Search:** Algolia
- **Styling:** Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- Firebase project
- Google Cloud project with Vertex AI enabled
- Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/smw355/thecookbook.git
cd thecookbook
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Firebase and Google AI credentials.

4. Initialize Firebase (if not already done):
```bash
firebase login
firebase init
```

5. Deploy Firestore rules and indexes:
```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Project Structure

```
thecookbook/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # React components
│   ├── lib/                    # Utilities and configs
│   ├── hooks/                  # Custom React hooks
│   └── types/                  # TypeScript types
├── functions/                  # Cloud Functions
├── firestore.rules             # Firestore security rules
└── firebase.json               # Firebase configuration
```

## Development Phases

### Phase 1: Foundation ✅
- [x] Next.js project setup
- [x] Firebase integration
- [x] Authentication system
- [x] Basic UI components
- [x] Layout and navigation

### Phase 2-6: Coming Soon
See our [implementation plan](https://github.com/smw355/thecookbook/blob/main/.claude/plans/cheerful-cooking-cook.md) for details.

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT License

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Firebase](https://firebase.google.com/)
- AI by [Google Gemini](https://deepmind.google/technologies/gemini/)
- Images by [Google Imagen](https://deepmind.google/technologies/imagen-3/)
