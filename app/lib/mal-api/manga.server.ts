import { Timings } from "~/lib/timing.server";
import { cachified, cache } from "~/lib/cache.server";
import { apiClient } from "./api-client.server";
import {
  GetMangaByRankingOptions,
  GetMangaByRankingResponse,
  GetMangaOptions,
  GetMangaResponse,
  GetMangaSearchResultsOptions,
  GetMangaSearchResultsResponse,
  MangaField,
  MangaInListField,
} from "./types";

// ============================================================================
// Get Manga Search Results
// ============================================================================

function getMangaSearchResultsCacheKey<T extends MangaInListField>({
  q,
  limit,
  offset,
  fields,
}: GetMangaSearchResultsOptions<T>) {
  const keyArray = ["manga:search", q, limit, offset];
  if (fields?.length) keyArray.push(fields.toString());
  return keyArray.join("::");
}

export function getAnimeSearchResults<T extends MangaInListField>({
  timings,
  q,
  limit = 50,
  offset = 0,
  fields = [],
}: GetMangaSearchResultsOptions<T> & {
  timings?: Timings;
}) {
  const key = getMangaSearchResultsCacheKey({
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
      return apiClient<GetMangaSearchResultsResponse<typeof fields>>({
        endpoint: "/manga",
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
// Get Manga By Ranking
// ============================================================================

function getMangaByRankingCacheKey<T extends MangaInListField>({
  ranking_type,
  limit,
  offset,
  fields,
}: GetMangaByRankingOptions<T>) {
  const keyArray = ["manga:ranking", ranking_type, limit, offset];
  if (fields?.length) keyArray.push(fields.toString());
  return keyArray.join("::");
}

export function GetMangaByRanking<T extends MangaInListField>({
  timings,
  ranking_type,
  limit = 50,
  offset = 0,
  fields = [],
}: GetMangaByRankingOptions<T> & {
  timings?: Timings;
}) {
  const key = getMangaByRankingCacheKey({
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
      return apiClient<GetMangaByRankingResponse<typeof fields>>({
        endpoint: "/manga/ranking",
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
// Get Manga Detais
// ============================================================================

function getAnimeCacheKey<T extends MangaField>({
  mangaId,
  fields,
}: GetMangaOptions<T>) {
  const keyArray = ["manga", mangaId];
  if (fields?.length) keyArray.push(fields.toString());
  return keyArray.join("::");
}

export function getAnime<T extends MangaField>({
  timings,
  mangaId,
  fields = [],
}: GetMangaOptions<T> & {
  timings?: Timings;
}) {
  const key = getAnimeCacheKey({
    mangaId,
    fields,
  });

  return cachified({
    key,
    cache,
    timings,
    getFreshValue: () => {
      return apiClient<GetMangaResponse<typeof fields>>({
        endpoint: `/manga/${mangaId}`,
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
