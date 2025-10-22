import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstname, lastname } = await req.json();

    // 1️⃣ Create new user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    // 2️⃣ Insert firstname and lastname in profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: data.user!.id, firstname, lastname }]);

    if (profileError) {
      return NextResponse.json({ message: profileError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'User created successfully' });
  } catch (err) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

