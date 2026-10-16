# Syntra --- Complete Comprehensive Master Specification

*A turnkey, end-to-end engineering, backend data bridge, and frontend
UI/UX blueprint for the Syntra creator network platform.*

> **Purpose:** This document is the single source of truth for building,
> styling, connecting, testing, and deploying the Syntra website. It
> consolidates the brand identity, frontend architecture, data model,
> Google Sheets integration, component behavior, design tokens, motion
> language, and implementation references into one Markdown
> specification.

------------------------------------------------------------------------

## Table of Contents

1.  [Executive Summary & Brand
    Identity](#1-executive-summary--brand-identity)
2.  [Product Goals & Experience
    Principles](#2-product-goals--experience-principles)
3.  [Technical Architecture](#3-technical-architecture)
4.  [Google Sheets CRM Data Bridge](#4-google-sheets-crm-data-bridge)
5.  [Frontend Data Hook](#5-frontend-data-hook)
6.  [Typography System](#6-typography-system)
7.  [Color Tokens & Theme Variables](#7-color-tokens--theme-variables)
8.  [Global Layout & Visual Language](#8-global-layout--visual-language)
9.  [Page Architecture & Component
    Specifications](#9-page-architecture--component-specifications)
10. [Interaction, Animation & Motion
    System](#10-interaction-animation--motion-system)
11. [Creator Directory Behavior](#11-creator-directory-behavior)
12. [Services, Process, Contact &
    Footer](#12-services-process-contact--footer)
13. [Tailwind CSS Configuration](#13-tailwind-css-configuration)
14. [Suggested Project Structure](#14-suggested-project-structure)
15. [Accessibility, Responsiveness &
    Performance](#15-accessibility-responsiveness--performance)
16. [Security, Privacy & Data
    Handling](#16-security-privacy--data-handling)
17. [Error States & Resilience](#17-error-states--resilience)
18. [Implementation Checklist](#18-implementation-checklist)
19. [Deployment & Acceptance
    Criteria](#19-deployment--acceptance-criteria)

------------------------------------------------------------------------

## 1. Executive Summary & Brand Identity

### 1.1 Brand Overview

-   **Brand name:** Syntra
-   **Live reference site:** [Syntra
    Studio](https://syntrastudio.netlify.app/)
-   **Industry:** Motion-first creative editing studio and verified
    creator agency network.
-   **Service categories:** Video production, video editing, motion
    graphics, thumbnails, branding, AI-assisted content, and commercial
    brand partnerships.
-   **Primary purpose:** Present Syntra as a premium creative partner
    while providing a public-facing directory of approved creators,
    creator metrics, and rate-card links backed by a Google Sheets CRM.

### 1.2 Core Brand Copy

Use the following copy consistently unless a deliberate copy revision is
approved:

-   **Eyebrow pill:** "Editing-first creative studio"
-   **Hero headline:** "We craft stories that convert."
-   **About statement:** "A creative studio shaping digital experiences
    --- frame by frame."
-   **Service ticker:** "Video Editing • Motion Graphics • AI Content •
    Thumbnail Design"

### 1.3 Design Persona

**Dark Luxury Cyber-Editorial & High-Tech Motion Studio**

The site should feel like a carefully art-directed motion studio:
cinematic, tactile, precise, editorial, and technologically confident.
It should not feel like a generic SaaS landing page or a template-based
agency website.

### 1.4 Core Design Principles

1.  **Cinematic contrast**
    -   Use pitch-obisidian surfaces such as `#080808` and `#070707`.
    -   Use Syntra golden amber `#FFD100` as the principal accent.
    -   Keep yellow highlights purposeful; do not flood every component
        with accent color.
2.  **Tactile surfaces**
    -   Use translucent glass panels, subtle blur, hairline borders, and
        layered radial glows.
    -   Glass effects should add depth without making text difficult to
        read.
    -   Typical reference: `backdrop-filter: blur(20px)`.
3.  **Editorial precision**
    -   Use expressive geometric display typography for headlines.
    -   Pair it with clean, highly legible sans-serif body text.
    -   Preserve strong hierarchy, deliberate whitespace, and controlled
        line lengths.
4.  **Motion choreography**
    -   Use intentional, smooth transitions rather than random
        decorative movement.
    -   Primary easing: `cubic-bezier(0.22, 0.9, 0.18, 1)`.
    -   Include view-triggered reveals, a continuous marquee,
        interactive micro-states, and count-up metrics where
        appropriate.
    -   Respect reduced-motion preferences.

------------------------------------------------------------------------

## 2. Product Goals & Experience Principles

### 2.1 Primary goals

-   Communicate Syntra's creative capabilities and premium positioning
    immediately.
-   Make it easy for brands to understand services and begin a
    collaboration.
-   Showcase approved creators in a searchable, categorized directory.
-   Present useful public creator metrics such as follower count, median
    views, and view-to-follower ratio.
-   Allow visitors to open creator profiles and rate cards without
    exposing private CRM data.
-   Keep creator data maintainable through Google Sheets rather than
    hardcoding creator records into the frontend.

### 2.2 Core visitor journeys

**Brand looking for creative services** 1. Land on the hero. 2.
Understand the studio's positioning. 3. Browse services and process. 4.
Review creator network or relevant work. 5. Submit a collaboration
inquiry.

**Brand looking for a creator** 1. Open the creator directory. 2. Browse
categories and creator metrics. 3. Review a creator's profile link and
public performance indicators. 4. Open the approved rate card. 5.
Contact Syntra to discuss a campaign.

**Returning visitor** 1. Use navigation to jump to the relevant section.
2. Toggle the theme if desired. 3. Open a creator or service without
unnecessary friction.

### 2.3 Content and trust principles

-   Only display creators explicitly approved for public listing.
-   Do not imply that metrics are independently audited unless that is
    true.
-   Label metrics clearly and consistently.
-   Do not expose private internal notes, personal contact details, or
    confidential CRM fields in the public response.
-   Keep rate-card links current and ensure the creator has approved
    public sharing.

------------------------------------------------------------------------

## 3. Technical Architecture

### 3.1 Suggested stack

-   **Frontend:** React with Vite or Next.js.
-   **Language:** JavaScript or TypeScript; TypeScript is preferred for
    a larger implementation.
-   **Styling:** Tailwind CSS plus small, reusable component-level
    styles where necessary.
-   **Fonts:** Google Fonts --- Syne and Inter.
-   **Creator data source:** Google Sheets.
-   **Backend bridge:** Google Apps Script deployed as a Web App.
-   **Hosting:** Netlify or another static/frontend hosting provider.
-   **Motion:** CSS transitions and keyframes; an animation library may
    be added if the implementation benefits from it.

### 3.2 High-level data flow

``` text
Google Sheets CRM
       |
       v
Google Apps Script Web App (Code.gs)
       |
       v
JSON response containing approved public creator records
       |
       v
React data hook (useSyntraCreators)
       |
       v
CreatorDirectory component
       |
       v
Creator cards, metrics, profile links, and rate-card actions
```

### 3.3 Separation of responsibilities

-   **Google Sheets:** Editable source of truth for creator records.
-   **Apps Script:** Reads sheet rows, transforms fields, filters
    records, and returns public JSON.
-   **React hook:** Fetches data and exposes loading, error, and creator
    state.
-   **UI components:** Render data and handle user interaction.
-   **Theme system:** Controls light/dark appearance without duplicating
    component markup.

------------------------------------------------------------------------

## 4. Google Sheets CRM Data Bridge

### 4.1 Purpose

The Google Apps Script endpoint exposes creator records from the
`Creators` worksheet as JSON. The frontend can use this data to display
creator names, profile URLs, niches, languages, follower counts, median
views, view-to-follower ratios, and approved rate-card links.

### 4.2 Assumed sheet structure

The supplied implementation assumes:

-   Worksheet name: `Creators`
-   Header or setup rows occupy rows 1--5.
-   Creator data begins at row 6.
-   The script reads 33 columns, A:AG.
-   Column references below are zero-based JavaScript row indexes.

  ----------------------------------------------------------------------------
  Field                         Column     Zero-based index Use
  --------------- -------------------- -------------------- ------------------
  Creator ID                         A                  `0` Stable identifier

  Name                               B                  `1` Public creator
                                                            name

  Profile URL                        C                  `2` Creator profile
                                                            link

  Niche                              E                  `4` Directory category

  Language                           F                  `5` Language metadata

  Followers                          G                  `6` Follower count

  Median views                       H                  `7` Median view count

  Email                              I                  `8` **Private by
                                                            default; do not
                                                            publish without
                                                            explicit
                                                            authorization**

  Status                             V                 `21` Approval/listing
                                                            status

  Notes                             AG                 `32` Internal notes;
                                                            extract only an
                                                            approved rate-card
                                                            URL
  ----------------------------------------------------------------------------

> **Important implementation note:** The example below preserves the
> original column assumptions and output fields for compatibility.
> Before deployment, confirm the exact column layout in the live CRM.
> For a public endpoint, do not return email addresses or unrestricted
> internal notes. The hardened version below only emits records with an
> explicitly approved status and only returns public fields.

### 4.3 Recommended public API contract

Each public creator record should use this shape:

``` json
{
  "id": "creator-id",
  "name": "Creator Name",
  "url": "https://example.com/creator",
  "niche": "Tech & Gadgets",
  "language": "Hindi",
  "followers": 100000,
  "medianViews": 25000,
  "ratio": 25,
  "rateCardLink": "https://drive.google.com/..."
}
```

-   `followers`: follower count as a number.
-   `medianViews`: median views as a number.
-   `ratio`: `medianViews / followers * 100`, rounded to a whole
    percentage.
-   `rateCardLink`: only a rate card that is safe and approved for
    public sharing.
-   Fields that are private or operational should remain server-side.

### 4.4 Google Apps Script (`Code.gs`)

This version preserves the specified sheet name, row start, and column
mapping while applying a public-approval filter and returning only
public fields. Adjust the accepted status value(s) to match the exact
values used in the CRM.

``` javascript
/**
 * Syntra Public Creator Directory Data Bridge
 *
 * Reads creator records from the "Creators" sheet and returns approved,
 * public-safe fields as JSON.
 *
 * Before deployment:
 * 1. Confirm the column mapping against the actual CRM.
 * 2. Set APPROVED_STATUSES to match the CRM's exact status vocabulary.
 * 3. Ensure rate-card links are approved for public access.
 * 4. Deploy as a Web App and test the public response.
 */

const SHEET_NAME = 'Creators';
const FIRST_DATA_ROW = 6;
const COLUMN_COUNT = 33;

// Update this list to match the exact approval status used in your sheet.
const APPROVED_STATUSES = ['Approved', 'Public', 'Active'];

function doGet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    return jsonOutput({
      error: 'Creator sheet not found',
      creators: []
    });
  }

  const lastRow = sheet.getLastRow();

  if (lastRow < FIRST_DATA_ROW) {
    return jsonOutput([]);
  }

  const rows = sheet
    .getRange(FIRST_DATA_ROW, 1, lastRow - FIRST_DATA_ROW + 1, COLUMN_COUNT)
    .getValues();

  const creators = [];

  rows.forEach((row) => {
    const creatorId = String(row[0] || '').trim();
    const name = String(row[1] || '').trim();
    const url = String(row[2] || '').trim();
    const niche = String(row[4] || '').trim() || 'Tech & Gadgets';
    const language = String(row[5] || '').trim();
    const followers = toNumber(row[6]);
    const medianViews = toNumber(row[7]);
    const status = String(row[21] || '').trim();
    const notes = String(row[32] || '').trim();

    const isApproved = APPROVED_STATUSES.some(
      (approvedStatus) =>
        approvedStatus.toLowerCase() === status.toLowerCase()
    );

    if (!creatorId || !name || !isApproved) {
      return;
    }

    // Extract a URL from notes only if the CRM's notes field is deliberately
    // used to store a public rate-card link. Prefer a dedicated column when
    // possible, and validate/approve links before publishing.
    let rateCardLink = '';
    const urlMatch = notes.match(/https?:\/\/[^\s]+/);

    if (urlMatch) {
      rateCardLink = urlMatch[0].replace(/[),.;]+$/, '');
    }

    // Only permit HTTPS links in the public response.
    if (rateCardLink && !/^https:\/\//i.test(rateCardLink)) {
      rateCardLink = '';
    }

    const ratio =
      followers > 0
        ? Math.round((medianViews / followers) * 100)
        : 0;

    creators.push({
      id: creatorId,
      name,
      url,
      niche,
      language,
      followers,
      medianViews,
      ratio,
      rateCardLink
    });
  });

  return jsonOutput(creators);
}

function toNumber(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  const parsed = Number(String(value || '').replace(/,/g, '').trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function jsonOutput(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 4.5 Deployment steps

1.  Open the Google Sheet that contains the CRM.
2.  Select **Extensions → Apps Script**.
3.  Add the script above to `Code.gs`.
4.  Confirm `SHEET_NAME`, the first data row, column count, and column
    indexes.
5.  Set the `APPROVED_STATUSES` array to match the exact values used by
    the team.
6.  Save the project.
7.  Deploy as a **Web app**.
8.  Choose an execution identity and access scope appropriate for a
    public directory. The endpoint should expose only public-approved
    fields.
9.  Copy the deployed Web App URL.
10. Test the URL in a browser and confirm it returns valid JSON.
11. Test at least one approved creator, one unapproved creator, an empty
    sheet, a missing rate-card URL, and a missing worksheet.
12. Add the endpoint URL to the frontend environment configuration.

> **Security note:** Anyone who can access a public Web App endpoint may
> be able to read its response. Never return CRM email addresses,
> private notes, negotiation details, or other confidential fields.
> Consider a separate public directory sheet containing only approved
> fields if the CRM includes sensitive data.

------------------------------------------------------------------------

## 5. Frontend Data Hook

### 5.1 Responsibilities

The hook should:

-   Fetch the deployed Apps Script endpoint.
-   Expose `creators`, `loading`, and `error`.
-   Handle invalid responses and network failures.
-   Avoid setting state after the component has unmounted.
-   Keep the endpoint configurable through an environment variable.

### 5.2 `useSyntraCreators.js`

``` javascript
import { useEffect, useState } from 'react';

export function useSyntraCreators(webAppUrl) {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!webAppUrl) {
      setCreators([]);
      setError(new Error('Creator API URL is not configured.'));
      setLoading(false);
      return undefined;
    }

    const controller = new AbortController();

    async function loadCreators() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(webAppUrl, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Creator API returned HTTP ${response.status}.`);
        }

        const data = await response.json();

        // The normal success response is an array. An error envelope from
        // Apps Script should be treated as a failed request.
        if (!Array.isArray(data)) {
          if (data && data.error) {
            throw new Error(data.error);
          }
          throw new Error('Creator API returned an unexpected response.');
        }

        setCreators(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Failed to load Syntra creators:', err);
          setError(err);
          setCreators([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadCreators();

    return () => controller.abort();
  }, [webAppUrl]);

  return { creators, loading, error };
}
```

### 5.3 Environment configuration

For a Vite project, create a `.env` file:

``` bash
VITE_SYNTRA_CREATORS_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Use it in the application:

``` javascript
const creatorsApiUrl = import.meta.env.VITE_SYNTRA_CREATORS_API_URL;
```

For Next.js, use an appropriately named public environment variable such
as `NEXT_PUBLIC_SYNTRA_CREATORS_API_URL`. Public environment variables
are visible to the browser, so the endpoint must not rely on the URL
being secret.

------------------------------------------------------------------------

## 6. Typography System

### 6.1 Google Fonts

Load **Syne** for display typography and **Inter** for body text.

Add these tags to the HTML document's `<head>`:

``` html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
  rel="stylesheet"
>
```

### 6.2 Typographic scale matrix

  -------------------------------------------------------------------------------------------------------
  Role         Font       Size                             Weight     Line       Letter       Transform
               family                                                 height     spacing      
  ------------ ---------- -------------------------------- ---------- ---------- ------------ -----------
  Hero title   Syne       `clamp(2.8rem, 7vw, 6rem)`       700--800   1.05       `-0.025em`   None
  (H1)                                                                                        

  Section      Syne       `clamp(1.875rem, 4vw, 2.5rem)`   700        1.15       `-0.02em`    None
  titles (H2)                                                                                 

  Card         Syne       `1.125rem–1.5rem`                600--700   1.25       Normal       None
  headings                                                                                    
  (H3)                                                                                        

  Stat         Syne       `clamp(2.5rem, 6vw, 5rem)`       800        1.00       Normal       None
  counters                                                                                    

  Pill badges  Inter      `10px`                           600        1.20       `0.20em`     Uppercase

  Body         Inter      `14px–16px`                      300--400   1.65       Normal       None
  paragraphs                                                                                  
  -------------------------------------------------------------------------------------------------------

### 6.3 Typography rules

-   Use Syne for the hero, section headings, card titles, and large
    metric numerals.
-   Use Inter for paragraphs, labels, buttons, navigation, metadata, and
    forms.
-   Use negative tracking selectively for large display headlines.
-   Avoid using tiny low-contrast body text over glass surfaces.
-   Keep body paragraphs readable on mobile and avoid excessively long
    line lengths.
-   Use uppercase labels sparingly to reinforce the editorial feel.

------------------------------------------------------------------------

## 7. Color Tokens & Theme Variables

### 7.1 Brand colors

  ---------------------------------------------------------------------------
  Token                   Value                       Intended use
  ----------------------- --------------------------- -----------------------
  Brand yellow            `#FFD100`                   Primary accent, active
                                                      states, CTA emphasis

  Brand yellow dim        `rgba(255, 209, 0, 0.18)`   Subtle accent
                                                      backgrounds

  Brand yellow glow       `rgba(255, 209, 0, 0.35)`   Ambient glows and hover
                                                      effects

  Brand black             `#080808` / `#070707`       Dark surfaces and brand
                                                      foundation
  ---------------------------------------------------------------------------

### 7.2 CSS custom properties

``` css
/* Shared typography and light theme */
:root {
  --font-display: 'Syne', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  --brand-yellow: #FFD100;
  --brand-yellow-dim: rgba(255, 209, 0, 0.18);
  --brand-yellow-glow: rgba(255, 209, 0, 0.35);
  --brand-black: #080808;

  --bg-primary: #f9f9f7;
  --bg-secondary: #f2f2ee;
  --bg-card: rgba(255, 255, 255, 0.92);
  --bg-card-hover: rgba(255, 255, 255, 0.98);
  --bg-overlay: rgba(0, 0, 0, 0.04);

  --text-primary: #0a0a0a;
  --text-secondary: #3d3d3d;
  --text-tertiary: #737373;
  --border-color: rgba(10, 10, 10, 0.09);
}

/* Dark theme */
[data-theme='dark'] {
  --bg-primary: #080808;
  --bg-secondary: #0d0d0d;
  --bg-card: rgba(14, 14, 14, 0.90);
  --bg-card-hover: rgba(20, 20, 20, 0.95);
  --bg-overlay: rgba(255, 255, 255, 0.04);

  --text-primary: #f5f5f3;
  --text-secondary: #c0c0ba;
  --text-tertiary: #8a8a84;
  --border-color: rgba(255, 255, 255, 0.07);
}
```

### 7.3 Theme behavior

-   Support both light and dark themes.
-   Dark mode should feel like the primary cinematic experience, while
    light mode remains intentionally designed rather than merely
    inverted.
-   The theme toggle should update the document theme attribute or a
    shared application theme state.
-   Persist the preference only if the implementation includes a
    suitable client-side persistence mechanism.
-   Ensure the yellow accent has sufficient contrast in both themes.
-   Use the same design tokens across buttons, cards, borders, forms,
    and hover states.

------------------------------------------------------------------------

## 8. Global Layout & Visual Language

### 8.1 Surfaces and borders

-   Prefer dark matte backgrounds, soft radial light, and thin borders.
-   Use glassmorphism for navigation, creator cards, service panels, and
    contact forms when it improves hierarchy.
-   Suggested glass surface:
    -   `backdrop-filter: blur(20px)`
    -   Semi-transparent background
    -   One-pixel low-opacity border
    -   Restrained shadow and glow
-   Avoid heavy drop shadows that make the design feel dated or overly
    skeuomorphic.

### 8.2 Glow usage

A golden hover glow may use:

``` css
box-shadow: 0 0 28px rgba(255, 209, 0, 0.2);
```

Use it for active service tabs, highlighted cards, or high-priority
interactive states---not every element at all times.

### 8.3 Spacing and composition

-   Use a consistent spacing scale and align sections to a common
    content grid.
-   Use generous section spacing and controlled text widths.
-   Make the hero visually dominant.
-   Alternate dense visual modules with calmer editorial sections.
-   Keep decorative elements subordinate to the content and actions.
-   Use a responsive grid rather than fixed desktop-only widths.

### 8.4 Media framing

-   The hero's mock editor viewport should use a **4:5 aspect ratio**.
-   Creator profile imagery, video thumbnails, and portfolio media
    should use consistent aspect ratios within their respective grids.
-   Use intentional cropping and avoid stretching media.
-   Provide fallback content if a remote image fails to load.

------------------------------------------------------------------------

## 9. Page Architecture & Component Specifications

### 9.1 Header & sticky navigation --- `Navbar.jsx`

**Purpose:** Persistent access to major sections and the main conversion
action.

Requirements: - Fixed or sticky navigation bar, approximately **64px**
high. - Use a translucent surface with backdrop blur. - Include brand
mark/wordmark and clear section navigation. - Include a celestial-style
light/dark theme toggle. - Include a shimmer CTA that remains readable
and usable. - Add a subtle bottom border. - On small screens, collapse
links into a keyboard-accessible mobile menu. - Keep focus indicators
visible and prevent the fixed header from covering anchor targets.

Suggested interactions: - Hover and focus states on links. - Smooth
scrolling to sections. - Theme toggle updates the entire site. - CTA
scrolls to or opens the contact/collaboration section.

### 9.2 Hero section --- `Hero.jsx`

**Purpose:** Establish the creative studio's positioning immediately.

Required content: - Eyebrow badge: "Editing-first creative studio" - H1:
"We craft stories that convert." - Supporting line that describes
Syntra's creative and commercial value. - Primary CTA to discuss a
project. - Secondary CTA to explore the work or creator network. -
Left/right vertical edge metadata, including a live IST clock if
implemented. - A **4:5 aspect ratio mock editor viewport** as the key
visual anchor.

Design behavior: - Use a strong typographic composition with generous
negative space. - Use subtle radial amber lighting and layered depth. -
Reveal text and media with restrained entrance motion. - Avoid excessive
animation that delays the main message. - Keep the primary CTA visible
without requiring a long scroll on common desktop viewports.

**Live clock implementation note:** If showing an IST clock, format the
time explicitly with the `Asia/Kolkata` time zone. Do not rely on the
visitor's local system time to represent IST.

### 9.3 Infinite marquee ticker --- `Marquee.jsx`

**Purpose:** Add continuous motion and reinforce the studio's service
range.

Ticker copy:

`Video Editing • Motion Graphics • AI Content • Thumbnail Design`

Requirements: - Continuous horizontal movement with no visible jump at
the loop point. - Duplicate the ticker content where needed to create a
seamless loop. - Keep enough spacing between items for readability. -
Use a low-contrast track with restrained yellow highlights. - Pause or
reduce motion when appropriate for accessibility. - Use
`aria-hidden="true"` on purely decorative duplicate content and provide
an accessible static equivalent.

### 9.4 Creator showcase portal --- `CreatorDirectory.jsx`

**Purpose:** Public directory powered by the Google Sheets CRM
integration.

Required behavior: - Load creator data through `useSyntraCreators`. -
Display creators in a categorized responsive grid. - Support the
following initial categories: - Tech & Gadgets - AI - SaaS &
Productivity - Beauty & Grooming - Show public follower counts and
median view counts. - Show a view-to-follower ratio pill. - Include a
creator profile link. - Include a **View Rate Card** action that opens a
modal or approved external rate-card link. - Provide loading, empty, and
error states. - Do not expose private CRM fields.

Recommended UX: - A compact category filter. - Optional search by
creator name or niche. - Clear number formatting (for example, `125K`
followers and `32K` median views). - Accessible card actions and focus
states. - External links should clearly indicate when they open a new
tab. - Rate-card modal should have a close button, keyboard support, and
focus management.

### 9.5 Services & bento grid --- `Services.jsx`

**Purpose:** Communicate service offerings in a visually rich,
interactive module.

Suggested service categories: - Video editing - Motion graphics - AI
content - Thumbnail design - Branding and creative direction -
Creator-brand campaign support

Requirements: - Use an interactive multimedia category/tab system. - Use
a bento-style grid with varied card sizes while maintaining alignment. -
Include clear service descriptions and relevant portfolio examples or
media. - Apply golden glow shadows to active or hovered cards using the
specified glow token. - Tabs must be keyboard accessible and visibly
indicate the active category. - Do not rely on hover alone; mobile and
keyboard users must be able to access all content.

### 9.6 Process & dynamic stats --- `Process.jsx`

**Purpose:** Explain the engagement workflow and communicate
credibility.

Requirements: - Present a four-step workflow sequence. - Use oversized
ghost numerals as a visual motif. - Use concise descriptions for each
step. - Include count-up statistics only where the underlying values are
real and maintained. - Animate counters when they enter the viewport,
while ensuring the final value is available to assistive technologies. -
If statistics are not verified, omit them or label them accurately
rather than inventing performance claims.

Suggested four-step structure: 1. **Discover** --- Understand the brand,
audience, objective, and deliverables. 2. **Strategize** --- Define the
creative direction and production plan. 3. **Create** --- Produce, edit,
review, and refine the assets. 4. **Deliver** --- Finalize assets and
support publishing or campaign handoff.

### 9.7 Contact & collaboration portal --- `Contact.jsx`

**Purpose:** Convert interest into a clear collaboration inquiry.

Requirements: - Glassmorphism form panel. - Animated floating labels,
implemented without sacrificing label clarity. - Direct social links. -
Clear submission state and error feedback. - Fields may include name,
brand/company, email, service of interest, budget range (optional),
timeline (optional), and project brief. - Use native input validation
where possible. - Provide an explicit privacy note and do not claim that
a message was sent unless a backend or form service confirms success.

Implementation note: - A frontend-only form does not deliver submissions
by itself. Connect it to a form provider, serverless function, or
backend endpoint before launch. - Do not put private API keys or email
service secrets in client-side code.

### 9.8 Footer --- `Footer.jsx`

**Purpose:** Provide a clean endpoint and secondary navigation.

Requirements: - Three-column directory layout on desktop. - Collapse
into a single-column or stacked layout on mobile. - Include brand
identity, primary site links, service links, creator directory access,
and social links. - Include a copyright notice with a dynamically
generated year. - Maintain readable contrast and generous spacing. -
Avoid an oversized footer that distracts from the contact conversion.

------------------------------------------------------------------------

## 10. Interaction, Animation & Motion System

### 10.1 Core easing

Use the primary motion curve:

``` css
--ease-brand: cubic-bezier(0.22, 0.9, 0.18, 1);
```

### 10.2 Motion principles

-   Motion should communicate hierarchy, continuity, or interaction.
-   Prefer short, controlled transitions for buttons, tabs, and cards.
-   Use scroll-triggered reveals sparingly and avoid hiding essential
    content until animation runs.
-   Keep infinite movement decorative and nonessential.
-   Ensure all content remains available when animations are disabled.
-   Respect `prefers-reduced-motion: reduce`.

### 10.3 Suggested motion patterns

-   Navbar: subtle background/border transition on scroll.
-   Hero: brief staggered text reveal and restrained media entrance.
-   Marquee: constant linear movement.
-   Cards: small elevation/translation and border/glow transition.
-   Service tabs: smooth content change without layout jank.
-   Process counters: count up once when visible.
-   Contact form: label transitions and clear success/error state.
-   Modal: fade and slight vertical movement, with reduced-motion
    fallback.

### 10.4 CSS baseline

``` css
:root {
  --ease-brand: cubic-bezier(0.22, 0.9, 0.18, 1);
  --motion-fast: 160ms;
  --motion-base: 280ms;
  --motion-slow: 520ms;
}

.interactive-surface {
  transition:
    transform var(--motion-base) var(--ease-brand),
    border-color var(--motion-base) var(--ease-brand),
    background-color var(--motion-base) var(--ease-brand),
    box-shadow var(--motion-base) var(--ease-brand);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

------------------------------------------------------------------------

## 11. Creator Directory Behavior

### 11.1 Data normalization

Before rendering, treat API values defensively: - Missing strings become
empty strings or a clear fallback label. - Numeric values should be
finite numbers. - Zero followers should produce a ratio of `0`, not
`Infinity` or `NaN`. - URLs should be validated before becoming
clickable links. - A creator without a rate card should still render;
hide or disable the rate-card action with a clear explanation.

### 11.2 Ratio definition

The ratio is defined as:

``` text
view-to-follower ratio (%) = (median views / followers) × 100
```

Example: 25,000 median views divided by 100,000 followers gives a 25%
ratio.

This is a simple comparative metric, not necessarily a platform-defined
engagement rate. Label it **Views / Followers** or **View-to-follower
ratio** to avoid implying that it includes likes, comments, shares, or
other engagement signals.

### 11.3 Filtering and sorting

Recommended options: - Filter by category/niche. - Search creator
names. - Optional sort by follower count or median views. - Optional
sort by view-to-follower ratio.

Ensure filtering is client-side only if the public dataset is reasonably
small. If the directory becomes large, add server-side filtering or
pagination.

### 11.4 Rate-card behavior

-   Only display approved links.
-   Prefer a dedicated rate-card URL column over extracting a URL from
    free-form notes.
-   Ensure the linked file's sharing permissions are correct.
-   Open an in-page modal when a preview is available; otherwise use a
    clear external link.
-   Do not embed private documents or expose a link that was not
    intended for public access.

------------------------------------------------------------------------

## 12. Services, Process, Contact & Footer

### 12.1 Services content guidance

Each service card should include: - Service name. - One concise
benefit-led description. - A relevant visual, clip, or thumbnail where
available. - A CTA such as "Discuss a project" or "View work". -
Consistent card spacing and accessible interaction states.

Avoid unsupported claims such as guaranteed virality, guaranteed
conversions, or guaranteed view counts.

### 12.2 Process content guidance

Use the four-step Discover → Strategize → Create → Deliver workflow as
the default. The exact labels may change to reflect Syntra's actual
operating process, but the sequence should remain easy to understand and
should set realistic expectations.

### 12.3 Contact form data model

A possible form payload:

``` json
{
  "name": "Visitor name",
  "company": "Brand or company",
  "email": "visitor@example.com",
  "service": "Video editing",
  "budget": "Optional budget range",
  "timeline": "Optional timeline",
  "message": "Project brief"
}
```

Send this payload only to a configured backend or form service. Validate
input server-side as well as in the browser.

### 12.4 Footer link groups

Suggested three-column structure: 1. **Syntra:** About, services,
creator network. 2. **Explore:** Portfolio/work, process, contact. 3.
**Connect:** Email and approved social profiles.

Only include working URLs and active social accounts.

------------------------------------------------------------------------

## 13. Tailwind CSS Configuration

### 13.1 `tailwind.config.js`

The following preserves the specified Tailwind tokens and custom easing:

``` javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'brand-black': '#070707',
        'brand-yellow': '#FFD100'
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22, 0.9, 0.18, 1)'
      }
    }
  },
  plugins: []
};
```

### 13.2 Tailwind implementation notes

-   Confirm the configuration matches the installed Tailwind version.
-   Use CSS custom properties for theme-dependent surface and text
    colors.
-   Keep one source of truth for brand colors and typography.
-   Avoid scattering raw color values across component files.
-   If the project uses a newer Tailwind version with a different
    configuration model, translate these tokens into the appropriate
    supported format rather than copying configuration blindly.

------------------------------------------------------------------------

## 14. Suggested Project Structure

``` text
syntra/
├── public/
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Marquee.jsx
│   │   ├── CreatorDirectory.jsx
│   │   ├── CreatorCard.jsx
│   │   ├── RateCardModal.jsx
│   │   ├── Services.jsx
│   │   ├── Process.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   └── useSyntraCreators.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.css
│   ├── utils/
│   │   ├── formatNumber.js
│   │   └── validateUrl.js
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
└── tailwind.config.js
```

This is a suggested structure, not a requirement. Keep the project
organized around clear component responsibilities and avoid creating
abstractions that add complexity without reuse.

------------------------------------------------------------------------

## 15. Accessibility, Responsiveness & Performance

### 15.1 Accessibility

-   Use semantic HTML landmarks and a logical heading hierarchy.
-   Provide visible keyboard focus indicators.
-   Ensure all interactive elements are keyboard operable.
-   Do not use color alone to communicate state.
-   Give icon-only buttons accessible names.
-   Associate form fields with labels and expose validation errors.
-   Ensure modals trap focus appropriately, close with Escape where
    suitable, and return focus to the invoking control.
-   Use adequate contrast for body text, secondary labels, borders, and
    buttons.
-   Respect reduced-motion preferences.

### 15.2 Responsive behavior

**Desktop** - Full navigation. - Multi-column creator and service
grids. - Split hero layout with metadata and the 4:5 visual.

**Tablet** - Reduce headline size and grid density. - Keep the hero
hierarchy intact. - Allow cards to wrap naturally.

**Mobile** - Collapsible navigation. - Single-column or compact
two-column cards where readable. - Stack hero content and media. -
Ensure buttons have comfortable touch targets. - Avoid horizontal
overflow from the marquee or edge metadata. - Make modal content fit
within the viewport.

### 15.3 Performance

-   Optimize images and video previews.
-   Lazy-load below-the-fold media.
-   Avoid unnecessarily large autoplay videos; mute them and provide
    fallbacks if used.
-   Minimize layout shifts by reserving media dimensions.
-   Keep animation work GPU-friendly where practical.
-   Cache or reduce repeated creator API requests where appropriate.
-   Avoid making the creator API request multiple times due to
    unnecessary component remounts.
-   Monitor font loading and use system fallbacks.

------------------------------------------------------------------------

## 16. Security, Privacy & Data Handling

-   Treat every public API response as public information.
-   Do not return email addresses, private notes, negotiation status,
    internal tags, or confidential CRM fields.
-   Use an explicit approval status to decide which creators appear.
-   Prefer a dedicated public data sheet or a dedicated rate-card
    column.
-   Validate outbound URLs and allow only appropriate protocols such as
    HTTPS.
-   Do not place secret keys in frontend environment variables.
-   Validate contact form submissions server-side.
-   Add spam protection and rate limiting to the form endpoint where
    appropriate.
-   Confirm Google Drive rate-card permissions before publishing.
-   Do not rely on a hidden URL or obscure frontend code as access
    control.
-   If access control is required, use an authenticated backend rather
    than a public Apps Script endpoint.

------------------------------------------------------------------------

## 17. Error States & Resilience

### 17.1 Creator directory states

**Loading** - Show a restrained skeleton or loading indicator. - Keep
the section heading visible.

**Success** - Render available approved creator cards. - If the list is
empty, show a helpful empty state.

**Error** - Show a concise message such as: "The creator directory
couldn't load right now." - Provide a retry action if practical. - Do
not expose stack traces or internal endpoint details to visitors.

**Missing rate card** - Keep the creator visible. - Hide the rate-card
button or show a disabled state with a clear label.

**Broken profile link** - Do not render an invalid URL as a clickable
action. - Validate URL values before display.

### 17.2 Contact form states

-   Idle
-   Submitting
-   Success after server confirmation
-   Validation error
-   Network/server error

Never show a success state before the submission endpoint confirms
success.

### 17.3 API considerations

-   The Apps Script endpoint should return predictable JSON.
-   The frontend should handle both empty arrays and unexpected response
    shapes.
-   Log technical errors for debugging, but show concise user-facing
    messages.
-   If the endpoint is unavailable, the rest of the website should
    continue to work.

------------------------------------------------------------------------

## 18. Implementation Checklist

### Brand and visual system

-   [ ] Use the Syntra name and approved core copy.
-   [ ] Load Syne and Inter.
-   [ ] Implement brand yellow `#FFD100` and dark surfaces.
-   [ ] Define theme variables for light and dark mode.
-   [ ] Apply the brand easing curve.
-   [ ] Use glass surfaces, hairline borders, and ambient glows with
    restraint.

### Navigation and hero

-   [ ] Build the approximately 64px sticky navbar.
-   [ ] Add working navigation links and theme toggle.
-   [ ] Add shimmer CTA.
-   [ ] Build the hero with "We craft stories that convert."
-   [ ] Add the 4:5 mock editor viewport.
-   [ ] If included, format the live clock using `Asia/Kolkata`.

### Motion and services

-   [ ] Build the infinite marquee ticker.
-   [ ] Ensure the marquee loops seamlessly.
-   [ ] Add reduced-motion support.
-   [ ] Build the interactive services bento grid.
-   [ ] Add keyboard-accessible tabs and active states.

### Creator data bridge

-   [ ] Confirm the `Creators` sheet column mapping.
-   [ ] Confirm data begins at row 6.
-   [ ] Confirm the approval status vocabulary.
-   [ ] Deploy Apps Script as a Web App.
-   [ ] Confirm the response contains only public-safe fields.
-   [ ] Test valid, empty, and malformed/missing data cases.
-   [ ] Configure the frontend API URL through environment variables.
-   [ ] Implement loading, error, empty, and retry states.
-   [ ] Add category filters and optional search.
-   [ ] Validate creator and rate-card links.

### Process and conversion

-   [ ] Build the four-step process sequence.
-   [ ] Use only verified statistics.
-   [ ] Build the contact form.
-   [ ] Connect the form to a real submission service/backend.
-   [ ] Implement validation, submitting, success, and error states.
-   [ ] Add direct social links.
-   [ ] Build the three-column footer.

### Quality assurance

-   [ ] Test mobile, tablet, and desktop layouts.
-   [ ] Test keyboard navigation and focus states.
-   [ ] Test light and dark themes.
-   [ ] Test reduced-motion mode.
-   [ ] Check text and interactive contrast.
-   [ ] Check browser console and network errors.
-   [ ] Confirm no private CRM fields are exposed.
-   [ ] Confirm all public rate-card links are approved and accessible.
-   [ ] Verify the production deployment and all live links.

------------------------------------------------------------------------

## 19. Deployment & Acceptance Criteria

### 19.1 Deployment sequence

1.  Finalize and verify the Google Sheet schema.
2.  Deploy the Apps Script endpoint and test its JSON output.
3.  Configure the frontend API URL in the hosting provider's environment
    settings.
4.  Build and test the frontend locally.
5.  Run responsive, accessibility, and error-state checks.
6.  Deploy to the hosting provider.
7.  Test the production website using the live endpoint.
8.  Verify the contact form delivers submissions.
9.  Confirm the site contains no private CRM fields or unapproved
    rate-card links.
10. Re-test after any changes to the sheet structure or Apps Script
    deployment.

### 19.2 Definition of done

The Syntra implementation is ready when:

-   The site consistently reflects the dark luxury cyber-editorial
    design direction.
-   The hero, marquee, services, process, creator directory, contact
    section, and footer work on desktop and mobile.
-   Light/dark themes behave consistently.
-   The creator directory is populated from the live Google
    Sheets-backed endpoint rather than hardcoded records.
-   Only approved creators and public-safe fields are returned.
-   Follower count, median views, and view-to-follower ratio are
    displayed accurately.
-   Rate-card actions work only for valid, approved links.
-   Loading, empty, and error states are handled gracefully.
-   The contact form submits to a real endpoint and reports its actual
    result.
-   Keyboard accessibility, reduced-motion behavior, and responsive
    layouts have been checked.
-   The production deployment has been tested end-to-end.

------------------------------------------------------------------------

## Final Build Principle

**Syntra should feel like a premium motion studio first and a creator
network second.** The visual experience earns attention; the service
presentation builds confidence; the live creator directory proves the
network is operational; and the contact flow converts that confidence
into a real collaboration.
