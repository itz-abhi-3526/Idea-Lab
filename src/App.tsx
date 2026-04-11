import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/page"
import LoginPage from "./pages/login/page"
import SignupPage from "./pages/signup/page"
import UnauthorizedPage from "./pages/unauthorized/page"
import InventoryPage from "./pages/inventory/page"
import MachineryPage from "./pages/machinery/page"
import ProductsPage from "./pages/products/page"
import ProductDetailPage from "./pages/products/[id]/page"
import EventsPage from "./pages/events/page"
import EventDetailPage from "./pages/events/[eventId]/page"
import EventRegisterPage from "./pages/events/[eventId]/register/page"
import ConsultancyPage from "./pages/consultancy/page"
import AdminPage from "./pages/admin/page"
import AdminUsersPage from "./pages/admin/users/page"
import AdminAnnouncementsPage from "./pages/admin/announcements/page"
import AdminConsultancyPage from "./pages/admin/consultancy/page"
import AdminConsultancyRequestsPage from "./pages/admin/consultancy/requests/page"
import AdminEventsPage from "./pages/admin/events/page"
import AdminEventRegistrationsPage from "./pages/admin/events/registrations/page"
import AdminEventFeedbackPage from "./pages/admin/events/feedback/page"
import AdminExecomPage from "./pages/admin/execom/page"
import AdminGalleryPage from "./pages/admin/gallery/page"
import AdminIdeasPage from "./pages/admin/ideas/page"
import AdminInventoryPage from "./pages/admin/inventory/page"
import AdminInventoryRequestsPage from "./pages/admin/inventory/requests/page"
import AdminInventoryRequestsLegacyPage from "./pages/AdminInventoryRequestsLegacyPage"
import AdminProductsPage from "./pages/admin/products/page"
import AdminRequestsPage from "./pages/admin/requests/page"
import AdminIncubationRequestsPage from "./pages/admin/incubation-requests/page"
import DashboardPage from "./pages/dashboard/page"
import DashboardAccountPage from "./pages/dashboard/account/page"
import DashboardCertificatesPage from "./pages/dashboard/certificates/page"
import DashboardEventsPage from "./pages/dashboard/events/page"
import DashboardEventDetailPage from "./pages/dashboard/events/[eventId]/page"
import DashboardIncubationRequestsPage from "./pages/dashboard/incubation-requests/page"
import DashboardInventoryRequestsPage from "./pages/dashboard/inventory-requests/page"
import DashboardMyIdeasPage from "./pages/dashboard/my-ideas/page"
import DashboardMyRequestsPage from "./pages/dashboard/my-requests/page"
import IncubationRequestPage from "./pages/incubation/request/page"
import GalleryPage from "./pages/gallery/page"
import AdminLayout from "./pages/admin/layout"
import DashboardLayout from "./pages/dashboard/layout"

import NavigationControls from "./components/NavigationControls"

export default function App() {
  return (
    <BrowserRouter>
      <NavigationControls />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/machinery" element={<MachineryPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:eventId" element={<EventDetailPage />} />
        <Route path="/events/:eventId/register" element={<EventRegisterPage />} />
        <Route path="/consultancy" element={<ConsultancyPage />} />
        <Route path="/incubation/request" element={<IncubationRequestPage />} />
        <Route path="/gallery" element={<GalleryPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="announcements" element={<AdminAnnouncementsPage />} />
          <Route path="consultancy" element={<AdminConsultancyPage />} />
          <Route path="consultancy/requests" element={<AdminConsultancyRequestsPage />} />
          <Route path="events" element={<AdminEventsPage />} />
          <Route path="events/registrations" element={<AdminEventRegistrationsPage />} />
          <Route path="events/feedback" element={<AdminEventFeedbackPage />} />
          <Route path="execom" element={<AdminExecomPage />} />
          <Route path="gallery" element={<AdminGalleryPage />} />
          <Route path="ideas" element={<AdminIdeasPage />} />
          <Route path="inventory" element={<AdminInventoryPage />} />
          <Route path="inventory/requests" element={<AdminInventoryRequestsPage />} />
          <Route path="inventory-requests" element={<AdminInventoryRequestsLegacyPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="requests" element={<AdminRequestsPage />} />
          <Route path="incubation-requests" element={<AdminIncubationRequestsPage />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="account" element={<DashboardAccountPage />} />
          <Route path="certificates" element={<DashboardCertificatesPage />} />
          <Route path="events" element={<DashboardEventsPage />} />
          <Route path="events/:eventId" element={<DashboardEventDetailPage />} />
          <Route path="incubation-requests" element={<DashboardIncubationRequestsPage />} />
          <Route path="inventory-requests" element={<DashboardInventoryRequestsPage />} />
          <Route path="my-ideas" element={<DashboardMyIdeasPage />} />
          <Route path="my-requests" element={<DashboardMyRequestsPage />} />
        </Route>

        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
