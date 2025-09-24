import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { NumberInput, Spinner } from "@heroui/react";
import { Card, CardHeader, CardBody } from "@heroui/card";

async function searchCurrencies() {
  const response = await axios.get("http://localhost:8080/currency/search")
  return response.data
}

export function ExchangeForm() {
  const { data: response, isLoading, isError, refetch } = useQuery({
    queryKey: ["currencies"],
    queryFn: searchCurrencies
  })

  return (
    <div className="flex flex-row gap-4">
      <Card fullWidth>
        <CardHeader> From </CardHeader>
        {isLoading ? (
          <CardBody>
            <Spinner size="sm" />
          </CardBody>
        ) : (
          <CardBody>
            <NumberInput aria-label="From" formatOptions={{ style: "currency", currency: "ETH" }} />
          </CardBody>
        )}
      </Card>
      <Card fullWidth>
        <CardHeader> To </CardHeader>
        {isLoading ? (
          <CardBody>
            <Spinner size="sm" />
          </CardBody>
        ) : (
          <CardBody>
            <NumberInput aria-label="To" formatOptions={{ style: "currency", currency: "ETH" }} />
          </CardBody>
        )}
      </Card>
    </div>
  )
}