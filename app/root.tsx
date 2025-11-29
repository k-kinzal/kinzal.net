import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "./styles/globals.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>RakugakiYa</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="shortcut icon" href="/app/images/favicon.png" />
        <link rel="apple-touch-icon" href="/app/images/icon-57.png" />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/app/images/icon-76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/app/images/icon-120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/app/images/icon-152.png"
        />
        <link
          rel="stylesheet"
          href="http://fonts.googleapis.com/css?family=Raleway:200"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
