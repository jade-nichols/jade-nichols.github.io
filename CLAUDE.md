# Jade Nichols Portfolio

Personal portfolio site, published with GitHub Pages at https://jade-nichols.github.io from a public repository.

## Who
Jade Nichols: landscape architecture master's student at CCNY Spitzer, urban planning degree from Cornell. Combines community engagement, spatial data analysis, and design. Full bio: `_source/Bio.txt`.

## Purpose
For anyone curious about Jade's work, as a whole or one specific project: job applications, coffee chats, networking, professors, friends, and curious clients. Also a lasting record of Jade's best work. It should be more dynamic and engaging than a PDF portfolio, include more projects, and show skills beyond architecture and planning.

## Pages
- **Home (`/`):** one page and one URL.
  - Opens on an introductory graphic with two links: ABOUT and PROJECTS.
  - ABOUT scrolls down to the section below the graphic: bio, contact info, and CV link.
  - PROJECTS goes to the projects page.
- **Projects (`/projects/`):** all projects, linking to a sub-page for each one.

Keep the design clean and simple.

## Folder structure
- `index.html`: home page
- `projects/index.html`: projects page
- `projects/<project-name>/`: one folder per project sub-page
- `assets/`: web-ready images, CSS, JavaScript, and the public CV
- `_source/<project-name>/`: originals, one subfolder per project
- `tasks/`: open tasks live here; finished ones move to `tasks/done/`

## Rules
- Never commit `_source/`; it holds originals and is listed in `.gitignore`.
- Never edit or delete originals. Put web-ready copies in `assets/`.
- Everything committed is public. Check with Jade before publishing anything from `_source/`.

## Undecided: ask, don't assume
- **Intro graphic:** should be visually engaging, such as movement or a cursor that reveals a collage of images.
- **Project organization:** options are categories (design, community engagement, data analysis, other), a timeline, or one list sorted by relevance and quality. Many projects span several categories.
