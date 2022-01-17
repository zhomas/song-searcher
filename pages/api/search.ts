import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { handler } from "../../features/search/search.api";
import { type } from "os";

export type SearchQuery = {
  term: string;
  page: string;
};

interface SearchRequest extends NextApiRequest {
  query: SearchQuery;
}

interface ITunesResponse {
  artistName: "Arctic Monkeys";
  trackName: "Who the Fuck Are Arctic Monkeys?";
  artworkUrl100: "https://is2-ssl.mzstatic.com/image/thumb/Music49/v4/c2/9f/17/c29f17c3-e9db-8bad-de23-b9f9c15542e5/source/100x100bb.jpg";
}

function isSearchQuery(x: NextApiRequest): x is SearchRequest {
  const q = x as SearchRequest;

  if ("term" in q.query && "page" in q.query) {
    return true;
  }

  return false;
}

export default handler;
