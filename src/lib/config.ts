export const TYPESENSE_SERVER_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY!,
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST!,
      port: process.env.NEXT_PUBLIC_TYPESENSE_PORT! as any,
      protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL!,
    },
  ],
  cacheSearchResultsForSeconds: 2 * 60,
  numRetries: 8,
  connectionTimeoutSeconds: 1,
};
