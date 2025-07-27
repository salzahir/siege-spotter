"use client";
import NavigationButtons from "./components/NavigationButtons";

function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#D6C7B0]">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold text-[#B44A2F]">
                    🎯 Siege Spotter
                </h1>
                
                <p className="text-lg text-[#3C3C3C]">
                    Find hidden characters in a medieval siege scene!
                </p>

                <div className="p-6 rounded-lg shadow-md max-w-md bg-[#F5F5F5] border-2 border-[#C89F45]">
                    <h2 className="text-xl font-semibold mb-3 text-[#1F4D7A]">How to Play:</h2>
                    <ul className="text-left space-y-1 text-[#3C3C3C]">
                        <li>• Click on the image to find characters</li>
                        <li>• Find all 5 hidden characters</li>
                        <li>• Beat your best time!</li>
                    </ul>
                </div>

                <NavigationButtons excludeItems={["/"]} />
            </div>
        </div>
    );
}

export default Home;