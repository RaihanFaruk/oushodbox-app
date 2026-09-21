import { getMedicineById, buildMonographFromMedicine } from "@/lib/firestore/medicines";
import { getMedicineMonograph } from "@/lib/mock-data";
import MedicineDetailsClient from "@/components/medicine/MedicineDetailsClient";
import MedicineNotFound from "@/components/medicine/MedicineNotFound";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MedicineDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const medicine = await getMedicineById(id);

    if (medicine) {
      const monograph = buildMonographFromMedicine(medicine);
      return <MedicineDetailsClient monograph={monograph} />;
    }

    // Graceful fallback to mock monograph ONLY when Firestore is unavailable or record not in Firestore
    const mockMonograph = getMedicineMonograph(id);
    if (mockMonograph) {
      return <MedicineDetailsClient monograph={mockMonograph} />;
    }

    return <MedicineNotFound id={id} />;
  } catch (error) {
    console.warn(`[MedicineDetailPage] Failed to fetch medicine ${id} from Firestore:`, error);
    const mockMonograph = getMedicineMonograph(id);
    if (mockMonograph) {
      return <MedicineDetailsClient monograph={mockMonograph} />;
    }
    return <MedicineNotFound id={id} />;
  }
}
