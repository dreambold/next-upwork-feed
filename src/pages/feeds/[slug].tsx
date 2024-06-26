import { FEEDS, getFeed } from "../../lib/rss";
import { format } from "date-fns";

export async function getStaticPaths() {
  return {
    paths: FEEDS.map((feed) => ({ params: { slug: feed.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const feed = FEEDS.find((feed) => feed.slug === params.slug);

  if (!feed) return;

  const detailedFeed = await getFeed(feed.url);

  return {
    props: {
      feed,
      items: detailedFeed.items,
    },
    revalidate: 1,
  };
}

export default function Feed({ feed, items }: any) {
  console.log(feed, items)
  return (
    <div>
      {/* <h1 style={{ color: 'green' }} className="font-bold text-5xl mb-12 text-center">{feed.title}</h1> */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-1 p-5" style={{ padding: '70px' }}>
          {items.map((item: any, index: number) => (
            <a
              key={index}
              className="block p-4 border border-gray-200 hover:border-gray-500 rounded-lg"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.enclosure?.url && (<img src={item.enclosure.url} alt={item.title} />)}
              <h3 className="font-bold">{item.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
              <div>
                {Math.floor((new Date().getTime() - new Date(item.isoDate).getTime()) / (1000 * 60 * 60 * 24))} Days{' '}
                {Math.floor((new Date().getTime() - new Date(item.isoDate).getTime()) % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))} Hours{' '}
                {Math.floor((new Date().getTime() - new Date(item.isoDate).getTime()) % ((1000 * 60 * 60)) / (1000 * 60))} Minutes ago</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
