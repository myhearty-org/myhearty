import Glide, { Options } from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';
import { useEffect, useRef } from 'react';

type SliderProps = {
  title: string;
  className?: string;
  items?: any[];
  itemKey: (item: any) => string;
  renderItem: (item: any) => JSX.Element;
  options?: Options;
};

export function Slider({ title, className, items, itemKey, renderItem, options = {} }: SliderProps) {
  const glide = useRef(null);
  const slider = useRef<Glide.Properties | null>(null);

  useEffect(() => {
    if (glide.current) {
      slider.current = new Glide(glide.current, {
        type: 'slider',
        ...options,
      }).mount();
    }

    return () => slider.current?.destroy();
  }, [options]);

  if (!Array.isArray(items) || !items.length) {
    return null;
  }

  return (
    <div className={className}>
      <style jsx global>
        {`
          .glide__slide {
            height: auto !important;
          }
        `}
      </style>
      <div className="glide" ref={glide}>
        <div className="flex cursor-default">
          <div>
            <h2 className="mb-6 text-lg font-semibold text-gray-900">{title}</h2>
          </div>
          <div className="glide__arrows ml-auto" data-glide-el="controls">
            <button data-glide-dir="<" className="mr-4">
              <ArrowLeftIcon className="h-5 w-5 text-gray-600 hover:text-black" />
            </button>
            <button data-glide-dir=">">
              <ArrowRightIcon className="h-5 w-5 text-gray-600 hover:text-black" />
            </button>
          </div>
        </div>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides justify-between">
            {items?.map((item) => (
              <li key={itemKey(item)} className="glide__slide mb-6 flex flex-col items-center">
                {renderItem(item)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
