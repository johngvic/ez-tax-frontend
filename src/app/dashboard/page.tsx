import { auth } from '@clerk/nextjs/server';
import Menu from '@/components/common/Menu';
import Header from '@/components/common/Header';
import DashboardContent from '@/components/dashboard/DashboardContent';
import { checkRole } from '@/utils/roles';

export default async function Dashboard() {
  const isAdmin = await checkRole('admin');
  const { getToken } = await auth();
  const token = await getToken({ template: "long-lived-token" });
  
  return (
    <div style={{ display: 'flex' }}>

      <div style={{ display: 'flex',  flexDirection: 'row' }}>
        <Menu isAdmin={isAdmin} />
        <Header title='Dashboard' subtitle='Veja um resumo das suas operações' />
      </div>

      <DashboardContent token={token!} />
    </div>
  );
}