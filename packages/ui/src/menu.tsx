import cn from 'classnames';
import Link from 'next/link';

type MenuProps = {
  children: React.ReactNode;
  className?: string;
};

export function Menu({ children, className }: MenuProps) {
  return (
    <nav role="menu" aria-label="Sidebar" aria-orientation="vertical" aria-labelledby="options-menu">
      <ul className={cn('flex flex-col gap-px', className)}>{children}</ul>
    </nav>
  );
}

type MenuItemProps = {
  href: string;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  isActive?: boolean;
  onClick?: any;
  children: React.ReactNode;
};

export function MenuItem({ href, icon: Icon, isActive, onClick, children }: MenuItemProps) {
  return (
    <li className="outline-none" role="menuitem">
      <Link href={href}>
        <a
          className={cn(
            'relative flex cursor-pointer items-center gap-2 rounded px-4 py-2 transition-colors duration-150 hover:bg-gray-200',
            isActive &&
              'bg-gray-200 after:absolute after:top-[calc(50%-12px)] after:left-[-8px] after:h-6 after:w-1 after:rounded-md after:bg-pink-600 font-medium'
          )}
          onClick={onClick}
          aria-current={isActive ? 'page' : undefined}>
          {Icon && <Icon className="h-5 w-5 flex-shrink-0 text-pink-600" />}
          <span className="w-full text-sm">{children}</span>
        </a>
      </Link>
    </li>
  );
}
