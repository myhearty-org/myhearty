import { TYPESENSE_CONFIG } from '@lib/config';
import { SearchClient as TypesenseSearchClient } from 'typesense';

export const typesense = new TypesenseSearchClient(TYPESENSE_CONFIG);
