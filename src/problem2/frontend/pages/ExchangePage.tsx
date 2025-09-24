import { DefaultLayout } from "@/components/DefaultLayout";
import { ExchangeForm } from "@/pages/ExchangeForm";
import { ExchangeTable } from "@/pages/ExchangeTable";

export function ExchangePage() {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-4">
        <ExchangeTable />
        <ExchangeForm />
      </div>
    </DefaultLayout>
  )
}