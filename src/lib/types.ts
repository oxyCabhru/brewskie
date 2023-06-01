export type CaskApiResponse = {
    token: string;
    full_token: string;
    old_tokens: string[];
    tap: string;
    name: string[];
    desc: string;
    homepage: string;
    url: string;
    url_specs: {
      verified?: string;
    };
    appcast: null | string;
    version: string;
    installed: null | any[];
    outdated: boolean;
    sha256: string;
    artifacts: {
      binary?: string[];
      postflight?: null;
      zap?: {
        trash: string[];
      }[];
      preflight?: null;
      app?: string[];
    }[];
    caveats: null | string;
    depends_on: Record<string, any>;
    conflicts_with: null | {
      cask: string[];
    };
    container: null | string;
    auto_updates: null | boolean;
    tap_git_head: string;
    languages: string[];
    ruby_source_path: string;
    ruby_source_checksum: {
      sha256: string;
    };
    variations: Record<string, {
      url: string;
      version: string;
      sha256: string;
    }>;
    analytics: {
      install: {
        "30d": Record<string, number>;
        "90d": Record<string, number>;
        "365d": Record<string, number>;
      };
    };
    generated_date: string;
  };
  
export type FormulaApiResponse = {
    name: string;
    full_name: string;
    tap: string;
    oldname: null;
    oldnames: string[];
    aliases: string[];
    versioned_formulae: string[];
    desc: string;
    license: string;
    homepage: string;
    versions: {
      stable: string;
      head: string | null;
      bottle: boolean;
    };
    urls: {
      stable: {
        url: string;
        tag: string | null;
        revision: string | null;
        checksum: string;
      };
      head: {
        url: string;
        branch: string;
      };
    };
    revision: number;
    version_scheme: number;
    bottle: {
      stable: {
        rebuild: number;
        root_url: string;
        files: {
          [key: string]: {
            cellar: string;
            url: string;
            sha256: string;
          };
        };
      };
    };
    keg_only: boolean;
    keg_only_reason: {
      reason: string;
      explanation: string;
    } | null;
    options: string[];
    build_dependencies: string[];
    dependencies: string[];
    test_dependencies: string[];
    recommended_dependencies: string[];
    optional_dependencies: string[];
    uses_from_macos: string[];
    requirements: string[];
    conflicts_with: string[];
    conflicts_with_reasons: string[];
    link_overwrite: string[];
    caveats: null | string;
    installed: {
      version: string;
      used_options: string[];
      built_as_bottle: boolean;
      poured_from_bottle: boolean;
      time: number;
      runtime_dependencies: {
        full_name: string;
        version: string;
        declared_directly: boolean;
      }[];
      installed_as_dependency: boolean;
      installed_on_request: boolean;
    }[];
    linked_keg: null | string;
    pinned: boolean;
    outdated: boolean;
    deprecated: boolean;
    deprecation_date: null | string;
    deprecation_reason: null | string;
    disabled: boolean;
    disable_date: null | string;
    disable_reason: null | string;
    service: null;
    tap_git_head: string;
    ruby_source_path: string;
    ruby_source_checksum: {
      sha256: string;
    };
    variations?: {
      [key: string]: {
        dependencies: string[];
      };
    };
    analytics: {
      install: {
        "30d": {
          [key: string]: number;
        };
        "90d": {
          [key: string]: number;
        };
        "365d": {
          [key: string]: number;
        };
      };
      install_on_request: {
        "30d": {
          [key: string]: number;
        };
        "90d": {
          [key: string]: number;
        };
        "365d": {
          [key: string]: number;
        };
      };
      build_error: {
        "30d": {
          [key: string]: number;
        };
      };
    };
    "analytics-linux": {
      install: {
        "30d": {
          [key: string]: number;
        };
        "90d": {
          [key: string]: number;
        };
        "365d": {
          [key: string]: number;
        };
      };
      install_on_request: {
        "30d": {
          [key: string]: number;
        };
        "90d": {
          [key: string]: number;
        };
        "365d": {
            [key: string]: number;
        };
      };
      build_error: {
        "30d": {
            [key: string]: number;
        };
      };
    };
    generated_date: string;
};
        
export type CaskInstalls = {
    category: string;
    total_items: number;
    start_date: string;
    end_date: string;
    total_count: number;
    items: {
        number: number;
        cask: string;
        count: string;
        percent: string;
    }[]
}

export type FormulaInstalls = {
    category: string;
    total_items: number;
    start_date: string;
    end_date: string;
    total_count: number;
    items: {
        number: number;
        formula: string;
        count: string;
        percent: string;
    }[]
}

export type Brew = {
  token: string,
  type: "cask" | "formula"
}

export type UserChoices = {
    casks: string[];
    packages: string[];
}