import DashboardLayout from "@/components/layout/DashboardLayout";

import DashboardStats from "@/components/dashboard/DashboardStats";

export default function Dashboard() {

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-8">

                Dashboard

            </h1>

            <DashboardStats />

        </DashboardLayout>

    )

}