"use-client";

interface AuthContainerProps {
  children: React.ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row-reverse items-center lg:justify-center w-full h-screen">
      <div className="w-full lg:w-1/2 bg-auth-bg h-[20%] lg:h-full object-fill bg-no-repeat bg-center lg:bg-cover flex items-center justify-center">
        <h1 className="text-white text-[30px] lg:text-[48px] leading-[150%] font-bold">
          Vote-Verse
        </h1>
        {/* <div className="hidden lg:block h-[200vh] w-[180px] bg-white blur-xl mr-10"></div> */}
      </div>

      <div className="w-full lg:w-1/2">{children}</div>
    </div>
  );
};

export default AuthContainer;
