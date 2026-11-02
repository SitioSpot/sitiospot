# LEARN.md: how this website works

Written for someone who knows basic HTML and wants to understand the whole project well enough to maintain it and, later, build sites for customers.

---

## 1. How HTML, CSS, and JavaScript work together

Think of a house:

| Language | Role | Analogy | In this project |
|---|---|---|---|
| **HTML** | Structure and content | Walls and rooms | `index.html`, `es/index.html`, `en/index.html` |
| **CSS** | Appearance | Paint, furniture, layout | `css/styles.css` |
| **JavaScript** | Behavior | Light switches, doors | `js/main.js`, `js/config.js` |

The browser loads the HTML first. Inside the HTML, these lines tell it to fetch the other files:

```html
<link rel="stylesheet" href="../css/styles.css">   <!-- in <head>: load the styling -->
<script src="../js/config.js"></script>             <!-- at the end: load the data -->
<script src="../js/main.js"></script>               <!-- then the behavior -->
```

Order matters: `config.js` comes before `main.js` because `main.js` *uses* the data that `config.js` creates.

**A concrete example, the WhatsApp button:**
1. HTML: `<a class="btn btn-primary" href="https://wa.me/524426530823" data-whatsapp>` creates the button.
2. CSS: the `.btn` and `.btn-primary` rules make it a blue rounded button.
3. JavaScript: `main.js` finds every element with `data-whatsapp` and sets its link to your number plus the pre-written message from `config.js`.

The HTML link already works on its own; JavaScript only improves it. Building pages that still work if something fails is called *progressive enhancement*.

---

## 2. What each file does

| File | What it does |
|---|---|
| `index.html` | Language choice page. Has two links (`es/`, `en/`). |
| `es/index.html`, `en/index.html` | The real website, one per language, with identical structure. Sections: header, hero, services, portfolio, pricing, how it works, about, FAQ, contact, footer. |
| `css/styles.css` | Every visual rule. Starts with **design tokens** (colors, sizes) so you change a color once. |
| `js/config.js` | One object, `SITIO_CONFIG`, with your phone, prices, email, social links, location. |
| `js/main.js` | Reads the config and fills the pages; builds links; runs the mobile menu; saves the language. |
| `images/*.svg` | Logos. SVG is code-based, stays sharp at any size, and is tiny. |
| `.nojekyll` | An empty file that tells GitHub to publish your files exactly as they are. |

---

## 3. How to edit things

### Change a price
Open `js/config.js`, edit the `prices` block:

```js
prices: { from: "1,000", rangeFrom: "1,000", rangeTo: "3,000",
          maintenanceFrom: "200", maintenanceTo: "400" }
```

Save, refresh. Both languages update. Why? In the HTML the price is written as `$<span data-config="prices.from">1,000</span> MXN`. `main.js` replaces the text inside any tag that has `data-config` with the matching value from the config.

**Limit to know:** the FAQ answer about maintenance has `$200–$400` typed directly as text. If you change maintenance prices, also edit that sentence in both HTML files. (Good first practice: convert it to use `data-config` spans like the pricing section does.)

### Change phone, email, location, social links
Edit `js/config.js`:
- `whatsapp`: digits only, country code first (`52` + 10-digit number).
- `email`: type your address and the email line appears in the contact section. Leave `""` to keep it hidden.
- `social`: add a URL and that button appears.

The plain fallback number `524426530823` also appears in the HTML `href` attributes (so links work without JavaScript). If you ever change the number, search for it in all three HTML files (in VS Code: `Ctrl + Shift + F`) and replace it.

### Change text
Open `es/index.html` or `en/index.html`, find the text (`Ctrl + F`), edit it between the tags. **Edit both files** so the languages stay equivalent.

### Change, add, or remove a service
Each service is one `<article class="card"> ... </article>` block. To add one: copy a whole block, paste it next to the others, change the icon, `<h3>` title, and `<p>` description. Do it in both languages.

### Change colors
At the top of `css/styles.css`:

```css
--blue: #2f7bff;
--bg: #0a0c10;
```

Change the hex values and everything using them changes. Tip: any "color picker" site gives you hex codes.

### Replace logos and images
- Keep the **same file name** and overwrite the file in `images/`; nothing else to change.
- Or use a different name and update the `src="../images/logo-mark.svg"` lines in the HTML.
- For a PNG/JPG photo (for example your own photo in the About section), put it in `images/` and use: `<img src="../images/serafin.jpg" alt="Serafin Ruiz, founder of SitioSpot" width="240" height="240">`. Always write a meaningful `alt` text; compress photos first (aim for under 200 KB) so the site stays fast.
- **Social media:** `logo-mark.svg` is a good square profile picture. Most platforms need PNG/JPG, so open the SVG in a browser and take a screenshot, or use any free SVG-to-PNG converter.

### Replace the demonstration concepts with real projects
In the Portfolio section, each card has a `Demonstration concept` badge. When you have a real, approved client project: replace the mini mockup with a screenshot in `images/`, delete the badge, and add a link to the live site. **Never remove the badge from a concept that isn't a real project.**

---

## 4. Language handling

