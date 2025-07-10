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
        <div className="context-page">
            <h1>{siegeOfBaghdad1258.title}</h1>
            <Image src="/mongol.webp" alt="Siege of Baghdad 1258" className="w-full h-auto mb-4 rounded-lg shadow-lg"  width={200} height={100}/>
            <p>{siegeOfBaghdad1258.summary}</p>
            <h2>Key Points</h2>
            <ul>
                {Object.entries(siegeOfBaghdad1258.keyPoints).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
            </ul>
            <h2>What Happened</h2>
            <ol>
                {siegeOfBaghdad1258.whatHappened.map((event, index) => (
                    <li key={index}>{event}</li>
                ))}
            </ol>
            <h2>Historical Impact</h2>
            <ul>
                {siegeOfBaghdad1258.historicalImpact.map((impact, index) => (
                    <li key={index}>{impact}</li>
                ))}
            </ul>
        <p className="text-center text-gray-500 mt-4">
            This page provides a brief overview of the Siege of Baghdad (1258), a significant historical event that marked the end of the Abbasid Caliphate and had a profound impact on the Islamic
            world. For more detailed information, please refer to historical texts and resources.
            <br />
            Further context on the Siege of Baghdad (1258) can be found at <a href="https://en.wikipedia.org/wiki/Siege_of_Baghdad_(1258)" target="_blank" rel="noopener noreferrer">Wikipedia</a>.
        </p>

        <Link href={"/game"} className="inline-block px-6 py-3 mt-4 rounded-lg font-semibold transition-colors bg-[#1F4D7A] text-[#F5F5F5] border-2 border-[#3F7B5C] hover:bg-[#3F7B5C]">
            Back to Game
        </Link>
        <Link href={"/leaderboard"} className="inline-block px-6 py-3 mt-4 ml-4 rounded-lg font-semibold transition-colors bg-[#1F4D7A] text-[#F5F5F5] border-2 border-[#C89F45] hover:bg-[#C89F45]">
            View Leaderboard
        </Link>
        <Link href={"/"} className="inline-block px-6 py-3 mt-4 ml-4 rounded-lg font-semibold transition-colors bg-[#1F4D7A] text-[#F5F5F5] border-2 border-[#B44A2F] hover:bg-[#B44A2F]">
            Back to Home
        </Link>
    </div>
    )
}