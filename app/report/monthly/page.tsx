import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { MonthlyReport } from "@/components/customui/reportModule/monthlyReportView/monthly_report_view";
import { cookies } from "next/headers";

const cookieStore = cookies();
const storedItem = cookieStore.get("datahubToken");
export default function All_Transaction_Page() {
  return (
    <main>
      <DashBoardLayout firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}>
        <MonthlyReport/>
      </DashBoardLayout>
    </main>
  )
}