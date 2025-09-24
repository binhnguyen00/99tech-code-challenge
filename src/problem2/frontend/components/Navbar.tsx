import {
  Navbar as HeroUINavbar,
  NavbarBrand, NavbarContent, NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

export function Navbar() {
  return (
    <HeroUINavbar className="flex justify-between" maxWidth="xl" position="sticky">
      <NavbarBrand className="gap-3 max-w-fit">
        <Link color="foreground" href="/">Swap Currency</Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link color="foreground" href="/currency">
            Currency
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/exchange">
            Exchange
          </Link>
        </NavbarItem>
      </NavbarContent>

    </HeroUINavbar>
  );
}