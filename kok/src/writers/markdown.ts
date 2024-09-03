import { createWriteStream } from "fs";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import { MarkdownFormatter } from "../formatters/markdown.js";
import type { DigestCache, IDigest } from "../types/digest";

export class MarkdownWriter {
    protected formatter = new MarkdownFormatter();
    constructor(protected contentDirectory: string) {}

    async generate(digest: IDigest, createdAt: Date): Promise<string> {
        const digestPath = this.resolveDigestPath(digest.path);
        const filePath = await this.resolveFilePath(digestPath, createdAt);

        await this.createDirectory(filePath);

        const oldCache = await this.readCache(digestPath);
        const newCache = await this.write(
            filePath,
            digest,
            oldCache,
            createdAt,
        );
        await this.writeCache(digestPath, newCache);

        return filePath;
    }

    protected resolveCacheFilePath(digestPath: string): string {
        return path.resolve(digestPath, "cache.json");
    }

    protected async readCache(digestPath: string): Promise<DigestCache> {
        try {
            const cache = await readFile(this.resolveCacheFilePath(digestPath));

            return JSON.parse(cache.toString());
        } catch (_) {
            return {};
        }
    }

    protected async writeCache(
        digestPath: string,
        cache: DigestCache,
    ): Promise<void> {
        try {
            await writeFile(
                this.resolveCacheFilePath(digestPath),
                JSON.stringify(cache, null, 2),
            );
        } catch (_) {}
    }

    protected async write(
        filePath: string,
        digest: IDigest,
        oldCache: DigestCache,
        createdAt: Date,
    ): Promise<DigestCache> {
        const fileStream = createWriteStream(filePath, { flags: "a" });

        fileStream.write(
            this.formatter.getFrontMatter(digest.title, createdAt),
        );

        const feeds = digest.fetchFeeds(oldCache);
        const newCache: DigestCache = {};

        for await (const feed of feeds) {
            if (feed.items.length > 0) {
                fileStream.write(this.formatter.getFeedText(feed));
                newCache[feed.source] = feed.items[0].link;
            } else {
                newCache[feed.source] = oldCache[feed.source];
            }
        }

        return new Promise((resolve) => {
            fileStream.end(() => resolve(newCache));
        });
    }

    protected resolveDigestPath(digestPath: string) {
        return path.resolve(this.contentDirectory, digestPath);
    }

    protected async resolveFilePath(
        digestPath: string,
        createdAt: Date,
    ): Promise<string> {
        const fileName = `${createdAt.toISOString().slice(0, 10).replace(/-/g, "/")}.md`;
        const filePath = path.resolve(digestPath, fileName);

        return filePath;
    }

    protected async createDirectory(filePath: string): Promise<string> {
        const dirname = path.dirname(filePath);

        await mkdir(dirname, { recursive: true });

        return dirname;
    }
}
