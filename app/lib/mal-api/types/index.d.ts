export type RelationType =
  | "sequel"
  | "prequel"
  | "alternative_setting"
  | "alternative_version"
  | "side_story"
  | "parent_story"
  | "summary"
  | "full_story";

export type AlternativeTitles = {
  en: string;
  ja: string;
  synonyms: Array<string>;
};

export type AnimeNsfwState =
  | "white" // This work is safe for work
  | "gray" // This work may be not safe for work
  | "black"; // This work is not safe for work

export type Genre = {
  id: number;
  name: string;
};

export type Picture = {
  large: string | null; // An absulute URL to the high(er) resolution picture
  medium: string; // An absulute URL to the medium resolution picture
};

export type Related<T> = {
  node: T;
  relation_type: RelationType;
  relation_type_formatted: string;
};

export type Recommendation<T> = {
  node: T;
  num_recommendations: numbers;
};

export type PagingOptions = {
  limit?: number;
  offset?: number;
};

export type ResponsePaging = {
  previous: string;
  next: string;
};

export * from "./anime";
export * from "./manga";
