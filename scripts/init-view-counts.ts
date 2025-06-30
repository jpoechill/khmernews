import { articles } from '../data/articles';
import { initializeViewCounts } from '../lib/viewCounts';

async function main() {
  console.log('🚀 Initializing view counts for all articles...');
  
  const slugs = articles.map(article => article.slug);
  console.log(`Found ${slugs.length} articles to initialize:`);
  slugs.forEach(slug => console.log(`  - ${slug}`));
  
  try {
    await initializeViewCounts(slugs);
    console.log('✅ Successfully initialized view counts for all articles!');
  } catch (error) {
    console.error('❌ Error initializing view counts:', error);
  }
}

main(); 