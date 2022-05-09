type LoaderProps = {
  text?: string;
};

export function Loader({ text }: LoaderProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      <span className="loader" />
      {text && <span className="text-sm font-medium">{text}</span>}
    </div>
  );
}
