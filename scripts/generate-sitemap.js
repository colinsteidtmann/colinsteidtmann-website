const { existsSync, readFileSync, writeFileSync } = require("fs");
const matter = require("gray-matter");
const { siteUrl } = require("../data/siteMetadata");

(async () => {
    const { globby } = await import("globby");
    // const prettierConfig = await resolveConfig('./.prettierrc.js');
    const pages = await globby([
        "pages/*.js",
        "pages/*.tsx",
        "pages/**/*.js",
        "content/**/**/*.mdx",
        "content/**/**/*.md",
        "!pages/_*.js",
        "!pages/_*.tsx",
        "!pages/api",
        "!pages/**/[*",
    ]);

    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
            .map((page) => {
                // Exclude drafts from the sitemap
                if (page.search(".md") >= 1 && existsSync(page)) {
                    const source = readFileSync(page, "utf8");
                    const fm = matter(source);
                    if (fm.data.draft) {
                        return;
                    }
                    if (fm.data.canonicalUrl) {
                        return;
                    }
                }
                const path = page
                    .replace("pages/", "/")
                    .replace("content/", "/")
                    .replace("public/", "/")
                    .replace("index", "")
                    .replace(".js", "")
                    .replace(".tsx", "")
                    .replace(".mdx", "")
                    .replace(".md", "");

                const route = path === "/index" ? "" : path;
                return `
                        <url>
                            <loc>${siteUrl}${route}</loc>
                        </url>
                    `;
            })
            .join("")}
        </urlset>
    `;

    // const formatted = format(sitemap, {
    //     ...prettierConfig,
    //     parser: 'html',
    // });

    // eslint-disable-next-line no-sync
    writeFileSync("public/sitemap.xml", sitemap);
})();
