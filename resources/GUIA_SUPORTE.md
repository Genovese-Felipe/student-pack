# 🛠️ Resolução de Problemas (Troubleshooting)

## 🌳 Árvore de Decisão

```mermaid
graph TD
    Start[Problema Detectado] --> Type{Onde está o erro?}

    Type -->|GitHub Actions| Actions[Workflow Falhou]
    Type -->|Domínio/DNS| DNS[Site não carrega]
    Type -->|HTTPS/SSL| SSL[Aviso de Privacidade]

    Actions --> Act1{Mensagem de Erro?}
    Act1 -->|Permissões| Act2[Corrija permissões do GITHUB_TOKEN no deploy.yml]
    Act1 -->|Links Quebrados| Act3[Verifique links Markdown em resources/]

    DNS --> DNS1{Tipo de Erro?}
    DNS1 -->|Colisão CNAME| DNS2[Verifique se 'www' ou '@' está duplicado]
    DNS1 -->|Não Encontrado| DNS3[Aguarde 24h ou verifique A Records]

    SSL --> SSL1{DNS configurado?}
    SSL1 -->|Sim| SSL2[Aguarde o GitHub emitir o certificado - 30min]
    SSL1 -->|Não| SSL[Configure IPs do Name.com primeiro]
```

## 📋 Problemas Comuns & Soluções

### 1. Colisões de Registro CNAME
**Sintoma:** Você não consegue salvar registros DNS no Name.com.
**Solução:** Certifique-se de não ter dois registros para o mesmo host. Por exemplo, se você usar um CNAME para `www`, não deve ter um registro A para `www`.

### 2. Atrasos no Certificado HTTPS
**Sintoma:** Erro "Sua conexão não é privada".
**Solução:** Após apontar o DNS para o GitHub, leva cerca de 15 a 60 minutos para o GitHub verificar e emitir um certificado SSL. **Não** alterne a configuração repetidamente; apenas aguarde.

### 3. Falhas de Permissão de Workflow
**Sintoma:** Logs do GitHub Actions dizem `Permission denied`.
**Solução:** Se você estiver em uma Organização Acadêmica, eles geralmente restringem Actions. Certifique-se de ter `contents: write` and `pages: write` no seu `deploy.yml`.

---

## 🚀 Lifecycle do GitHub Pages

```mermaid
stateDiagram-v2
    [*] --> Commit
    Commit --> CI_Checks
    CI_Checks --> Artifact_Upload
    Artifact_Upload --> Deployment
    Deployment --> [*]
```
