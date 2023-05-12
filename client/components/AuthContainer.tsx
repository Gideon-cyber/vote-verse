interface AuthContainerProps {
  children: React.ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen max-w-7xl py-2">
      <div className="flex w-full items-center">
        <div
          className="w-[400px] bg-auth-bg bg-center h-full"
          style={{
            backgroundImage: "url('./images/bg.svg')",
          }}
        ></div>
        <div className="w-[50%]">{children}</div>
      </div>
    </div>
  );
};

export default AuthContainer;
