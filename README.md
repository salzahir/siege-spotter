# Siege Spotter 🎯

![Siege Scene](/client/public/siege.png)

> *Depiction of the Siege of Baghdad (1258) from a 14th-century manuscript of the Jami' al-Tawarikh (Compendium of Chronicles) by Rashid al-Din.*

This illustration is one of the most visually dense historical paintings from the **Ilkhanate period**, showcasing the Mongol siege led by **Hulagu Khan** against the Abbasid Caliphate. The image is rich with medieval Islamic architecture, Mongol warriors, war elephants, and defensive strategies - making it a perfect candidate for a culturally and historically immersive "Where's Waldo"-style game.

## 🎮 What Is Siege Spotter?

Siege Spotter is a "Where's Waldo"-style interactive web game where players must locate specific characters hidden within a dense historical painting - in this case, the Siege of Baghdad from a 14th-century manuscript. Instead of cartoon characters, players click on figures like warriors, nobles, or banners embedded in medieval Islamic/Mongol-era artwork. Accuracy is tested based on the clicked coordinates, and progress is tracked as each character is found.

## Features

- Interactive image-based gameplay
- Real-time coordinate tracking
- Character finding mechanics
- Progress tracking for found characters
- Responsive design

## 🌍 Why This Project Is Unique

- 🕌 **Cultural & Historical Depth**: Instead of using cartoon characters, the game uses real **Islamic/Mongol-era art** with authentic clothing, architecture, and military formations.
- 🎨 **Based on Real Events**: The image is taken from **Rashid al-Din’s illustrated chronicle**, one of the most important historical works of the medieval Islamic world.
- 🧠 **Educational Angle**: Blends gaming with learning - players indirectly engage with history while searching for figures.

## Tech Stack

### Frontend
- Next.js 15.3.3
- React 18
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL

## Project Structure

```
siege-spotter/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app router
│   │   └── hooks/         # Custom React hooks
│   └── public/            # Static assets
└── server/                # Express backend
    ├── src/
    │   ├── controllers/   # Route controllers
    │   ├── models/        # Data models
    │   └── routes/        # API routes
    └── prisma/            # Database schema
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/siege-spotter.git
cd siege-spotter
```

2. Install dependencies
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables
```bash
# In server directory
cp .env.example .env
# Update the .env file with your database credentials
```

4. Set up the database
```bash
cd server
npx prisma migrate dev
```

5. Start the development servers
```bash
# Start the backend server (from server directory)
npm run dev

# Start the frontend server (from client directory)
cd ../client
npm run dev
```

## Game Rules

1. The game presents a medieval siege scene with hidden characters
2. Click on the image to select coordinates
3. If you find a character, it will be added to your found list
4. Find all characters to win the game!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.