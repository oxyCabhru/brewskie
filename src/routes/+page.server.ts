import { fetch_cask_api, fetch_formula_api } from "$lib/brew_sh.server";
import categories from "$lib/premade_brews";
import { BrewType } from "$lib/types";

export async function load() {
    const categories_stream = categories.map(category => {;
        return {
            category: category.category,
            ionicon_html: category.ionicon_html,
            toggle_all: category.toggle_all ||= false,
            brews: category.brews.map(brew => 
                {
                    return {
                        token: brew.token,
                        type: brew.type,
                        description: brew.description,
                        api: 
                            brew.type == BrewType.Cask
                            ? fetch_cask_api({ number: 0, count: "", percent: "", cask: brew.token })
                            : fetch_formula_api({ number: 0, count: "", percent: "", formula: brew.token })
                    }
                })
        }
    })

    return {
        categories_stream
    }
}