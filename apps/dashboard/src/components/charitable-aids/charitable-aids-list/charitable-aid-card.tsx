import { CharitableAid } from '@myhearty/lib/types';
import { CardButton } from '@myhearty/ui/card-button';

type CharitableAidCardProps = {
  charitableAid: CharitableAid;
};

export function CharitableAidCard({ charitableAid }: CharitableAidCardProps) {
  const { name, slug } = charitableAid;

  return (
    <li className="col-span-1">
      <CardButton
        linkHref={`/aids/${slug}/edit`}
        title={
          <div className="flex w-full justify-between gap-1">
            <span className="line-clamp-2 flex-shrink">{name}</span>
          </div>
        }
      />
    </li>
  );
}
