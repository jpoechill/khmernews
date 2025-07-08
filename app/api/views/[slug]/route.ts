import { getArticleViewCount, incrementArticleView } from '@/lib/viewCounts';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const viewCount = await getArticleViewCount(slug);
    return Response.json({ viewCount });
  } catch (error) {
    console.error('Error in GET /api/views/[slug]:', error);
    // Fallback to 0 if there's an error
    return Response.json({ viewCount: 0 });
  }
}

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const newCount = await incrementArticleView(slug);
    return Response.json({ viewCount: newCount });
  } catch (error) {
    console.error('Error in POST /api/views/[slug]:', error);
    // Fallback to 0 if there's an error
    return Response.json({ viewCount: 0 });
  }
} 