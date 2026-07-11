import fs from "fs";

const pagesContent = JSON.parse(fs.readFileSync("./src/data/pagesContent.json", "utf8"));

// Helper to generate list items
const renderList = (items) => items.map((item) => `          <li>${item}</li>`).join("\n");

const renderFAQ = (faq) =>
  faq
    .map(
      (item) => `          <div class="space-y-2">
            <dt class="text-sm font-bold text-zinc-900">Q: ${item.q}</dt>
            <dd class="text-sm text-zinc-600 font-semibold pl-4 border-l-2 border-primary">
              ${item.a}
            </dd>
          </div>`
    )
    .join("\n");

const renderBreadcrumbsSchema = (pageKey, title) => {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AutoRepair",
          "@id": "https://anaheim-auto-repair.vercel.app/#store",
          "name": "Anaheim Auto Repair & Muffler Care",
          "telephone": "+17148264444",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "2583 W Ball Rd",
            "addressLocality": "Anaheim",
            "addressRegion": "CA",
            "postalCode": "92804",
            "addressCountry": "US",
          },
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://anaheim-auto-repair.vercel.app",
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": title,
              "item": `https://anaheim-auto-repair.vercel.app/${pageKey}`,
            },
          ],
        },
      ],
    },
    null,
    2
  );
};

