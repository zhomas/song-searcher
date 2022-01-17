import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { type } from "os";

export type SearchQuery = {
  term: string;
  page: string;
};

interface SearchRequest extends NextApiRequest {
  query: SearchQuery;
}

export interface ITunesResponse {
  artistName: string;
  trackName: string;
  artworkUrl100: string;
}

export type SearchResponse = {
  status: "ok" | "error";
  resultCount: number;
  results: ITunesResponse[];
};

function isSearchQuery(x: NextApiRequest): x is SearchRequest {
  const q = x as SearchRequest;

  if ("term" in q.query && "page" in q.query) {
    return true;
  }

  return false;
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse>
) {
  if (!isSearchQuery(req)) {
    return res
      .status(400)
      .json({ status: "error", resultCount: 0, results: [] });
  }

  const { query } = req;
  const page = parseInt(query.page) || 1;

  const url = `https://itunes.apple.com/search`;

  const response = await axios.get<SearchResponse>(url, {
    params: {
      term: query.term,
      limit: 10,
      offset: page * 10,
    },
  });

  const data = response.data;
  console.log(data);

  res.status(200).json({ ...data, status: "ok" });
}
