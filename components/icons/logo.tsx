import cn from 'classnames';
import Image from 'next/image';

type LogoProps = {
  className?: string;
  width: number;
  height: number;
};

export function Logo({ className, width, height }: LogoProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Image src="/images/myhearty-logo.svg" width={width} height={height} priority alt="MyHearty Logo" />
    </div>
  );
}