// Generate each page
for (const [key, page] of Object.entries(pagesContent)) {
  let mainContent = "";

  if (key === "privacy") {
    mainContent = `        <h1 class="text-4xl font-extrabold tracking-tight text-zinc-900 mb-6">
          Privacy Policy
        </h1>
        
        <p class="text-zinc-500 text-xs mb-8">Last Updated: July 11, 2026</p>

        <div class="space-y-6 text-sm text-zinc-650 font-semibold leading-relaxed">
          <p>
            At Anaheim Auto Repair & Muffler Care, we are committed to protecting the privacy of our visitors and customers. This Privacy Policy details how we collect, use, and protect your information when you request a service estimate or visit our website.
          </p>

          <h2 class="text-xl font-bold text-zinc-900 pt-4">1. Information We Collect</h2>
          <p>
            When you request an estimate using our online service intake form, we ask for:
          </p>
          <ul class="list-disc list-inside space-y-1 pl-4">
            <li>Your Name</li>
            <li>Your Phone Number</li>
            <li>Your Email Address (Optional)</li>
            <li>Your Vehicle specifications (Year, Make, Model, VIN, Mileage)</li>
            <li>Your vehicle's warning lights and symptoms</li>
          </ul>

          <h2 class="text-xl font-bold text-zinc-900 pt-4">2. How We Use Your Information</h2>
          <p>
            We use this information strictly to process your auto-repair estimate requests, schedule appointments, and communicate with you about your vehicle. We do not use this data for marketing mailings or sell it to third-party lists.
          </p>

          <h2 class="text-xl font-bold text-zinc-900 pt-4">3. SMS Communications & Consent</h2>
          <p>
            If you check the optional box consenting to receive automated updates, we may send you text messages regarding your service request, diagnostic findings, and scheduling. Consent to receive text messages is optional and not required to obtain repair services. You can opt-out at any time by replying <strong>STOP</strong> to any message we send.
          </p>

          <h2 class="text-xl font-bold text-zinc-900 pt-4">4. Third-Party Sharing</h2>
          <p>
            We share your data with trusted hosting partners and our lead routing service (n8n webhook proxy) solely to process your request. We do not sell, rent, or lease personal information to third parties.
          </p>

          <h2 class="text-xl font-bold text-zinc-900 pt-4">5. Contact Information</h2>
          <p>
            If you have questions about this policy or wish to request removal of your records, please contact us at:
          </p>
          <p class="pl-4 font-bold text-zinc-800">
            Anaheim Auto Repair & Muffler Care<br />
            2583 W Ball Rd<br />
            Anaheim, CA 92804<br />
            Phone: (714) 826-4444
          </p>
        </div>`;
  } else if (key === "contact") {
    mainContent = `        <h1 class="text-4xl font-extrabold tracking-tight text-zinc-900 mb-6">
          Contact Anaheim Auto Repair & Muffler Care
        </h1>
        
        <p class="text-lg text-zinc-650 mb-8 leading-relaxed">
          Need an estimate or check our availability? Fill out our service intake form on this page, visit our shop, or speak directly with our manager Carson.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 class="text-xl font-bold text-zinc-900 mb-3">📍 Shop Address</h2>
            <p class="text-zinc-650 font-semibold mb-4">
              2583 W Ball Rd<br />
              Anaheim, CA 92804
            </p>
            <p class="text-xs text-zinc-500 font-semibold leading-normal">
              Located on W Ball Rd. On-site customer parking is available.
            </p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-zinc-900 mb-3">🕒 Business Hours</h2>
            <p class="text-zinc-650 font-semibold mb-2">
              Monday – Friday: 8:30 AM – 5:30 PM<br />
              Saturday: 8:30 AM – 4:30 PM
            </p>
            <p class="text-xs text-zinc-500 font-semibold">
              Sunday: Closed
            </p>
          </div>
        </div>

        <div class="bg-zinc-50 border border-zinc-200 rounded-xl p-8 text-center">
          <h2 class="text-2xl font-bold text-zinc-900 mb-4">Request a Free Estimate</h2>
          <p class="text-zinc-600 mb-6 font-medium">Use the online form to submit your vehicle year, make, model, and symptoms.</p>
          <a href="tel:+17148264444" class="inline-block rounded-md bg-primary hover:bg-red-700 px-8 py-4 font-bold text-white shadow-sm mb-4">
            📞 Call Now: (714) 826-4444
          </a>
        </div>`;
  } else {
    mainContent = `        <nav class="text-xs text-zinc-500 mb-6" aria-label="Breadcrumb">
          <ol class="flex gap-2">
            <li><a href="/" class="hover:underline">Home</a> &gt;</li>
            <li class="font-bold text-zinc-800">${page.heading}</li>
          </ol>
        </nav>

        <h1 class="text-4xl font-extrabold tracking-tight text-zinc-900 mb-6">
          ${page.heading} in Anaheim, CA
        </h1>
        
        <p class="text-lg text-zinc-650 mb-8 leading-relaxed font-semibold">
          ${page.longDescription}
        </p>

        <h2 class="text-2xl font-bold text-zinc-900 mb-4">Common Warning Signs & Symptoms</h2>
        <ul class="list-disc list-inside space-y-2 text-zinc-650 font-semibold mb-8">
${renderList(page.symptoms)}
        </ul>

        <h2 class="text-2xl font-bold text-zinc-900 mb-4">Our Service & Repair Process</h2>
        <ol class="list-decimal list-inside space-y-2 text-zinc-650 font-semibold mb-8">
${renderList(page.process)}
        </ol>

        <h2 class="text-2xl font-bold text-zinc-900 mb-4">Related Services We Offer</h2>
        <ul class="list-disc list-inside space-y-2 text-zinc-650 font-semibold mb-8">
${renderList(page.related)}
        </ul>

        <div class="border-t border-zinc-200 pt-8 mt-8">
          <h2 class="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
          <div class="space-y-6">
${renderFAQ(page.faq)}
          </div>
        </div>

        <div class="bg-zinc-50 border border-zinc-200 rounded-xl p-8 text-center mt-12">
          <h3 class="text-xl font-bold text-zinc-900 mb-4">Need an Estimate?</h3>
          <p class="text-zinc-600 mb-6 font-medium">Speak directly with Carson for a straightforward estimate.</p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+17148264444" class="rounded-md bg-primary hover:bg-red-700 px-6 py-3 font-bold text-white shadow-sm">
              📞 Call (714) 826-4444
            </a>
            <a href="/#contact" class="rounded-md bg-white border border-zinc-300 hover:bg-zinc-50 px-6 py-3 font-bold text-zinc-700 shadow-sm">
              Request Online Estimate
            </a>
          </div>
        </div>`;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${page.title}</title>
    <meta name="description" content="${page.description}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
    
    <!-- Real Favicon set -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <link rel="canonical" href="https://anaheim-auto-repair.vercel.app/${key}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://anaheim-auto-repair.vercel.app/${key}" />
    <meta property="og:title" content="${page.title.split("|")[0].trim()}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:image" content="https://anaheim-auto-repair.vercel.app/social-preview.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://anaheim-auto-repair.vercel.app/${key}" />
    <meta name="twitter:title" content="${page.title.split("|")[0].trim()}" />
    <meta name="twitter:description" content="${page.description}" />
    <meta name="twitter:image" content="https://anaheim-auto-repair.vercel.app/social-preview.jpg" />
    
    <!-- Structured Data -->
    <script type="application/ld+json">
${renderBreadcrumbsSchema(key, page.heading)}
    </script>
  </head>
  <body>
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:border focus:border-gray-200 focus:shadow-md">
      Skip to main content
    </a>
    
    <div id="root">
      <header class="fixed inset-x-0 top-0 z-50 bg-white border-b border-zinc-200 py-4 px-6 lg:px-8">
        <div class="mx-auto max-w-7xl flex items-center justify-between">
          <span class="font-extrabold uppercase text-zinc-900">Anaheim Auto Repair & Muffler Care</span>
          <a href="tel:+17148264444" class="text-primary font-bold">(714) 826-4444</a>
        </div>
      </header>

      <main id="main-content" class="pt-32 pb-20 mx-auto max-w-4xl px-6">
${mainContent}
      </main>

      <footer class="bg-zinc-900 text-zinc-500 py-8 text-center text-xs mt-20">
        <p>© 2026 Anaheim Auto Repair & Muffler Care. All rights reserved.</p>
      </footer>
    </div>
    
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

  fs.writeFileSync(`./${key}.html`, html, "utf8");
  console.log(`Generated ./${key}.html successfully.`);
}
