import { ISource } from "./source";

export type DigestConfig = {
    title: string;
    path: string;
    sources: string[];
    since: () => Date;
};

export interface IDigest {
    sources: ISource[];
    title: string;
    path: string;
    since: Date;
};
