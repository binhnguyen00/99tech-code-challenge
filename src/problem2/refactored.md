# Refactor Code
### 💡 Detailed explanation is in the code block.

```typescript
import React from "react";
import { BoxProps } from "@components/common";
import { WalletRow } from "@components/WalletRow";
import { useWalletBalances, usePrices } from "@hooks";

import classes from "./WalletPage.module.css";

/** add this for type safety */
enum Blockchain {
  OSMOSIS   = 'Osmosis',
  ETHEREUM  = 'Ethereum',
  ARBITRUM  = 'Arbitrum',
  ZILLIQA   = 'Zilliqa',
  NEO       = 'Neo'
}

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain; // add property
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  priority: number; // add property
}

/** remove, use BoxProps
- ```Props``` extends ```BoxProps``` but has no properties
*/
const WalletPage: React.FC<BoxProps> = (props: BoxProps) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: Blockchain): number => {
    switch (blockchain) {
      case Blockchain.OSMOSIS:
        return 100
      case Blockchain.ETHEREUM:
        return 50
      case Blockchain.ARBITRUM:
        return 30
      case Blockchain.ZILLIQA:
        return 20
      case Blockchain.NEO:
        return 20
      default:
        return -99
    }
  }

  /** clean code
   * 1. add type safety
   * 2. prioritize first, avoid unnecessary getPriority() called in sort().
   * 3. filter out invalid balances, remove if nesting.
   * 4. sort() didn't return 0. add equal case.
   * 5. remove ```prices``` dependency. ```prices``` is being used in ```rows```, to calculate ```usdValue``` 
   * and has nothing to do with ```formattedBalances```
  */
  const formattedBalances: FormattedWalletBalance[] = React.useMemo(() => {
    const prioritized: FormattedWalletBalance[] = balances.map((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain); // WalletBalance has no ```blockchain``` property
      return {
        ...balance,
        formatted: balance.amount.toFixed(2),
        priority: balancePriority,
      };
    });
    const filtered = prioritized.filter((balance: FormattedWalletBalance) => {
      if (balance.priority > -99 && balance.amount <= 0) {
        return true;
      }
      return false;
    });
    const sorted = filtered.sort((lhs: FormattedWalletBalance, rhs: FormattedWalletBalance) => {
      if (lhs.priority > rhs.priority) return -1;
      if (lhs.priority < rhs.priority) return 1;
      return 0;
    });
    return sorted;
  }, [ balances ]);

  /** 
   * remove ```sortedBalances```. replace with ```formattedBalances``` 
   * balance.amount is being used twice. define ```rawBalance```.
  */
  const rows: React.ReactNode[] = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const rawBalance = balance.amount; 
    const usdValue = prices[balance.currency] * rawBalance;
    return (
      <WalletRow
        key={`${balance.currency}-${balance.blockchain}`}
        className={classes.row}
        amount={rawBalance}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    {/* unsafe {...rest} props */}
    <div {...rest}>
      {rows}
    </div>
  )
}
```