import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import path from "path";

import { MarkdownFormatter } from "../formatters/markdown";
import { IDigest } from "../types/digest";

export class MarkdownWriter {
    protected formatter = new MarkdownFormatter();
    constructor(
        protected contentDirectory: string,
    ) { }

    async generate(digest: IDigest, createdAt: Date): Promise<string> {
        const filePath = await this.getFilePath(digest.path, createdAt);

        await this.createDirectory(filePath);

        return this.write(filePath, digest, createdAt);
    }

    protected async write(filePath: string, digest: IDigest, createdAt: Date): Promise<string> {
        const fileStream = createWriteStream(filePath, { flags: 'a' });

        fileStream.write(this.formatter.getFrontMatter(digest.title, createdAt));

        for (const source of digest.sources) {
            const feed = await source.fetch({ since: digest.since });

            if (feed.items.length > 0) {
                fileStream.write(this.formatter.getFeedText(feed));
            }
        }

        return new Promise((resolve) => {
            fileStream.end(() => resolve(filePath));
        });
    }

    protected async getFilePath(digestPath: string, createdAt: Date): Promise<string> {
        const fileName = `${createdAt.toISOString().slice(0, 10).replace(/-/g, '/')}.md`;
        const filePath = path.resolve(this.contentDirectory, digestPath, fileName);

        return filePath;
    }

    protected async createDirectory(filePath: string): Promise<string> {
        const dirname = path.dirname(filePath);

        await mkdir(dirname, { recursive: true });

        return dirname;
    }
}
