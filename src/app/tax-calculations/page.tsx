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

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Menu isAdmin={isAdmin} />
        <Header title='Cálculos Fiscais' subtitle='Gere relatórios de cálculos fiscais diversos.' />
      </div>

      <TaxCalculationContent/>
    </div>
  );
}
