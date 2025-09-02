# Personal Notes Organizer - Frontend

This is the Vite + React frontend for the Personal Notes Organizer.

Features:
- User authentication (mocked locally for now)
- Create, edit, delete notes
- List and search notes (title, content, tags)
- Responsive layout with sidebar and main content
- Dark/light mode toggle
- Modern, minimalistic design
- API layer ready for integration with the `notes_database` service

Tech:
- Vite, React, React Router, Zustand, date-fns

Run:
- Install: `npm i`
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

Environment:
- Copy `.env.example` to `.env` and set `VITE_API_URL` to your backend endpoint.

API Integration Notes:
- See `src/api/client.js`. Replace stubbed methods with real fetch calls:
  - POST `${VITE_API_URL}/auth/login`
  - GET `${VITE_API_URL}/notes?search=...`
  - POST `${VITE_API_URL}/notes`
  - PUT `${VITE_API_URL}/notes/:id`
  - DELETE `${VITE_API_URL}/notes/:id`