export type CaskInstalls = {
    category: "cask_install",
    total_items: number,
    start_date: string,
    end_date: string,
    total_count: number,
    items: {
        number: number;
        cask: string;
        count: string;
        percent: string;
    }[]
}
export type FormulaInstalls = {
    category: "formula_install_on_request",
    total_items: number,
    start_date: string,
    end_date: string,
    total_count: number,
    items: {
        number: number;
        formula: string;
        count: string;
        percent: string;
    }[]
}

export type ApiResponse = {
    display_name: string,
    token: string,
    homepage: string,
    installs: number,
    description: string,
}

export type SelectedBrews = {
    casks: string[],
    formulae: string[],
}