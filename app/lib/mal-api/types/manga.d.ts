import {
  AlternativeTitles,
  AnimeBase,
  AnimeNsfwState,
  Genre,
  PagingOptions,
  Picture,
  Recommendation,
  Related,
  ResponsePaging,
} from ".";

export type MangaMediaType =
  | "unknown"
  | "manga"
  | "novel"
  | "one_shot"
  | "doujinshi"
  | "manhwa"
  | "manhua"
  | "oel";

export type MangaStatus =
  | "finished"
  | "currently_publishing"
  | "not_yet_published";

export type MangaRankingType =
  | "all" //	All
  | "manga" //	Top Manga
  | "novels" //	Top Novels
  | "oneshots" //	Top One-shots
  | "doujin" //	Top Doujinshi
  | "manhwa" //	Top Manhwa
  | "manhua" //	Top Manhua
  | "bypopularity" //	Most Popular
  | "favorite"; //	Most Favorited

export type MangaAuthor = {
  id: number;
  first_name: string;
  last_name: string;
};

export type MangaAuthors = {
  node: MangaAuthor;
  role: string;
}[];

export type MangaSerialization = {
  node: {
    id: string;
    name: string;
  };
  role: string;
};

export type MangaBase = {
  id: number;
  title: string;
  main_picture: Picture | null;
};
export type MangaBaseField = keyof MangaBase;

export type MangaInList = MangaBase & {
  alternative_titles: AlternativeTitles;
  start_date: string | null;
  end_date: string | null;
  synopsis: string | null;
  mean: number | null;
  rank: number | null;
  popularity: number | null;
  num_list_users: number;
  num_scoring_users: number;
  nsfw: AnimeNsfwState | null;
  genres: Genre[];
  created_at: string;
  updated_at: string;
  media_type: MangaMediaType;
  status: MangaStatus;
  num_volumes: number;
  num_chapters: number;
  authors: MangaAuthors;
};

export type MangaInListField = keyof MangaInList;

export type Manga = MangaInList & {
  pictures: Picture[];
  background: string | null;
  related_anime: Related<AnimeBase>[];
  related_manga: Related<MangaBase>[];
  recommendations: Recommendation<MangaBase>[];
  serialization: MangaSerialization[];
};

export type MangaField = keyof Manga;

export type GetMangaSearchResultsOptions<T> = PagingOptions & {
  q: string;
  fields?: T[];
};

export type GetMangaSearchResultsResponse<K extends MangaFieldInList[]> = {
  data: {
    node: MangaBase & Pick<MangaInList, K[number]>;
  }[];
  paging: ResponsePaging;
};

export type GetMangaByRankingOptions<T> = PagingOptions & {
  ranking_type: MangaRankingType;
  fields?: T[];
};

export type GetMangaByRankingResponse<K extends MangaInListField[]> = {
  data: {
    node: MangaBase & Pick<MangaInList, K[number]>;
    ranking: Ranking;
  }[];
  paging: ResponsePaging;
};

export type GetMangaOptions<T> = {
  mangaId: number;
  fields?: T[];
};

export type GetMangaResponse<K extends MangaField[]> = MangaBase &
  Pick<Manga, K[number]>;
