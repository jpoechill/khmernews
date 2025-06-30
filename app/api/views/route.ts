import { NextResponse } from 'next/server';
import { getAllViewCounts } from '@/lib/viewCounts';

export async function GET() {
  try {
    const viewCounts = await getAllViewCounts();
    
    return NextResponse.json({ 
      viewCounts,
      success: true 
    });
  } catch {
    return NextResponse.json({ viewCounts: {} });
  }
} 