import { auth } from '@clerk/nextjs/server';
import Menu from "@/components/common/Menu";
import Header from "@/components/common/Header";
import TaxCalculationContent from "@/components/tax-calculations/TaxCalculationContent";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

export default async function TaxCalculations() {
  const isAdmin = await checkRole('admin');
  if (!isAdmin) {
    redirect('/dashboard')
  }

  const { getToken } = await auth();
  const token = await getToken({ template: "long-lived-token" });

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Menu isAdmin={isAdmin} />
        <Header title='Cálculos Fiscais' subtitle='Gere relatórios de cálculos fiscais diversos.' />
      </div>

      <TaxCalculationContent token={token!} />
    </div>
  );
}
