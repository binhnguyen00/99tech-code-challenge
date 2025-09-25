import { Zap } from "lucide-react";
import { Link } from "@heroui/link";
import { Navbar as HeroUINavbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";

export function Navbar() {
  return (
    <HeroUINavbar className="flex flex-row justify-items-start" maxWidth="xl" position="sticky">
      <NavbarBrand className="gap-3 max-w-fit">
        <div className="rounded-full bg-gradient-to-r from-primary to-secondary p-3">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <Link color="primary" href="/" className="text-xl font-bold"> Crypto </Link>
      </NavbarBrand>

      <NavbarContent className="sm:flex gap-4">
        <NavbarItem>
          <Link color="foreground" href="/exchanges">
            Exchanges
          </Link>
        </NavbarItem>
      </NavbarContent>

    </HeroUINavbar>
  );
}