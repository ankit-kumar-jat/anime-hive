import { Link, NavLink } from "@remix-run/react";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";

function Header() {
  return (
    <div className="border-b border-orange-400">
      <header className="container py-2 md:py-4 gap-2 flex md:gap-4 items-center justify-between flex-wrap">
        <h1>
          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold whitespace-nowrap font-serif"
          >
            Anime Hive
          </Link>
        </h1>
        <div className="flex gap-2 sm:gap-6 items-center -ml-2 justify-between w-full sm:w-auto">
          <nav className="flex sm:gap-6">
            <NavLink className="p-2 font-medium" to="/">
              Home
            </NavLink>
            <NavLink className="p-2 font-medium" to="/anime">
              Anime
            </NavLink>
            <NavLink className="p-2 font-medium" to="/manga">
              Manga
            </NavLink>
          </nav>
          <Button size="sm" variant="secondary" className="rounded-full gap-2">
            <SearchIcon />
            Search
          </Button>
        </div>
      </header>
    </div>
  );
}

export default Header;
