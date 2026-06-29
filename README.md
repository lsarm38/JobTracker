# JobTracker

A full-stack job application tracking tool built to manage and visualize the job search process. Built with a C# / ASP.NET Core backend and a React / TypeScript frontend.

---

## Features

- **Application management** — add, edit, and delete job applications
- **Status tracking** — move applications through Applied → Interview → Offer → Rejected
- **Status timeline** — automatic audit log of every status change per application
- **Notes** — log timestamped notes against any application
- **Dashboard** — stats overview with response rate, status breakdown charts, and recent applications

---

## Tech Stack

**Backend**
- C# / ASP.NET Core
- Entity Framework Core
- SQLite (development) → PostgreSQL (production)
- REST API with service layer, interfaces, and DTOs

**Frontend**
- React 19 / TypeScript
- Vite
- Tailwind CSS
- Recharts
- Axios
- React Router

---

## Project Structure

```
JobTracker/
├── JobTracker.API/               # ASP.NET Core backend
│   ├── Controllers/              # HTTP layer
│   ├── Data/                     # DbContext
│   ├── DTOs/                     # Request/response models
│   ├── Models/                   # EF Core entities
│   └── Services/                 # Business logic
│       └── Interfaces/           # Service contracts
└── jobtracker-client/            # React frontend
    └── src/
        ├── api/                  # Axios API calls
        ├── components/           # Reusable UI components
        ├── pages/                # Page components
        └── types/                # TypeScript interfaces
```

---

## Getting Started

### Prerequisites

- [.NET 9 or 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js LTS](https://nodejs.org)

### Backend

```bash
cd JobTracker.API/JobTracker.API
dotnet restore
dotnet ef database update
dotnet run
```

The API will start at `http://localhost:5185`. Swagger UI is available at `http://localhost:5185/swagger`.

### Frontend

```bash
cd jobtracker-client
npm install
npm run dev
```

The app will start at `http://localhost:5173`.

> Make sure the backend is running before starting the frontend.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/applications` | Get all applications |
| GET | `/api/applications/:id` | Get application with notes and history |
| POST | `/api/applications` | Create a new application |
| PUT | `/api/applications/:id` | Update an application |
| DELETE | `/api/applications/:id` | Delete an application |
| GET | `/api/applications/stats` | Get dashboard stats |
| GET | `/api/applications/:id/notes` | Get notes for an application |
| POST | `/api/applications/:id/notes` | Add a note |
| DELETE | `/api/applications/:id/notes/:noteId` | Delete a note |

---

## Database Schema

**Applications** — core job application record with company, role, status, URL, and dates

**Notes** — timestamped notes linked to an application (cascade delete)

**StatusHistories** — automatic audit log created on every status change (cascade delete)

---

## Roadmap

- [ ] PostgreSQL for production
- [ ] Deploy API to Azure / Railway
- [ ] Deploy frontend to Vercel
- [ ] Authentication for multi-user support
- [ ] Export applications to CSV
- [ ] Email reminders for follow-ups

---

## Author

Luis Sarmiento — [LinkedIn](https://www.linkedin.com/in/luis-sarmiento-40023b54/) · [Portfolio]()
