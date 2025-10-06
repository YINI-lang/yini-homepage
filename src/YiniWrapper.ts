/*
    Wrapper that guarantees process exists before importing the parser.
    
    @todo
    When yini-parser, avoids reading directly process

    1. Replace below with (try it):
    import YINI from 'yini-parser/browser'; // or whichever browser entry you publish
export default YINI;

    2. Then this wrapper can be deleted completely.
 */

// Ensure a browser-friendly "process" exists before we touch the parser.
// import processPolyfill from 'process'
// Now import the parser normally (static import, as you wanted)
// import YINI from 'yini-parser'

// if (!(globalThis as any).process) {
//     ;(globalThis as any).process = processPolyfill
//     // also ensure minimal env/argv in case the parser reads them
//     ;(globalThis as any).process.env ||= {}
//     ;(globalThis as any).process.argv ||= []
// }

// export default YINI
import YINI from 'yini-parser'

export default YINI
