# SitioSpot website

Bilingual (Spanish / English) static website for SitioSpot.
Built with plain HTML, CSS, and JavaScript. No frameworks, no build step, no backend.

> Reading order: **this file** (what's inside + how to publish) → **LEARN.md** (how it all works + how to edit).

---

## 1. What's in the folder

```
sitiospot/
├── index.html          Language choice page (the front door, "/")
├── es/index.html       Spanish site  ("/es/")
├── en/index.html       English site  ("/en/")
├── css/styles.css      All colors, spacing, and layout
├── js/config.js        YOUR CONTROL PANEL: phone, prices, email, social, location
├── js/main.js          Behavior: mobile menu, language memory, WhatsApp links
├── images/             Logos and favicon (SVG files)
│   ├── logo-mark.svg   Symbol only (used in the header, good for profile pictures)
│   ├── logo-dark.svg   Full logo for dark backgrounds (white text)
│   ├── logo-light.svg  Full logo for light backgrounds (dark text)
│   └── favicon.svg     The small icon in the browser tab
├── .nojekyll           Tells GitHub Pages to publish files exactly as they are
├── README.md           This file
└── LEARN.md            Learning guide
```

A folder named `es` containing a file named `index.html` is shown at the address ending in `/es/`.
That is why each language has its own folder.

---

## 2. See the site on your computer first

**Easiest:** double-click `index.html`. It opens in your browser.

**Better (acts like a real server):** open a terminal in the project folder and run:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. Stop it with `Ctrl + C`.
(On Windows you may need to type `python` instead of `python3`.)

Quick test checklist:
- The front page lets you pick a language.
- After picking one and coming back to the front page, it jumps straight to your language. (Add `?choose` to the address to see the choice page again.)
- The WhatsApp buttons open a chat with +52 442 653 0823.
- Shrink the browser window: the menu becomes a button.

---

## 3. Publish with GitHub Pages (free), step by step

**Key idea:** GitHub *stores* your files in a "repository" (repo). GitHub Pages *serves* those files as a website. Every time you save changes to the repo, the website updates itself.

### Step 1: Create a GitHub account
Go to https://github.com and click **Sign up**. Pick a username you're happy to have in your site address (it becomes `username.github.io`). Verify your email.

### Step 2: Create the repository
1. Click the **+** at the top right → **New repository**.
2. **Repository name:** `sitiospot`
3. Choose **Public**. (GitHub Pages is free for public repositories on a free account.)
4. Leave the other checkboxes empty. Click **Create repository**.

### Step 3: Upload the files
1. On the new empty repo page, click **uploading an existing file**.
2. Open the unzipped `sitiospot` folder on your computer. **Select everything inside it** (`index.html`, `es`, `en`, `css`, `js`, `images`, `README.md`, `LEARN.md`) and drag it into the browser window.
3. Check that the file list shows the `es`, `en`, `css`, `js`, `images` folders.
4. Scroll down, write a message like `First version of SitioSpot`, and click **Commit changes**.

> **Most common mistake:** uploading the *outer* `sitiospot` folder itself. Then your files end up one level too deep and the site shows a 404. `index.html` must be visible **at the top level** of the repo.
>
> `.nojekyll` starts with a dot, so your file explorer may hide it. If it didn't upload, don't worry: the site works without it.

### Step 4: Turn on GitHub Pages
1. In your repo, click **Settings** (top row of tabs).
2. In the left menu click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose `main` and the folder `/ (root)`. Click **Save**.

### Step 5: Wait, then visit
After 1 to 3 minutes the Pages screen shows: *"Your site is live at https://YOUR-USERNAME.github.io/sitiospot/"*. Open it. That is your website. You can send this link on WhatsApp.

### Step 6: Updating the site later
Easiest way, no extra software:
1. Open the file in your repo (for example `js/config.js`).
2. Click the **pencil icon** (Edit).
3. Make your change, click **Commit changes**.
4. Wait about a minute and refresh the site.

To replace a file such as a logo, use **Add file → Upload files** with the same file name; GitHub overwrites the old one.

*Later, when you're comfortable:* GitHub Desktop or Git on the command line let you edit files on your computer and "push" changes in one step. LEARN.md explains the idea.

### Step 7 (optional, later): custom domain
1. Buy a domain from a registrar (you pay yearly).
2. In repo **Settings → Pages → Custom domain**, type it and follow GitHub's DNS instructions.
3. Tick **Enforce HTTPS** when it becomes available.

Check GitHub's current documentation for the exact DNS records; they can change. Tell customers clearly that the domain is *their* cost, as the site's pricing section already says.

---

## 4. Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| **404 page** at your GitHub address | Files uploaded inside an extra folder, or Pages not enabled yet | Make sure `index.html` is at the repo's top level. Re-check Settings → Pages. Wait 3 minutes. |
| Page loads but **no colors/styling** | `css/styles.css` didn't upload, or its path is wrong | Check the `css` folder exists in the repo with `styles.css` inside. Paths are case-sensitive. |
| **WhatsApp button does nothing** or shows wrong number | `js/config.js` missing or number has symbols | Number must be digits only: `524426530823`. |
| **My change doesn't show** | Pages is still rebuilding, or your browser cached the old version | Wait a minute, then hard refresh: `Ctrl + Shift + R` (Windows) / `Cmd + Shift + R` (Mac). |
| **Images/logo missing** | File name differs by one letter or by capitals (`Logo.svg` vs `logo.svg`) | GitHub is case-sensitive. Match the name exactly. |
| Works on my computer, **breaks online** | Path starting with `/` (like `/css/styles.css`) | Use relative paths (`css/styles.css`, `../css/styles.css`). See LEARN.md section 5. |
| **Stuck on one language** | The browser remembers your choice | Visit `your-site/?choose`, or pick the other language with the ES/EN switch. |
| Pages setting **missing or greyed out** | Repo is private on a free plan | Settings → scroll down → change visibility to Public. |
| Change fails with a red ✗ in the repo's **Actions** tab | Build error | Click the failed run to read the message; most often a bad file upload. Re-upload the file. |

To find errors in your own code: right-click the page → **Inspect** → **Console** tab. Red messages tell you the file and line.

---

## 5. Before you announce the site

- [ ] Confirm the phone number and test the WhatsApp links on your phone.
- [ ] Confirm the FAQ answer about timing ("a few days to a couple of weeks") matches what you really offer. Edit it in `es/index.html` and `en/index.html` if not.
- [ ] Decide who owns the GitHub repo for client sites (see LEARN.md section 9) before you quote hosting to customers.
- [ ] Add an email to `js/config.js` only when you have a full business address.
- [ ] Add Facebook/Instagram links to `js/config.js` only when those accounts exist.
- [ ] Keep demonstration concepts clearly labeled until you replace them with real projects (and get the client's permission).

---

## 6. Not included yet (on purpose)

- No contact form (it would need a backend). WhatsApp is the contact method.
- No social-sharing image (`og:image`). Social previews need an absolute URL, which you only know after publishing. Add it later.
- No website generator or client system. This is the foundation for one; see LEARN.md section 9.
