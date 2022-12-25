import Head from "next/head";
import { useRouter } from "next/router";
import siteMetadata from "@/data/siteMetadata";

const CommonSEO = ({ title, description, ogType, canonicalUrl }) => {
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

export const PageSEO = ({ title, description, canonicalUrl }) => {
    return (
        <CommonSEO
            title={title}
            description={description}
            canonicalUrl={canonicalUrl}
        />
    );
};

export const TagSEO = ({ title, description }) => {
    const router = useRouter();
    return (
        <>
            <CommonSEO
                title={title}
                description={description}
                ogType="website"
            />
            <Head>
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title={`${description} - RSS feed`}
                    href={`${siteMetadata.siteUrl}${router.asPath}/feed.xml`}
                />
            </Head>
        </>
    );
};

export const NoteSEO = ({
    title,
    description,
    date,
    lastmod,
    url,
    canonicalUrl,
}) => {
    const publishedAt = new Date(date).toISOString();
    const modifiedAt = new Date(lastmod || date).toISOString();
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        headline: title,
        datePublished: publishedAt,
        dateModified: modifiedAt,
        author: {
            "@type": "Person",
            name: siteMetadata.author
        },
        publisher: {
            "@type": "Organization",
            name: siteMetadata.author,
            logo: {
                "@type": "ImageObject",
                url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
            },
        },
        description: description,
    };


    return (
        <>
            <CommonSEO
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
