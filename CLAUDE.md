# Jade Nichols Portfolio

Personal portfolio site, published with GitHub Pages at https://jade-nichols.github.io from a public repository.

## Who
Jade Nichols: landscape architecture master's student at CCNY Spitzer, urban planning degree from Cornell. Combines community engagement, spatial data analysis, and design. Full bio: `_source/Bio.txt`.

## Purpose
For anyone curious about Jade's work, as a whole or one specific project: job applications, coffee chats, networking, professors, friends, and curious clients. Also a lasting record of Jade's best work. It should be more dynamic and engaging than a PDF portfolio, include more projects, and show skills beyond architecture and planning.

## Pages
Visual reference: `_source/home_mockup_1.jpg`, `home_mockup_2.jpg`, `about_mockup.jpg`, `projectpage_mockup.jpg` (Jade's Illustrator mockups). Ignore `home_mockup_idea_2.jpg` for now. Keep the design clean and simple.

### Home (`/`)
- A no-scroll page: the Cypress sketch fills the window, with the name, pronouns, and menu (About, Projects, Sketching) in the gap.
- **About:** the right side of the sketch crossfades into the about section at `/#about`; the left sketch and the menu stay visible. Clicking the name replaces About with the sketch again.
- **Projects:** a smooth dropdown opens with every project, whether the sketch or the about section is showing. `+` becomes `v` when open. Coming back from a project reopens the list. Order: Greitzer Memorial Park, Before the Stadium, Reconnecting Across Chester, MCDA for the OPC, Synergy: A Social Wellness Hub, Complete-ing South Main, Emissions Calculator, Third Rail, Spomen Dom.
- Hovering a project line underlines it with a thin light grey line. Clicking opens that project's own page at its own URL, in the same tab.
- **About section:** bio, contact, CV link. Email underlines on hover and opens a draft to Jade (`mailto:`). LinkedIn underlines on hover and opens in a new tab. "Access CV" is always underlined and opens the CV in a new tab.
- **Bio:** the site uses the longer mockup version, not `_source/Bio.txt`.
- **Menu placement:** the sketch never moves when Projects opens, and text never overlaps the sketch. The menu sits above the open space and the list drops into it. This matters more than how the sketch is cropped.
- **16:9 and wider:** looks exactly like the mockup.
- **Large tablets and narrow windows:** the bottom of the sketch is cropped so the open space runs all the way through, and the sketch is split into tree and arch sections, pulled apart to fit the list.
- **Phones and small tablets:** no tree. Text on the left, arch section only to its right.
- **8:5 and wider is the no-scroll layout; narrower windows scroll:** About follows the sketch; the About link scrolls to it and the name returns to the top.
- **About in the no-scroll layout:** the "About" heading shares a line with "Nichols", with generous space to the window edges.
- **Short windows:** type and menu scale with the sketch so the composition holds.
- **Font:** Albert Sans, self-hosted in `assets/fonts/` (free, open license). The file only covers basic Latin plus common punctuation: letters like š or ć and symbols like → fall back to another font and look bold, so avoid them (e.g. "Kolasin", "to"). Jade rejected Hanken Grotesk because of its J; check the J in any font change.

### Sketching (`/sketching/`)
Visual reference: `_source/sketching_land_mockup.jpg`, `_source/sketch_pg1_mockup.jpg`.
- **From the home page:** clicking Sketching plays an animation and changes the URL without reloading. The menu quickly fades, the word moves up to its new position, the pencil sketch fades in at 40% over the base sketch, and Back and the down arrow appear. Opening `/sketching/` directly shows the end state.
- **Alignment and smoothness matter most.** The pencil sketch must line up with the base sketch at every window size; being cut off on the left is fine. Its position is measured against the mockup and documented in `assets/home.css`.
- **Narrow windows:** the tree and arch sections slide back together so the sketches line up. On phones the whole base sketch fades in.
- **Show as much of the pencil drawing as possible:** when the window is shorter than the sketch, the sketch rises on the Sketching page so its bottom shows, cropping the top instead.
- **Ample white space** between the bottom of the sketch and the first page of sketches.
- **Sketching with the down arrow:** glides down to the first page of sketches, a little slower than the browser's own smooth scroll. Normal scrolling also works.
- **Back:** returns to home with the project list closed, reversing the animation when possible.
- **Pages of sketches:** each is three panels cut from a mockup (`sketch_pg1_mockup.jpg`, `sketch_pg2_mockup.jpg`), in a row, stacked on phones. New pages follow the same pattern.
- **Rows of single sketches** follow pages 1 and 2, three per row, alternating three vertical and three horizontal, then a final row of two horizontal pen sketches (`sk-pair`, same overall width). They come from `_source/Sketching/sketches png/`, cleaned to black and white with similar line weights (`assets/sketching-3a.png` onward). Most are pencil: keep their grey tones and detail, only whitening the paper, smudges and scan edges. Pen drawings can go pure black and white. Don't make them too dark.

### Project pages (`/projects/<project-name>/`)
- **Back (top left):** goes to home and stays in the same position while scrolling. On hover, the arrow and the word are both underlined.
- **Cover section:** cover image (16:9), project title, type, location, date. Size the cover to the window height so the title and More stay visible without scrolling.
- **Deliverable link, opens in a new tab, where a project has one:**
  - Full report or paper: Johnson City, Pietralata, MCDA
  - Sketchfab link (https://skfb.ly/o8yCw), plus an embedded 3D viewer on the page: Spomen Dom
  - Full presentation deck: Chester (Synergy has none, by choice)
- **Team line:** under the date and above any deliverable link, a small light grey semi-bold line (`.project-team`): "Collaborators: …" listing teammates, or "Solo project". Large teams name the co-manager plus a count.
- **Next (bottom right):** mirrors Back, fixed while scrolling, links to the next project in menu order (the last loops to the first). Added by `assets/project.js`; update its list if projects change.
- **Icons and link previews:** every page has the JN tab icon (`assets/favicon-32.png`, `icon-512.png`, `apple-touch-icon.png`, drawn in Albert Sans) and Open Graph tags using its title, description and cover image.
- **More (right side):** scrolls down past the whole cover section (image, title, type, location, date) so the intro text is the first thing on screen, at any screen size. Normal scrolling also works. Unlike Back, More does not follow the scroll.
- **Project content:** loosely based on the project's pages in `_source/Jade Nichols Urban Planning and Design Portfolio.pdf`, with its text copied verbatim (including captions and collaborator credits). Images, maps, and diagrams come from the project's `_source` folder, chosen and organized in the site's style. Greitzer is the reference example.
- **Headings and labels:** never all caps, even where the portfolio uses them. Capitalize only the first letter of each main word ("Crash Heatmap", "Before"). This includes text baked into images: crop it out and set it as page text instead.
- **Map titles** sit just above that map's key, not centered over the map.
- **Before and after:** the before photo sits beside the rendering, each labeled "Before" or "After" below its bottom-left corner. When they stack (phones, portrait windows), the after image fills the full width and the before photo stays at 60%.
- **Text beside images:** a paragraph should never run far past the image beside it. When the content column is narrower than 900px, text-and-image pairs stack, with the text above the image (`@container` rule in `assets/project.css`).
- **Full bleed:** large plans can span the whole window, edge to edge (`class="pj-bleed"`): the Greitzer site plan, the Chester masterplan, and the Pietralata methodology roadmap, street sections and four open space maps. Trim any white border from the image first.
- **Template:** `projects/greitzer-memorial-park/` (built from `projectpage_mockup.jpg`), styled by `assets/project.css` and `assets/project.js`. Each project's images and PDFs go in `assets/<short-name>/`. The cover comes from the `landing image` in the project's `_source` folder.
- **Chester:** `projects/reconnecting-across-chester/`, images in `assets/chester/`. Its `_source` folder has no landing image, so the cover is `Final Render 1.jpg`. The before photos and street sections come from the portfolio pages.
- **Greitzer report:** `assets/greitzer/greitzer-report.pdf` is the 10 MB final report, linked from the cover and the end of the page.
- **Greitzer report spreads:** a Report Spreads section after the intro shows four book mockups (`_source/Greitzer/Spreads/`), trimmed to `assets/greitzer/spread-*.jpg`.
- **Before the Stadium:** `projects/before-the-stadium/`, images in `assets/pietralata/`, titled "Monti di Pietralata Before the Stadium" (the menu keeps "Before the Stadium"). Not in the portfolio, so the text is copied verbatim from `Monti di Pietralata Final Report.pdf`; images come from the report, `maps/`, `charts/`, the pamphlet JPGs, `Poster4Final.pdf` and `PosterFinal.pdf` (the other three posters in full resolution; the word clouds are Jade's originals, saved as `word cloud intercept.png` and `word cloud stakeholder.png`). The cover is `_MG_0864.jpg` (construction) and the plaza photo is `_MG_0807.jpg`. Cognitive map drawings are cleaned to white paper with darker, slightly heavier lines and fitted to the same square. Don Julio's comes from the original photo, `cognitive map don julio.jpg`; the others come from the report. "Inside the Full Report", between the intro and Neighborhood Context, lists every report section, marking which ones the page covers. The full report (20 MB) is the deliverable.
- **MCDA:** `projects/mcda-for-the-opc/`, images in `assets/mcda/`, titled "Multi-Criteria Decision Analysis for the Obama Presidential Center" (the menu keeps "MCDA for the OPC"). Built from portfolio pages 16-19; the cover is `OPC Render After.png`. All-caps titles in the source graphics were whited out and set as page text; the block-group shapes, rent table and Housing Preservation District cards are rebuilt as page content. "Access Full Paper" opens the 6.7 MB paper.
- **South Main:** `projects/complete-ing-south-main/`, images in `assets/south-main/`, titled "Complete-ing South Main St." (the menu keeps "Complete-ing South Main"). Built from portfolio pages 20-23; the cover is `final render 2.jpg`. The intro is the portfolio text plus the last sentence ending "...for Elmira's most vulnerable residents: a complete street." The full site plan (`AC FINAL SAT+COLOR South Main Design Proposal.pdf`) runs full bleed before Construction Phases, with a hover magnifying lens (4x, `data-zoom` pointing to the larger `site-plan-zoom.jpg`; any image can use it), with a small "Hover over the plan to magnify" note (`.pj-hint`, hidden on touch screens). The plan is cropped just above the Route 14 junction. No deliverable link.
- **Synergy:** `projects/synergy/`, images in `assets/synergy/`, titled "Synergy: A Social Wellness Hub". Built from portfolio pages 24-26; the cover is `Cover Render.jpg`. The care columns and the site plan key are rebuilt as page text; the site plan runs full bleed (no lens). Typologies are rebuilt: each massing model cut out at one shared scale (`typ-*.jpg`), with its details as aligned page text. No deck PDF is in `_source/Synergy`, so there is no "Access Full Deck" link yet.
- **Emissions Calculator:** `projects/event-emissions/`, images in `assets/emissions/`, titled "Building Climate Awareness into Event Planning" (the menu says "Emissions Calculator"). Mostly text from `Emissions Calculator Guide and Workflow (1).docx` plus slides from `SummerShowcaseJadeNicholsFinal (1).pdf`, with slide titles cropped off and stale "finishing this week" notes covered. Partner contact names, the internal Airtable dashboard screenshot and the spreadsheets are deliberately left out.
- **Third Rail:** `projects/third-rail/`, images in `assets/third-rail/`. Cover is the inside-the-car render (`final render 1.png`); no logo. Models and sketches are trimmed to the drawing; the two elevations sit at column width on matching canvases so their drawings and level markers line up. Cornell DEA/FSAD 1140, HEB T70 Exhibition Space, Spring 2025 (dates from the drawing title blocks). The first intro paragraph is Jade's own description; the second describes the exhibition. Other class assignments in `images/` (HW2 pattern, portrait, Brutalism board) and the MTA subway map are left out.
- **Spomen Dom:** `projects/spomen-dom/`, images in `assets/spomen-dom/`. The intro quotes the Spomen Dom passage from Jade's Cornell application essay (`Cornell Spomen Dom Response.pdf`); never publish that PDF, it has personal details. "View on Sketchfab" opens the model; a 3D Model section embeds the Sketchfab viewer.
- **PDF size:** GitHub warns about files over 50 MB and refuses ones over 100 MB, and big PDFs are slow to open on phones. Check sizes before committing.

## Folder structure
- `index.html`: home page
- `projects/<project-name>/`: one folder per project sub-page
- `assets/`: web-ready images, CSS, JavaScript, and the public CV
- `_source/<project-name>/`: originals, one subfolder per project
- `tasks/`: open tasks live here; finished ones move to `tasks/done/`

## Rules
- Never commit `_source/`; it holds originals and is listed in `.gitignore`.
- Never edit or delete originals. Put web-ready copies in `assets/`.
- Everything committed is public. Check with Jade before publishing anything from `_source/`.

## Undecided: ask, don't assume
- **Sketching section:** what comes after the first page.
