import { ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';

type CardButtonProps = {
  title?: string | React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  url?: string;
  linkHref?: string;
  imgUrl?: string;
  imgAlt?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  containerHeightClassName?: string;
};

export function CardButton({
  title = '',
  description = '',
  children,
  footer,
  url = '',
  linkHref = '',
  imgUrl,
  imgAlt,
  onClick,
  icon,
  containerHeightClassName = 'h-32',
}: CardButtonProps) {
  const isLink = url || linkHref || onClick;

  let containerClasses = [
    'group relative text-left',
    'bg-white',
    'border border-gray-200',
    'rounded-md p-4 flex',
    'transition ease-in-out duration-150',
    containerHeightClassName,
  ];

  if (isLink) {
    containerClasses = [...containerClasses, 'cursor-pointer', 'hover:bg-gray-200', 'hover:border-gray-200'];
  }

  function ImageContainer({ children }: { children: React.ReactNode }) {
    return <div className="mr-4 flex flex-col">{children}</div>;
  }

  const contents = (
    <div className={containerClasses.join(' ')}>
      {imgUrl && (
        <ImageContainer>
          <img className="transition-all group-hover:scale-110" src={imgUrl} alt={imgAlt} width="26" />
        </ImageContainer>
      )}
      {icon && <ImageContainer>{icon}</ImageContainer>}
      <div className="flex h-full w-full flex-col space-y-2">
        <h5 className="break-words pr-6 font-medium text-gray-900">{title}</h5>
        <div className="flex w-full flex-1 flex-col">
          <p className="break-words text-sm text-gray-900">{description}</p>
          <div className="w-full">{children && children}</div>
        </div>
        <div className="w-full">{footer && footer}</div>
      </div>
      {isLink && (
        <div className="absolute right-4 top-4 text-gray-400 transition-all duration-200 group-hover:right-3 group-hover:text-gray-900">
          <ChevronRightIcon className="h-6 w-6" />
        </div>
      )}
    </div>
  );

  function ButtonContainer({ children }: { children: React.ReactNode }) {
    return <button onClick={onClick}>{children}</button>;
  }

  function LinkContainer({ children }: { children: React.ReactNode }) {
    return (
      <Link href={linkHref}>
        <a>{children}</a>
      </Link>
    );
  }

  function UrlContainer({ children }: { children: React.ReactNode }) {
    return <a href={url}>{children}</a>;
  }

  function NonLinkContainer({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  }

  if (onClick) {
    return <ButtonContainer>{contents}</ButtonContainer>;
  } else if (linkHref) {
    return <LinkContainer>{contents}</LinkContainer>;
  } else if (url) {
    return <UrlContainer>{contents}</UrlContainer>;
  } else {
    return <NonLinkContainer>{contents}</NonLinkContainer>;
  }
}
