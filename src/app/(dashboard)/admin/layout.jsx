import { SidebarProvider } from "@/context/SidebarContext";
import { ToastProvider } from "@/components/ui/toast";
import AdminSidebar from "@/components/layout/AdminSidebar";
import TopNavbar from "@/components/layout/TopNavbar";

export default function AdminLayout({ children }) {
  return (
    <ToastProvider>
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden bg-neutral-50">
          <AdminSidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <TopNavbar title="Admin Dashboard" profileHref="/admin/profile" />
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ToastProvider>
  );
}
