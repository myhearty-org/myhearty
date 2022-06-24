import { Loading } from './loading';
import cn from 'classnames';

type PanelProps = {
  className?: string;
  bodyClassName?: string;
  children?: React.ReactNode;
  footer?: JSX.Element | false;
  hideHeaderStyling?: boolean;
  isLoading?: boolean;
  noMargin?: boolean;
  title?: JSX.Element | false;
  wrapWithLoading?: boolean;
};

export function Panel(props: PanelProps) {
  let headerClasses: string[] = [];

  if (!props.hideHeaderStyling) {
    headerClasses = ['bg-white border-b border-gray-200'];
  } else {
    headerClasses = ['bg-white'];
  }

  const content = (
    <div
      className={cn(
        'overflow-hidden rounded-md border bg-white shadow-sm',
        props.noMargin && 'mb-8',
        props.className
      )}>
      {props.title && (
        <div className={headerClasses.join(' ')}>
          <div className="flex items-center px-6 py-4">{props.title}</div>
        </div>
      )}
      <div className={cn('bg-white', props.bodyClassName)}>{props.children}</div>
      {props.footer && (
        <div className="border-t border-gray-200 bg-white">
          <div className="flex h-14 items-center px-6">{props.footer}</div>
        </div>
      )}
    </div>
  );

  if (props.wrapWithLoading === false) {
    return content;
  }

  return <Loading isLoading={Boolean(props.isLoading)}>{content}</Loading>;
}

type ContentProps = {
  className?: string | false;
  children: React.ReactNode;
};

function Content({ className, children }: ContentProps) {
  let classes = ['px-6 py-4'];
  if (className) classes.push(className);

  return <div className={classes.join(' ')}>{children}</div>;
}

Panel.Content = Content;
