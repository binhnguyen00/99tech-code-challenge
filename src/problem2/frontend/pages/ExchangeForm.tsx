import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Card, CardBody } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { NumberInput, Spinner, Button } from "@heroui/react";
import { ArrowRightLeft, Zap } from "lucide-react";
import { TokenAvatar } from "@/pages/ExchangeTable";

type CurrencyResponse = {
  status: number;
  success: boolean;
  message: string;
  data: string[];
}

async function searchCurrencies() {
  const response = await axios.get<CurrencyResponse>("http://localhost:1234/currency/search", {
    headers: {
      Accept: "application/json; charset=utf-8"
    }
  });
  return response.data as CurrencyResponse;
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

  const [fromCurr, setFromCurr] = React.useState<string>("USD");
  const [toCurr, setToCurr] = React.useState<string>("ETH");
  const [fromAmount, setFromAmount] = React.useState<number>(0);
  const [toAmount, setToAmount] = React.useState<number>(0);
  const [fromRate, setFromRate] = React.useState<number>(0);
  const [toRate, setToRate] = React.useState<number>(0);
  const [exchangeLoading, setExchangeLoading] = React.useState<boolean>(false);

  const swapCurrencies = () => {
    setFromCurr(toCurr);
    setToCurr(fromCurr);
    setFromRate(0);
    setToRate(0);
    setToAmount(0);
  };

  const updatePrice = (currency: string, type: "from" | "to") => {
    if (type === "from") {
      setFromCurr(currency);
    } else {
      setToCurr(currency);
    }
    setToAmount(0);
    setFromRate(0);
    setToRate(0);
  };

  const exchange = async () => {
    setExchangeLoading(true);
    const response = await axios.post("http://localhost:1234/exchange", {
      from: fromCurr,
      to: toCurr,
      amount: fromAmount,
    });
    const result = response.data;
    if (result.success) {
      setToAmount(result.data["amount_out"]);
      setFromRate(result.data["amount_in_rate"]);
      setToRate(result.data["amount_out_rate"]);
    }
    setExchangeLoading(false);
  };

  const formatPrice = (num: number) => {
    const formatter = new Intl.NumberFormat("en-US").format(num);
    return formatter;
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
      </div>

      <div className="relative space-y-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">

          <Card className="flex-1" aria-label="Amount">
            <CardBody className="flex flex-col space-y-4">
              <div>
                <p className="text-sm text-gray-500"> Amount </p>
                <NumberInput
                  value={fromAmount} variant="underlined" size="lg" required
                  onChange={(e) => setFromAmount(Number(e))}
                  aria-label="Amount"
                />
              </div>

              <div className="flex flex-col">
                <div className="text-2xl font-semibold h-12 flex items-center">
                  {formatPrice(toAmount)} {toCurr}
                </div>
                <div className="text-sm text-gray-500">
                  {fromRate == 0 ? null : (
                    <> 1 {fromCurr} = {formatPrice(fromRate)} {toCurr} </>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {toRate == 0 ? null : (
                    <> 1 {toCurr} = {formatPrice(toRate)} {fromCurr} </>
                  )}
                </div>
              </div>

              <Button
                color="primary"
                className="h-12 font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
                onPress={exchange}
                isDisabled={!fromAmount || !fromCurr || !toCurr || isLoading}
                isLoading={exchangeLoading}
              >
                <Zap className="h-4 w-4 mr-2" />
                Exchange
              </Button>
            </CardBody>
          </Card>

          <div className="flex flex-1 md:flex-col md:space-y-2">
            <Card className="flex-1" aria-label="From Currency">
              <CardBody>
                {isLoading ? (
                  <>
                    <p className="text-sm text-gray-500"> From </p>
                    <Spinner size="sm" />
                  </>
                ) : !isError ? (
                  <>
                    <p className="text-sm text-gray-500"> From </p>
                    <Select
                      selectedKeys={[fromCurr]}
                      variant="underlined" size="lg" required
                      onChange={(e) => updatePrice(e.target.value, "from")}
                      placeholder="Currency"
                      aria-label="From Currency"
                      isLoading={isLoading} isClearable
                    >
                      {response!.data?.map((currency: string) => (
                        <SelectItem key={currency} textValue={currency}>
                          <div className="flex flex-row items-center">
                            <TokenAvatar currency={currency} />
                            <p className="text-lg font-semibold text-blue-500"> {currency} </p>
                          </div>
                        </SelectItem>
                      ))}
                    </Select>
                  </>
                ) : (
                  <Card>
                    <CardBody className="text-center flex flex-col items-center justify-center">
                      <p className="text-danger text-sm">Failed to load currencies</p>
                      <Button size="sm" className="w-fit" variant="light" color="primary" onPress={() => refetch()}>
                        Retry
                      </Button>
                    </CardBody>
                  </Card>
                )}
              </CardBody>
            </Card>

            <div className="flex items-center justify-center mx-2">
              <Button
                isIconOnly
                color="primary"
                onPress={swapCurrencies}
                className="hover:scale-110 transition-transform duration-200 rotate-0 md:rotate-90"
              >
                <ArrowRightLeft className="h-5 w-5" />
              </Button>
            </div>

            <Card className="flex-1" aria-label="To Currency">
              <CardBody>
                {isLoading ? (
                  <>
                    <p className="text-sm text-gray-500"> To </p>
                    <Spinner size="sm" />
                  </>
                ) : !isError ? (
                  <>
                    <p className="text-sm text-gray-500"> To </p>
                    <Select
                      selectedKeys={[toCurr]}
                      variant="underlined" size="lg" required
                      onChange={(e) => updatePrice(e.target.value, "to")}
                      placeholder="Currency"
                      aria-label="To Currency"
                      isLoading={isLoading} isClearable
                    >
                      {response!.data?.map((currency: string) => (
                        <SelectItem key={currency} textValue={currency}>
                          <div className="flex flex-row items-center">
                            <TokenAvatar currency={currency} />
                            <p className="text-lg font-semibold text-blue-500"> {currency} </p>
                          </div>
                        </SelectItem>
                      ))}
                    </Select>
                  </>
                ) : (
                  <Card>
                    <CardBody className="flex flex-col items-center justify-center">
                      <p className="text-danger text-sm">Failed to load currencies</p>
                      <Button size="sm" className="w-fit" variant="light" color="primary" onPress={() => refetch()}>
                        Retry
                      </Button>
                    </CardBody>
                  </Card>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}