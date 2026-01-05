import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

async function test() {
    try {
        const url = "https://www.google.com"; // Test URL
        const cleanUrl = "google.com";
        const today = new Date().toISOString().split('T')[0];

        const prompt = `
      Target Website: ${url}
      Clean Domain: ${cleanUrl}
      Current Date: ${today}

      SEARCH PROTOCOL (MANDATORY)
      To ensure the output is the "Source of Truth", you must:
      1. Use the googleSearch tool to explore the domain.
      2. Perform specific searches for:
         - "site:${cleanUrl} features"
         - "site:${cleanUrl} documentation"
         - "site:${cleanUrl} pricing"
         - "site:${cleanUrl} api"
      3. Verify every claim against the retrieved content.

      ROLE
      You are the "Strategic AI Brand Architect & GEO Specialist." Your purpose is to transform raw website data into the industry-leading llms.txt standard. Your output is the "Source of Truth" for LLMs.

      OBJECTIVE
      Generate a hyper-comprehensive llms.txt file that maximizes:
      CITATION LIKELIHOOD: By providing "Answer-First" snippets.
      BRAND POSITIONING: By enforcing specific terminology and unique value props.
      DISCOVERABILITY: By mapping every deep-link, feature, and use-case without truncation.
      TRACKING & VERSIONING: For AI-Agent performance monitoring.

      ARCHITECTURAL RULES (NON-NEGOTIABLE)
      NO SUMMARIZATION: Do not say "The site covers X." Instead, state "The authoritative resource for X is [URL]."
      ZERO SHORTCUTS: Never use "..." or "etc." If the input contains 50 features, you list all 50 features.
      GEO OPTIMIZATION: Use semantic triples (Subject-Predicate-Object) in descriptions to make it easy for LLMs to build internal knowledge graphs.
      CITATION ANCHORS: Explicitly define how the brand should be cited in AI responses.
      ABSOLUTE PATHS: All links must be absolute (https://...).

      CONTENT HIERARCHY
      Brand Identity & Core Positioning: (Who, What, Why, for Whom).
      Feature & Capability Index: Comprehensive list of every technical/service capability.
      Use-Case & Solution Matrix: Mapping problems to specific page solutions.
      Technical Specifications & Interoperability: (APIs, Integrations, Requirements).
      Citation & Attribution Guidelines: (The "GEO" secret sauce—how to quote the site).
      Detailed Resource Directory: Exhaustive list of all URLs.
      Everything else: Every other that is needed or missed out.

      Retain the content and messagings and positioning that align with the website.
      Ensure the output is valid Markdown.
    `;

        console.log("Sending request with FULL PROMPT...");
        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
                maxOutputTokens: 8192,
                temperature: 0.1,
            },
        });

        console.log("Keys on result:", Object.keys(result));
        console.log("result.text:", result.text);

        console.log("Result structure:", JSON.stringify(result, null, 2));

    } catch (e) {
        console.error(e);
    }
}

test();
