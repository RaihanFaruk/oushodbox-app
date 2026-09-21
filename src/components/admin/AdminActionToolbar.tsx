"use client";

/**
 * AdminActionToolbar — Actions row and 6-field search/filter matrix
 * Faithfully migrated from Stitch admin_panel/code.html
 */

interface AdminActionToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  companyFilter: string;
  onCompanyChange: (c: string) => void;
  formFilter: string;
  onFormChange: (f: string) => void;
  statusFilter: string;
  onStatusChange: (s: string) => void;
  sortBy: string;
  onSortChange: (s: string) => void;
  selectedCount: number;
  onBulkDelete: () => void;
  onBulkApprove: () => void;
  onOpenAddModal: () => void;
  onTriggerBulkUpload: () => void;
  onTriggerPriceUpdate: () => void;
  onResetFilters: () => void;
  onExportData: () => void;
  onCopyFullList?: () => void;
}

export default function AdminActionToolbar({
  searchQuery,
  onSearchChange,
  companyFilter,
  onCompanyChange,
  formFilter,
  onFormChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  selectedCount,
  onBulkDelete,
  onBulkApprove,
  onOpenAddModal,
  onTriggerBulkUpload,
  onTriggerPriceUpdate,
  onResetFilters,
  onExportData,
  onCopyFullList,
}: AdminActionToolbarProps) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md border border-[var(--color-border)]">
      {/* Top action row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
        {/* Left primary & batch buttons */}
        <div className="flex flex-wrap items-center gap-space-sm">
          <button
            onClick={onOpenAddModal}
            className="flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer font-semibold"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">add_circle</span>
            <span>➕ নতুন ওষুধ যোগ করুন (Add New Medicine)</span>
          </button>

          {onCopyFullList && (
            <button
              onClick={onCopyFullList}
              className="flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-label-lg text-label-lg shadow-sm active:scale-[0.98] transition-all cursor-pointer font-semibold"
              type="button"
              title="সম্পূর্ণ তালিকা কপি করুন (হোয়াটসঅ্যাপে পেস্টের জন্য)"
            >
              <span className="material-symbols-outlined text-xl">content_copy</span>
              <span>📋 সম্পূর্ণ তালিকা কপি করুন</span>
            </button>
          )}

          <button
            onClick={onTriggerBulkUpload}
            className="flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-xl bg-surface-container-low text-primary font-label-lg text-label-lg hover:bg-surface-container shadow-sm transition-all cursor-pointer font-medium"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">file_upload</span>
            <span>📤 বাল্ক এক্সেল / CSV আপলোড</span>
          </button>

          <button
            onClick={onTriggerPriceUpdate}
            className="flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-xl bg-surface-container-low text-secondary font-label-lg text-label-lg hover:bg-surface-container shadow-sm transition-all cursor-pointer font-medium"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">price_change</span>
            <span>📊 ড্রাগ প্রাইস বাল্ক আপডেট</span>
          </button>
        </div>

        {/* Right selected batch actions */}
        <div className="flex items-center gap-space-xs">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            সিলেক্টেড অ্যাকশন ({selectedCount}):
          </span>
          <button
            onClick={onBulkDelete}
            disabled={selectedCount === 0}
            className={`px-space-sm py-1.5 rounded-lg font-label-sm text-label-sm transition-all ${
              selectedCount > 0
                ? "bg-surface-container-low text-on-surface-variant hover:text-error hover:bg-error-container cursor-pointer font-semibold"
                : "bg-surface-container-low/50 text-outline opacity-50 cursor-not-allowed"
            }`}
            type="button"
          >
            নির্বাচিত ডিলিট
          </button>
          <button
            onClick={onBulkApprove}
            disabled={selectedCount === 0}
            className={`px-space-sm py-1.5 rounded-lg font-label-sm text-label-sm transition-all ${
              selectedCount > 0
                ? "bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-primary-container/20 cursor-pointer font-semibold"
                : "bg-surface-container-low/50 text-outline opacity-50 cursor-not-allowed"
            }`}
            type="button"
          >
            অনুমোদন দিন
          </button>
        </div>
      </div>

      {/* 6-Column Filter & Search Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-space-sm">
        {/* Search */}
        <div className="xl:col-span-2 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl pointer-events-none">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-space-md py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/70 font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:shadow-md border border-transparent focus:border-primary/20 transition-all"
            placeholder="অ্যাডমিন ডাটাবেসে খুঁজুন (ব্র্যান্ড, জেনেরিক, কোড)..."
            type="text"
          />
        </div>

        {/* Company filter */}
        <div>
          <select
            value={companyFilter}
            onChange={(e) => onCompanyChange(e.target.value)}
            className="w-full px-space-sm py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none border border-transparent focus:border-primary/20 cursor-pointer"
          >
            <option value="">কোম্পানি (All)</option>
            <option value="Beximco Pharma">Beximco Pharma</option>
            <option value="Square Pharma">Square Pharma</option>
            <option value="Incepta Pharma">Incepta Pharma</option>
            <option value="Renata Ltd">Renata Ltd</option>
            <option value="Acme Laboratories">Acme Laboratories</option>
          </select>
        </div>

        {/* Dosage Form filter */}
        <div>
          <select
            value={formFilter}
            onChange={(e) => onFormChange(e.target.value)}
            className="w-full px-space-sm py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none border border-transparent focus:border-primary/20 cursor-pointer"
          >
            <option value="">ডোজ ফর্ম (All)</option>
            <option value="Tablet">Tablet (ট্যাবলেট)</option>
            <option value="Capsule">Capsule (ক্যাপসুল)</option>
            <option value="Syrup">Syrup (সিরাপ)</option>
            <option value="Injection">Injection (ইনজেকশন)</option>
            <option value="Drop">Drop (ড্রপ)</option>
          </select>
        </div>

        {/* Status filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-space-sm py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none border border-transparent focus:border-primary/20 cursor-pointer"
          >
            <option value="">স্ট্যাটাস (All)</option>
            <option value="live">লাইভ (Live)</option>
            <option value="pending">পেন্ডিং (Pending)</option>
            <option value="draft">খসড়া (Draft)</option>
          </select>
        </div>

        {/* Sort & Quick buttons */}
        <div className="flex items-center gap-space-xs">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="flex-1 min-w-0 px-space-sm py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none border border-transparent focus:border-primary/20 cursor-pointer"
          >
            <option value="recent">সাম্প্রতিক আপডেট</option>
            <option value="name_asc">নাম (A-Z)</option>
            <option value="price_low">MRP (কম থেকে বেশি)</option>
            <option value="price_high">MRP (বেশি থেকে কম)</option>
          </select>

          <button
            onClick={onResetFilters}
            className="p-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all cursor-pointer shrink-0"
            type="button"
            title="ফিল্টার রিসেট করুন"
          >
            <span className="material-symbols-outlined text-lg">refresh</span>
          </button>

          <button
            onClick={onExportData}
            className="p-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all cursor-pointer shrink-0"
            type="button"
            title="CSV ডাটা ডাউনলোড"
          >
            <span className="material-symbols-outlined text-lg">download</span>
          </button>
        </div>
      </div>
    </div>
  );
}
