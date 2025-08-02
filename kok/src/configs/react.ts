import { weekAgo } from "../lib/date.js";
import type { DigestConfig } from "../types/digest";

const sources: string[] = [
    "https://github.com/facebook/react/releases.atom",
    "https://overreacted.io/rss.xml",
    "https://github.com/reduxjs/redux/releases.atom",
    "https://github.com/reduxjs/redux-toolkit/releases.atom",
    "https://github.com/vitejs/vite/releases.atom",
    "https://github.com/vitest-dev/vitest/releases.atom",
    "https://github.com/testing-library/react-testing-library/releases.atom",
    "https://github.com/testing-library/dom-testing-library/releases.atom",
    "https://devblogs.microsoft.com/typescript/feed/",
    "https://github.com/microsoft/TypeScript/releases.atom",
    "https://github.com/nodejs/node/releases.atom",
    "https://chromereleases.googleblog.com/feeds/posts/default",
];

export const reactWeekly: DigestConfig = {
    sources,
    title: "React Weekly",
    path: "react/weekly",
    since: weekAgo,
};
