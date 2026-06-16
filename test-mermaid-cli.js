import mermaid from 'mermaid';
import fs from 'fs';

mermaid.initialize({ startOnLoad: false });

async function run() {
    const text = fs.readFileSync('resources/PACK_GUIDE.md', 'utf8');
    const matches = text.match(/```mermaid([\s\S]*?)```/g);
    if (!matches) {
        console.log("No mermaid matches.");
        return;
    }
    for (let i = 0; i < matches.length; i++) {
        let code = matches[i].replace(/```mermaid\n/, '').replace(/```/, '');
        try {
            await mermaid.parse(code);
            console.log("Diagram", i, "OK");
        } catch(e) {
            console.error("Diagram", i, "FAILED:", e);
        }
    }
}
run();
