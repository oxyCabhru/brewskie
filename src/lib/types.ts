import Base64 from "crypto-js/enc-base64";
import sha256 from "crypto-js/sha256";

export const dedup = (arr: any[]): any[] => {
    return Array.from(new Set(arr));
}

export function hash(content: any) {
    return Base64.stringify(
            sha256(JSON.stringify(content))
        )
        .substring(0,8);
}

export enum BrewType {
    Cask = "cask",
    Formula = "formula",
}

export type RecCat<T extends "stream" | "static"> = {
        category: string;
        ionicon_html: string;
        toggle_all?: boolean;
} & (T extends "static" ?
    {
        brews: {
        token: string;
        type: string;
            description: string;
        }[];
    }
    :
    {
        brews: Promise<BrewMetadata>[];
    }
    )


export type InstallItem<T extends BrewType> = {
    number: number;
    count: string;
    percent: string;
} & (T extends BrewType.Cask ?
    {
        cask: string;
        formula?: never;
    }
    :
    {
        cask?: never;
        formula: string;
    }
    )


export type Installs<T extends BrewType> = {
    total_items: number,
    start_date: string,
    end_date: string,
    total_count: number,
} & (T extends BrewType.Cask ?
    {
        category: "cask_install";
        items: InstallItem<BrewType.Cask>[]
    }
    :
    {
        category: "formula_install_on_request";
        items: InstallItem<BrewType.Formula>[]
    }
    )

export type BrewMetadata = {
    icon?: string, //base64 of the image
    type: BrewType,
    display_name: string,
    token: {
        raw: string,
        sanitized: string,
    },
    homepage: string,
    installs: string,
    description: string,
}

export type SelectedBrews = {
    casks: string[],
    formulae: string[],
}