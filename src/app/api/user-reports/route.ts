import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
            });
    }

    // Fetch reports with video details
    const { data: reports, error } = await supabase
      .from('reports')
      .select(`
        id,
        created_at,
        pdf_url,
        videos (
          id,
          title,
          url
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }

    return new Response(JSON.stringify({ reports }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to fetch reports' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
