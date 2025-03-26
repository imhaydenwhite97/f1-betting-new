export function getDB() {
  const db = process.env.DB;
  
  if (!db) {
    throw new Error('Database connection not available');
  }
  
  // This is a workaround for TypeScript type checking
  // In production with Cloudflare D1, this will be a proper DB object
  return db as unknown as {
    prepare: (query: string) => {
      bind: (...params: any[]) => {
        first: () => Promise<any>;
        all: () => Promise<{results: any[]}>;
      }
    }
  };
}
