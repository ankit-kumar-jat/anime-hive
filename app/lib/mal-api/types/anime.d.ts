import { PagingOptions, RelationType, ResponsePaging } from ".";

export type AnimeMediaType =
  | "tv"
  | "ova"
  | "movie"
  | "special"
  | "ona"
  | "music"
  | "unknown";

export type AnimeNsfwState =
  | "white" // This work is safe for work
  | "gray" // This work may be not safe for work
  | "black"; // This work is not safe for work

export type AnimeStatus =
  | "finished_airing"
  | "currently_airing"
  | "not_yet_aired";

export type AnimeSource =
  | "other"
  | "original"
  | "manga"
  | "4_koma_manga"
  | "web_manga"
  | "digital_manga"
  | "novel"
  | "light_novel"
  | "visual_novel"
  | "game"
  | "card_game"
  | "book"
  | "picture_book"
  | "radio"
  | "music";

export type AnimeRating =
  | "g" //	G - All Ages
  | "pg" //	PG - Children
  | "pg_13" //	pg_13 - Teens 13 and Older
  | "r" //	R - 17+ (violence & profanity)
  | "r" // 	R+ - Profanity & Mild Nudity
  | "rx"; //	Rx - Hentai

export type Season =
  | "winter" //	January, February, March
  | "spring" //	April, May, June
  | "summer" //	July, August, September
  | "fall"; //	October, November, December

export type AnimeRankingType =
  | "all" //	Top Anime Series
  | "airing" //	Top Airing Anime
  | "upcoming" //	Top Upcoming Anime
  | "tv" //	Top Anime TV Series
  | "ova" //	Top Anime OVA Series
  | "movie" //	Top Anime Movies
  | "special" //	Top Anime Specials
  | "bypopularity" //	Top Anime by Popularity
  | "favorite"; //	Top Favorited Anime

export type AlternativeTitles = {
  en: string;
  ja: string;
  synonyms: Array<string>;
};

export type AnimeBroadcast = {
  day_of_the_week: string; // A lower-cased string of the day that the media is released in a week. E.g. thursday
  start_time?: string; // The time of the broadcast. E.g. 19:30
};

export type Genre = {
  id: number;
  name: string;
};

export type Picture = {
  large?: string; // An absulute URL to the high(er) resolution picture
  medium: string; // An absulute URL to the medium resolution picture
};

export type AnimeSeason = {
  season: Season;
  year: number; // The four digits integer representation of a year (E.g. 2002).
};

export type AnimeStudio = {
  id: number;
  name: string;
};

export type AnimeRecommendation = {
  node: Anime;
  num_recommendations: numbers;
};

export type RelatedAnime = {
  node: Anime;
  relation_type: RelationType;
  relation_type_formatted: string;
};

export type RelatedManga = {
  nodes: object;
  relation_type: RelationType;
  relation_type_formatted: string;
};

export type AnimeStatistics = {
  num_list_users: number;
  status: {
    watching: number;
    completed: number;
    on_hold: number;
    dropped: number;
    plan_to_watch: number;
  };
};

export type AnimeRanking = {
  rank: number;
  previous_rank: number | null;
};

export type AnimeBase = {
  id: number;
  title: string;
  main_picture: Picture | null;
};
export type AnimeBaseFields = keyof AnimeBase;

export type AnimeInList = AnimeBase & {
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
  media_type: AnimeMediaType;
  status: AnimeStatus;
  num_episodes: number;
  start_season: AnimeSeason | null;
  broadcast: AnimeBroadcast | null;
  source: AnimeSource | null;
  average_episode_duration: number | null;
  rating: AnimeRating | null;
  studios: AnimeStudio[];
};

export type AnimeFieldInList = keyof AnimeInList;

export type Anime = AnimeInList & {
  pictures: Picture[];
  related_anime: RelatedAnime[];
  recommendations: AnimeRecommendation[];
  statistics: AnimeStatistics | null;
};

export type AnimeField = keyof Anime;

export type GetAnimeSearchResultsOptions<T> = PagingOptions & {
  q: string;
  fields?: T[];
};

export type GetAnimeSearchResultsResponse<K extends AnimeFieldInList[]> = {
  data: {
    node: AnimeBase & Pick<AnimeInList, K[number]>;
  }[];
  paging: ResponsePaging;
};

export type GetAnimeByRankingOptions<T> = PagingOptions & {
  ranking_type: AnimeRankingType;
  fields?: T[];
};

export type GetAnimeByRankingResponse<K extends AnimeFieldInList[]> = {
  data: {
    node: AnimeBase & Pick<AnimeInList, K[number]>;
    ranking: Ranking;
  }[];
  paging: ResponsePaging;
};

export type GetAnimeBySeasonOptions<T> = PagingOptions & {
  year: number;
  season: Season;
  sort?: "anime_score" | "anime_num_list_users";
  fields?: T[];
};

export type GetAnimeBySeasonResponse<K extends AnimeFieldInList[]> = {
  data: {
    node: AnimeBase & Pick<AnimeInList, K[number]>;
  }[];
  paging: ResponsePaging;
};

export type GetAnimeOptions<T> = {
  animeId: number;
  fields?: T[];
};

export type GetAnimeResponse<K extends AnimeField[]> = AnimeBase &
  Pick<Anime, K[number]>;
