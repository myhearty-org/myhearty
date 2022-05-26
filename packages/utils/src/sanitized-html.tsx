import DOMPurify from 'isomorphic-dompurify';

type SanitizedHTMLProps = {
  className?: string;
  html: string;
};

export function SanitizedHTML({ className, html }: SanitizedHTMLProps) {
  const sanitizedHtml = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });

  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}
