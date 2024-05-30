import {  FaPills, FaShoppingCart, FaUsers, FaExclamationTriangle, FaClipboardList } from 'react-icons/fa';
import { MdLocalPharmacy, MdDashboard } from 'react-icons/md';
import { HiOutlineDocumentReport } from 'react-icons/hi';

export const SidebarAdmin = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <MdDashboard />
  },
  {
    title: "Medicine",
    path: "/admin/medicine-admin",
    icon: <FaPills />
  },
  {
    title: "Orders",
    path: "/admin/orders-admin",
    icon: <FaShoppingCart />
  },
  {
    title: "Suppliers",
    path: "/admin/pages/supplier",
    icon: <MdLocalPharmacy />
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <FaUsers />
  },
  {
    title: "Others",
    path: "/admin/others",
    icon: <FaClipboardList />
  },
  {
    title: "Expiration Near Med",
    path: "/admin/expired-medicine",
    icon: <FaExclamationTriangle />
  },
]

export const SidebarCashier = [
  {
    title: "Bill",
    path: "/cashier/bill",
    icon: <HiOutlineDocumentReport />
  },
  {
    title: "Medicine",
    path: "/cashier/medicine-cashier",
    icon: <FaPills />
  }
]

export const SidebarSupplier = [
  {
    title: "Orders",
    path: "/supplier/supplier-orders",
    icon: <FaShoppingCart />
  }
]
