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
  defaultValue?: string;
  onChange: (value: string) => void;
} & Omit<RichTextEditorComponentProps, 'value' | 'onChange'>;

export const RichTextEditor = forwardRef<Editor, RichTextEditorProps>(
  ({ label, defaultValue, onChange, ...props }, ref) => {
    const [value, setValue] = useState(defaultValue ?? '');

    return (
      <div>
        <Label>{label}</Label>
        <RichTextEditorComponent
          className="prose mt-2 max-w-none tracking-tight"
          classNames={{ toolbar: 'mb-0.5' }}
          ref={ref}
          value={value}
          onChange={(value) => {
            setValue(value);
            onChange(value);
          }}
          controls={[
            ['bold', 'italic', 'underline', 'clean', 'link', 'video'],
            ['h1', 'h2', 'h3', 'h4', 'sup', 'sub'],
            ['unorderedList', 'orderedList'],
            ['alignLeft', 'alignCenter', 'alignRight'],
          ]}
          {...props}
        />
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';
