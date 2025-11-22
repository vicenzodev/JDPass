export const InputWrapper = ({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
      {icon && <span className="text-green-800">{icon}</span>}
      {label}
    </label>
    {children}
  </div>
);