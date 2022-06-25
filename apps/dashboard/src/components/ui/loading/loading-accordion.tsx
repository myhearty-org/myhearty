import { Accordion, Skeleton } from '@mantine/core';

type LoadingAccordionProps = {
  n: number;
};

export function LoadingAccordion({ n }: LoadingAccordionProps) {
  return (
    <Accordion className="border-x border-t border-gray-200 bg-white" disableIconRotation>
      {[...Array(n)].map((_, i) => (
        <Accordion.Item key={i} label={<Skeleton className="w-2/5 rounded-md py-3" />} />
      ))}
    </Accordion>
  );
}
