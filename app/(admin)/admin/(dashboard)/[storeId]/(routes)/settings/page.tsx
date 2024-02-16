import { fetchStore } from "@/services/store";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";
import { SettingsTitle } from "./components/title";
import { UploadForm } from "./components/upload-form";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  // Get a store with the store id provided
  const store = await fetchStore(params.storeId);

  // if no store is found, then redirect the user to admin index
  if (!store) {
    redirect("/admin");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div>
          <SettingsTitle />
          <UploadForm store={store} />
          <SettingsForm store={store} />
        </div>
      </div>
    </div>
  );
}
