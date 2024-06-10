export type RelationType =
  | "sequel"
  | "prequel"
  | "alternative_setting"
  | "alternative_version"
  | "side_story"
  | "parent_story"
  | "summary"
  | "full_story";

export type PagingOptions = {
  limit?: number;
  offset?: number;
};

export type ResponsePaging = {
  previous: string;
  next: string;
};

export * from "./anime";
