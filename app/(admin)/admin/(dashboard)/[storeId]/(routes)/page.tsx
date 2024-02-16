import { fetchStore } from "@/services/store";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  // Fetch store with store id
  const store = await fetchStore(params.storeId);

  return <div>dashboard page</div>;
}
