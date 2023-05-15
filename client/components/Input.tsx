"use-client";

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const InputField: React.FC<InputProps> = ({
  label,
  placeholder,
  name,
  type,
  value,
  handleBlur,
  handleChange,
}) => {
  return (
    <div className="flex items-start flex-col gap-2 w-full">
      <label className="text-[14px] leading-[150%] text-black-secondary font-semibold">
        {label}
      </label>
      <div className="py-[12px] px-[16px]  rounded-[8px] border border-off-white w-full">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full outline-none border-none bg-blueButton placeholder:text-off-white"
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default InputField;
