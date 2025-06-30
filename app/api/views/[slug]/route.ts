import { getArticleViewCount, incrementArticleView } from '@/lib/viewCounts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: Request, context: any) {
  try {
    const viewCount = await getArticleViewCount(context.params.slug);
    return Response.json({ viewCount });
  } catch {
    // Fallback to 0 if there's an error
    return Response.json({ viewCount: 0 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(request: Request, context: any) {
  try {
    const newCount = await incrementArticleView(context.params.slug);
    return Response.json({ viewCount: newCount });
  } catch {
    // Fallback to 0 if there's an error
    return Response.json({ viewCount: 0 });
  }
} 