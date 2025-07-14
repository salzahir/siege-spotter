const siegeOfBaghdad1258 = {
  title: "Siege of Baghdad (1258)",
  summary:
    "The 1258 Siege of Baghdad was one of the most catastrophic events in Islamic history. It marked the Mongol Empire’s conquest of the Abbasid Caliphate, led by Hulagu Khan, a grandson of Genghis Khan.",

  keyPoints: {
    date: "January–February 1258",
    invaders: "Mongols under Hulagu Khan",
    defenders: "Abbasid Caliphate, led by Caliph Al-Musta’sim"
  },

  whatHappened: [
    "Hulagu demanded surrender. The Caliph refused, underestimating the Mongol threat.",
    "Mongols laid siege to the city, breached it within two weeks, and began a brutal massacre.",
    "Baghdad was sacked—its population was slaughtered, estimated from 100,000 to over 1 million dead.",
    "The House of Wisdom (Bayt al-Hikma) and priceless libraries were destroyed, symbolizing the collapse of the Islamic Golden Age.",
    "The Caliph was executed, ending the Abbasid Caliphate’s 500-year rule."
  ],

  historicalImpact: [
    "It marked the end of Baghdad as a cultural and scientific center.",
    "Shattered the unity of the Islamic world.",
    "Became a symbol of civilizational collapse and a turning point in Middle Eastern history."
  ]
};

import Image from "next/image";
import Link from "next/link";

export default function Context() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-amber-900 mb-2">🏰 {siegeOfBaghdad1258.title}</h1>
                <p className="text-amber-700 text-lg max-w-4xl mx-auto leading-relaxed">
                    {siegeOfBaghdad1258.summary}
                </p>
            </div>

            {/* Hero Image */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="relative overflow-hidden rounded-xl shadow-lg border-2 border-amber-200">
                    <Image 
                        src="/mongol.webp" 
                        alt="Historical depiction of the Siege of Baghdad 1258" 
                        className="w-full h-auto"  
                        width={800} 
                        height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-8">
                {/* Key Points */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-amber-200">
                    <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
                        📅 Key Points
                    </h2>
                    <div className="space-y-3">
                        {Object.entries(siegeOfBaghdad1258.keyPoints).map(([key, value]) => (
                            <div key={key} className="border-l-4 border-amber-400 pl-3">
                                <div className="font-semibold text-amber-800 capitalize">{key}</div>
                                <div className="text-amber-700 text-sm">{value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* What Happened */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-amber-200">
                    <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
                        ⚔️ What Happened
                    </h2>
                    <ol className="space-y-3">
                        {siegeOfBaghdad1258.whatHappened.map((event, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {index + 1}
                                </span>
                                <span className="text-amber-800 text-sm leading-relaxed">{event}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Historical Impact */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-amber-200">
                    <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
                        🌍 Historical Impact
                    </h2>
                    <ul className="space-y-3">
                        {siegeOfBaghdad1258.historicalImpact.map((impact, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="text-amber-600 text-lg">•</span>
                                <span className="text-amber-800 text-sm leading-relaxed">{impact}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Footer Info */}
            <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-amber-200 mb-8">
                <p className="text-center text-amber-700 leading-relaxed">
                    This page provides a brief overview of the Siege of Baghdad (1258), a significant historical event that marked the end of the Abbasid Caliphate and had a profound impact on the Islamic world. For more detailed information, please refer to historical texts and resources.
                </p>
                <p className="text-center mt-3">
                    <a 
                        href="https://en.wikipedia.org/wiki/Siege_of_Baghdad_(1258)" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:text-amber-800 font-medium underline"
                    >
                        Learn more on Wikipedia →
                    </a>
                </p>
            </div>

            {/* Navigation */}
            <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
                <Link 
                    href="/game" 
                    className="px-6 py-3 rounded-lg font-semibold transition-colors bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
                >
                    🎯 Play Game
                </Link>
                <Link 
                    href="/leaderboard" 
                    className="px-6 py-3 rounded-lg font-semibold transition-colors bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
                >
                    🏆 Leaderboard
                </Link>
                <Link 
                    href="/" 
                    className="px-6 py-3 rounded-lg font-semibold transition-colors bg-amber-800 hover:bg-amber-900 text-white shadow-sm"
                >
                    🏠 Home
                </Link>
            </div>
        </div>
    )
}