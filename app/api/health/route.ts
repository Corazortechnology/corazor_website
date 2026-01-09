import { NextResponse } from "next/server";

/**
 * Health Check Endpoint
 * 
 * Used for:
 * - Serverless function warm-up
 * - Monitoring service pings
 * - Load balancer health checks
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "Corazor Technology Website",
      version: process.env.NEXT_PUBLIC_DEPLOY_ENV || "development",
    },
    { status: 200 }
  );
}

// Disable caching for health checks
export const dynamic = "force-dynamic";

