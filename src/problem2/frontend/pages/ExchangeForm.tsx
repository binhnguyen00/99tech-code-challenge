import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectItem } from "@heroui/select";
import { NumberInput, Spinner, Button } from "@heroui/react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { ArrowRightLeft, TrendingUp, Zap } from "lucide-react";

async function searchCurrencies() {
  const response = await axios.get("http://localhost:8080/currency/search", {
    headers: {
      Accept: "application/json; charset=utf-8"
    }
  });
  return response.data;
}

export function ExchangeForm() {
  const { data: response, isLoading, isError, refetch } = useQuery({
    queryKey: ["currencies"],
    queryFn: searchCurrencies,
    retry(failureCount: number, error) {
      return failureCount < 3;
    },
    retryDelay: 1000,
  });

  const [fromCurr, setFromCurr] = React.useState<string>("BTC");
  const [toCurr, setToCurr] = React.useState<string>("ETH");
  const [fromAmount, setFromAmount] = React.useState<number>(0);
  const [toAmount, setToAmount] = React.useState<number>(0);

  const swapCurrencies = () => {
    setFromCurr(toCurr);
    setToCurr(fromCurr);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleExchange = () => {
    // Exchange logic here
    console.log(`Converting ${fromAmount} ${fromCurr} to ${toCurr}`);
  };

  return (
    <div className="w-full mx-auto space-y-4">

      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap className="h-6 w-6 text-warning" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Crypto Exchange
          </h2>
        </div>
        <p className="text-default-500">Trade cryptocurrencies instantly with real-time rates</p>
      </div>

      <div className="relative space-y-4 space-x-4">
        <div className="flex flex-col lg:flex-row space-y-4 space-x-4">
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">From</span>
              </div>
            </CardHeader>

            {isLoading ? (
              <CardBody className="flex items-center justify-center py-12">
                <Spinner size="lg" color="primary" />
              </CardBody>
            ) : (
              <CardBody className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Select
                    label="Currency"
                    selectedKeys={[fromCurr]}
                    className="w-full md:w-1/2"
                    color="primary"
                    onChange={(e) => setFromCurr(e.target.value)}
                    startContent={
                      <div className="w-6 h-6 rounded-full">
                        {fromCurr.charAt(0)}
                      </div>
                    }
                  >
                    {response?.data?.map((currency: string) => (
                      <SelectItem key={currency}>
                        <div className="flex items-center gap-2">
                          {currency}
                        </div>
                      </SelectItem>
                    ))}
                  </Select>

                  <NumberInput
                    label="Amount"
                    variant="bordered"
                    placeholder="0.00"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(Number(e))}
                  />
                </div>

                {fromAmount && (
                  <div className="text-xs text-default-400 bg-default-50 dark:bg-default-900/20 rounded-lg p-2">
                    ≈ $0.00 USD
                  </div>
                )}
              </CardBody>
            )}
          </Card>

          <div className="flex lg:flex-col items-center justify-center lg:py-8">
            <Button
              isIconOnly
              color="primary"
              variant="shadow"
              onPress={swapCurrencies}
              className="hover:scale-110 transition-transform duration-200 rotate-90 lg:rotate-0"
            >
              <ArrowRightLeft className="h-5 w-5" />
            </Button>
          </div>

          <Card className="flex-1">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">To</span>
              </div>
            </CardHeader>

            {isLoading ? (
              <CardBody className="flex items-center justify-center py-12">
                <Spinner size="lg" color="secondary" />
              </CardBody>
            ) : (
              <CardBody className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Select
                    label="Currency"
                    selectedKeys={[toCurr]}
                    className="w-full md:w-1/2"
                    variant="bordered"
                    color="secondary"
                    onChange={(e) => setToCurr(e.target.value)}
                    startContent={
                      <div className="w-6 h-6 rounded-full">
                        {toCurr.charAt(0)}
                      </div>
                    }
                  >
                    {response?.data?.map((currency: string) => (
                      <SelectItem key={currency}>
                        <div className="flex items-center gap-2">
                          {currency}
                        </div>
                      </SelectItem>
                    ))}
                  </Select>

                  <NumberInput
                    label="Amount"
                    variant="bordered"
                    placeholder="0.00"
                    value={toAmount}
                    onChange={(e) => setToAmount(Number(e))}
                  />
                </div>

                {toAmount && (
                  <div className="text-xs text-default-400 bg-default-50 dark:bg-default-900/20 rounded-lg p-2">
                    ≈ $0.00 USD
                  </div>
                )}
              </CardBody>
            )}
          </Card>
        </div>

        <div className="flex justify-center">
          <Button
            color="primary"
            className="px-8 font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
            onPress={handleExchange}
            isDisabled={!fromAmount || !fromCurr || !toCurr || isLoading}
          >
            <Zap className="h-4 w-4 mr-2" />
            Exchange
          </Button>
        </div>

        {isError && (
          <Card className="mt-4 border-danger-200 bg-danger-50 dark:bg-danger-900/20">
            <CardBody className="text-center py-4">
              <p className="text-danger text-sm">Failed to load currencies</p>
              <Button size="sm" variant="light" color="danger" onPress={() => refetch()}>
                Retry
              </Button>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}