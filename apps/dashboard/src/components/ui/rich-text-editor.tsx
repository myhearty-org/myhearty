import { Editor, RichTextEditorProps as RichTextEditorComponentProps } from '@mantine/rte';
import { Label } from '@myhearty/ui/form';
import dynamic from 'next/dynamic';
import { forwardRef, useState } from 'react';

const RichTextEditorComponent = dynamic(() => import('@mantine/rte'), {
  ssr: false,
  loading: () => null,
});

type RichTextEditorProps = {
  label: string;
  description?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  isVideoEmbedEnabled?: boolean;
} & Omit<RichTextEditorComponentProps, 'value' | 'onChange'>;

export const RichTextEditor = forwardRef<Editor, RichTextEditorProps>(
  ({ label, description, defaultValue, onChange, isVideoEmbedEnabled = true, ...props }, ref) => {
    const [value, setValue] = useState(defaultValue ?? '');
    const controls: RichTextEditorProps['controls'] = [
      ['bold', 'italic', 'underline', 'clean', 'link'],
      ['h1', 'h2', 'h3', 'h4', 'sup', 'sub'],
      ['unorderedList', 'orderedList'],
      ['alignLeft', 'alignCenter', 'alignRight'],
    ];

    if (isVideoEmbedEnabled) {
      controls[0].push('video');
    }

    return (
      <div>
        <Label>{label}</Label>
        {description && <p className="text-sm text-gray-500">{description}</p>}
        <RichTextEditorComponent
          className="prose mt-2 max-w-none tracking-tight"
          classNames={{ toolbar: 'mb-0.5' }}
          ref={ref}
          value={value}
          onChange={(value) => {
            setValue(value);
            onChange(value);
          }}
          controls={controls}
          {...props}
        />
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';
