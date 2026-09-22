"use client";

/**
 * AdminAddMedicineModal — Add / Edit Medicine Modal
 * Faithfully migrated from Stitch admin_panel/code.html
 */

import { useState, useEffect, useMemo } from "react";
import { getMedicines } from "@/lib/firestore/medicines";
import type { AdminMedicineItem, ItemType } from "@/types";

interface AdminAddMedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<AdminMedicineItem>) => void;
  editingMedicine: AdminMedicineItem | null;
  isSubmitting?: boolean;
  existingCompanies?: string[];
}

export default function AdminAddMedicineModal({
  isOpen,
  onClose,
  onSave,
  editingMedicine,
  isSubmitting = false,
  existingCompanies = [],
}: AdminAddMedicineModalProps) {
  const [itemType, setItemType] = useState<ItemType>("medicine");
  const [tradeName, setTradeName] = useState("");
  const [genericName, setGenericName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);
  const [fetchedCompanies, setFetchedCompanies] = useState<string[]>([]);
  const [dosageForm, setDosageForm] = useState("ট্যাবলেট");
  const [strength, setStrength] = useState("");
  const [mrp, setMrp] = useState("");
  const [discountPct, setDiscountPct] = useState("0");
  const [notes, setNotes] = useState("");
  const [isInstantPublish, setIsInstantPublish] = useState(true);

  // Load companies if not passed as prop
  useEffect(() => {
    if (!existingCompanies || existingCompanies.length === 0) {
      getMedicines()
        .then((meds) => {
          const comps = Array.from(
            new Set(meds.map((m) => m.manufacturer?.trim()).filter(Boolean))
          ).sort() as string[];
          setFetchedCompanies(comps);
        })
        .catch(() => {});
    }
  }, [existingCompanies]);

  const availableCompanies =
    existingCompanies && existingCompanies.length > 0
      ? existingCompanies
      : fetchedCompanies;

  const filteredCompanySuggestions = useMemo(() => {
    const q = manufacturer.trim().toLowerCase();
    if (!q) return availableCompanies.slice(0, 8);
    return availableCompanies
      .filter((c) => c.toLowerCase().includes(q))
      .slice(0, 8);
  }, [manufacturer, availableCompanies]);

  // Populate fields when editing
  useEffect(() => {
    if (editingMedicine) {
      setItemType(editingMedicine.itemType || "medicine");
      setTradeName(editingMedicine.tradeName);
      setGenericName(editingMedicine.genericName || "");
      setManufacturer(editingMedicine.manufacturer || "");
      setDosageForm(editingMedicine.dosageForm || (editingMedicine.itemType === "other" ? "সার্জিক্যাল ও অন্যান্য" : "ট্যাবলেট"));
      setStrength(editingMedicine.strength || "");
      setMrp(editingMedicine.mrp.toString());
      setDiscountPct((editingMedicine.discountPct ?? 0).toString());
      setNotes(editingMedicine.notes || "");
      setIsInstantPublish(editingMedicine.status === "live");
    } else {
      setItemType("medicine");
      setTradeName("");
      setGenericName("");
      setManufacturer("");
      setDosageForm("ট্যাবলেট");
      setStrength("");
      setMrp("");
      setDiscountPct("0");
      setNotes("");
      setIsInstantPublish(true);
    }
  }, [editingMedicine, isOpen]);

  if (!isOpen) return null;

  const isOther = itemType === "other";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (isOther) {
      if (!tradeName.trim() || !mrp.trim()) return;
    } else {
      if (!tradeName.trim() || !genericName.trim() || !strength.trim() || !mrp.trim()) return;
    }

    const parsedMrp = parseFloat(mrp) || 0;
    const parsedDiscount = parseFloat(discountPct) || 0;

    let iconType: "pill" | "liquid" | "injection" = "pill";
    if (
      dosageForm.includes("ক্যাপসুল") ||
      dosageForm.includes("সিরাপ") ||
      dosageForm.toLowerCase().includes("syrup") ||
      dosageForm.toLowerCase().includes("capsule")
    ) {
      iconType = "liquid";
    } else if (
      dosageForm.includes("ইনজেকশন") ||
      dosageForm.toLowerCase().includes("injection")
    ) {
      iconType = "injection";
    }

    onSave({
      itemType,
      tradeName: tradeName.trim(),
      genericName: genericName.trim(),
      manufacturer: manufacturer.trim(),
      dosageForm: isOther && dosageForm === "ট্যাবলেট" ? "সার্জিক্যাল ও অন্যান্য" : dosageForm,
      strength: strength.trim(),
      mrp: parsedMrp,
      mrpFormatted: `৳ ${parsedMrp.toFixed(2)}`,
      discountPct: parsedDiscount,
      status: isInstantPublish ? "live" : "pending",
      iconType,
      notes,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/40 backdrop-blur-sm transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-modal-title"
    >
      <div className="bg-surface-container-lowest w-full max-w-3xl rounded-xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col border border-[var(--color-border)] animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-between border-b border-[var(--color-border)]">
          <div className="flex items-center gap-space-xs">
            <span className="p-2 rounded-lg bg-primary-container text-on-primary-container">
              <span className="material-symbols-outlined text-xl">
                {editingMedicine ? "edit_note" : "add_box"}
              </span>
            </span>
            <div className="flex flex-col">
              <h2
                id="add-modal-title"
                className="font-headline-md text-headline-md font-bold text-on-surface"
              >
                {editingMedicine ? "ওষুধের তথ্য সম্পাদনা করুন" : "নতুন ওষুধ নথিভুক্ত করুন"}
              </h2>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                ক্লিনিক্যাল ড্রাগ ম্যানেজমেন্ট রেজিস্ট্রি এন্ট্রি
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all cursor-pointer"
            type="button"
            aria-label="বন্ধ করুন"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-space-lg overflow-y-auto flex flex-col gap-space-md">
          {/* Item Type Selector */}
          <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-surface-container-low border border-[var(--color-border)]">
            <label className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between">
              <span>আইটেমের ধরণ (Item Type) *</span>
              <span className="text-xs text-on-surface-variant font-normal">
                {isOther ? "সার্জিক্যাল/অন্যান্য আইটেমে জেনেরিক ও কোম্পানি ঐচ্ছিক" : "ওষুধের জেনেরিক ও মাত্রা পূরণ করুন"}
              </span>
            </label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                type="button"
                onClick={() => setItemType("medicine")}
                className={`py-2 px-3 rounded-lg text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                  itemType === "medicine"
                    ? "bg-primary text-on-primary border-primary font-bold shadow-xs"
                    : "bg-surface-container border-[var(--color-border)] text-on-surface hover:bg-surface-container-high"
                }`}
              >
                <span className="material-symbols-outlined text-base">medication</span>
                <span>ওষুধ (Medicine)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setItemType("other");
                  if (dosageForm === "ট্যাবলেট") {
                    setDosageForm("সার্জিক্যাল ও অন্যান্য");
                  }
                }}
                className={`py-2 px-3 rounded-lg text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                  itemType === "other"
                    ? "bg-primary text-on-primary border-primary font-bold shadow-xs"
                    : "bg-surface-container border-[var(--color-border)] text-on-surface hover:bg-surface-container-high"
                }`}
              >
                <span className="material-symbols-outlined text-base">medical_services</span>
                <span>সার্জিক্যাল ও অন্যান্য</span>
              </button>
            </div>
          </div>

          {/* Row 1: Trade Name & Generic Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <label className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between">
                <span>{isOther ? "আইটেম / পণ্যের নাম *" : "ওষুধের নাম (Trade Name) *"}</span>
                <span className="text-tertiary font-label-sm text-label-sm">বাধ্যতামূলক</span>
              </label>
              <input
                value={tradeName}
                onChange={(e) => setTradeName(e.target.value)}
                className="px-space-md py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/70 font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest shadow-sm border border-transparent focus:border-primary/30"
                placeholder={isOther ? "যেমন: সার্জিক্যাল ডিসপোজেবল সিরিঞ্জ 5ml" : "যেমন: Napa One"}
                required
                type="text"
              />
            </div>

            <div className="flex flex-col gap-space-xs">
              <label className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between">
                <span>{isOther ? "জেনেরিক / উপাদান (ঐচ্ছিক)" : "জেনেরিক নাম (Generic Name) *"}</span>
                {isOther ? (
                  <span className="text-on-surface-variant text-[11px]">ঐচ্ছিক</span>
                ) : (
                  <span className="text-tertiary font-label-sm text-label-sm">বাধ্যতামূলক</span>
                )}
              </label>
              <input
                value={genericName}
                onChange={(e) => setGenericName(e.target.value)}
                className="px-space-md py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/70 font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest shadow-sm border border-transparent focus:border-primary/30"
                placeholder={isOther ? "প্রযোজ্য হলে লিখুন..." : "যেমন: Paracetamol 1000mg"}
                required={!isOther}
                type="text"
              />
            </div>
          </div>

          {/* Row 2: Manufacturer, Form & Strength */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div className="flex flex-col gap-space-xs relative">
              <label className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between">
                <span>{isOther ? "কোম্পানি / ব্র্যান্ড (ঐচ্ছিক)" : "প্রস্তুতকারক কোম্পানি"}</span>
                <span className="text-[11px] text-on-surface-variant font-normal">যেকোনো নাম লিখুন</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={manufacturer}
                  onChange={(e) => {
                    setManufacturer(e.target.value);
                    setShowCompanySuggestions(true);
                  }}
                  onFocus={() => setShowCompanySuggestions(true)}
                  onBlur={() => setTimeout(() => setShowCompanySuggestions(false), 200)}
                  placeholder={isOther ? "যেমন: JMI, Getwell, বা যেকোনো..." : "যেমন: Square Pharma, Albion, ACI..."}
                  className="w-full px-space-md py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/70 font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest shadow-sm border border-transparent focus:border-primary/30"
                />
                {showCompanySuggestions && filteredCompanySuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-surface-container-lowest border border-[var(--color-border)] rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto py-1">
                    {filteredCompanySuggestions.map((comp, idx) => (
                      <button
                        key={`company-suggest-${comp}-${idx}`}
                        type="button"
                        onMouseDown={() => {
                          setManufacturer(comp);
                          setShowCompanySuggestions(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-surface-container-low text-on-surface flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="font-medium">{comp}</span>
                        <span className="text-[10px] text-on-surface-variant">পূর্বে ব্যবহৃত</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-space-xs">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                {isOther ? "ধরণ / ক্যাটাগরি *" : "ডোজ ফরম (Form) *"}
              </label>
              <select
                value={dosageForm}
                onChange={(e) => setDosageForm(e.target.value)}
                className="px-space-sm py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none border border-transparent focus:border-primary/30 cursor-pointer"
                required
              >
                {isOther ? (
                  <>
                    <option value="সার্জিক্যাল ও অন্যান্য">সার্জিক্যাল ও অন্যান্য</option>
                    <option value="ডিসপোজেবল">ডিসপোজেবল</option>
                    <option value="পিস / ইউনিট">পিস / ইউনিট</option>
                    <option value="বক্স / প্যাকেট">বক্স / প্যাকেট</option>
                    <option value="রোল / গজ">রোল / গজ</option>
                    <option value="অন্যান্য">অন্যান্য</option>
                  </>
                ) : (
                  <>
                    <option value="ট্যাবলেট">ট্যাবলেট (Tablet)</option>
                    <option value="ক্যাপসুল">ক্যাপসুল (Capsule)</option>
                    <option value="সিরাপ">সিরাপ (Syrup)</option>
                    <option value="ইনজেকশন">ইনজেকশন (Injection)</option>
                    <option value="ড্রপ">আই/ইয়ার ড্রপস</option>
                  </>
                )}
              </select>
            </div>

            <div className="flex flex-col gap-space-xs">
              <label className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between">
                <span>{isOther ? "সাইজ / স্পেসিফিকেশন" : "শক্তি / মাত্রা (Strength) *"}</span>
                {isOther ? (
                  <span className="text-on-surface-variant text-[11px]">ঐচ্ছিক</span>
                ) : (
                  <span className="text-tertiary font-label-sm text-label-sm">বাধ্যতামূলক</span>
                )}
              </label>
              <input
                value={strength}
                onChange={(e) => setStrength(e.target.value)}
                className="px-space-md py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/70 font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest shadow-sm border border-transparent focus:border-primary/30"
                placeholder={isOther ? "যেমন: 5ml, Large, 10cm x 10cm" : "যেমন: 1000 mg"}
                required={!isOther}
                type="text"
              />
            </div>
          </div>

          {/* Row 3: MRP & Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                সর্বোচ্চ খুচরা মূল্য (MRP ৳) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">
                  ৳
                </span>
                <input
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  className="w-full pl-8 pr-space-md py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/70 font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest shadow-sm border border-transparent focus:border-primary/30"
                  placeholder="4.00"
                  required
                  step="0.01"
                  type="number"
                />
              </div>
            </div>

            <div className="flex flex-col gap-space-xs">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                ফার্মেসি ডিসকাউন্ট (%)
              </label>
              <div className="relative">
                <input
                  value={discountPct}
                  onChange={(e) => setDiscountPct(e.target.value)}
                  className="w-full px-space-md py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/70 font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest shadow-sm border border-transparent focus:border-primary/30"
                  placeholder="5"
                  type="number"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Row 4: Clinical & Safety Notes */}
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-md text-label-md text-on-surface font-semibold">
              বিস্তারিত বিবরণ ও নির্দেশনা (Clinical & Safety Notes)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-space-md rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/70 font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest shadow-sm border border-transparent focus:border-primary/30"
              placeholder="ওষুধ খাওয়ার নিয়ম, পার্শ্বপ্রতিক্রিয়া এবং সতর্কবার্তা বাংলা বা ইংরেজিতে লিখুন..."
              rows={3}
            />
          </div>

          {/* Row 5: Immediate Publish */}
          <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between border border-[var(--color-border)]">
            <div className="flex items-center gap-space-xs">
              <input
                id="immediate-verify"
                checked={isInstantPublish}
                onChange={(e) => setIsInstantPublish(e.target.checked)}
                className="rounded accent-primary w-4 h-4 cursor-pointer"
                type="checkbox"
              />
              <label
                htmlFor="immediate-verify"
                className="font-label-sm text-label-sm text-on-surface cursor-pointer select-none font-medium"
              >
                তাত্ক্ষণিকভাবে DGDA রেজিস্ট্রি অনুযায়ী লাইভ করুন (Instant Live Publish)
              </label>
            </div>
            <span className="text-tertiary font-label-sm text-label-sm font-semibold">
              স্বয়ংক্রিয় অডিট সক্রিয়
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-space-sm pt-space-xs">
            <button
              onClick={onClose}
              className="px-space-lg py-2.5 rounded-xl bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-all cursor-pointer font-medium"
              type="button"
            >
              বাতিল (Cancel)
            </button>

            <button
              disabled={isSubmitting}
              className={`flex items-center gap-space-xs px-space-xl py-2.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer font-semibold ${
                isSubmitting ? "opacity-60 cursor-not-allowed" : ""
              }`}
              type="submit"
            >
              <span className={`material-symbols-outlined text-xl ${isSubmitting ? "animate-spin" : ""}`}>
                {isSubmitting ? "progress_activity" : "save"}
              </span>
              <span>
                {isSubmitting
                  ? "সংরক্ষণ হচ্ছে..."
                  : editingMedicine
                  ? "আপডেট সংরক্ষণ করুন"
                  : "সংরক্ষণ করুন (Save Medicine)"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
