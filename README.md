# yini-homepage

Official website repository for YINI, built with Astro, React, and Tailwind CSS.

This website uses a YINI config file for part of its configuration.

YINI is an INI-inspired, human-readable text format for representing structured information. It is intended for configuration files, application settings, and general data-storage use cases. 

The site provides an overview of the YINI format, including the specification, guides, and examples.

Example of a YINI file:
```yini
^ server
    host = 'localhost'
    port = 8080
    allowedOrigins = ['http://localhost:3000', 'https://app.example.com']

    ^^ database
        user = 'admin'
        password = 'secret'
        logging = { level: 'info', file: 'logs/server.log' }
```

**Live site:** [yini-lang.org](https://yini-lang.org/?utm_source=github&utm_medium=referral&utm_campaign=yini_home&utm_content=readme_top)  

---

## Real Configuration Used by This Site
Part of the website configuration (including internal links and descriptive text) is defined in a YINI file.

Example snippet from the real file (`site-config.yini`):
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
[`site-config.yini`](site-config.yini)

### YINI Build Pipeline Used on This Site
During the build process, the configuration is converted automatically using [yini-cli](https://github.com/YINI-lang/yini-cli).

```txt
site-config.yini (source of truth)
 ↓
yini-cli (converts YINI to JSON)
 ↓
site-config.json (generated file; do not edit directly)
 ↓
config.ts (reads the generated JSON)
 ↓
Astro application
```

This allows YINI to be used as the source configuration format, while the application consumes generated JSON/TypeScript objects.

Runtime parsing can also be done directly with [yini-parser](https://github.com/YINI-lang/yini-parser-typescript).

---

## Local Development
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
> YINI is a human-readable configuration format designed for clarity, readability, explicit structure, predictability, and deterministic parsing.
> 
> See the specification for syntax and format details.  

[yini-lang.org](https://yini-lang.org/?utm_source=github&utm_medium=referral&utm_campaign=yini_home&utm_content=readme_footer) · [YINI-lang on GitHub](https://github.com/YINI-lang)  
