# 🌐 Conectando seu Domínio Name.com ao GitHub Pages

Depois de garantir seu domínio gratuito pelo GitHub Student Developer Pack, siga estes passos para hospedar seu site (como o template neste repo) no seu novo domínio.

## 📊 Arquitetura Completa de Implantação

```mermaid
graph TB
    subgraph GitHub["🐙 Ecossistema GitHub"]
        A["👤 Perfil do Estudante"]
        B["📦 GitHub Student Pack"]
        C["🌍 GitHub Pages"]
        D["⚙️ GitHub Actions"]
    end
    
    subgraph Domain["🔗 Gerenciamento de Domínio"]
        E["💼 Conta Name.com"]
        F["🎁 Oferta de Domínio Gratuito"]
        G["📝 Registros DNS"]
    end
    
    subgraph Website["🌐 Site"]
        H["📄 Seu Projeto/Template"]
        I["🚀 Site Online"]
    end
    
    A -->|1. Solicita| B
    B -->|2. Libera| F
    F -->|3. Registra Domínio| E
    E -->|4. Gerencia| G
    A -->|5. Configura| C
    D -->|6. Implanta| H
    C -->|7. Serve em| I
    G -->|8. Aponta para| C
    
    style A fill:#3498db,color:#fff
    style B fill:#3498db,color:#fff
    style C fill:#3498db,color:#fff
    style D fill:#3498db,color:#fff
    style E fill:#f39c12,color:#fff
    style F fill:#f39c12,color:#fff
    style G fill:#f39c12,color:#fff
    style H fill:#2ed573,color:#000
    style I fill:#2ed573,color:#000
```

## 🔄 Fluxo de Implantação Passo a Passo

```mermaid
flowchart TD
    Start["🎯 Comece"] --> Step1["📦 Reivindique o GitHub Student Pack"]
    Step1 --> Step2["🎁 Acesse a Oferta Name.com"]
    Step2 --> Step3["📝 Registre Seu Domínio"]
    Step3 --> Step4["⚙️ Configure o GitHub Pages"]
    Step4 --> Step5["🔧 Adicione Registros DNS"]
    Step5 --> Step6["⏳ Aguarde Propagação"]
    Step6 --> Step7["✅ Habilite HTTPS"]
    Step7 --> End["🎉 Site Online!"]
    
    style Start fill:#3498db,color:#fff
    style Step1 fill:#9b59b6,color:#fff
    style Step2 fill:#9b59b6,color:#fff
    style Step3 fill:#9b59b6,color:#fff
    style Step4 fill:#3498db,color:#fff
    style Step5 fill:#3498db,color:#fff
    style Step6 fill:#f39c12,color:#fff
    style Step7 fill:#f39c12,color:#fff
    style End fill:#2ed573,color:#000
```

## Passo 1: Configurar o GitHub Pages

```mermaid
graph LR
    A["1️⃣ Settings do Repositório"] --> B["2️⃣ Seção Pages"]
    B --> C["3️⃣ Digite Domínio Customizado"]
    C --> D["4️⃣ Arquivo CNAME Criado"]
    D --> E["✅ GitHub Pages Pronto"]
    
    style A fill:#3498db,color:#fff
    style B fill:#3498db,color:#fff
    style C fill:#3498db,color:#fff
    style D fill:#2ed573,color:#000
    style E fill:#2ed573,color:#000
```

### Passos:
1. Vá nas **Settings** (Configurações) do seu repositório.
2. Clique em **Pages** na barra lateral esquerda.
3. Em **Custom domain**, digite seu novo domínio (ex: `www.seunome.software`).
4. Clique em **Save**. Isso criará um arquivo `CNAME` no seu repositório.

## Passo 2: Configurar o DNS no Name.com

```mermaid
sequenceDiagram
    participant Estudante as 👤 Estudante
    participant NameCom as 💼 Name.com
    participant GitHub as 🐙 GitHub Pages
    participant DNS as 🌐 Sistema DNS
    
    Estudante->>NameCom: Faz login na conta
    Estudante->>NameCom: Seleciona domínio
    Estudante->>NameCom: Vai para Gerenciar Registros DNS
    
    Note over Estudante,NameCom: Adicione A Records
    Estudante->>NameCom: Adiciona: 185.199.108.153
    Estudante->>NameCom: Adiciona: 185.199.109.153
    Estudante->>NameCom: Adiciona: 185.199.110.153
    Estudante->>NameCom: Adiciona: 185.199.111.153
    
    Note over Estudante,NameCom: Adicione CNAME Record
    Estudante->>NameCom: Host: www
    Estudante->>NameCom: Destino: seuusuario.github.io
    Estudante->>NameCom: Salva mudanças
    
    NameCom->>DNS: Propaga registros
    DNS->>GitHub: Resolve domínio
    GitHub->>Estudante: ✅ Domínio conectado
```

