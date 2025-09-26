import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody } from "@heroui/card";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";

type Currency = {
  currency: string;
  price: number;
  date: string;
}

type PricesResponse = {
  status: number;
  success: boolean;
  message: string;
  data: Currency[];
}

async function searchPrices(): Promise<PricesResponse> {
  const response = await axios.get<PricesResponse>("http://localhost:8080/prices/search", {
    headers: {
      Accept: "application/json; charset=utf-8"
    }
  });
  return response.data;
}

export function ExchangeTable() {
  const { data: response, isLoading, isError, refetch } = useQuery({
    queryKey: ["prices"],
    queryFn: searchPrices,
    retry: (failureCount: number) => failureCount < 3,
    retryDelay: 1000,
  });

  if (isLoading) {
    return (
      <Card fullWidth className="flex items-center justify-center p-10">
        <CardBody>
          <Spinner size="lg" label="Loading exchanges..." />
        </CardBody>
      </Card>
    );
  }

  if (isError || !response?.success || response?.status !== 200) {
    return (
      <Table aria-label="Example empty table">
        <TableHeader>
          <TableColumn>CURRENCY</TableColumn>
          <TableColumn>PRICE</TableColumn>
          <TableColumn>DATE</TableColumn>
        </TableHeader>
        <TableBody emptyContent={
          <>
            <div className="text-center text-danger">
              {isError ? "Failed to load exchanges" : response?.message}
            </div>
            <Button
              fullWidth={false}
              color="primary"
              variant="light"
              onPress={() => refetch()}
            >
              Retry
            </Button>
          </>
        }>
          {[]}
        </TableBody>
      </Table>
    );
  }

  const currencies: Currency[] = response.data || [];

  const formatPrice = (num: number) => {
    const formatter = new Intl.NumberFormat("en-US").format(num);
    return formatter;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Table
      aria-label="Exchange Table"
      classNames={{
        wrapper: "max-h-[400px]",
        th: "bg-default-100 text-default-600 font-semibold",
        td: "py-4",
        tr: "hover:bg-default-100"
      }}
    >
      <TableHeader>
        <TableColumn className="text-left">CURRENCY</TableColumn>
        <TableColumn className="text-left">PRICE</TableColumn>
        <TableColumn className="text-right">DATE</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        emptyContent={currencies.length === 0 ? "No currencies available" : undefined}
      >
        {currencies.map((currency: Currency, index: number) => (
          <TableRow key={`${currency.currency}-${currency.date}-${index}`}>
            <TableCell>
              <div className="flex flex-row justify-start items-center">
                <TokenAvatar currency={currency.currency} />
                <span className="font-bold text-lg text-blue-500">
                  {currency.currency}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-left">
              <span className="font-mono text-medium">
                {formatPrice(currency.price)}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <span className="text-sm text-default-500">
                {formatDate(currency.date)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function TokenAvatar({ currency, size = "sm" }: {
  currency: string,
  size?: "sm" | "md" | "lg"
}) {
  async function checkImageExists(currency: string): Promise<string | null> {
    const imageUrl = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`;
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' });
      return response.ok ? imageUrl : null;
    } catch {
      return null;
    }
  }

  const { data: imageUrl } = useQuery({
    queryKey: ["token-avatar", currency],
    queryFn: () => checkImageExists(currency),
    staleTime: Infinity,
    retry: false,
  });

  return (
    <Avatar
      src={imageUrl || undefined}
      size={size}
      className="mr-4"
      fallback={currency.slice(0, 2).toUpperCase()}
    />
  );
}