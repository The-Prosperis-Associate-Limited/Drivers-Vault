import { GoogleIcon } from "../svg/google-icon";

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
}

export function GoogleAuthButton({ onClick, disabled, label }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="border-input bg-background hover:bg-accent hover:text-accent-foreground relative flex h-10 w-full items-center rounded-md border px-4 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50"
    >
      {/* Google icon */}
      <GoogleIcon />

      {/* Centered text */}
      <span className="w-full text-center">
        {label ?? "Continue with Google"}
      </span>
    </button>
  );
}