### Detalhes de Configuração DNS

```mermaid
graph TD
    subgraph ARecords["📍 A Records (para @ root)"]
        A1["185.199.108.153"]
        A2["185.199.109.153"]
        A3["185.199.110.153"]
        A4["185.199.111.153"]
    end
    
    subgraph CNAMERecord["🔗 CNAME Record (para www)"]
        C1["Host: www"]
        C2["Destino: seuusuario.github.io"]
    end
    
    subgraph Result["✅ Resultado"]
        R1["Domínio resolve"]
        R2["www.seudominio.com → GitHub Pages"]
    end
    
    A1 --> Result
    A2 --> Result
    A3 --> Result
    A4 --> Result
    C1 --> Result
    C2 --> Result
    Result --> R1
    Result --> R2
    
    style ARecords fill:#3498db,color:#fff
    style CNAMERecord fill:#f39c12,color:#fff
    style Result fill:#2ed573,color:#000
```

### Processo de Configuração:

1. Faça login na sua conta do [Name.com](https://www.name.com).
2. Vá em **My Domains** e clique no seu domínio.
3. Clique em **Manage DNS Records**.
4. **Adicione A Records** apontando para os IPs do GitHub:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
5. **Adicione CNAME Record**:
   - Host: `www`
   - Resposta: `seuusuario.github.io`
6. Clique **Save** (Salvar)

## Passo 3: Aguarde e Verifique

```mermaid
timeline
    title Cronograma de Propagação DNS e HTTPS
    
    section Propagação (0-24h)
        Imediato: Registros DNS enviados aos servidores Name.com
        5-10 min: Distribuído aos servidores DNS primários
        10-60 min: Propaga globalmente (geralmente mais rápido)
        Até 24h: Pode levar mais tempo em casos raros
    
    section Verificação do GitHub (Paralelo)
        Imediato: GitHub vê atualização de DNS
        5-15 min: GitHub verifica domínio
        5-30 min: Let's Encrypt emite certificado
    
    section HTTPS Ativo
        30+ min: Certificado ativo e verificado
        Pronto: Habilite checkbox 'Enforce HTTPS'
```

### Passos de Verificação:

**Verifique a Configuração do Seu Domínio**

- [ ] Aguarde 5-10 minutos para propagação inicial
- [ ] Volte para GitHub Settings > Pages
- [ ] Verifique se arquivo CNAME foi criado
- [ ] Marque checkbox 'Enforce HTTPS' (quando disponível)
- [ ] Teste seu domínio no navegador
- [ ] Verifique se certificado é válido
- [ ] Teste tanto `www.dominio.com` quanto `dominio.com`

---

## 💡 Dicas de Especialista & Resolução de Problemas

### Referência Rápida - Endereços IP do GitHub

| Provedor | Endereço IP |
|----------|-----------|
| GitHub Pages | 185.199.108.153 |
| GitHub Pages | 185.199.109.153 |
| GitHub Pages | 185.199.110.153 |
| GitHub Pages | 185.199.111.153 |

### Tipos Comuns de Registros DNS

```mermaid
graph LR
    A["A Record"] -->|Mapeia| B["Domínio para IP<br/>185.199.108.153"]
    C["CNAME Record"] -->|Mapeia| D["Subdomínio para Domínio<br/>www → seuusuario.github.io"]
    E["TXT Record"] -->|Verificação| F["Propriedade do Domínio<br/>Opcional mas recomendado"]
    
    style A fill:#3498db,color:#fff
    style C fill:#f39c12,color:#fff
    style E fill:#9b59b6,color:#fff
```

> [!TIP]
> **SSL/TLS:** Pode levar alguns minutos para a opção "Enforce HTTPS" ficar disponível após configurar o DNS. Tenha paciência!

> [!NOTE]
> **Propagação:** Use ferramentas como [Google DNS Lookup](https://developers.google.com/speed/public-dns/docs/troubleshooting) ou [What's My DNS](https://www.whatsmydns.net/) para acompanhar as mudanças de DNS mundialmente.

> [!WARNING]
> **Conflitos de CNAME:** Não tenha tanto um A record quanto um CNAME record para o mesmo subdomínio. Escolha um por hostname.

---

## 🔗 Recursos de Referência

- [Documentação do GitHub Pages](https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Suporte Name.com](https://www.name.com)
- [Endereços IP do GitHub Pages](https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Verificador de Propagação DNS](https://www.whatsmydns.net/)
