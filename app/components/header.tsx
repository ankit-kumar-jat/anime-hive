import { Link, NavLink } from "@remix-run/react";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandLoading,
} from "~/components/ui/command";

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
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
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full gap-2"
              onClick={() => setOpen(true)}
            >
              <SearchIcon />
              Search
            </Button>
          </div>
        </header>
      </div>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        commandProps={{ shouldFilter: false }}
      >
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          {<CommandLoading>Hang on…</CommandLoading>}
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Anime">
            <CommandItem>
              <span>Calendar</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Manga">
            <CommandItem>
              <span>Calendar</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default Header;
