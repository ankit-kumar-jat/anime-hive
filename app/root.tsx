import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import stylesheet from "~/assets/styles/tailwind.css?url";

import { ProgressBar } from "~/components/progress-bar";
import Header from "~/components/header";
import Footer from "~/components/footer";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Home | Anime Hive" },
    {
      name: "description",
      content:
        "One stop solution to help you find anime or manga. - Anime Hive",
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-foreground">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
      <ProgressBar />
    </>
  );
}
