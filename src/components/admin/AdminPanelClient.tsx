"use client";

/**
 * AdminPanelClient — Master interactive client controller for System Admin Panel
 * Faithfully migrated from Stitch admin_panel/code.html
 */

import { useState, useMemo, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DEMO_ADMIN_AUDIT_LOGS,
} from "@/lib/mock-data";
import {
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  toAdminMedicineItem,
} from "@/lib/firestore/medicines";
import { logout, subscribeToAuthChanges } from "@/lib/auth";
import { deleteCachedMedicine } from "@/lib/pwa/db";
import type {
  AdminMedicineItem,
  AdminAuditLogItem,
  AdminModuleTabKey,
} from "@/types";

import AdminHeroBanner from "./AdminHeroBanner";
import AdminModuleTabs from "./AdminModuleTabs";
import AdminActionToolbar from "./AdminActionToolbar";
import AdminMedicineTable from "./AdminMedicineTable";
import AdminMonitoringGrid from "./AdminMonitoringGrid";
import AdminAddMedicineModal from "./AdminAddMedicineModal";
import AdminDeleteConfirmModal from "./AdminDeleteConfirmModal";

export default function AdminPanelClient() {
  const router = useRouter();
  const [, startTransition] = useTransition();

  // Core Data States — Initialized Empty, Populated Exclusively from Firestore
  const [medicines, setMedicines] = useState<AdminMedicineItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLogItem[]>(DEMO_ADMIN_AUDIT_LOGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Tab state
  const [activeTab, setActiveTab] = useState<AdminModuleTabKey>("medicines");

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [formFilter, setFormFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<AdminMedicineItem | null>(null);
  const [deletingMedicine, setDeletingMedicine] = useState<AdminMedicineItem | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  // Track auth state
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        setUserEmail(user.email || null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("[AdminPanel] Logout error:", err);
      showToast("লগআউট ব্যর্থ হয়েছে।");
    }
  };

  // Load medicines from Firestore on mount
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setIsLoading(true);
        const remoteMeds = await getMedicines();
        if (isMounted) {
          if (remoteMeds && remoteMeds.length > 0) {
            setMedicines(remoteMeds.map(toAdminMedicineItem));
          } else {
            setMedicines([]);
          }
        }
      } catch (err) {
        console.warn("[AdminPanel] Failed to fetch Firestore medicines:", err);
        if (isMounted) {
          setMedicines([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered & Sorted Medicines
  const filteredMedicines = useMemo(() => {
    let list = [...medicines];

    // Text search (brand, generic, code)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (m) =>
          m.tradeName.toLowerCase().includes(q) ||
          m.genericName.toLowerCase().includes(q) ||
          m.manufacturer.toLowerCase().includes(q)
      );
    }

    // Company filter
    if (companyFilter) {
      list = list.filter((m) =>
        m.manufacturer.toLowerCase().includes(companyFilter.toLowerCase())
      );
    }

    // Form filter
    if (formFilter) {
      list = list.filter((m) =>
        m.dosageForm.toLowerCase().includes(formFilter.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter) {
      list = list.filter((m) => m.status === statusFilter);
    }

    // Sorting
    if (sortBy === "name_asc") {
      list.sort((a, b) => a.tradeName.localeCompare(b.tradeName));
    } else if (sortBy === "price_low") {
      list.sort((a, b) => a.mrp - b.mrp);
    } else if (sortBy === "price_high") {
      list.sort((a, b) => b.mrp - a.mrp);
    }

    return list;
  }, [medicines, searchQuery, companyFilter, formFilter, statusFilter, sortBy]);

  // Statistics derived
  const pendingCount = useMemo(
    () => medicines.filter((m) => m.status === "pending").length,
    [medicines]
  );

  // Selection Handlers
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleSelectAll = () => {
    if (filteredMedicines.length === 0) return;
    const isAllSelected = filteredMedicines.every((m) => selectedIds.has(m.id));

    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      const allIds = new Set(filteredMedicines.map((m) => m.id));
      setSelectedIds(allIds);
    }
  };

  // Bulk Actions
  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    const count = selectedIds.size;
    startTransition(() => {
      setMedicines((prev) => prev.filter((m) => !selectedIds.has(m.id)));
      setSelectedIds(new Set());

      // Add to audit log (client-side)
      const newAudit: AdminAuditLogItem = {
        id: `aud-${Date.now()}`,
        title: `বাল্ক ডিলিট: ${count}টি ওষুধ ডাটাবেস থেকে সরানো হয়েছে`,
        timeAgo: "এখনই",
        meta: "অ্যাডমিন ইউজার: Faruk A. • ক্লায়েন্ট-সাইড সেশন লগ",
        icon: "delete",
        type: "delete",
      };
      setAuditLogs((prev) => [newAudit, ...prev]);
      showToast(`${count}টি ওষুধ সফলভাবে মুছে ফেলা হয়েছে!`);
    });
  };

  const handleBulkApprove = () => {
    if (selectedIds.size === 0) return;
    const count = selectedIds.size;
    startTransition(() => {
      setMedicines((prev) =>
        prev.map((m) => (selectedIds.has(m.id) ? { ...m, status: "live" } : m))
      );
      setSelectedIds(new Set());

      // Add to audit log (client-side)
      const newAudit: AdminAuditLogItem = {
        id: `aud-${Date.now()}`,
        title: `বাল্ক অনুমোদন: ${count}টি ওষুধ লাইভ প্রকাশ করা হয়েছে`,
        timeAgo: "এখনই",
        meta: "অ্যাডমিন ইউজার: Faruk A. • ক্লায়েন্ট-সাইড সেশন লগ",
        icon: "verified_user",
        type: "update",
      };
      setAuditLogs((prev) => [newAudit, ...prev]);
      showToast(`${count}টি ওষুধ সফলভাবে লাইভ অনুমোদন দেয়া হয়েছে!`);
    });
  };

  // Add / Edit Drug Handlers
  const handleOpenAddModal = () => {
    setEditingMedicine(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (item: AdminMedicineItem) => {
    setEditingMedicine(item);
    setIsAddModalOpen(true);
  };

  const handleSaveMedicine = async (data: Partial<AdminMedicineItem>) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (editingMedicine) {
      // 1. Update existing item in Firestore
      const updatePayload = {
        tradeName: data.tradeName,
        genericName: data.genericName,
        manufacturer: data.manufacturer,
        dosageForm: data.dosageForm,
        strength: data.strength,
        mrp: data.mrp,
        mrpFormatted: data.mrpFormatted,
        discountPct: data.discountPct,
        status: data.status,
        iconType: data.iconType,
        notes: data.notes,
        unitPrice: data.mrp,
        unitPriceFormatted: data.mrpFormatted,
        dosageBadge: data.dosageForm,
        lastUpdated: "এখনই",
        updatedTimestamp: Date.now(),
      };

      try {
        await updateMedicine(editingMedicine.id, updatePayload);

        setMedicines((prev) =>
          prev.map((m) =>
            m.id === editingMedicine.id
              ? ({ ...m, ...data, updatedAt: "এখনই" } as AdminMedicineItem)
              : m
          )
        );

        const newAudit: AdminAuditLogItem = {
          id: `aud-${Date.now()}`,
          title: `ফারুক আহমেদ (A-Grade) ${data.tradeName || editingMedicine.tradeName} আপডেট করেছেন`,
          timeAgo: "এখনই",
          meta: "ম্যানুয়াল ড্রাগ এডিট • ক্লায়েন্ট-সাইড সেশন লগ",
          icon: "edit",
          type: "update",
        };
        setAuditLogs((prev) => [newAudit, ...prev]);
        showToast("ওষুধের তথ্য সফলভাবে আপডেট করা হয়েছে!");
        setIsAddModalOpen(false);
        setEditingMedicine(null);
      } catch (error) {
        console.error("[AdminPanel] Failed to update medicine in Firestore:", error);
        showToast("ওষুধ আপডেট করতে ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // 2. Create new item in Firestore
      const newPayload = {
        tradeName: data.tradeName || "New Drug",
        strength: data.strength || "500mg",
        dosageForm: data.dosageForm || "Tablet",
        genericName: data.genericName || "Generic",
        manufacturer: data.manufacturer || "Square Pharma",
        mrp: data.mrp || 10,
        mrpFormatted: data.mrpFormatted || "৳ ১০.০০",
        discountPct: data.discountPct || 5,
        status: data.status || "live",
        iconType: data.iconType || "pill",
        notes: data.notes || "",
        unitPrice: data.mrp || 10,
        unitPriceFormatted: data.mrpFormatted || "৳ ১০.০০",
        dosageBadge: data.dosageForm || "ট্যাবলেট",
        unitPriceUnit: "/পিস",
        isRx: data.status === "pending",
        stockStatus: "স্টক পর্যাপ্ত",
        lastUpdated: "এখনই",
        updatedTimestamp: Date.now(),
      };

      try {
        const created = await addMedicine(newPayload);
        const newItem = toAdminMedicineItem(created);

        setMedicines((prev) => [newItem, ...prev]);

        const newAudit: AdminAuditLogItem = {
          id: `aud-${Date.now()}`,
          title: `নতুন ওষুধ ${newItem.tradeName} ডাটাবেসে যোগ করা হয়েছে`,
          timeAgo: "এখনই",
          meta: "লাইভ রেজিস্ট্রি এন্ট্রি • ক্লায়েন্ট-সাইড সেশন লগ",
          icon: "add_circle",
          type: "create",
        };
        setAuditLogs((prev) => [newAudit, ...prev]);
        showToast("সফলভাবে ওষুধটি ডাটাবেসে নথিভুক্ত হয়েছে!");
        setIsAddModalOpen(false);
        setEditingMedicine(null);
      } catch (error) {
        console.error("[AdminPanel] Failed to save medicine to Firestore:", error);
        showToast("ওষুধ সংরক্ষণ করতে ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Delete Drug Handlers
  const handleOpenDeleteModal = (item: AdminMedicineItem) => {
    setDeletingMedicine(item);
  };

  const handleConfirmDelete = async () => {
    if (!deletingMedicine || isSubmitting) return;
    const target = deletingMedicine;
    setIsSubmitting(true);

    try {
      await deleteMedicine(target.id);
      await deleteCachedMedicine(target.id);

      setMedicines((prev) => prev.filter((m) => m.id !== target.id));
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(target.id);
        return next;
      });

      const newAudit: AdminAuditLogItem = {
        id: `aud-${Date.now()}`,
        title: `${target.tradeName} রেকর্ড ডাটাবেস থেকে মুছে ফেলা হয়েছে`,
        timeAgo: "এখনই",
        meta: `DEL_REF_${target.id} • ক্লায়েন্ট-সাইড সেশন লগ`,
        icon: "delete_forever",
        type: "delete",
      };
      setAuditLogs((prev) => [newAudit, ...prev]);
      showToast("রেকর্ডটি স্থায়ীভাবে অপসারণ করা হয়েছে।");
      setDeletingMedicine(null);
    } catch (error) {
      console.error("[AdminPanel] Failed to delete medicine from Firestore:", error);
      showToast("রেকর্ড মুছে ফেলতে ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Extra Mock Actions
  const handleResetFilters = () => {
    setSearchQuery("");
    setCompanyFilter("");
    setFormFilter("");
    setStatusFilter("");
    setSortBy("recent");
    setCurrentPage(1);
    showToast("সকল ফিল্টার রিসেট করা হয়েছে।");
  };

  const handleExportData = () => {
    showToast("CSV ড্রাগ ডাটাবেস ডাউনলোড সম্পন্ন হয়েছে!");
  };

  const handleTriggerBulkUpload = () => {
    showToast("এক্সেল/CSV ফাইল নির্বাচন ডায়ালগ প্রস্তুত (ডেমো মোড)");
  };

  const handleTriggerPriceUpdate = () => {
    showToast("DGDA বাল্ক ড্রাগ প্রাইস সিঙ্ক শুরু হয়েছে...");
  };

  const handleRefreshToken = () => {
    showToast("হোয়াটসঅ্যাপ গেটওয়ে টোকেন সফলভাবে রিফ্রেশ করা হয়েছে (মেয়াদ: ২৪ ঘণ্টা)!");
  };

  return (
    <div className="flex flex-col w-full gap-space-lg max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 lg:bottom-6 right-6 z-50 flex items-center gap-space-sm px-space-md py-space-sm rounded-xl bg-inverse-surface text-inverse-on-surface shadow-xl animate-in slide-in-from-bottom-5 duration-300">
          <span className="material-symbols-outlined text-primary text-xl">
            check_circle
          </span>
          <span className="font-label-md text-label-md font-medium">
            {toastMessage}
          </span>
        </div>
      )}

      {/* 1. Admin Hero Banner */}
      <AdminHeroBanner
        totalDrugs={medicines.length}
        pendingCount={pendingCount}
        registeredUsers={128}
        systemHealth={100}
        onLogout={handleLogout}
        userEmail={userEmail || undefined}
      />

      {/* 2. Admin Module Navigation Tabs */}
      <AdminModuleTabs activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* 3. Module View: Medicine Management or other tabs */}
      {activeTab === "medicines" ? (
        <>
          {/* Action Toolbar & 6-Col Filter Matrix */}
          <AdminActionToolbar
            searchQuery={searchQuery}
            onSearchChange={(q) => {
              setSearchQuery(q);
              setCurrentPage(1);
            }}
            companyFilter={companyFilter}
            onCompanyChange={(c) => {
              setCompanyFilter(c);
              setCurrentPage(1);
            }}
            formFilter={formFilter}
            onFormChange={(f) => {
              setFormFilter(f);
              setCurrentPage(1);
            }}
            statusFilter={statusFilter}
            onStatusChange={(s) => {
              setStatusFilter(s);
              setCurrentPage(1);
            }}
            sortBy={sortBy}
            onSortChange={setSortBy}
            selectedCount={selectedIds.size}
            onBulkDelete={handleBulkDelete}
            onBulkApprove={handleBulkApprove}
            onOpenAddModal={handleOpenAddModal}
            onTriggerBulkUpload={handleTriggerBulkUpload}
            onTriggerPriceUpdate={handleTriggerPriceUpdate}
            onResetFilters={handleResetFilters}
            onExportData={handleExportData}
          />

          {/* Central Medicine Data Registry Table */}
          <AdminMedicineTable
            medicines={filteredMedicines}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAll={handleToggleSelectAll}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
            currentPage={currentPage}
            totalCount={medicines.length}
            onPageChange={setCurrentPage}
          />

          {/* Monitoring & Analytics 3-Col Grid */}
          <AdminMonitoringGrid
            auditLogs={auditLogs}
            onRefreshToken={handleRefreshToken}
          />
        </>
      ) : (
        /* Alternative Tab View Card */
        <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm border border-[var(--color-border)] flex flex-col items-center justify-center text-center gap-space-md py-16">
          <div className="p-4 rounded-2xl bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-4xl">
              {activeTab === "users"
                ? "group"
                : activeTab === "announcements"
                ? "campaign"
                : activeTab === "whatsapp"
                ? "chat"
                : "rule"}
            </span>
          </div>

          <div className="flex flex-col gap-1 max-w-md">
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
              {activeTab === "users"
                ? "ব্যবহারকারী ও রোল ম্যানেজমেন্ট (User Roles)"
                : activeTab === "announcements"
                ? "নোটিশ ও অ্যানাউন্সমেন্ট কন্ট্রোল"
                : activeTab === "whatsapp"
                ? "হোয়াটসঅ্যাপ গেটওয়ে ইন্টিগ্রেশন"
                : "সিস্টেম সেটিংস ও পূর্ণ অডিট লগ"}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              এই মডিউলটি বর্তমানে ডেমো মোডে সংযুক্ত আছে। ওষুধ ম্যানেজমেন্ট ট্যাবে ফিরে যেতে নিচের বাটনে ক্লিক করুন।
            </p>
          </div>

          <button
            onClick={() => setActiveTab("medicines")}
            className="flex items-center gap-space-xs px-space-lg py-2.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-primary-container transition-all cursor-pointer font-semibold"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">medication</span>
            <span>ওষুধ ম্যানেজমেন্টে ফিরে যান</span>
          </button>
        </div>
      )}

      {/* Add / Edit Medicine Modal */}
      <AdminAddMedicineModal
        isOpen={isAddModalOpen}
        onClose={() => {
          if (!isSubmitting) {
            setIsAddModalOpen(false);
            setEditingMedicine(null);
          }
        }}
        onSave={handleSaveMedicine}
        editingMedicine={editingMedicine}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <AdminDeleteConfirmModal
        isOpen={!!deletingMedicine}
        onClose={() => {
          if (!isSubmitting) {
            setDeletingMedicine(null);
          }
        }}
        onConfirm={handleConfirmDelete}
        medicine={deletingMedicine}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
