# 🛠️ Resolução de Problemas (Troubleshooting)

Tendo problemas com sua implantação ou domínio? Siga este guia.

## 🌳 Árvore de Decisão Interativa

```mermaid
graph TD
    Start([🔴 Problema Detectado]) --> Type{Onde está o erro?}

    Type -->|GitHub Actions| Actions[⚙️ Workflow Falhou]
    Type -->|Domínio/DNS| DNS[🌐 Site não carrega]
    Type -->|HTTPS/SSL| SSL[🔒 Aviso de Privacidade]
    Type -->|Outro| Other[💭 Outro problema]

    %% GitHub Actions Branch
    Actions --> Act1{Mensagem de Erro?}
    Act1 -->|Permissões| Act2[🔑 Corrija permissões do GITHUB_TOKEN]
    Act1 -->|Links Quebrados| Act3[🔗 Verifique links Markdown em resources/]
    Act1 -->|Build Falhou| Act4[🏗️ Verifique configuração de build]
    Act1 -->|Deploy Falhou| Act5[📤 Verifique configurações de deployment]
    
    Act2 --> Act2a["Adicione estas permissões ao deploy.yml:<br/>- contents: write<br/>- pages: write"]
    Act3 --> Act3a[Revise todos os links em arquivos .md para erros]
    Act4 --> Act4a[Verifique estrutura da pasta resources/]
    Act5 --> Act5a[Verifique se GitHub Pages está habilitado]

    %% DNS Branch
    DNS --> DNS1{Tipo de Erro?}
    DNS1 -->|Colisão CNAME| DNS2[❌ Verifique se www ou @ duplicado]
    DNS1 -->|Não Encontrado| DNS3[⏳ Aguarde 24h ou verifique A Records]
    DNS1 -->|Timeout| DNS4[🔍 Verifique registros DNS no Name.com]
    
    DNS2 --> DNS2a["Solução: Mantenha UM registro por host"]
    DNS3 --> DNS3a["Use ferramenta de Propagação DNS:<br/>DNS Lookup"]
    DNS4 --> DNS4a["Verifique os 4 IPs do GitHub:<br/>185.199.108.153<br/>185.199.109.153<br/>185.199.110.153<br/>185.199.111.153"]

    %% SSL Branch
    SSL --> SSL1{DNS configurado?}
    SSL1 -->|Sim| SSL2[⏳ Aguarde certificado - 15-60 min]
    SSL1 -->|Não| SSL3[🔧 Configure primeiro os IPs do Name.com]
    
    SSL2 --> SSL2a["Não alterne 'Enforce HTTPS' repetidamente!<br/>GitHub está processando sua solicitação"]
    SSL3 --> SSL3a["Consulte CONFIGURACAO_DOMINIO.md para config completa"]

    %% Other Branch
    Other --> Oth1["Verifique Status do GitHub<br/>Limpe cache do navegador<br/>Verifique se repo é público"]

    style Start fill:#ff4757,color:#fff
    style Actions fill:#ffa502,color:#fff
    style DNS fill:#ffa502,color:#fff
    style SSL fill:#ffa502,color:#fff
    style Other fill:#ffa502,color:#fff
    style Act2a fill:#2ed573,color:#000
    style Act3a fill:#2ed573,color:#000
    style Act4a fill:#2ed573,color:#000
    style Act5a fill:#2ed573,color:#000
    style DNS2a fill:#2ed573,color:#000
    style DNS3a fill:#2ed573,color:#000
    style DNS4a fill:#2ed573,color:#000
    style SSL2a fill:#2ed573,color:#000
    style SSL3a fill:#2ed573,color:#000
    style Oth1 fill:#2ed573,color:#000
```

## 📋 Problemas Comuns & Soluções

### 1. Colisões de Registro CNAME
**Sintoma:** Você não consegue salvar registros DNS no Name.com.
**Solução:** Certifique-se de não ter dois registros para o mesmo host. Por exemplo, se você usar um CNAME para `www`, não deve ter um registro A para `www`.

```mermaid
graph LR
    A["❌ ERRADO:<br/>A record: www<br/>CNAME: www"] --> B["⚠️ Conflito!"]
    C["✅ CORRETO:<br/>A record: @<br/>CNAME: www"] --> D["✓ Funciona!"]
    
    style A fill:#ff4757,color:#fff
    style B fill:#ff4757,color:#fff
    style C fill:#2ed573,color:#000
    style D fill:#2ed573,color:#000
```

