import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constants/consts";
import { useStoreForTheme } from "../store/useStore";

const ThemeSelector = () => {
  const { theme, setTheme } = useStoreForTheme((state) => state);
  return (
    <div className="dropdown dropdown-end dropdown-hover mr-1">
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className=" size-5" />
      </button>
      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl
        w-56 border border-base-content/10 max-h-80 overflow-y-auto"
      >
        <div className=" space-y-1">
          {THEMES.map((oneTheme) => (
            <button
              key={oneTheme.name}
              className={`
                w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                ${
                  theme === oneTheme.name
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-base-content/5"
                }
              `}
              onClick={() => setTheme(oneTheme.name)}
            >
              <PaletteIcon className=" size-4" />
              <span className=" text-sm font-medium">{oneTheme.label}</span>
              {/* theme preview colour */}
              <div className=" ml-auto flex gap-1">
                {oneTheme.colors.map((colour, index) => (
                  <span
                    className=" size-2 rounded-full"
                    style={{ background: colour }}
                    key={index}
                  ></span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
