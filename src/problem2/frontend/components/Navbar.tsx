import {
  Navbar as HeroUINavbar,
  NavbarBrand, NavbarContent, NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";

export function Navbar() {
  return (
    <HeroUINavbar className="flex flex-row justify-items-start" maxWidth="xl" position="sticky">
      <NavbarBrand className="gap-3 max-w-fit">
        <Link color="primary" href="/">Swap Currency</Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4">
        <NavbarItem>
          <Link color="foreground" href="/exchanges">
            Exchanges
          </Link>
        </NavbarItem>
      </NavbarContent>

    </HeroUINavbar>
  );
}