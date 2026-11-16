# yini-homepage

Official website repository for YINI, built with Astro, React, and Tailwind CSS.

This website uses [`site-config.yini`](site-config.yini) for shared text, navigation links, and site information.

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

**Live site:** [yini-lang.org](https://yini-lang.org/?utm_source=github&utm_campaign=yini_homepage&utm_content=readme_top&utm_medium=referral)

---

<a id="real-configuration-used-by-this-site"></a>

## How the Website Uses YINI

For example, the home and getting-started links are defined like this:

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

<a id="yini-build-pipeline-used-on-this-site"></a>

Before `npm run dev` or `npm run build` starts Astro, npm runs `npm run gen:config` to convert the YINI file to JSON with the [YINI CLI](https://github.com/YINI-lang/yini-cli) ↗.

```txt
site-config.yini
    → YINI CLI
    → src/config/site-config.json
    → src/config/conf.ts
    → Astro pages and components
```

Edit `site-config.yini`, rather than the generated `src/config/site-config.json`.

---

## Local Development
Before you begin, install Node.js 20 or later (which includes npm).

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

[yini-lang.org](https://yini-lang.org/?utm_source=github&utm_campaign=yini_homepage&utm_content=readme_footer&utm_medium=referral) · [YINI Project on GitHub](https://github.com/YINI-lang)
