import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@heroui/spinner";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";

import { DefaultLayout } from "@/components/DefaultLayout";

const fetchCurrencies = async () => {
  const response = await axios.get("http://localhost:8080/currency")
  return response.data
}

export function CurrencyTable() {
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
    <DefaultLayout>
      <Table aria-label="Currencies">
        <TableHeader>
          <TableColumn>Currency</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Price</TableColumn>
        </TableHeader>
        <TableBody>
          {currencies.map(currency => (
            <TableRow key={`${currency.currency}-${currency.price}`}>
              <TableCell>{currency.currency}</TableCell>
              <TableCell>{currency.date}</TableCell>
              <TableCell>{currency.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DefaultLayout>
  )
}