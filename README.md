# JobTracker

A full-stack job application tracking tool built to manage and visualize the job search process. Built with a C# / ASP.NET Core backend and a React / TypeScript frontend.

🔗 **[Live Demo](https://job-tracker-rose-psi.vercel.app)** · **[API](https://jobtracker-api-3p4i.onrender.com/swagger)**

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

**Infrastructure**

- API hosted on [Render](https://render.com)
- Database hosted on [Supabase](https://supabase.com) (PostgreSQL)
- Frontend hosted on [Vercel](https://vercel.com)

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
- A PostgreSQL database (local or hosted — [Supabase](https://supabase.com) recommended)

### Backend

1. Clone the repo and navigate to the backend:

```bash
cd JobTracker.API
```

2. Add an `appsettings.Development.json` file with your database connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=...;Port=...;Database=...;Username=...;Password=...;SSL Mode=Require;Trust Server Certificate=true"
  }
}
```

3. Run migrations and start the API:

```bash
dotnet restore
dotnet ef database update
dotnet run
```

The API will start at `http://localhost:5185`. Swagger UI is available at `http://localhost:5185/swagger`.

### Frontend

1. Navigate to the frontend folder:

```bash
cd jobtracker-client
```

2. Add a `.env.local` file:

```
VITE_API_URL=http://localhost:5185/api
```

3. Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

The app will start at `http://localhost:5173`.

> Make sure the backend is running before starting the frontend.

---

## API Endpoints

| Method | Endpoint                              | Description                            |
| ------ | ------------------------------------- | -------------------------------------- |
| GET    | `/api/applications`                   | Get all applications                   |
| GET    | `/api/applications/:id`               | Get application with notes and history |
| POST   | `/api/applications`                   | Create a new application               |
| PUT    | `/api/applications/:id`               | Update an application                  |
| DELETE | `/api/applications/:id`               | Delete an application                  |
| GET    | `/api/applications/stats`             | Get dashboard stats                    |
| GET    | `/api/applications/:id/notes`         | Get notes for an application           |
| POST   | `/api/applications/:id/notes`         | Add a note                             |
| DELETE | `/api/applications/:id/notes/:noteId` | Delete a note                          |

---

## Database Schema

**Applications** — core job application record with company, role, status, URL, and dates

**Notes** — timestamped notes linked to an application (cascade delete)

**StatusHistories** — automatic audit log created on every status change (cascade delete)

---

## Roadmap

- [x] PostgreSQL for production
- [x] Deploy API to Render
- [x] Deploy frontend to Vercel
- [ ] Authentication for multi-user support
- [ ] Export applications to CSV
- [ ] Email reminders for follow-ups

---

## Author

Luis Sarmiento — [LinkedIn](https://www.linkedin.com/in/luis-sarmiento-40023b54/) · [Portfolio]()
