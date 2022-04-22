type MainProps = {
  children: React.ReactNode;
};

export function Main({ children }: MainProps) {
  return <div className={'flex w-full grow flex-col'}>{children}</div>;
}
