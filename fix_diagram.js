const fs = require('fs');

const engContent = fs.readFileSync('resources/PACK_GUIDE.md', 'utf8');
const ptContent = fs.readFileSync('resources/GUIA_PACK.md', 'utf8');

const engRegex = /```mermaid\nflowchart TD\n    subgraph Student Developer Pack Journey[\s\S]*?end\n```/g;

const newEng = `\`\`\`mermaid
flowchart LR
    subgraph W1[Week 1: Setup]
        direction TB
        W1A(Verify student status) --> W1B(Claim pack benefits) --> W1C(Set up dev environment)
    end

    subgraph W2[Week 2-3: Learning]
        direction TB
        W2A(Explore tools and platforms) --> W2B(Complete tutorials) --> W2C(Build practice projects)
    end

    subgraph W3[Week 4+: Building]
        direction TB
        W3A(Start real project) --> W3B(Deploy to GitHub Pages) --> W3C(Connect custom domain) --> W3D(Share with world)
    end

    W1 --> W2 --> W3
\`\`\``;

const ptRegex = /```mermaid\nflowchart TD\n    subgraph Jornada do Student Developer Pack[\s\S]*?end\n```/g;

const newPt = `\`\`\`mermaid
flowchart LR
    subgraph W1[Semana 1: Configuração]
        direction TB
        W1A(Verificar status de estudante) --> W1B(Resgatar benefícios do pack) --> W1C(Configurar ambiente de dev)
    end

    subgraph W2[Semanas 2-3: Aprendizado]
        direction TB
        W2A(Explorar ferramentas e plataformas) --> W2B(Completar tutoriais) --> W2C(Construir projetos práticos)
    end

    subgraph W3[Semana 4+: Construção]
        direction TB
        W3A(Iniciar projeto real) --> W3B(Fazer deploy no GitHub Pages) --> W3C(Conectar domínio customizado) --> W3D(Compartilhar com o mundo)
    end

    W1 --> W2 --> W3
\`\`\``;

fs.writeFileSync('resources/PACK_GUIDE.md', engContent.replace(engRegex, newEng));
fs.writeFileSync('resources/GUIA_PACK.md', ptContent.replace(ptRegex, newPt));
console.log("Diagrams updated");
