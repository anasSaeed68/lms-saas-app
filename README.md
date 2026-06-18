# Converso - AI-Powered LMS SaaS Platform

Converso is an AI-powered Learning Management System (LMS) SaaS platform that transforms online learning through interactive voice-based AI companions. Users can create and listen to AI-generated lectures, engage in conversational learning experiences, bookmark their favorite companions, and track their learning sessions in a modern, responsive environment.

## ✨ Features

* 🔐 Secure authentication and user management with Clerk
* 💳 Subscription and billing integration using Clerk
* 🎙️ Voice-enabled AI companions powered by Vapi
* 📚 Create and listen to AI-generated lectures
* ❤️ Bookmark favorite learning companions
* 🕒 Session history tracking and personalized learning experience
* 🔍 Browse and discover companions by subject and topic
* 📱 Responsive and modern user interface
* ⚡ Server Actions and optimized data fetching with Next.js
* ☁️ Cloud deployment on Vercel

## 🛠️ Tech Stack

**Frontend**

* Next.js 15
* React
* TypeScript
* Tailwind CSS

**Backend & Database**

* Supabase
* Next.js Server Actions

**Authentication & Billing**

* Clerk Authentication
* Clerk Billing

**AI & Voice**

* Vapi AI

**Deployment**

* Vercel

## 📂 Project Structure

```text
app/
├── (auth)
├── companions
├── dashboard
├── profile
├── session-history
├── bookmarks
├── layout.tsx
└── page.tsx

components/
lib/
├── actions
├── supabase.ts
└── utils.ts
```

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/converso.git
cd converso
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_VAPI_PUBLIC_KEY=
VAPI_PRIVATE_KEY=
```

### Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 🎯 Key Functionalities

### AI Learning Companions

Create interactive voice-enabled AI companions that deliver personalized lectures and conversational learning experiences.

### Session History

Track previously accessed companions and maintain learning continuity.

### Bookmarks

Save favorite companions and access them quickly from the bookmarks section.

### Authentication & Billing

Secure user authentication and subscription management powered by Clerk.

## 🌐 Live Demo

https://your-converso-url.vercel.app

## 📸 Screenshots

Add screenshots or GIFs of:

* Home Page
* Companion Dashboard
* Voice Session Interface
* Session History
* Bookmarks

## 👨‍💻 Author

**Your Name**

* GitHub: https://github.com/AnasSaeed09
* LinkedIn: https://www.linkedin.com/in/anas-saeed-2b329424a/

---

If you found this project helpful, consider giving it a ⭐ on GitHub.
