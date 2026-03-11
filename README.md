# yini-homepage

This is the official **YINI website**, built with Astro and Tailwind.

This website is **configured using YINI**.

YINI is an INI-inspired and human-readable text format for representing structured information. It is designed to be clear, predictable, and easy for humans to read and write. It is suitable for configuration files, application settings, and general data-storage use cases. 

Built with Astro and Tailwind CSS — the site provides an overview of the YINI format, including the specification, guides, and examples.

```yini
^ server
    host = 'localhost'
    port = 8080

    ^^ database
        user = 'admin'
        password = 'secret'
```

👉 **Live site:** [https://yini-lang.org](https://yini-lang.org/?utm_source=github&utm_medium=referral&utm_campaign=yini_home&utm_content=readme_top) ↗

⭐ If you find **YINI interesting or useful**, consider giving the project a star on GitHub.

---

## Real Configuration Used by This Site
The website itself is configured using a **YINI configuration file**.

Example snippet (from `config.yini`):
```yini
^ siteLinks

    ^^ hero

        ^^^ home
            url = '/'
            title = 'Home – YINI homepage'

        ^^^ getStarted
            url = '/use-yini/get-started'
            title = 'Start exploring the YINI format.'
```

View the full configuration file in the repository:  
[`src/config/config.yini`](src/config/config.yini)

### YINI Build Pipeline Used on This Site
During the build process the configuration is converted automatically (by [yini-cli](https://github.com/YINI-lang/yini-cli)):
```
config.yini
 ↓
yini-cli
 ↓
config.json
 ↓
config.ts (consumed by the Astro application)
 ↓
Astro
```

This allows YINI to act as a human-friendly source configuration, while the application consumes standard JSON/TypeScript objects.

If you prefer runtime parsing instead, you can also use [yini-parser](https://github.com/YINI-lang/yini-parser-typescript) directly.

---

## 🧩 Local Development
```bash
# Clone
git clone https://github.com/YINI-lang/yini-homepage.git
cd yini-homepage

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Then open http://localhost:4321 in your browser.

---

**^YINI ≡**  
> A structured, human-readable configuration format.  

[yini-lang.org](https://yini-lang.org/?utm_source=github&utm_medium=referral&utm_campaign=yini_home&utm_content=readme_footer) · [YINI on GitHub](https://github.com/YINI-lang)  
