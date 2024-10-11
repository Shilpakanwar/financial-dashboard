// 'use server';

// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
// import { createClient } from '../../utils/supabase/server';

// // import { createClient } from "@/utils/supabase/server";

// export async function login(formData) {
//   const supabase = createClient();
//   console.log(formData);
//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email'),
//     password: formData.get('password'),
//   };

//   const { data: userData, error } =
//     await supabase.auth.signInWithPassword(data);

//   if (error) {
//     // redirect('/error');
//     return { error: error.message };
//   }
//   const { id, email, name } = userData.user;
//   return {
//     user: {
//       id,
//       email,
//       name,
//     },
//     error,
//   };
//   revalidatePath('/', 'layout');
//   redirect('/');
// }

// export async function signup(formData) {
//   const supabase = createClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email'),
//     password: formData.get('password'),
//   };

//   const { error } = await supabase.auth.signUp(data);

//   if (error) {
//     console.log(333, 'error', error);
//     redirect('/error');
//   }

//   revalidatePath('/', 'layout');
//   redirect('/');
// }

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';

// Type definitions for form data and user data
interface LoginData {
  email: string | null;
  password: string | null;
}
interface SignupData {
  name: string | null;
  email: string | null;
  password: string | null;
}

export async function login(formData: FormData): Promise<any> {
  const supabase = createClient();

  const data: LoginData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { data: userData, error } = await supabase.auth.signInWithPassword({
    email: data.email || '',
    password: data.password || '',
  });

  if (error) {
    return { error: error.message };
  }

  if (!userData?.user) {
    return { error: 'User not found.' };
  }

  const { id, email, user_metadata } = userData.user;
  const name = user_metadata?.name || null;

  return {
    user: {
      id,
      email,
      name,
    },
  };

  // revalidatePath('/', 'layout'); // Ensure proper paths for revalidation
  // redirect('/');
}

export async function signup(formData: FormData): Promise<any> {
  const supabase = createClient();

  const data: SignupData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { data: userData, error } = await supabase.auth.signUp({
    email: data.email || '',
    password: data.password || '',
    options: {
      data: {
        name: data.name || '', // store the name in user metadata
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (!userData?.user) {
    return { error: 'User not found.' };
  }

  const { id, email, user_metadata } = userData.user;

  const name = user_metadata?.name || null;

  return {
    user: {
      id,
      email,
      name,
    },
  };
  // revalidatePath('/', 'layout'); // Ensure proper paths for revalidation
  // redirect('/');
}
