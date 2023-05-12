"use-client";

import Image from "next/image";

interface ButtonProps {
  label: string;
  OnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  OnClick,
  type,
  disabled,
  loading,
}) => {
  return (
    <button
      className={`h-[48px] w-full bg-blue-primary text-white rounded-[8px] py-3 px-2 flex items-center justify-center font-semibold text-[16px] ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      type={type}
      onClick={() => {
        if (!disabled) OnClick;
      }}
    >
      {loading ? (
        <div>
          <Image
            src="/images/spinner-small.gif"
            alt="spinner"
            width={20}
            height={20}
          />
        </div>
      ) : (
        <span className="text-white text-[16px] leading-[150%] tracking-[-0.01em] font-semibold">
          {label}
        </span>
      )}
    </button>
  );
};

export default Button;
