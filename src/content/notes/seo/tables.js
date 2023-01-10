/* eslint-disable react/jsx-key */
export function Table({ contents }) {
  return (
    <table>
      <thead>
        <tr>
          {contents.thead.map((header, idx) => (
            <th align={contents.tdAlign[idx]} key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {contents.tbody.map((row) => {
          return (
            <tr key={row}>
              {row.map((value, idx) => (
                <td align={contents.tdAlign[idx]} key={value}>
                  {value}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export const statusCodesTableRows = {
  tdAlign: ["center", "left", "left"],
  thead: ["HTTP status code", "Meaning", "Notes"],
  tbody: [
    ["200", "Ok", ""],
    ["301/308", "Permanent redirect", ""],
    ["302", "Temporary redirect", ""],
    ["404", "Not found", "Hurts search rankings if you have too many"],
    [
      "410",
      "No longer available",
      <ul>
        <li>E.g. blog post removed from site</li>
        <li>Tells bots not to crawl this page</li>
      </ul>,
    ],
    ["500", "Server error", ""],
    [
      "503",
      "Server down for a long period of time",
      "Maintains search rankings",
    ],
  ],
};

export const explicitTableRows = {
  tdAlign: ["center", "left", "left"],
  thead: ["HTML files and tags", "Meaning", "Notes"],
  tbody: [
    [
      "robots.txt",
      "Indicates which pages/files web crawlers can access and crawl",
      <a href="https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt#useful-robots.txt-rules">
        Useful robots.txt rules
      </a>,
    ],
    [
      "sitemap.xml",
      "Tells Google the URLs in your site so it can crawl it more efficiently and crawl new pages when the sitemap changes.",
      `Best to make it dynamic and use the ${(
        <a href="https://nextjs.org/learn/seo/crawling-and-indexing/xml-sitemaps">
          NextJS example
        </a>
      )}.`,
    ],
    [
      "HTML Head meta tags for search engines",
      <p>
        Directives that search engines always respect.
        <i>
          E.g.don’t index this page, don’t follow links from this page, don’t
          translate it’s content, don’t show a search bar for the site on
          Google.
        </i>
      </p>,
      <p>
        <a href="https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#robotsmeta">
          Helpful NextJS post
        </a>
        <br />
        You can use these in lieu of <strong>robots.txt</strong>
      </p>,
    ],
    [
      "Head canonical link tags",
      "Tells Google the page that’s the origin of truth.",
      "Critical if you have duplicate content on pages with different URLs, otherwise Google penalizes you.",
    ],
    [
      "Title and description tags",
      "",
      <ul>
        <li>VERY important for SEO.</li>
        <li>Be descriptive of the content and use keywords!</li>
      </ul>,
    ],
    [
      <p>
        Open Graph Tags <a href="https://ogp.me/">(ogp.me)</a>
      </p>,
      <p>
        Used by companies like{" "}
        <a href="https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards">
          Twitter
        </a>{" "}
        to show rich UI cards when people link to your site
      </p>,
      "",
    ],
    [
      <p>
        Structured JSON-LD Data <a href="https://schema.org/">(schema.org)</a>
      </p>,
      "Even more data to describe your content for search engines.",
      "",
    ],
  ],
};

export const implicitTableRows = {
  tdAlign: ["center", "left"],
  thead: ["Topic", "Advice"],
  tbody: [
    [
      "Rendering",
      <p>
        Most important thing for SEO is that page metadata and content is
        available without running JavaScript.
        <ul>
          <li>
            Best for SEO → Static Site Generation / Server Side Generation
          </li>
          <li>
            Worst for SEO → Client side rendering (Only makes sense for content
            specific to the user (e.g. a dashboard))
          </li>
        </ul>
      </p>,
    ],
    [
      "On Page SEO",
      <ul>
        <li>
          Headings (h1/h2/…/h6) → Use them properly, tells search engines the
          important information on the website.
        </li>
        <li>
          Links → Good to have internal links and external links from reputable
          sites.
        </li>
      </ul>,
    ],
    [
      "URLs",
      <ul>
        <li>Words over numbers (keywords are even better)</li>
        <li>Logical and consistent patterns</li>
      </ul>,
    ],
    [
      "Google AMP",
      "Code from Google that use to improve SEO but doesn't anymore.",
    ],
  ],
};
