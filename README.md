# Kwitaly

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green.svg)](https://supabase.com/)

Kwitaly is a modern, lightweight, and professional SaaS application designed for freelancers and small businesses to manage their invoices seamlessly without the overhead of enterprise features.

[Screenshot Dashboard]

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Database & Auth: Supabase (PostgreSQL)
- Email: Resend

## Key Features
- Clean and professional dashboard interface.
- Create and manage clients effortlessly.
- Generate and track invoices with distinct statuses.
- Export invoices instantly to PDF.
- Direct email delivery to clients.

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or pnpm
- Supabase account and project
- Resend API key (if email features are enabled)

### Local Development Setup

1. Clone the repository
```bash
git clone https://github.com/fiyoraa/kwitaly.git
cd kwitaly
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Copy the example environment file and update the values.
```bash
cp .env.example .env.local
```

4. Database Setup
Run the SQL migrations found in the `supabase/migrations` folder within your Supabase project's SQL editor to set up the necessary tables (Profiles, Clients, Invoices).

5. Start the development server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## Environment Variables

| Variable | Description | Example |
| -------- | ----------- | ------- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://your-project-ref.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase public anonymous key | `eyJhbGciOiJIUzI1...` |
| `RESEND_API_KEY` | API key for Resend email service | `re_123456789...` |

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits
Built by [Fiyoraa](https://github.com/fiyoraa).
