# Dental Clinic Management System

A comprehensive dental clinic management system built with Next.js, React, and TypeScript. This application provides a complete solution for managing dental appointments, patient records, and clinic operations.

## Features

### 🏥 Multi-Role Support
- **Patients**: Book appointments, view medical records, manage profile
- **Students**: Access clinical cases, manage patient assignments, track progress
- **Professors**: Supervise student work, approve treatments, manage specialties
- **Administrators**: Full system control, user management, analytics
- **Secretaries**: Appointment scheduling, patient registration, daily agenda

### 🦷 Dental Specialties
- Endodoncia (Endodontics)
- Ortodoncia (Orthodontics)
- Cirugía Oral (Oral Surgery)
- Odontopediatría (Pediatric Dentistry)
- Odontología General (General Dentistry)

### 📱 Key Functionality
- **Appointment Management**: Complete booking and scheduling system
- **Patient Records**: Digital medical history and treatment tracking
- **Academic Integration**: Student-professor workflow for dental education
- **Real-time Dashboard**: Role-based dashboards with relevant metrics
- **Responsive Design**: Mobile-first approach for all devices

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### UI Components
- Custom component library built on Radix UI
- Consistent design system with medical theme
- Accessible and responsive components
- Dark mode support

### Development Tools
- **ESLint** - Code linting
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **TypeScript** - Static type checking

## Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/your-username/dental-clinic-management.git
cd dental-clinic-management
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Run the development server**
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
dental-clinic-management/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard pages for all roles
│   ├── login/            # Authentication pages
│   ├── api/              # API routes
│   └── globals.css       # Global styles
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── contexts/             # React contexts
├── types/                # TypeScript type definitions
└── public/               # Static assets
\`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## User Roles & Permissions

### 👤 Patient
- Book and manage appointments
- View personal medical records
- Update profile information
- Access treatment history

### 🎓 Student
- View assigned patients
- Access clinical cases
- Submit treatment plans
- Track academic progress

### 👨‍🏫 Professor
- Supervise student work
- Approve treatment plans
- Manage specialty areas
- Review clinical cases

### 👨‍💼 Administrator
- Full system access
- User management
- System configuration
- Analytics and reports

### 👩‍💼 Secretary
- Appointment scheduling
- Patient registration
- Daily agenda management
- Communication handling

## Features in Detail

### Appointment System
- Real-time availability checking
- Automated confirmation emails
- Reminder notifications
- Rescheduling capabilities

### Medical Records
- Digital patient files
- Treatment history tracking
- Prescription management
- Image and document storage

### Academic Integration
- Student-patient assignments
- Progress tracking
- Evaluation system
- Clinical case studies

### Dashboard Analytics
- Appointment statistics
- Patient demographics
- Treatment outcomes
- Financial reporting

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

Run the test suite:

\`\`\`bash
npm run test
\`\`\`

Run tests in watch mode:

\`\`\`bash
npm run test:watch
\`\`\`

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application:
\`\`\`bash
npm run build
\`\`\`

2. Start the production server:
\`\`\`bash
npm start
\`\`\`

## Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Add your environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@dentalclinic.com or create an issue in the GitHub repository.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
