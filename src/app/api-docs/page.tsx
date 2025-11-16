'use client';

import Script from "next/script";

export default function ApiDocsPage() {
  return (
    <>
      <title>API Docs</title>

      <link
        rel="stylesheet"
        href="https://unpkg.com/swagger-ui-dist/swagger-ui.css"
      />

      <div id="swagger-ui" className="min-h-screen"></div>

      {/* Swagger bundle */}
      <Script
        src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"
        strategy="afterInteractive"
      />

      {/* Initialisation de Swagger UI */}
      <Script id="swagger-init" strategy="afterInteractive">
        {`
          window.onload = function () {
            SwaggerUIBundle({
              url: "/api/docs",
              dom_id: "#swagger-ui",
            });
          };
        `}
      </Script>
    </>
  );
}
