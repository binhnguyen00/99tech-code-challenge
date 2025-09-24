import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@heroui/spinner";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";

import { DefaultLayout } from "@/components/DefaultLayout";

const fetchCurrencies = async () => {
  const response = await axios.get("http://localhost:8080/currency")
  return response.data
}

export function ExchangeTable() {
  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies
  })

  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      </DefaultLayout>
    )
  }

  if (isError || !response.success) {
    return (
      <DefaultLayout>
        <div className="text-center text-red-500 font-bold">
          Error fetching currencies
        </div>
      </DefaultLayout>
    )
  }

  const currencies: Array<any> = response.data

  return (
    <Table
      aria-label="Exchange Table"
      isVirtualized
      maxTableHeight={300}
      rowHeight={70}
    >
      <TableHeader>
        <TableColumn>Currency</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>Date</TableColumn>
      </TableHeader>
      <TableBody>
        {currencies.map(currency => (
          <TableRow key={`${currency.currency}-${currency.price}`}>
            <TableCell>{currency.currency}</TableCell>
            <TableCell>{currency.price}</TableCell>
            <TableCell>{currency.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}