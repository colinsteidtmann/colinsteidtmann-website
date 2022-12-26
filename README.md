# My website - [colinsteidtmann.com](https://www.colinsteidtmann.com/)

## Goals of this project

Create a personal website that prioritizes code simplicity and maintainability over performance.

---

## Organization

Main folders:

- components
  - Files that export reusable pieces of UI.
- content
  - Sub-folders of the content "type"
    - Sub-folders w/the name of the content "slug"
      - index.mdx - the main piece of content
      - pictures/components that the content uses.
- lib
  - Files that export helper functions, e.g. finding a piece of content w/a specific slug or find all content w/a specific type.
- pages
  - \_document.js - Customizes HTML tags and Head tags for _all_ pages. (Favicons, site-language, scroll behavior).
  - \_app.js - Defines context providers and layouts
  - Websites pages
    - index.js - home page
    - about.js - about page
    - notes folder
      - index.js - all notes
      - [slug].js - a specific note
- public
  - static assets, aka assets that aren't processed by a server.

---
