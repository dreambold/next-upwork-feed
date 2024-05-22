import Parser from "rss-parser";

type Feed = {
  slug: string;
  title: string;
  url: string;
}

export const FEEDS: Feed[] = [
  {
    slug: "vg",
    title: "VG",
    url: "https://www.vg.no/rss/feed",
  },
  {
    slug: "nrk",
    title: "NRK Topp Saker",
    url: "https://www.nrk.no/toppsaker.rss",
  },
  {
    slug: "upwork",
    title: "Upwork US Only",
    url: "https://www.upwork.com/ab/feed/jobs/rss?category2_uid=531770282580668418&paging=0-500&sort=recency&user_location_match=1&api_params=1"
  }
];

export async function getFeed(feedUrl: string) {
  const parser = new Parser();

  const feed = await parser.parseURL(feedUrl);

  return feed;
}