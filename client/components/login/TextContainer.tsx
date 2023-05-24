"use-client";

interface TextContainerProps {
  children: React.ReactNode;
}

const TextContainer: React.FC<TextContainerProps> = ({ children }) => {
  return (
    <div className="h-full w-full flex items-start py-4 px-4 lg:px-[100px] lg:py-8 lg:justify-center overflow-hidden">
      {children}
    </div>
  );
};

export default TextContainer;
