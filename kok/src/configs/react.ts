import type { DigestConfig } from "../types/digest";

const sources: string[] = [
    "https://github.com/facebook/react/releases.atom",
    "https://overreacted.io/rss.xml",
    "https://devblogs.microsoft.com/typescript/feed/",
    "https://github.com/microsoft/TypeScript/releases.atom",
];

export const reactWeekly: DigestConfig = {
    sources,
    title: "React Weekly",
    path: "react/weekly",
};
