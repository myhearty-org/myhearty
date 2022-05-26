import Image from 'next/image';

type GalleryProps = {
  name: string;
  imageUrl: string;
};

export function Gallery({ name, imageUrl }: GalleryProps) {
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md border border-gray-200 shadow-md">
      <Image
        src={imageUrl}
        alt={`Image for ${name}`}
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
    </div>
  );
}
