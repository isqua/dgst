import { weekAgo } from "../lib/date.js";
import type { DigestConfig } from "../types/digest.js";

const sources: string[] = [
    "https://www.developerway.com/rss.xml",
    "http://antonz.ru/rss/",
    "http://bizikov.ru/posts/feed/",
    "http://glebkalinin.ru/atom.xml",
    "http://ilyabirman.ru/meanwhile/rss/",
    "http://nano.sapegin.ru/atom.xml",
    "http://softwaremaniacs.org/blog/feed/",
    "http://vsevolodustinov.ru/blog/rss/",
    "https://9dots.ru/feed/",
    "https://a11y-blog.dev/ru/feed.xml",
    "https://addyosmani.com/feed.xml",
    "https://arturpaikin.com/ru/blog-feed.xml",
    "https://bespoyasov.ru/rss.xml",
    "https://blog.logrocket.com/feed/",
    "https://bolknote.ru/rss/",
    "https://brucelawson.co.uk/feed/",
    "https://css-tricks.com/feed",
    "https://danis.one/rss/",
    "https://dxdt.ru/feed/",
    "https://feeds.feedburner.com/kizuruen",
    "https://forweb.dev/ru/blog/feed.xml",
    "https://github.blog/changelog/feed/",
    "https://github.blog/feed/",
    "https://kentcdodds.com/blog/rss.xml",
    "https://ksoftware.livejournal.com/data/atom",
    "https://lea.verou.me/feed.xml",
    "https://losko.ru/feed/",
    "https://mikeozornin.ru/blog/rss/",
    "https://p.umputun.com/index.xml",
    "https://powerwill.ru/index.xml",
    "https://rakhim.exotext.com/rss.xml",
    "https://ru.hexlet.io/blog.rss",
    "https://sapegin.me/atom.xml",
    "https://sergeykorol.ru/blog/feed/",
    "https://smashingmagazine.com/feed",
    "https://svelte.dev/blog/rss.xml",
    "https://timmarinin.net/notes/feed.rss",
    "https://tonsky.me/atom.xml",
    "https://vorushin.github.io/feed.xml",
    "https://vsevolodustinov.ru/blog/rss/",
    "https://www.youtube.com/feeds/videos.xml?channel_id=UChhw6DlKKTQ9mYSpTfXUYqA", // Starter Story
    "https://www.youtube.com/feeds/videos.xml?channel_id=UCLZ6-13n1-IzVGCSNYP_CSw", // Niche Pursuits
    "https://www.youtube.com/feeds/videos.xml?channel_id=UCOei1E1Vqq10S913OEqTWGw", // Podlodka
    "https://www.youtube.com/feeds/videos.xml?channel_id=UCKvaSxHH11xccltyc8IFXjA", // Oliur Online
    "https://www.youtube.com/feeds/videos.xml?channel_id=UC6YpkaZsAcAvPNt4rLiS7dg", // Frontend Engineer
    "https://www.youtube.com/feeds/videos.xml?channel_id=UCaTfYudJUVA8cV_But8KZVQ", // Pepelsbey Vadim Makeev
];

export const personalWeekly: DigestConfig = {
    sources,
    title: "Personal Weekly",
    path: "personal/weekly",
    since: weekAgo,
};