### 2. Atrasos no Certificado HTTPS
**Sintoma:** Erro "Sua conexão não é privada".
**Solução:** Após apontar o DNS para o GitHub, leva cerca de 15 a 60 minutos para o GitHub verificar e emitir um certificado SSL. **Não** alterne a configuração repetidamente; apenas aguarde.

```mermaid
timeline
    title Cronograma do Certificado SSL
    section Setup (0-5 min)
        DNS configurado: GitHub recebe atualização de DNS
    section Verificação (5-15 min)
        GitHub verifica DNS: Verifica seu domínio
    section Emissão (15-30 min)
        Certificado emitido: Let's Encrypt processa requisição
    section Ativo (30+ min)
        HTTPS habilitado: Certificado ativo e verificado
```

### 3. Falhas de Permissão de Workflow
**Sintoma:** Logs do GitHub Actions dizem `Permission denied`.
**Solução:** Se você estiver em uma Organização Acadêmica, eles geralmente restringem Actions. Certifique-se de ter `contents: write` e `pages: write` no seu `deploy.yml`.

```mermaid
graph TD
    A["🔐 Erro de Permissões"] --> B{Tipo de Organização?}
    B -->|Acadêmica| C["Mais restritiva"]
    B -->|Padrão| D["Permissões padrão"]
    B -->|Enterprise| E["Restrições variáveis"]
    
    C --> C1["Adicione ao deploy.yml:<br/>permissions:<br/>  contents: write<br/>  pages: write"]
    D --> D1["Geralmente funciona"]
    E --> E1["Contate admin da org"]
    
    style A fill:#ff4757,color:#fff
    style C fill:#ffa502,color:#fff
    style D fill:#ffa502,color:#fff
    style E fill:#ffa502,color:#fff
    style C1 fill:#2ed573,color:#000
    style D1 fill:#2ed573,color:#000
    style E1 fill:#2ed573,color:#000
```

---

## 🚀 Ciclo de Vida de Implantação do GitHub Pages

```mermaid
stateDiagram-v2
    [*] --> Code_Push: Push para main/master
    Code_Push --> GitHub_Actions: Workflow acionado
    GitHub_Actions --> Build: Construir arquivos do site
    Build --> Tests: Executar validação
    Tests --> Artifact: Criar artefato
    Artifact --> Deploy: Implantar em Pages
    Deploy --> Live: Ao vivo na web
    Live --> [*]
    
    GitHub_Actions --> Error: Build falha?
    Error --> [*]: Verificar logs
    Tests --> Error: Testes falham?
```

## 📊 Fluxo de Trabalho de Resolução de Problemas

```mermaid
flowchart TD
    Start["🚀 Problema de Site Relatado"] --> Step1{Site está carregando?}
    
    Step1 -->|Não| Step2{Consegue acessar domínio?}
    Step2 -->|Não| Step3["Verificar Registros DNS"]
    Step2 -->|Sim| Step4["Verificar Configurações do GitHub Pages"]
    
    Step1 -->|Sim| Step5{Erro HTTPS?}
    Step5 -->|Sim| Step6["Aguardar Certificado<br/>ou Verificar Enforce HTTPS"]
    Step5 -->|Não| Step7{Problema de Build?}
    
    Step7 -->|Sim| Step8["Revisar Logs do Workflow"]
    Step7 -->|Não| Step9["Verificar Links de Conteúdo"]
    
    Step3 --> Resolution["✅ Problema de DNS Identificado"]
    Step4 --> Resolution
    Step6 --> Resolution
    Step8 --> Resolution
    Step9 --> Resolution
    
    Resolution --> End["🎉 Problema Resolvido"]
    
    style Start fill:#3498db,color:#fff
    style End fill:#2ed573,color:#000
    style Resolution fill:#2ed573,color:#000
```

## 🔍 Lista de Verificação de Diagnóstico Rápido

**Diagnóstico Rápido**

- [ ] O repo é público?
- [ ] Você esperou 5-10 minutos após fazer push?
- [ ] Todos os registros DNS estão configurados?
- [ ] 'Enforce HTTPS' está desabilitado (até certificado pronto)?
- [ ] Seu CNAME corresponde ao seu domínio?
- [ ] As Actions estão habilitadas no seu repo?
- [ ] Verificar Status do GitHub em status.github.com
