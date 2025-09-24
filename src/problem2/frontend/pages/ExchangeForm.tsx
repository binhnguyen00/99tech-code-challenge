import { NumberInput } from "@heroui/react";
import { Card, CardHeader, CardBody } from "@heroui/card";

export function ExchangeForm() {
  return (
    <div className="flex flex-row gap-4">
      <Card fullWidth>
        <CardHeader> From </CardHeader>
        <CardBody>
          <NumberInput formatOptions={{ style: "currency", currency: "USD" }} />
        </CardBody>
      </Card>
      <Card fullWidth>
        <CardHeader> To </CardHeader>
        <CardBody>
          <NumberInput formatOptions={{ style: "currency", currency: "USD" }} />
        </CardBody>
      </Card>
    </div>
  )
}