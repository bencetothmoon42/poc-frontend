import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const url = request.url;

  if (
    !token &&
    !url.includes("_next") &&
    !url.includes("/login") &&
    !url.includes("/api")
  ) {
    return NextResponse.redirect("http://localhost:4200/login");
  }
}
