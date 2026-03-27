# Elysium Blog Project Overview

This is a static site project built with **Hugo** (Extended version required). It uses the **Digio Theme**, a retro-inspired, pixel-art, and ASCII-focused theme.

## 🛠 Tech Stack
- **Framework:** [Hugo](https://gohugo.io/) (Extended)
- **Theme:** [Digio Theme](https://github.com/danapixels/digio-theme)
- **CSS Framework:** Tailwind CSS (managed within the theme)
- **Languages:** Multi-language support (English `en`, Chinese `zh-cn`, Arabic `ar`)

## 🚀 Building and Running

### Prerequisites
- [Hugo Extended](https://gohugo.io/installation/)
- [Node.js & npm](https://nodejs.org/) (for Tailwind CSS in the theme)

### Local Development
1.  **Run Hugo Server:**
    ```powershell
    hugo server -D
    ```
    This will start a local server at `http://localhost:1313/` with draft posts enabled.

2.  **Compile Tailwind CSS (if modifying theme styles):**
    Navigate to the theme directory and run npm scripts:
    ```powershell
    cd themes/digio-theme
    npm install
    npm run watch
    ```

### Production Build
1.  **Build the site:**
    ```powershell
    hugo
    ```
    The generated site will be in the `public/` directory.

2.  **Build theme CSS (if needed):**
    ```powershell
    cd themes/digio-theme
    npm run build
    ```

## 📁 Directory Structure
- `content/`: Contains the site's Markdown content.
    - `_index.md`: Homepage configuration (profile image, intro text, etc.).
    - `me.md`: "About Me" page configuration (likes, dislikes, hobbies).
    - `open-source/`: Content related to open-source projects.
    - `write/`: Blog posts and articles.
- `layouts/`: Custom HTML templates (if any) that override the theme.
- `static/`: Static assets like images and CSS.
- `themes/digio-theme/`: The core theme files, including Tailwind configuration and assets.
- `hugo.yaml`: Main configuration file for the site.

## 📝 Development Conventions
- **Content Creation:** Use `hugo new write/my-post.md` to create new posts.
- **Front Matter:** The theme relies heavily on custom front matter in `_index.md` and `me.md`. Refer to `themes/digio-theme/README.md` for specific fields.
- **Multilingual:** When adding content for other languages, follow Hugo's multilingual directory or filename patterns (e.g., `post.zh-cn.md`).
- **Icons:** The theme uses specific icons (`/writing.png`, `/contribute.png`, etc.) located in `static/` or the theme's `static/` folder.
