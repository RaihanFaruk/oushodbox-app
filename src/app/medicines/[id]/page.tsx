import { getMedicineById, buildMonographFromMedicine } from "@/lib/firestore/medicines";
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

    if (!medicine) {
      return <MedicineNotFound id={id} />;
    }

    const monograph = buildMonographFromMedicine(medicine);
    return <MedicineDetailsClient monograph={monograph} />;
  } catch (error) {
    console.warn(`[MedicineDetailPage] Failed to fetch medicine ${id} from Firestore:`, error);
    return <MedicineNotFound id={id} />;
  }
}
