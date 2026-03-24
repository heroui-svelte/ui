export type DocsNavItem = {
  description?: string;
  href: string;
  title: string;
};

export type DocsNavGroup = {
  items: DocsNavItem[];
  title: string;
};

export type DocsNavSection = {
  groups: DocsNavGroup[];
  href: string;
  title: string;
};

export type DocsBlock =
  | {
      html: string;
      type: "markdown";
    }
  | {
      html: string;
      tone: string;
      type: "callout";
    }
  | {
      converted?: boolean;
      language: string;
      name: string;
      source: string;
      title: string;
      type: "preview";
    }
  | {
      items: DocsNavItem[];
      title: string;
      type: "related";
    }
  | {
      items: string[];
      title: string;
      type: "showcases";
    }
  | {
      tabs: Array<{
        code: string;
        label: string;
        language: string;
      }>;
      type: "tabs";
    };

export type DocsDocSummary = {
  description?: string;
  group?: string;
  href: string;
  section: string;
  slug: string[];
  title: string;
};

export type DocsPage = DocsDocSummary & {
  blocks: DocsBlock[];
};
