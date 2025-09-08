# EastSecure Cyber Solutions

A comprehensive cybersecurity platform for East African businesses, featuring authentication, service management, blog, contact forms, and website security scanning.

## Features

### 🔐 Authentication
- **Google OAuth**: Secure sign-in with Google accounts
- **Email Verification**: Email-based authentication with verification codes
- **Session Management**: HTTP-only cookies for secure session handling

### 🛡️ Security Services
- **Service Requests**: Create and manage cybersecurity service requests
- **Website Scanner**: Integrated security scanning powered by FastAPI
- **Dashboard**: Real-time statistics and service management

### 📝 Content Management
- **Blog System**: Complete blog with categories, search, and filtering
- **Contact Forms**: Automated email notifications for inquiries
- **User Portal**: Personalized dashboard for clients

### 🌍 Regional Focus
- Tailored for East African cybersecurity needs
- M-Pesa security expertise
- Kenya DPA compliance guidance
- Multi-country support (Kenya, Uganda, Tanzania, Rwanda, Ethiopia)

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Framer Motion
- **Authentication**: NextAuth.js with Google OAuth and email verification
- **Database**: PostgreSQL with Drizzle ORM
- **Email**: Nodemailer for transactional emails
- **External API**: FastAPI integration for website scanning

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/eastsecure"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
CONTACT_EMAIL="contact@eastsecure.co.ke"

# External API
FASTAPI_SCANNER_URL="http://localhost:8000"
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### 3. Email Configuration

For Gmail SMTP:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in `SMTP_PASS`

### 4. Database Setup

```bash
# Install dependencies
npm install

# Generate database schema
npm run db:generate

# Push schema to database
npm run db:push

# Seed database (optional)
npm run db:seed
```

### 5. FastAPI Scanner (Optional)

Set up a FastAPI service for website scanning:

```python
# Example FastAPI endpoint
from fastapi import FastAPI

app = FastAPI()

@app.post("/scan")
async def scan_website(data: dict):
    url = data.get("url")
    scan_type = data.get("scan_type", "basic")
    
    # Implement your scanning logic here
    results = {
        "url": url,
        "scan_type": scan_type,
        "vulnerabilities": [],
        "score": 85,
        "recommendations": []
    }
    
    return results
```

### 6. Run the Application

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/send-code` - Send email verification code
- `POST /api/auth/verify-email` - Verify email and create/login user

### Services
- `GET /api/service-requests` - Get user's service requests
- `POST /api/service-requests` - Create new service request
- `GET /api/dashboard/stats` - Get dashboard statistics

### Blog
- `GET /api/blog` - Get blog posts with filtering
- `GET /api/blog/[slug]` - Get specific blog post
- `GET /api/blog/categories` - Get blog categories

### Contact
- `POST /api/contact` - Submit contact inquiry

### Scanner
- `GET /api/scanner` - Get user's scans
- `POST /api/scanner` - Initiate website scan

## Database Schema

### Core Tables
- `users` - User accounts and profiles
- `accounts` - OAuth account linking
- `sessions` - User sessions
- `service_requests` - Service requests
- `inquiries` - Contact form submissions
- `posts` - Blog posts
- `website_scans` - Security scan results
- `email_verification_codes` - Email verification

## Features in Detail

### Email Authentication Flow
1. User enters email address
2. System sends 6-digit verification code
3. User enters code and optional profile info
4. System creates account or logs in existing user
5. Secure session established

### Website Scanner
1. User submits URL and scan type
2. System creates scan record
3. FastAPI service performs security scan
4. Results stored and displayed in dashboard

### Blog System
- Category filtering
- Search functionality
- Pagination
- SEO-friendly URLs
- Related posts

### Contact System
- Form validation
- Email notifications
- Inquiry tracking
- Status management

## Security Features

- HTTP-only cookies
- CSRF protection
- Input validation
- SQL injection prevention
- XSS protection
- Secure session management

## Deployment

The application is ready for deployment on platforms like:
- Vercel
- Netlify
- Railway
- DigitalOcean App Platform

Ensure all environment variables are configured in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.