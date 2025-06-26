# Sistema de Gestión de Clínica Dental ULEAM

Un sistema completo de gestión para clínicas dentales universitarias desarrollado con Next.js, React y TypeScript.

## 🚀 Características

### Roles de Usuario
- **Administrador**: Gestión completa del sistema, usuarios y configuración
- **Profesor**: Supervisión de estudiantes, aprobación de trabajos, gestión de especialidades
- **Estudiante**: Gestión de pacientes, casos clínicos, progreso académico
- **Paciente**: Agendamiento de citas, historial médico, perfil personal
- **Secretario**: Gestión de citas, registro de pacientes, reportes

### Funcionalidades Principales
- ✅ **Autenticación y Autorización** - Sistema seguro basado en roles
- ✅ **Gestión de Citas** - Agendamiento y seguimiento completo
- ✅ **Historiales Médicos** - Registros detallados de tratamientos
- ✅ **Casos Clínicos** - Creación y seguimiento de casos académicos
- ✅ **Sistema de Aprobaciones** - Workflow profesor-estudiante
- ✅ **Dashboard Personalizado** - Interfaces específicas por rol
- ✅ **Reportes y Analytics** - Métricas y análisis del sistema
- ✅ **Responsive Design** - Optimizado para todos los dispositivos

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **State Management**: React Context

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Git

## 🚀 Instalación y Desarrollo

### 1. Clonar el repositorio
\`\`\`bash
git clone <repository-url>
cd dental-clinic-management
\`\`\`

### 2. Instalar dependencias
\`\`\`bash
npm install
\`\`\`

### 3. Ejecutar en modo desarrollo
\`\`\`bash
npm run dev
\`\`\`

La aplicación estará disponible en `http://localhost:3000`

## 🧪 Testing

### Ejecutar todos los tests
\`\`\`bash
npm run test
\`\`\`

### Ejecutar tests en modo watch
\`\`\`bash
npm run test:watch
\`\`\`

### Generar reporte de cobertura
\`\`\`bash
npm run test:coverage
\`\`\`

### Tests para CI/CD
\`\`\`bash
npm run test:ci
\`\`\`

## 🏗️ Build y Deployment

### Build para producción
\`\`\`bash
npm run build
\`\`\`

### Iniciar servidor de producción
\`\`\`bash
npm start
\`\`\`

### Deploy a Vercel
\`\`\`bash
vercel --prod
\`\`\`

## 👥 Usuarios de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@clinica.com | admin |
| Profesor | profesor@clinica.com | profesor |
| Estudiante | estudiante@clinica.com | estudiante |
| Paciente | paciente@clinica.com | paciente |
| Secretario | secretario@clinica.com | secretario |

## 📁 Estructura del Proyecto

\`\`\`
dental-clinic-management/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Authentication
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── contexts/             # React contexts
├── lib/                  # Utility functions
├── __tests__/            # Test files
├── public/               # Static assets
└── types/                # TypeScript types
\`\`\`

## 🔒 Seguridad

- ✅ **CSRF Protection** - Protección contra ataques CSRF
- ✅ **XSS Protection** - Headers de seguridad configurados
- ✅ **Content Security Policy** - Políticas de contenido seguro
- ✅ **Session Management** - Gestión segura de sesiones
- ✅ **Input Validation** - Validación de datos de entrada
- ✅ **Error Handling** - Manejo seguro de errores

## 📊 Métricas de Calidad

- **Test Coverage**: 80%+ en todas las métricas
- **Performance**: Optimizado para Core Web Vitals
- **Accessibility**: Cumple estándares WCAG 2.1
- **SEO**: Optimizado para motores de búsqueda

## 🚀 Deployment

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Deploy automático en cada push

### Variables de Entorno
\`\`\`env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
\`\`\`

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Desarrolladores

- **ULEAM Development Team**
- **Franklin Jostin Bailon Palma** - [@josbailon](https://github.com/josbailon)

## 📞 Soporte

Para soporte técnico o preguntas:
- Email: soporte@uleam.edu.ec
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

---

**Universidad Laica Eloy Alfaro de Manabí (ULEAM)**  
*Innovación en Educación Odontológica*
