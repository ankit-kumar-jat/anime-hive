import { Timings } from "~/lib/timing.server";
import { cachified, cache } from "~/lib/cache.server";
import { apiClient } from "./api-client.server";
import {
  AnimeField,
  AnimeFieldInList,
  GetAnimeByRankingOptions,
  GetAnimeByRankingResponse,
  GetAnimeBySeasonOptions,
  GetAnimeOptions,
  GetAnimeResponse,
  GetAnimeSearchResultsOptions,
  GetAnimeSearchResultsResponse,
} from "./types";

// ============================================================================
// Get Anime Search Results
// ============================================================================

function getAnimeSearchResultsCacheKey<T extends AnimeFieldInList>({
  q,
  limit,
  offset,
  fields,
}: GetAnimeSearchResultsOptions<T>) {
  const keyArray = ["anime:search", q, limit, offset];
  if (fields?.length) keyArray.push(fields.toString());
  return keyArray.join("::");
}

export function getAnimeSearchResults<T extends AnimeFieldInList>({
  timings,
  q,
  limit = 50,
  offset = 0,
  fields = [],
}: GetAnimeSearchResultsOptions<T> & {
  timings?: Timings;
}) {
  const key = getAnimeSearchResultsCacheKey({
    q,
    limit,
    offset,
    fields,
  });

  return cachified({
    key,
    cache,
    timings,
    getFreshValue: () => {
      return apiClient<GetAnimeSearchResultsResponse<typeof fields>>({
        endpoint: "/anime",
        query: {
          q,
          limit,
          offset,
          fields,
        },
      });
    },
    // Time To Live (ttl) in milliseconds: the cached value is considered valid for 24 hours
    ttl: 1000 * 60 * 60 * 24,
    // Stale While Revalidate (swr) in milliseconds: if the cached value is less than 30 days
    // expired, return it while fetching a fresh value in the background
    staleWhileRevalidate: 1000 * 60 * 60 * 24 * 7,
  });
}

// ============================================================================
// Get Anime By Ranking
// ============================================================================

function getAnimeByRankingCacheKey<T extends AnimeFieldInList>({
  ranking_type,
  limit,
  offset,
  fields,
}: GetAnimeByRankingOptions<T>) {
  const keyArray = ["anime:ranking", ranking_type, limit, offset];
  if (fields?.length) keyArray.push(fields.toString());
  return keyArray.join("::");
}

export function GetAnimeByRanking<T extends AnimeFieldInList>({
  timings,
  ranking_type,
  limit = 50,
  offset = 0,
  fields = [],
}: GetAnimeByRankingOptions<T> & {
  timings?: Timings;
}) {
  const key = getAnimeByRankingCacheKey({
    ranking_type,
    limit,
    offset,
    fields,
  });

  return cachified({
    key,
    cache,
    timings,
    getFreshValue: () => {
      return apiClient<GetAnimeByRankingResponse<typeof fields>>({
        endpoint: "/anime/ranking",
        query: {
          ranking_type,
          limit,
          offset,
          fields,
        },
      });
    },
    // Time To Live (ttl) in milliseconds: the cached value is considered valid for 24 hours
    ttl: 1000 * 60 * 60 * 24,
    // Stale While Revalidate (swr) in milliseconds: if the cached value is less than 30 days
    // expired, return it while fetching a fresh value in the background
    staleWhileRevalidate: 1000 * 60 * 60 * 24 * 7,
  });
}

// ============================================================================
// Get Anime By Season
// ============================================================================

function getAnimeBySeasonCacheKey<T extends AnimeFieldInList>({
  season,
  year,
  limit,
  offset,
  fields,
  sort,
}: GetAnimeBySeasonOptions<T>) {
  const keyArray = ["anime:season", season, year, limit, offset];
  if (sort) keyArray.push(sort);
  if (fields?.length) keyArray.push(fields.toString());
  return keyArray.join("::");
}

export function GetAnimeBySeason<T extends AnimeFieldInList>({
  timings,
  season,
  year,
  sort,
  limit = 50,
  offset = 0,
  fields = [],
}: GetAnimeBySeasonOptions<T> & {
  timings?: Timings;
}) {
  const key = getAnimeBySeasonCacheKey({
    year,
    season,
    sort,
    limit,
    offset,
    fields,
  });

  return cachified({
    key,
    cache,
    timings,
    getFreshValue: () => {
      return apiClient<GetAnimeByRankingResponse<typeof fields>>({
        endpoint: `/anime/season/${year}/${season}`,
        query: {
          limit,
          offset,
          fields,
          sort,
        },
      });
    },
    // Time To Live (ttl) in milliseconds: the cached value is considered valid for 24 hours
    ttl: 1000 * 60 * 60 * 24,
    // Stale While Revalidate (swr) in milliseconds: if the cached value is less than 30 days
    // expired, return it while fetching a fresh value in the background
    staleWhileRevalidate: 1000 * 60 * 60 * 24 * 7,
  });
}

// ============================================================================
// Get Anime Detais
// ============================================================================

function getAnimeCacheKey<T extends AnimeField>({
  animeId,
  fields,
}: GetAnimeOptions<T>) {
  const keyArray = ["anime", animeId];
  if (fields?.length) keyArray.push(fields.toString());
  return keyArray.join("::");
}

export function getAnime<T extends AnimeField>({
  timings,
  animeId,
  fields = [],
}: GetAnimeOptions<T> & {
  timings?: Timings;
}) {
  const key = getAnimeCacheKey({
    animeId,
    fields,
  });

  return cachified({
    key,
    cache,
    timings,
    getFreshValue: () => {
      return apiClient<GetAnimeResponse<typeof fields>>({
        endpoint: `/anime/${animeId}`,
        query: {
          fields,
        },
      });
    },
    // Time To Live (ttl) in milliseconds: the cached value is considered valid for 24 hours
    ttl: 1000 * 60 * 60 * 24,
    // Stale While Revalidate (swr) in milliseconds: if the cached value is less than 30 days
    // expired, return it while fetching a fresh value in the background
    staleWhileRevalidate: 1000 * 60 * 60 * 24 * 7,
  });
}
