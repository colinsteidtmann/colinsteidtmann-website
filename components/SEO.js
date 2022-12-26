import Head from "next/head";
import { useRouter } from "next/router";
import siteMetadata from "@/data/siteMetadata";
// og prefixes - see https://ogp.me/
// twitter prefixes - see https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
// @ prefixes and JSON - see https://schema.org/ & https://search.google.com/test/rich-results 
const CommonSEO = ({ title, description, ogType, canonicalUrl }) => {
    // ogType options: article, website, profile
    const router = useRouter();
    const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
    return (
        <Head>
            <title>{title}</title>
            <meta name="robots" content="follow, index" />
            <meta name="description" content={description} />
            <meta property="og:url" content={`${siteMetadata.siteUrl}${router.asPath}`} />
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content={siteMetadata.title} />
            <meta property="og:description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:image" content={ogImageUrl} key={ogImageUrl} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={siteMetadata.twitter} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImageUrl} />
            <link
                rel="canonical"
                href={canonicalUrl ? canonicalUrl : `${siteMetadata.siteUrl}${router.asPath}`}
            />
        </Head>
    );
};

/**
 * @param ogType article, website, profile
 */
export const PageSEO = ({ title, description, ogType, canonicalUrl }) => {
    return (
        <CommonSEO
            title={title}
            description={description}
            ogType={ogType}
            canonicalUrl={canonicalUrl}
        />
    );
};

export const NoteSEO = ({
    title,
    description,
    date,
    lastmod,
    url,
    keywords,
    canonicalUrl,
}) => {
    const publishedAt = new Date(date).toISOString();
    const modifiedAt = new Date(lastmod || date).toISOString();
    // see https://schema.org/Article
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "author": siteMetadata.author,
        "name": title,
        "headline": title,
        "description": description,
        "datePublished": publishedAt,
        "dateModified": modifiedAt,
        "dateCreated": publishedAt,
        "keywords": keywords,
        "author": [
            {
                "@type": "Person",
                "name": siteMetadata.author,
                "url": "https://www.colinsteidtmann.com/about"
            }
        ],
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url,
        },
        "publisher": {
            "@type": "Organization",
            "name": siteMetadata.author,
            "logo": {
                "@type": "ImageObject",
                "url": `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
            },
        },
    };
    return (
        <>
            <PageSEO
                title={title}
                description={description}
                ogType="article"
                canonicalUrl={canonicalUrl}
            />
            <Head>
                {date && <meta property="article:published_time" content={publishedAt} />}
                {lastmod && <meta property="article:modified_time" content={modifiedAt} />}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData, null, 2),
                    }}
                />
            </Head>
        </>
    );
};
