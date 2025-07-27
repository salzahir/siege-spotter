# Siege Spotter 🎯

![Siege Scene](/client/public/siege.png)

> *Depiction of the Siege of Baghdad (1258) from a 14th-century manuscript of the Jami' al-Tawarikh (Compendium of Chronicles) by Rashid al-Din.*

A full-featured "Where's Waldo"-style web game set in a historically authentic medieval siege scene. Players hunt for hidden characters in this dense 14th-century Islamic manuscript illustration while competing on leaderboards and learning about the pivotal Siege of Baghdad (1258).

## 🎮 Game Features

### Core Gameplay
- **Interactive Medieval Art**: Click to find 5 specific characters hidden in authentic historical artwork
- **Real-time Timer**: Track your completion time with precision timing
- **Character Progress**: Visual feedback as you discover each hidden figure
- **Coordinate Validation**: Precise click detection with server-side verification

### Characters to Find
- 🏹 **White Turban Guy** - A warrior in distinctive headwear
- 👕 **Orange Shirt Guy** - A figure in bright orange clothing  
- 🚩 **Orange Flag** - A military banner in the siege
- 🐎 **White Horse** - A mounted cavalry steed
- 👗 **Red Dress Woman** - A woman in crimson attire

## 🏆 User System & Competition

### Authentication
- **User Registration**: Create accounts with email and optional password
- **Secure Login**: JWT-based authentication with bcrypt password hashing
- **Guest Play**: Play without registration (scores won't be saved)
- **Protected Routes**: User profiles and features require authentication

### Leaderboard & Scoring
- **Best Time Tracking**: Personal records saved permanently
- **Global Rankings**: Compete against all players
- **Recent Activity**: See when players last competed
- **Achievement Display**: Visual rank indicators (🥇🥈🥉)

### User Profiles
- **Personal Dashboard**: View your stats and game history
- **Personalized Welcome**: Custom greetings for logged-in users
- **Progress Tracking**: Monitor your improvement over time

## 📱 Application Pages

| Page | Purpose | Features |
|------|---------|----------|
| **🏠 Home** | Landing & instructions | Game rules, quick start guide |
| **🎯 Game** | Main gameplay | Interactive siege scene, timer, progress tracking |
| **🏆 Leaderboard** | Rankings | Global scores, best times, player stats |
| **🏰 Context** | Historical education | Detailed history of the Siege of Baghdad (1258) |
| **👤 User** | Profile dashboard | Personal stats, account management |
| **🔐 Login** | Authentication | Sign in/register, password management |

## 🛠 Technical Architecture

### Frontend (Next.js 15)
- **App Router**: Modern Next.js routing with TypeScript
- **Custom Hooks**: Modular game logic and state management
- **Responsive Design**: Tailwind CSS with mobile-first approach
- **Component Library**: Reusable navigation and UI components

### Custom React Hooks
```typescript
useGame()     // Game state, character finding, coordinate validation
useTimer()    // Precision timing, start/stop/reset functionality  
useForm()     // User registration/login form handling
useApi()      // HTTP client with error handling and loading states
```

### Backend (Express + TypeScript)
- **RESTful API**: Clean endpoint design with proper HTTP methods
- **Database ORM**: Prisma with PostgreSQL for data persistence
- **Authentication**: JWT tokens with secure middleware
- **Coordinate System**: Normalized positioning for responsive gameplay

### Database Models
```sql
User {
  id, name, email, password?, 
  bestTime, currentTime, lastPlayed,
  createdAt
}

Waldo {
  id, name, xPos, yPos, marginError
}
```

## 🔌 API Endpoints

### User Management
```
GET  /users          # Get all users (leaderboard data)
POST /users          # Register new user
GET  /users/me       # Get current user profile (protected)
POST /users/login    # User authentication
```

### Game Logic  
```
POST /check          # Validate character coordinates
GET  /check          # Game status endpoint
```

## Tech Stack

### Frontend
- **Next.js 15.3.3** - React framework with App Router
- **React 18** - Component library with hooks
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling framework

### Backend
- **Node.js** - Runtime environment
- **Express** - Web application framework
- **TypeScript** - Full-stack type safety
- **Prisma ORM** - Database toolkit with type generation
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## Project Structure

```
siege-spotter/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Reusable UI components
│   │   │   │   └── NavigationButtons.tsx
│   │   │   ├── hooks/      # Custom React hooks
│   │   │   │   ├── useApi.ts
│   │   │   │   ├── useForm.ts
│   │   │   │   ├── useGame.ts
│   │   │   │   └── useTimer.ts
│   │   │   ├── game/       # Main gameplay page
│   │   │   ├── leaderboard/# Rankings and scores
│   │   │   ├── context/    # Historical information
│   │   │   ├── user/       # User profile dashboard
│   │   │   ├── login/      # Authentication
│   │   │   └── services/   # API client utilities
│   │   └── public/         # Game assets and images
└── server/                 # Express backend
    ├── src/
    │   ├── controllers/    # Request handlers
    │   │   ├── user.ts     # User management
    │   │   └── waldo.ts    # Game logic
    │   ├── routes/         # API route definitions
    │   ├── middleware/     # Authentication & validation
    │   ├── models/         # Data models
    │   └── db/            # Database utilities
    └── prisma/            # Database schema & migrations
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/siege-spotter.git
cd siege-spotter
```

2. **Install dependencies**
```bash
# Frontend dependencies
cd client && npm install

# Backend dependencies  
cd ../server && npm install
```

3. **Database Setup**
```bash
# Create PostgreSQL database
createdb siege_spotter

# Configure environment variables
cd server
cp .env.example .env
# Edit .env with your database credentials:
# DATABASE_URL="postgresql://username:password@localhost:5432/siege_spotter"
# JWT_SECRET="your-secret-key"
```

4. **Run database migrations**
```bash
cd server
npx prisma migrate dev
npx prisma generate
```

5. **Seed game data (optional)**
```bash
npx prisma db seed
```

6. **Start development servers**
```bash
# Backend (Terminal 1)
cd server && npm run dev

# Frontend (Terminal 2) 
cd client && npm run dev
```

7. **Open application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 🎯 How to Play

1. **Visit the home page** to learn the rules
2. **Register an account** (optional, but required to save scores)
3. **Start a new game** - the timer begins on your first click
4. **Click on the siege image** to search for hidden characters
5. **Find all 5 characters** as quickly as possible
6. **Submit your score** to compete on the leaderboard
7. **View historical context** to learn about the Siege of Baghdad

## 🌍 Educational Value

This project uniquely combines gaming with historical education:

- **🕌 Cultural Authenticity**: Uses genuine 14th-century Islamic manuscript art
- **📚 Historical Context**: Detailed information about the pivotal Siege of Baghdad (1258)  
- **🎨 Art Appreciation**: Exposure to medieval Islamic artistic traditions
- **🧠 Interactive Learning**: Players absorb history while gaming

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds for secure storage
- **JWT Authentication**: Stateless token-based auth system
- **Protected Routes**: Server-side middleware validation
- **Input Sanitization**: Prevents injection attacks
- **CORS Configuration**: Secure cross-origin resource sharing

## 🏗 Development

### Available Scripts

**Frontend (client/)**
```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint code checking
```

**Backend (server/)**
```bash
npm run dev      # Start with nodemon
npm run build    # TypeScript compilation
npm run start    # Production server
npm run prisma   # Database operations
```

### Environment Variables

**Server (.env)**
```bash
DATABASE_URL="postgresql://..."
JWT_SECRET="your-jwt-secret"
PORT=3001
NODE_ENV="development"
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 Historical Background

The Siege of Baghdad (1258) was a catastrophic event that marked the end of the Islamic Golden Age. Led by Hulagu Khan, grandson of Genghis Khan, the Mongol forces conquered the Abbasid Caliphate, destroyed the legendary House of Wisdom, and fundamentally changed the course of Middle Eastern history. This game uses authentic artwork from Rashid al-Din's historical chronicles to create an immersive educational experience.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Rashid al-Din** - Original historical chronicler and manuscript creator
- **Ilkhanate Period Artists** - Medieval manuscript illustrators
- **The Odin Project** - Educational framework and community support