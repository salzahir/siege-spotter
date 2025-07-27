import Link from "next/link";

interface NavItem {
  href: string;
  label: string;
  emoji: string;
  borderColor: string;
  hoverColor: string;
}

interface NavigationButtonsProps {
  excludeItems?: string[]; // Array of hrefs to exclude
  showPrimaryAction?: boolean; // Whether to show the main "Start Game" button
  className?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "/leaderboard",
    label: "Leaderboard", 
    emoji: "🏆",
    borderColor: "border-[#C89F45]",
    hoverColor: "hover:bg-[#C89F45]"
  },
  {
    href: "/context",
    label: "Context",
    emoji: "🏰", 
    borderColor: "border-[#B44A2F]",
    hoverColor: "hover:bg-[#B44A2F]"
  },
  {
    href: "/login",
    label: "Login",
    emoji: "🔐",
    borderColor: "border-[#6B7280]", 
    hoverColor: "hover:bg-[#6B7280]"
  },
  {
    href: "/",
    label: "Home",
    emoji: "🏠",
    borderColor: "border-[#8B5CF6]",
    hoverColor: "hover:bg-[#8B5CF6]"
  }
];

export default function NavigationButtons({ 
  excludeItems = [], 
  showPrimaryAction = true,
  className = ""
}: NavigationButtonsProps) {
  
  const filteredItems = NAV_ITEMS.filter(item => !excludeItems.includes(item.href));

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Primary Action */}
      {showPrimaryAction && !excludeItems.includes("/game") && (
        <div className="pt-4 justify-center flex">
          <Link 
            href="/game"
            className="inline-block px-8 py-4 rounded-lg font-bold text-lg transition-colors bg-[#1F4D7A] text-[#F5F5F5] border-2 border-[#3F7B5C] hover:bg-[#3F7B5C] shadow-lg transform hover:scale-105"
          >
            🎯 Start Game
          </Link>
        </div>
      )}

      {/* Secondary Actions */}
      {filteredItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          {filteredItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors bg-[#1F4D7A] text-[#F5F5F5] border-2 ${item.borderColor} ${item.hoverColor} text-center`}
            >
              {item.emoji} {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 