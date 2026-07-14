import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Double-check auth on server-side
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch all users for the network tree
  const { data: allUsers } = await supabase
    .from('profiles')
    .select('full_name, email, referred_by, role');

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold text-[#12066a]">Bizgrow Master Control</h1>
      
      
      <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg">
        <h2 className="text-lg font-semibold">Total Network Overview</h2>
        <pre className="mt-4 text-xs">
          {JSON.stringify(allUsers, null, 2)}
        </pre>
      </div>
    </div>
  );
}