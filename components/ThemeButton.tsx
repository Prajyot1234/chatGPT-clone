
import { SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";

function ThemeButton() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
        <button
            className="w-full px-2" 
            onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}>
            <div className="flex rounded-lg p-2 mx-auto w-full hover:bg-darkTheme/70 transition-all duration-300">
                <SunIcon className="w-6 h-6 mr-2" />
                { theme == "dark" ? "Dark Mode": "Light Mode"}
            </div>
        </button>
    </div>
  )
}

export default ThemeButton