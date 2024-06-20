import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "./middleware/authMiddleware";

export default function middleware(request: NextRequest) {
  return runMiddlewares(request, [authMiddleware]);
}

async function runMiddlewares(request: NextRequest, middlewares: Function[]) {
  for (const middleware of middlewares) {
    const response = await middleware(request);
    if (response && response instanceof NextResponse && response.headers.get("location")) {
      return response;
    }
  }
  return NextResponse.next();
}
