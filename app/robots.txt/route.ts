// app/robots.txt/route.ts
import { NextResponse } from "next/server";

export function GET() {
  const body = `
User-agent: *
Disallow:

Sitemap: http://localhost:3000/sitemap.xml
  `.trim();

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
