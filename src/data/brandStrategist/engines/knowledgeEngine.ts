import { KnowledgeEntry } from '../../../types/brandStrategist';

/**
 * Loads all knowledge entries for a given domain from the JSON files under
 * `src/data/brandStrategist/knowledge/`.
 * Uses Vite's import.meta.glob to statically import the JSON at build time.
 */
export async function loadKnowledgeDomain(domain: string): Promise<KnowledgeEntry[]> {
  // Import all JSON files in the knowledge folder
  const modules = import.meta.glob('../knowledge/*.json', { eager: true, as: 'json' }) as Record<string, KnowledgeEntry[]>;

  const entries: KnowledgeEntry[] = [];
  for (const path in modules) {
    const data = modules[path];
    if (Array.isArray(data)) {
      data.forEach((entry) => {
        if (entry.domain === domain) {
          entries.push(entry);
        }
      });
    }
  }
  return entries;
}
