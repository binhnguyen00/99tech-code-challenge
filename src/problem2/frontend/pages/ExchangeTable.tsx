import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Card, CardBody } from "@heroui/card";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";

async function searchExchanges() {
  const response = await axios.get("http://localhost:8080/exchange/search")
  return response.data
}

export function ExchangeTable() {
  const { data: response, isLoading, isError, refetch } = useQuery({
    queryKey: ["exchanges"],
    queryFn: searchExchanges,
    retry(failureCount: number, error) {
      return failureCount < 3
    },
    retryDelay: 1000,
  })

  if (isLoading) {
    return (
      <Card fullWidth className="flex items-center justify-center p-10">
        <CardBody>
          <Spinner size="lg" label="Loading exchanges..." />
        </CardBody>
      </Card>
    )
  }

  if (isError || !response.success) {
    return (
      <Card fullWidth className="flex items-center justify-center p-10">
        <CardBody className="flex flex-col gap-4 items-center">
          <div className="text-center text-red-500 font-bold">
            Error fetching exchanges
          </div>
          <Button fullWidth={false} color="primary" onClick={() => refetch()}>
            Retry
          </Button>
        </CardBody>
      </Card>
    )
  }

  const currencies: Array<any> = response.data

  return (
    <Table
      aria-label="Exchange Table"
      isVirtualized
      maxTableHeight={300}
      rowHeight={70}
      selectionMode="single"
      color="primary"
    >
      <TableHeader>
        <TableColumn>Currency</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>Date</TableColumn>
      </TableHeader>
      <TableBody isLoading={isLoading}>
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