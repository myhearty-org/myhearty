type MainProps = {
  children: React.ReactNode;
};

export function Main({ children }: MainProps) {
  return (
    <div className={'w-full flex flex-col grow'}>
      {children}
    </div>
  );
}
