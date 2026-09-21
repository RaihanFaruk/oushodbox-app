import MedicineDetailContainer from "@/components/medicine/MedicineDetailContainer";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MedicineDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <MedicineDetailContainer id={id} />;
}
