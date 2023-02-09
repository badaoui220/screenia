/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || "Screenia";
  const description =
    searchParams.get("description") ||
    "Efficient Website Screenshot Creation in Seconds";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          backgroundImage:
            "linear-gradient(to bottom right, #E0E7FF 25%, #ffffff 50%, #CFFAFE 75%)",
        }}
      >
        <img
          src={new URL(
            "../../public/images/logo.png",
            import.meta.url,
          ).toString()}
          alt="Screenia Logo"
          width="150"
          height="41"
        />
        <h1
          style={{
            fontSize: "100px",
            color: "black",
            lineHeight: "5rem",
            fontWeight: "bold",
            letterSpacing: "-0.05em",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            marginTop: "30px",
            fontSize: "50px",
            color: "black",
            lineHeight: "2rem",
            fontWeight: "lighter",
            letterSpacing: "-0.05em",
          }}
        >
          {description}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
