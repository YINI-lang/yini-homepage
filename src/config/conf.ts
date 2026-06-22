// NOTE: './site-config.json' is generated. Do not edit it directly; edit 'site-config.yini' in the project root instead.
import jsonConf from './site-config.json' // JSON generated from a YINI file (with yini-cli).

const LATEST_YINI_SPEC_PDF_URL = '/specs/YINI-Specification-1.0.0-RC.6.pdf'

interface IConfig {
    meta: {
        homepageURL: string
        author: string
    }

    text: {
        headline: string[]
        tagLine: string
        elevatorPitch: string
        mainPage: {
            headTitle: string
            headDescription: string
        }
    }

    siteLinks: Record<string, any>
    urls: Record<string, any>
}

const CONFIG = {
    ...jsonConf,
    siteLinks: {
        ...jsonConf.siteLinks,
        specPdf: {
            ...jsonConf.siteLinks.specPdf,
            url: LATEST_YINI_SPEC_PDF_URL,
        },
    },
} satisfies IConfig // NOTE: Use satisfies when assigning (not at export).

export default Object.freeze(CONFIG)
