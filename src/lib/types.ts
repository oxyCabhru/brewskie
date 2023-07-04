export enum BrewType {
    Cask = "cask",
    Formula = "formula",
}

export type Installs<T extends BrewType> = {
    total_items: number,
    start_date: string,
    end_date: string,
    total_count: number,
} & (T extends BrewType.Cask ?
    {
        category: "cask_install";
        items: {
            number: number;
            count: string;
            percent: string;
            cask: string;
            formula?: never;
        }[]
    }
    :
    {
        category: "formula_install_on_request";
        items: {
            number: number;
            count: string;
            percent: string;
            formula: string;
            cask?: never;
        }[]

    }
    )

export type BrewMetadata = {
    type: BrewType,
    display_name: string,
    token: string,
    homepage: string,
    installs: string,
    description: string,
}

export type SelectedBrews = {
    casks: string[],
    formulae: string[],
}