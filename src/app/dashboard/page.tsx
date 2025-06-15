import { redirect } from 'next/navigation';

export default async function Dashboard() {
  // if (!token) {
  //   return redirect('/auth/sign-in');
  // } else {
  redirect('/dashboard/overview');
  // }
}