- The root `index.html` shows two links. Clicking one saves `"es"` or `"en"` with `localStorage.setItem("sitiospot-lang", ...)`.
- `localStorage` is a small storage space inside the visitor's own browser. Nothing is sent to a server.
- On their next visit, `main.js` sees the saved value on the front page and redirects with `location.replace("es/")`.
- The ES/EN switcher on both sites saves the new choice before navigating.
- Opening `/es/` or `/en/` directly (for example from a link you sent on WhatsApp) never redirects, so shared links always show the language you intended.
- Each page has `<html lang="es">` or `<html lang="en">`. Screen readers use it to choose pronunciation, and `main.js` uses it to know which language to show.

---

## 5. Relative paths

A path says where a file lives *relative to the file that mentions it*.

| Path | Meaning |
|---|---|
| `css/styles.css` | From here, go into `css`, find `styles.css` |
| `./css/styles.css` | Same thing (`./` = "this folder") |
| `../css/styles.css` | Go **up one** folder, then into `css` |
| `/css/styles.css` | Start at the **domain root**. Avoid this one. |

Used here:
- Root `index.html` → `css/styles.css` (the CSS folder is beside it).
- `es/index.html` → `../css/styles.css` (it's inside `es/`, so go up first).

Why avoid the leading `/`? GitHub Pages serves your project at `https://username.github.io/sitiospot/`. A path starting with `/` jumps to `https://username.github.io/css/styles.css`, which doesn't exist. Relative paths always work, whether the site lives at a project URL, a custom domain, or in a folder on your computer.

---

## 6. Responsive and mobile-first design

The base CSS targets phones. Wider screens add rules in blocks like:

```css
@media (min-width: 900px) { ... }
```

Read it as "only when the screen is at least 900px wide". The mobile menu works with:
- a button (`.nav-toggle`) with `aria-expanded="false"`; JavaScript flips it to `"true"` when clicked,
- CSS that shows the menu only when it has the class `is-open`,
- a media query that always shows the menu on wide screens.

Accessibility touches to keep when you edit:
- Every image has an `alt` (empty `alt=""` for purely decorative ones).
- Buttons and links are at least ~48px tall to tap easily.
- `:focus-visible` shows a ring when navigating with the keyboard (try pressing `Tab`).
- Animations switch off for people who set "reduce motion" (`prefers-reduced-motion`).
- Text/background colors have strong contrast. If you change colors, check them with a free contrast checker.

---

## 7. How GitHub works (the essentials)

- **Git** tracks every change to your files over time, like an unlimited "undo history".
- **GitHub** is a website that stores Git projects online.
- **Repository (repo):** one project's folder plus its history.
- **Commit:** a saved snapshot with a short message ("Update prices").
- **Branch:** a line of history. `main` is the primary one and the one Pages publishes.
- **Push:** send your commits to GitHub.

### How GitHub Pages publishes
1. You commit to `main`.
2. GitHub Pages notices the change and copies your files to its web servers.
3. They are served at `https://USERNAME.github.io/REPO-NAME/`.

It only serves **static** files (HTML, CSS, JS, images). It cannot run server code or databases, which is why this project has no contact form: WhatsApp is the contact channel.

Go further when ready: install **GitHub Desktop** (visual, no commands) or **Git** + **VS Code**. Then you edit on your computer, preview locally, and "commit + push" instead of editing in the browser.

---

## 8. Practice exercises (in order of difficulty)

1. Change `whatsappMessage` in `config.js`, refresh, tap a WhatsApp button, and see the new message.
2. Change `--blue` in `styles.css` to another color and watch the site change.
3. Add a fifth FAQ question in both languages (copy a `<details>` block).
4. Convert the FAQ's `$200–$400` text to `data-config` spans.
5. Add your photo to the About section.
6. Add a new section (for example "Industries we serve") to both languages and add it to the navigation.
7. Publish a change through GitHub and time how long it takes to appear.

---

## 9. Reusing this for customer websites

You don't need a generator. This workflow already scales:

1. **Duplicate** the project folder; rename it for the client (`cafe-la-luna`).
2. **New GitHub repo** per client, with its own Pages site.
3. Edit `config.js` with the client's phone, hours, location, and social links.
4. Replace text and images; adjust colors via the tokens at the top of `styles.css`.
5. Test on your phone, then publish.

Keep the habits that make this reusable: contact details in `config.js`, colors in CSS variables, relative paths, comments explaining each section.

**Decisions to make before your first paying client:**
- **Who owns the repo?** Options: the client creates a GitHub account and you work in it, or you host under your account and transfer it on request. Decide it, tell the client, and put it in writing.
- **Content approval:** get written permission (a WhatsApp message counts) before showing a client's work in your portfolio.
- **Scope:** write down what's included (number of pages, revisions) so the quote is clear.
- **Domains:** the customer buys the domain in their own name whenever possible.

---

## 10. Glossary

- **Static site:** files served exactly as stored; no server-side code.
- **Responsive:** the layout adapts to any screen size.
- **Deploy:** put your site online.
- **DNS:** the internet's address book; it connects a domain to your hosting.
- **Hex color:** a color code like `#2f7bff`.
- **Console:** the browser tool (right-click → Inspect → Console) that shows code errors.
