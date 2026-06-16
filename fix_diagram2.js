const fs = require('fs');
const path = require('path');

const engFile = path.join('resources', 'PACK_GUIDE.md');
const ptFile = path.join('resources', 'GUIA_PACK.md');

const engDiag = `flowchart TD
    classDef subgraphStyle fill:#f8fafc,stroke:#cbd5e1,stroke-width:2px

    subgraph W1 ["Week 1: Setup"]
        A1(Verify student status) --> A2(Claim pack benefits)
        A2 --> A3(Set up environment)
        A3 --> A4(Explore tools)
    end

    subgraph W2 ["Week 2-3: Learning"]
        B1(Learn frameworks) --> B2(Build practice projects)
        B2 --> B3(Start real project)
    end

    subgraph W3 ["Week 4+: Building"]
        C1(Deploy to GitHub Pages) --> C2(Connect custom domain)
        C2 --> C3(Share with world)
    end

    W1 --> W2 --> W3
`;

const ptDiag = `flowchart TD
    classDef subgraphStyle fill:#f8fafc,stroke:#cbd5e1,stroke-width:2px

    subgraph W1 ["Semana 1: Configuração"]
        A1(Verificar status de estudante) --> A2(Resgatar benefícios do pacote)
        A2 --> A3(Configurar ambiente)
        A3 --> A4(Explorar ferramentas)
    end

    subgraph W2 ["Semana 2-3: Aprendizado"]
        B1(Aprender frameworks) --> B2(Criar projetos práticos)
        B2 --> B3(Iniciar projeto real)
    end

    subgraph W3 ["Semana 4+: Construção"]
        C1(Fazer deploy no GitHub Pages) --> C2(Conectar domínio personalizado)
        C2 --> C3(Compartilhar com o mundo)
    end

    W1 --> W2 --> W3
`;

let engContent = fs.readFileSync(engFile, 'utf8');
engContent = engContent.replace(/```mermaid\nflowchart LR[\s\S]*?```/m, '```mermaid\n' + engDiag + '```');
fs.writeFileSync(engFile, engContent);

let ptContent = fs.readFileSync(ptFile, 'utf8');
ptContent = ptContent.replace(/```mermaid\nflowchart LR[\s\S]*?```/m, '```mermaid\n' + ptDiag + '```');
fs.writeFileSync(ptFile, ptContent);

console.log('Fixed diagrams to simpler top-down flowchart.');
