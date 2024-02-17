interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="mx-auto max-w-sm sm:max-w-7xl">{children}</div>;
};
