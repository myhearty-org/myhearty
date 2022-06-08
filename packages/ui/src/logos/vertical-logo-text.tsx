import { Logo } from './logo';

export function VerticalLogoText() {
  return (
    <div className="flex flex-col items-center gap-1 p-2">
      <Logo width={60} height={60} />
      <span className="inline-block whitespace-nowrap text-xl font-semibold">MyHearty</span>
    </div>
  );
}
