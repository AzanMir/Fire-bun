import { ToastProvider } from "@/components/ui/toast";
import { CartProvider } from "@/context/CartContext";
import StaffSidebar from "@/components/layout/StaffSidebar";
import TopNavbar from "@/components/layout/TopNavbar";

export default function StaffLayout({ children }) {
  return (
    <ToastProvider>
      <CartProvider>
        <div className="flex h-screen overflow-hidden bg-neutral-50">
          <StaffSidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <TopNavbar title="Staff Dashboard" profileHref="/staff/profile" />
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </CartProvider>
    </ToastProvider>
  );
}
