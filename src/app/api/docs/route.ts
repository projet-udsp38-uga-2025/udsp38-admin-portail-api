import { swaggerSpec } from "@/infrastructure/config/swagger";

export async function GET() {
  return new Response(JSON.stringify(swaggerSpec), {
    headers: { 'Content-Type': 'application/json' },
  });
}
