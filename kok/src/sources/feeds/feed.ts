import Parser from "rss-parser";

import { FeedItem, FetchOptions, ISource } from "../../types";

export class FeedSource implements ISource {
    constructor(
        public readonly url: string,
        protected parser: Parser = new Parser(),
    ) { }

    async fetch({ since }: FetchOptions) {
        const feed = await this.parser.parseURL(this.url);

        const title = feed.title ?? this.url;

        const items = feed.items.filter(item => {
            if (!item.pubDate) {
                return false;
            }

            if (!since) {
                return true;
            }

            const pubDate = new Date(item.pubDate);

            return pubDate >= since && item.title && item.link;
        }) as FeedItem[];

        return {
            ...feed,
            title,
            items,
        };
    }
}
