import type { Feed, FeedItem } from "../types/feed";

export class MarkdownFormatter {
    getFrontMatter(title: string, createdAt: Date): string {
        return [
            "---",
            `title: "${title}"`,
            `date: ${createdAt.toISOString()}`,
            "---\n",
        ].join("\n");
    }

    getFeedText(feed: Feed) {
        let text = `\n## ${feed.title}\n\n`;

        for (const item of feed.items) {
            text += `- ${this.formatItem(item)}\n`;
        }

        return text;
    }

    protected formatItem(item: FeedItem) {
        let text = `[${item.title}](${item.link})`;

        if (item.pubDate) {
            const date = new Date(item.pubDate)
                .toISOString()
                .slice(0, 10)
                .split("-")
                .reverse()
                .join(".");

            text += ` on ${date}`;
        }

        if (item.creator) {
            text += ` by ${item.creator}`;
        }

        return text;
    }
}
