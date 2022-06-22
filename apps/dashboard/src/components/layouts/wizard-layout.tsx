import { ChevronRightIcon } from '@heroicons/react/solid';
import { Logo } from '@myhearty/ui/logos';
import Link from 'next/link';

type WizardLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export function WizardLayout({ title, children }: WizardLayoutProps) {
  return (
    <div className="flex h-screen max-h-screen w-full flex-col">
      <Header title={title} />
      <div className="overflow-auto">
        <section className="relative mx-auto my-10 max-w-2xl">{children}</section>
      </div>
    </div>
  );
}

type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white p-3">
      <div className="flex items-center gap-2">
        <Link href="/">
          <a>
            <Logo width={24} height={24} />
          </a>
        </Link>
        <ChevronRightIcon className="h-6 w-6 text-gray-400" />
        <p className="text-sm font-medium">{title}</p>
      </div>
    </div>
  );
}
