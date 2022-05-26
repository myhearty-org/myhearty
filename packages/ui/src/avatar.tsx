import cn from 'classnames';

type AvatarProps = {
  className?: string;
  size?: number;
  src: string;
  alt?: string;
};

export function Avatar({ className, size, src, alt }: AvatarProps) {
  return (
    <div className={cn(className, size && `h-${size} w-${size}`)}>
      <img className="rounded-full" src={src} alt={alt} />
    </div>
  );
}
