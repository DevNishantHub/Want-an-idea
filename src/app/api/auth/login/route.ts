import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      return NextResponse.json({ message: error?.message || 'Login failed' }, { status: 401 });
    }

    // Optionally return user info
    return NextResponse.json({ user: data.user, message: 'Login successful' });
  } catch (err) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

