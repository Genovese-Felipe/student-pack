const fs = require('fs');

function updateFile(file) {
    let content = fs.readFileSync(file, 'utf8');

    const ganttBlock = `gantt
    title Student Developer Pack Journey
    dateFormat YYYY-MM-DD
    axisFormat %w

    section Week 1: Setup
    Verify student status       :a1, 2024-01-01, 2d
    Claim pack benefits         :a2, after a1, 1d

    section Week 2-3: Learning
    Explore tools and platforms :b1, after a2, 7d
    Build practice projects     :b2, after b1, 7d

    section Week 4+: Building
    Start real project          :c1, after b2, 5d
    Deploy to GitHub Pages      :c2, after c1, 2d
    Connect custom domain       :c3, after c2, 2d
    Share with world            :c4, after c3, 1d`;

    const newFlowchart = `flowchart TD
    %% Timeline stages
    subgraph W1 [Week 1: Setup]
        direction TB
        A[Verify student status] --> B[Claim pack benefits]
    end

    subgraph W2 [Week 2-3: Learning]
        direction TB
        C[Explore tools & platforms] --> D[Build practice projects]
    end

    subgraph W3 [Week 4+: Building]
        direction TB
        E[Start real project] --> F[Deploy to GitHub Pages]
        F --> G[Connect custom domain]
        G --> H[Share with world!]
    end

    B --> C
    D --> E

    classDef w1 fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px,color:#333;
    classDef w2 fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#333;
    classDef w3 fill:#fef08a,stroke:#ca8a04,stroke-width:2px,color:#333;

    class W1 w1;
    class W2 w2;
    class W3 w3;`;

    const ganttBlockPT = `gantt
    title Jornada do Student Developer Pack
    dateFormat YYYY-MM-DD
    axisFormat %w

    section Semana 1: Configuração
    Verificar status de estudante :a1, 2024-01-01, 2d
    Resgatar benefícios           :a2, after a1, 1d

    section Semanas 2-3: Aprendizado
    Explorar ferramentas          :b1, after a2, 7d
    Projetos práticos             :b2, after b1, 7d

    section Semana 4+: Construção
    Iniciar projeto real          :c1, after b2, 5d
    Deploy no GitHub Pages        :c2, after c1, 2d
    Conectar domínio              :c3, after c2, 2d
    Compartilhar com o mundo      :c4, after c3, 1d`;

    const newFlowchartPT = `flowchart TD
    %% Timeline stages
    subgraph W1 [Semana 1: Configuração]
        direction TB
        A[Verificar status de estudante] --> B[Resgatar benefícios]
    end

    subgraph W2 [Semanas 2-3: Aprendizado]
        direction TB
        C[Explorar ferramentas] --> D[Projetos práticos]
    end

    subgraph W3 [Semana 4+: Construção]
        direction TB
        E[Iniciar projeto real] --> F[Deploy no GitHub Pages]
        F --> G[Conectar domínio]
        G --> H[Compartilhar com o mundo!]
    end

    B --> C
    D --> E

    classDef w1 fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px,color:#333;
    classDef w2 fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#333;
    classDef w3 fill:#fef08a,stroke:#ca8a04,stroke-width:2px,color:#333;

    class W1 w1;
    class W2 w2;
    class W3 w3;`;

    if (content.includes(ganttBlock)) {
        content = content.replace(ganttBlock, newFlowchart);
    } else if (content.includes(ganttBlockPT)) {
        content = content.replace(ganttBlockPT, newFlowchartPT);
    }

    fs.writeFileSync(file, content, 'utf8');
}

updateFile('resources/PACK_GUIDE.md');
updateFile('resources/GUIA_PACK.md');
