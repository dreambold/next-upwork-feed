import Parser from "rss-parser";

type Feed = {
  slug: string;
  title: string;
  url: string;
}

export const FEEDS: Feed[] = [
  // {
  //   slug: "vg",
  //   title: "VG",
  //   url: "https://www.vg.no/rss/feed",
  // },
  // {
  //   slug: "nrk",
  //   title: "NRK Topp Saker",
  //   url: "https://www.nrk.no/toppsaker.rss",
  // },
  {
    slug: "upwork",
    title: "Upwork US Only",
    url: "https://www.upwork.com/ab/feed/jobs/rss?amount=80-&category2_uid=531770282580668418&hourly_rate=60-&paging=0-10&sort=recency&t=0%2C1&user_location_match=1&api_params=1&securityToken=d70daa0bd996b7e67c26c29734f4aba3ac68f4a81291e01d9416d2a65bf5b8e1fa08f21391b880f8f5fab6a10160793644ace6989c8f122a42a4d163ae64bd35&userUid=912475150783922176&orgUid=912475150788116481"
  }
];

export async function getFeed(feedUrl: string) {
  const parser = new Parser();

  const feed = await parser.parseURL(feedUrl);

  return feed;
}