import Link from "next/link";
import FacebookPost from "./FacebookPost";

export default function AllPosts() {
    return (
        <>
            {links.map((day) => {
                return (
                    <Link key={day[0]} href={day[1]} className="cursor-pointer">
                        <h3>{`Day ${day[0]}`}</h3>
                        <FacebookPost href={day[1]} height={day[2]} />
                    </Link>
                );
            })}
        </>
    );
}
const links = [
    [
        "1",
        "https://www.facebook.com/colinsteidtmann/posts/pfbid0sJcsyGJWw1KiRdneT79FJWcD9yeU9RuSJnjLuaCUyC1Z7SACMdmT3fhVwfSfhhmMl",
        "166",
    ],
    [
        "2",
        "https://www.facebook.com/colinsteidtmann/posts/pfbid0agQMBukLMVfZkkkc71urfEU1dvmPGLrFe1AWvEcUfNYYt2UtKd78cuYz1juGqtppl",
        "166",
    ],
    [
        "3",
        "https://www.facebook.com/colinsteidtmann/posts/pfbid0phUNAmkS4s9gWjHfyLrfxeRu17cP7R8oGYfma8ywrYDmXSrZZdSzabDB3YvuQeqVl",
        "166",
    ],
    [
        "4",
        "https://www.facebook.com/colinsteidtmann/posts/pfbid02zdSocRKerWeAXLcsP8BPzv7pX8QyouCoaeZeS6Z51QsQf6Vsg8a8aN8CCkc3vpZal",
        "166",
    ],
    [
        "6",
        "https://www.facebook.com/colinsteidtmann/posts/pfbid0adZfEe8CDZCV1gczi56isL1KvyAgLJw8VdiSrzb8239PNvgAbzcavoeQs7DuvWKXl",
        "815",
    ],
    [
        "6, post two",
        "https://www.facebook.com/colinsteidtmann/posts/pfbid02FqY7Rpraa1VESegtnhm1Jc9hbCVXQMtwsTTQ8sH3zuuk3mWDZYSpo2hpqjj6pMhxl",
        "815",
    ],
    ["7", "https://www.facebook.com/colinsteidtmann/posts/pfbid0rFgQNBAGuDdrMEQfUCFCyoWzuvxThSUFWorcQRNPi3BQLm24DFim8VFoFdtePS6kl",
        "734"
    ],
    [
        "8",
        "https://www.facebook.com/colinsteidtmann/posts/pfbid0FU8fsKpv3EvyYbedpfctLdK6M5bHGzUhg8U6wA75t5X3yKDUnXSYrdfMRSAt4ZRHl",
        "594"
    ],
    [
        "9",
        "https://www.facebook.com/colinsteidtmann/posts/pfbid02aAv4My52GKgJkiwDhezk5C9x7hFFf6HjHmBAkvJ4dhb4XmL9magpUzhg1r4qDrjvl",
        "815"
    ],
    [
        "10",
        "https://www.facebook.com/colinsteidtmann/posts/pfbid0KaRqiK23uJcAHnvLLh9ffXvP7wVmCaYRLvWsztBqC6HmFbshCQ4TC7XeNuJT7EJgl",
        "815"
    ],
    [
        "11",
        "https://www.facebook.com/colinsteidtmann/posts/pfbid02C6D5eWw57a2xvcR4ByporubbzCbYiFo5aSp3LY1f7op5JafPAjD1yo23qtXY1aSvl",
        "588"
    ],
    [
        "12",
        "https://www.facebook.com/colinsteidtmann/posts/pfbid02gqX5VQqCh6fA3PjqZhEc5bLSe7rfTwfJnnSKw1NXBJmAuXbyWxY89ou86eFKeCYcl",
        "815"
    ],
    [
        "13",
        "https://www.facebook.com/colinsteidtmann/posts/pfbid05utehYuaiwpYfKRKXKDESZKvk3dj9rVTfTzebaUa1pkYxiWjmeYLRmH9J17Yt29El",
        "815"
    ],
    [
        "14",
        "https://www.facebook.com/colinsteidtmann/posts/pfbid0XRgshhZn8ivoyzpqj8u17ccvMGrVtNuDDeXaTQ189SNVEkyTpN3Mc5oMePyHfr4hl",
        "815"
    ],
    ["15", "https://www.facebook.com/colinsteidtmann/posts/pfbid0266A1DNxEZVgh1GMPERHc9waYceWiFBXsX8RtFmedcGcQyoR3EubRX11grudwCjJdl",
        "815"],
    ["16", "https://www.facebook.com/colinsteidtmann/posts/pfbid0o9Uzjmr96Dc4yR3aXSrFmQakXoPfMmxHyRqDb2gpj9H3C2kpymXo2b5duZxQ6dipl",
        "815"],
    ["17", "https://www.facebook.com/colinsteidtmann/posts/pfbid02zPuN9Hjbjkt3DoHhmUkotvyrC2D4M83avpMa3DXDSFDE66YXyF4FDzqLAyotKrYxl", "815"],
    ["21", "https://www.facebook.com/colinsteidtmann/posts/pfbid0VnM8WmgXfYicXfwM3ZGjQuDjVoCxJxUoDoxGrnTkBSG8nH2zagcKft3EejCgEeYCl", "815"],
    ["22", "https://www.facebook.com/colinsteidtmann/posts/pfbid02sXHcLnbK2hDAvSYy7ngd2c8pozXiPSWyURL7uhrLmPY3c92QvwwQa3tPnmR3rFzbl", "815"],
    ["23", "https://www.facebook.com/colinsteidtmann/posts/pfbid0tQWNuppg2SgWnh4D82tRonRMuH4oswDTWUv42NCdigMpELEAwW1YqiqPi5AibdK4l", "815"],
    ["24", "https://www.facebook.com/colinsteidtmann/posts/pfbid0qejTsKePpa2RSadPymhi5C65Npf9YtzKPCMuNZ8mQ1iqh74Cf2xy392SQyo2kpHLl", "815"],
    ["25", "https://www.facebook.com/colinsteidtmann/posts/pfbid0rJQkwF2e7EBFZ98Jt8aGEa6TQwns3z6m2CC5PPicMzAhJgwr9We3qGgDRPNQNq2hl", "815"],
    ["26", "https://www.facebook.com/colinsteidtmann/posts/pfbid0Nq9LdkqhxwG8gzMQLhtB8EHgAK3hbRRxLRTGKAMoWQxGmv5DSj5NdUq9gN3Jzj24l", "815"],
    ["27", "https://www.facebook.com/colinsteidtmann/posts/pfbid02CK6VPCMNpePXbA55Ji5FjPtkzbdtsegbAaQGgBpst3NSzYDocvHQ6nnHv9FTDpHMl", "815"],
    ["28", "https://www.facebook.com/colinsteidtmann/posts/pfbid025ikXctfWSUyHSq1GK2Jo6szEEZKuqVJ4aD64iAMyoZ2jycVUgiVgYZhtKxSBGKLKl", "815"],
    ["29", "https://www.facebook.com/colinsteidtmann/posts/pfbid0LuK7CzMPUUCbf22ETVJhhV4VNWU46YxyKHGNKtQn1ReuNn1f5jWb2n18RFb4ujeHl", "815"],
    ["30", "https://www.facebook.com/colinsteidtmann/posts/pfbid0J128JgJgrnk9GJ1Hy8Uo3QiffKgtXFkvmkmo5ajVAqPZP5TDkqZWvLQC89HK4iS5l", "815"],
    ["31", "https://www.facebook.com/colinsteidtmann/posts/pfbid02RW19yv9xxiGgEJ15pZq1A3z4HJjwpQc8mzvUxHMAi57n1Z2dDa7ndqvQeGdaKPHZl", "815"],
    ["32", "https://www.facebook.com/colinsteidtmann/posts/pfbid0cnpzkLSntvimqJANwxa9W3ywN6MHnCpFFPrjUuTfsxw2XKLdbbb1LJFy8ahGeLcGl", "815"],
    ["33", "https://www.facebook.com/colinsteidtmann/posts/pfbid02M3wSyn5RPDH1o4ZCibqyQVobdyo27TwxP8QwyPFj1hdJYFpfi3GAQ8kMUjBqrSQql", "815"],
    ["34", "https://www.facebook.com/colinsteidtmann/posts/pfbid0muQS61itNJCwAcPUGqW3CocV3uBiUoVjraTU17rMZecS7XrMBGgeSF3mA7iphBV9l", "815"],
    ["35", "https://www.facebook.com/colinsteidtmann/posts/pfbid02t7oDJq66PoSXb5d3DDjrczzsvc6HHjx6Me33ew51Z19XWxb7Hu4SmUS3dNPZahuRl", "815"],
    ["36", "https://www.facebook.com/colinsteidtmann/posts/pfbid0DkyCr4tTErWypUDUqNMhYantu6xp6Q9qiPMxMgQbUwWRtgiqqAUUaHczMTULumTGl", "815"],
    ["37", "https://www.facebook.com/colinsteidtmann/posts/pfbid0nq8srxh6xwS7aUHZcAJWdoBCPhyvAjrMTMkmKrv96Wuww8fvU28MRtbEjzBdruail", "815"],
    ["39", "https://www.facebook.com/colinsteidtmann/posts/pfbid02ng54BgWYdu1aDv2oWzbjvppUF1nJJc77XFkoneszbaZZhkdWqmW7zQzyS2DvS3Ebl", "815"],
    ["39", "https://www.facebook.com/colinsteidtmann/posts/pfbid02wsLurYX9hupyp2brCwLRXc7KFvYFs4QLubDEHVzskn9bPnAfL3VvtHVoiPfzUgWRl", "815"],
    ["39, part two 💓", "https://www.facebook.com/colinsteidtmann/posts/pfbid02AeSm353w46Qna3Sbgi5rKYGjtwwMFMEP42Fa13p2mj91XGfmJcsKFLYSHi6BqovEl", "815"]
];