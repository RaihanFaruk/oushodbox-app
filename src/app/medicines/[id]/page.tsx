/**
 * Medicine Details Monograph Page — /medicines/[id]
 *
 * Full migration from Stitch medicine_details/code.html.
 * ⚠️ DEMO / MOCK DATA ONLY — Not real medical advice.
 */

import { getMedicineMonograph } from "@/lib/mock-data";
import MedicineDetailsClient from "@/components/medicine/MedicineDetailsClient";
import MedicineNotFound from "@/components/medicine/MedicineNotFound";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MedicineDetailPage({ params }: PageProps) {
  const { id } = await params;
  const monograph = getMedicineMonograph(id);

  if (!monograph) {
    return <MedicineNotFound id={id} />;
  }

  return <MedicineDetailsClient monograph={monograph} />;
}
