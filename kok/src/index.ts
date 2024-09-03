import path from "path";
import { digests } from "./configs/index.js";
import { today } from "./lib/date.js";
import { MarkdownWriter } from "./writers/markdown.js";
import { Digest } from "./sources/digest.js";

const contentDir = path.resolve(process.argv[2]);

async function main() {
    const createdAt = today();
    const writer = new MarkdownWriter(contentDir);

    for (const config of digests) {
        const digest = new Digest(config);

        await writer.generate(digest, createdAt);
    }
}

main();
