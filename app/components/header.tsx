import { Link, NavLink, useNavigate } from "@remix-run/react";
import { SearchIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";

function Header() {
  return (
    <>
      <div className="border-b border-primary">
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
            <SearchDialog />
          </div>
        </header>
      </div>
    </>
  );
}

const SearchDialog = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <>
      <Button
        size="sm"
        variant="secondary"
        className="rounded-full gap-2"
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
        Search
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        commandProps={{ shouldFilter: false, onSelect: () => setOpen(false) }}
      >
        <CommandInput
          placeholder="Type to search..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Anime">
            <SearchResultItem
              id={51019}
              pictureUrl="https://cdn.myanimelist.net/images/anime/1765/135099.jpg"
              title="Kimetsu no Yaiba: Katanakaji no Sato-hen"
              titleEnglish="Demon Slayer: Kimetsu no Yaiba Swordsmith Village Arc"
              episodeLength={24}
              releaseYear={2023}
              resultType="anime"
              type="TV"
              setOpen={setOpen}
            />
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Manga">
            <CommandItem>
              <span>dasdas</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

interface SearchResultItemProps {
  id: number;
  title: string;
  titleEnglish: string;
  pictureUrl: string;
  type: string;
  releaseYear: number;
  episodeLength: number;
  resultType: "manga" | "anime";
  setOpen: (open: boolean) => void;
}

const SearchResultItem = ({
  id,
  title,
  titleEnglish,
  pictureUrl,
  type,
  releaseYear,
  episodeLength,
  resultType,
  setOpen,
}: SearchResultItemProps) => {
  const navigate = useNavigate();

  const runCommand = useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen]
  );

  const link = resultType === "anime" ? `/anime/${id}` : `/manga/${id}`;

  return (
    <CommandItem
      value={id.toString()}
      asChild
      onSelect={() => runCommand(() => navigate(link))}
    >
      <span className="flex gap-3">
        <img
          src={pictureUrl}
          alt=""
          className="w-14 h-20 object-cover rounded-sm bg-background/20"
        />
        <span className="flex flex-col">
          <span className="text-base sm:text-lg line-clamp-1">{title}</span>
          <span className="text-muted-foreground text-sm sm:text-base line-clamp-1">
            {titleEnglish}
          </span>
          <span className="mt-2 text-muted-foreground font-medium flex gap-2">
            <span>{releaseYear}</span>
            <span>|</span>
            <span>{type}</span>
            <span>|</span>
            <span>{episodeLength}m</span>
          </span>
        </span>
      </span>
    </CommandItem>
  );
};

export default Header;
