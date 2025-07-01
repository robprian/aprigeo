"use client"

import {
  BarChart3,
  Package,
  Users,
  CreditCard,
  Settings,
  X,
  Megaphone,
  MessageCircle,
  Mail,
  FolderOpen,
  Tag,
  Building2,
  ShoppingCart,
  UserCheck,
  Search,
  Bot,
  Wrench,
  TrendingUp,
  ChevronDown,
  Home,
  LogOut,
  ImageIcon,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

const catalogItems = [
  { icon: Package, label: "Products", href: "/admin/catalog/products" },
  { icon: Tag, label: "Categories", href: "/admin/catalog/categories" },
  { icon: Building2, label: "Brands", href: "/admin/catalog/brands" },
  { icon: FolderOpen, label: "File Manager", href: "/admin/catalog/files" },
]

const salesItems = [
  { icon: Users, label: "Customers", href: "/admin/sales/customers" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/sales/orders" },
  { icon: UserCheck, label: "Customer Groups", href: "/admin/sales/customer-groups" },
  { icon: CreditCard, label: "Payment Methods", href: "/admin/sales/payment-methods" },
]

const marketingItems = [
  { icon: Mail, label: "Email Blast", href: "/admin/marketing/email" },
  { icon: MessageCircle, label: "WhatsApp Blast", href: "/admin/marketing/whatsapp" },
  { icon: Search, label: "SEO Tools", href: "/admin/marketing/seo-tools" },
  { icon: ImageIcon, label: "Banner Management", href: "/admin/marketing/banners" },
]

const contentItems = [{ icon: FileText, label: "Blog Posts", href: "/admin/content/blog" }]

const reportsItems = [{ icon: TrendingUp, label: "Analytics", href: "/admin/reports" }]

const settingsItems = [
  { icon: Wrench, label: "System Settings", href: "/admin/settings/system" },
  { icon: Bot, label: "AI Configuration", href: "/admin/settings/ai" },
]

export default function AdminSidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }: AdminSidebarProps) {
  const pathname = usePathname()
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [salesOpen, setSalesOpen] = useState(false)
  const [marketingOpen, setMarketingOpen] = useState(false)
  const [contentOpen, setContentOpen] = useState(false)
  const [reportsOpen, setReportsOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Auto-open sections based on current path
  useEffect(() => {
    if (pathname.startsWith("/admin/catalog/")) setCatalogOpen(true)
    if (pathname.startsWith("/admin/sales/")) setSalesOpen(true)
    if (pathname.startsWith("/admin/marketing/")) setMarketingOpen(true)
    if (pathname.startsWith("/admin/content/")) setContentOpen(true)
    if (pathname.startsWith("/admin/reports")) setReportsOpen(true)
    if (pathname.startsWith("/admin/settings/")) setSettingsOpen(true)
  }, [pathname])

  const isActiveSection = (items: any[]) => {
    return items.some((item) => pathname.startsWith(item.href))
  }

  const renderSectionItems = (
    items: any[],
    sectionName: string,
    isOpen: boolean,
    setOpen: (open: boolean) => void,
    icon: any,
  ) => {
    const SectionIcon = icon

    if (isCollapsed) {
      return (
        <div className="relative group">
          <button
            className={`flex items-center justify-center w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActiveSection(items)
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <SectionIcon className="w-5 h-5 flex-shrink-0" />
          </button>
          <div className="absolute left-full top-0 ml-2 w-48 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block z-50">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )
    }

    return (
      <Collapsible open={isOpen} onOpenChange={setOpen}>
        <CollapsibleTrigger
          className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
            isActiveSection(items) ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <div className="flex items-center">
            <SectionIcon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="truncate">{sectionName}</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <AnimatePresence>
          {isOpen && (
            <CollapsibleContent asChild forceMount>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-1 space-y-1"
              >
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-3 py-2 ml-4 sm:ml-6 rounded-lg text-sm font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    onClick={() => onClose()}
                  >
                    <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                ))}
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>
    )
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white shadow-xl border-r border-gray-200 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "w-16" : "w-64"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-white">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CV</span>
            </div>
            {!isCollapsed && (
              <span className="ml-3 font-semibold text-gray-900 text-sm sm:text-base">CV. Aprinia Admin</span>
            )}
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 px-2 py-4 overflow-y-auto bg-white ${isCollapsed ? "px-2" : "px-3 sm:px-4"}`}>
          <div className="space-y-1">
            {/* Dashboard */}
            <Link
              href="/admin"
              className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                pathname === "/admin"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              } ${isCollapsed ? "justify-center" : ""}`}
              onClick={() => onClose()}
            >
              <BarChart3 className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? "" : "mr-3"}`} />
              {!isCollapsed && <span className="truncate">Dashboard</span>}
            </Link>

            {/* Catalog */}
            <div className="pt-2">
              {renderSectionItems(catalogItems, "Catalog", catalogOpen, setCatalogOpen, Package)}
            </div>

            {/* Sales */}
            <div className="pt-2">{renderSectionItems(salesItems, "Sales", salesOpen, setSalesOpen, ShoppingCart)}</div>

            {/* Marketing */}
            <div className="pt-2">
              {renderSectionItems(marketingItems, "Marketing", marketingOpen, setMarketingOpen, Megaphone)}
            </div>

            {/* Content */}
            <div className="pt-2">
              {renderSectionItems(contentItems, "Content", contentOpen, setContentOpen, FileText)}
            </div>

            {/* Reports */}
            <div className="pt-2">
              {renderSectionItems(reportsItems, "Reports", reportsOpen, setReportsOpen, TrendingUp)}
            </div>

            {/* Settings */}
            <div className="pt-2">
              {renderSectionItems(settingsItems, "Settings", settingsOpen, setSettingsOpen, Settings)}
            </div>
          </div>

          {/* Bottom actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <div className="space-y-2">
              <Link
                href="/"
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <Home className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? "" : "mr-3"}`} />
                {!isCollapsed && <span className="truncate">Back to Store</span>}
              </Link>

              <button
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-red-600 hover:bg-red-50 w-full ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <LogOut className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? "" : "mr-3"}`} />
                {!isCollapsed && <span className="truncate">Logout</span>}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
