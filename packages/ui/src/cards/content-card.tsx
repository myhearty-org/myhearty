import { SanitizedHTML } from '@myhearty/utils/sanitized-html';

type ContentCardProps = {
  content: string;
};

export function ContentCard({ content }: ContentCardProps) {
  return (
    <div className="mx-[-1rem] flex w-[calc(100%+2rem)] flex-col gap-4 border-0 border-gray-200 bg-white py-3 px-3 shadow-md md:mx-0 md:w-full md:rounded-md md:border md:px-6">
      <h2 className="border-b border-gray-200 pb-1 text-lg font-medium">About Campaign</h2>
      <SanitizedHTML className="prose tracking-tight" html={content} />
    </div>
  );
}
