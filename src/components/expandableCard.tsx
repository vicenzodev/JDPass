import { FaChevronDown } from "react-icons/fa";

interface ExpandableCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export const ExpandableCard = ({
  title,
  subtitle,
  icon,
  children,
  isOpen,
  onToggle,
}: ExpandableCardProps) => {
  return (
    <div
      className={`bg-card border w-full transition-all duration-300 rounded-xl overflow-hidden ${
        isOpen
          ? "border-green-500 shadow-md ring-1 ring-green-500/20"
          : "border-border shadow-sm hover:shadow-md cursor-pointer hover:border-border/80"
      }`}
    >
      <div
        onClick={onToggle}
        className="p-6 flex items-center justify-between select-none"
      >
        <div className="flex items-center gap-4">
          <div
            className={`text-2xl p-3 rounded-full transition-all ${
              isOpen ? "bg-opacity-20" : "bg-opacity-10"
            } ${
              title.includes("Perfil")
                ? "text-[var(--brand-color)] bg-green-800 dark:bg-green-400/20 dark:text-green-400"
                : "text-yellow-700 bg-yellow-600 dark:bg-yellow-400/20 dark:text-yellow-400"
            }`}
          >
            {icon}
          </div>

          <div>
            <p className="text-foreground/60 text-sm font-medium">{subtitle}</p>
            <h3 className="text-xl font-bold text-card-foreground">{title}</h3>
          </div>
        </div>

        <div
          className={`text-foreground/40 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown size={20} />
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-[800px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 pb-6 pt-0 border-t border-border mt-2">
          <div className="pt-6">{children}</div>
        </div>
      </div>
    </div>
  );
};