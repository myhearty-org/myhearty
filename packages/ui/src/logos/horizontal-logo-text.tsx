import { Logo } from './logo';

export function HorizontalLogoText() {
  return (
    <div className="flex items-center p-2">
      <Logo className="mr-3" width={36} height={36} />
      <span className="inline-block whitespace-nowrap text-lg font-semibold">MyHearty</span>
    </div>
  );
}
