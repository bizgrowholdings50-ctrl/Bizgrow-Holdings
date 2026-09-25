const SITE_URL = "https://bizgrow-holdings.com";

export function createOpenGraph(path, image) {
  return {
    type: "website",
    locale: "en_GB",
    url: new URL(path, SITE_URL).toString(),
    siteName: "BizGrow Holdings",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: "BizGrow Holdings",
      },
    ],
  };
}
