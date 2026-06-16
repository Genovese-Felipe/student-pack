# 🌐 Connecting your Name.com Domain to GitHub Pages

After getting your free domain from the GitHub Student Developer Pack, follow these steps to host your site (like the template in this repo) on your new domain.

## 📊 Complete Deployment Architecture

```mermaid
graph TB
    subgraph GitHub["🐙 GitHub Ecosystem"]
        A["👤 Student Profile"]
        B["📦 GitHub Student Pack"]
        C["🌍 GitHub Pages"]
        D["⚙️ GitHub Actions"]
    end
    
    subgraph Domain["🔗 Domain Management"]
        E["💼 Name.com Account"]
        F["🎁 Free Domain Offer"]
        G["📝 DNS Records"]
    end
    
    subgraph Website["🌐 Website"]
        H["📄 Your Project/Template"]
        I["🚀 Live Website"]
    end
    
    A -->|1. Applies| B
    B -->|2. Unlocks| F
    F -->|3. Register Domain| E
    E -->|4. Manage| G
    A -->|5. Configure| C
    D -->|6. Deploys| H
    C -->|7. Serves on| I
    G -->|8. Points to| C
    
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

## 🔄 Step-by-Step Deployment Flow

```mermaid
flowchart TD
    Start["🎯 Start"] --> Step1["📦 Claim GitHub Student Pack"]
    Step1 --> Step2["🎁 Access Name.com Offer"]
    Step2 --> Step3["📝 Register Your Domain"]
    Step3 --> Step4["⚙️ Configure GitHub Pages"]
    Step4 --> Step5["🔧 Add DNS Records"]
    Step5 --> Step6["⏳ Wait for Propagation"]
    Step6 --> Step7["✅ Enable HTTPS"]
    Step7 --> End["🎉 Live Website!"]
    
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

## Step 1: Configure GitHub Pages

```mermaid
graph LR
    A["1️⃣ Repository Settings"] --> B["2️⃣ Pages Section"]
    B --> C["3️⃣ Enter Custom Domain"]
    C --> D["4️⃣ CNAME File Created"]
    D --> E["✅ GitHub Pages Ready"]
    
    style A fill:#3498db,color:#fff
    style B fill:#3498db,color:#fff
    style C fill:#3498db,color:#fff
    style D fill:#2ed573,color:#000
    style E fill:#2ed573,color:#000
```

### Steps:
1. Go to your repository **Settings**.
2. Click on **Pages** in the left sidebar.
3. Under **Custom domain**, type your new domain (e.g., `www.yourname.software`).
4. Click **Save**. This creates a `CNAME` file in your repository.

## Step 2: Configure Name.com DNS

```mermaid
sequenceDiagram
    participant Student as 👤 Student
    participant NameCom as 💼 Name.com
    participant GitHub as 🐙 GitHub Pages
    participant DNS as 🌐 DNS System
    
    Student->>NameCom: Log in to account
    Student->>NameCom: Select domain
    Student->>NameCom: Go to Manage DNS Records
    
    Note over Student,NameCom: Add A Records
    Student->>NameCom: Add: 185.199.108.153
    Student->>NameCom: Add: 185.199.109.153
    Student->>NameCom: Add: 185.199.110.153
    Student->>NameCom: Add: 185.199.111.153
    
    Note over Student,NameCom: Add CNAME Record
    Student->>NameCom: Host: www
    Student->>NameCom: Answer: yourusername.github.io
    Student->>NameCom: Save changes
    
    NameCom->>DNS: Propagate records
    DNS->>GitHub: Resolve domain
    GitHub->>Student: ✅ Domain connected
```

### DNS Configuration Details

```mermaid
graph TD
    subgraph ARecords["📍 A Records (for @ root)"]
        A1["185.199.108.153"]
        A2["185.199.109.153"]
        A3["185.199.110.153"]
        A4["185.199.111.153"]
    end
    
    subgraph CNAMERecord["🔗 CNAME Record (for www)"]
        C1["Host: www"]
        C2["Target: yourusername.github.io"]
    end
    
    subgraph Result["✅ Result"]
        R1["Domain resolves"]
        R2["www.yourdomain.com → GitHub Pages"]
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

### Configuration Process:

1. Log in to your [Name.com](https://www.name.com) account.
2. Go to **My Domains** and click on your domain.
3. Click on **Manage DNS Records**.
4. **Add A Records** pointing to GitHub's IP addresses:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
5. **Add CNAME Record**:
   - Host: `www`
   - Answer: `yourusername.github.io`
6. Click **Save**

## Step 3: Wait and Verify

```mermaid
timeline
    title DNS Propagation & HTTPS Timeline
    
    section Propagation (0-24h)
        Immediate: DNS records sent to Name.com servers
        5-10 min: Distributed to primary DNS servers
        10-60 min: Propagates globally (usually faster)
        Up to 24h: May take longer in rare cases
    
    section GitHub Verification (Parallel)
        Immediate: GitHub sees DNS update
        5-15 min: GitHub verifies domain
        5-30 min: Let's Encrypt issues certificate
    
    section HTTPS Active
        30+ min: Certificate active and verified
        Ready: Enable 'Enforce HTTPS' checkbox
```

### Verification Steps:

```mermaid
checklist
    title Verify Your Domain Setup
    - Wait 5-10 minutes for initial propagation
    - Go back to GitHub Settings > Pages
    - Verify CNAME file was created
    - Check 'Enforce HTTPS' checkbox (when available)
    - Test your domain in browser
    - Verify certificate is valid
    - Check both www.domain.com and domain.com
```

---

## 💡 Pro Tips & Troubleshooting

### Quick Reference - GitHub IP Addresses

| Provider | IP Address |
|----------|-----------|
| GitHub Pages | 185.199.108.153 |
| GitHub Pages | 185.199.109.153 |
| GitHub Pages | 185.199.110.153 |
| GitHub Pages | 185.199.111.153 |

### Common DNS Record Types

```mermaid
graph LR
    A["A Record"] -->|Maps| B["Domain to IP<br/>185.199.108.153"]
    C["CNAME Record"] -->|Maps| D["Subdomain to Domain<br/>www → yourusername.github.io"]
    E["TXT Record"] -->|Verification| F["Domain ownership<br/>Optional but recommended"]
    
    style A fill:#3498db,color:#fff
    style C fill:#f39c12,color:#fff
    style E fill:#9b59b6,color:#fff
```

> [!TIP]
> **SSL/TLS:** It can take a few minutes for the "Enforce HTTPS" checkbox to become available after setting up your DNS. Be patient!

> [!NOTE]
> **Propagation:** Use tools like [Google DNS Lookup](https://developers.google.com/speed/public-dns/docs/troubleshooting) or [What's My DNS](https://www.whatsmydns.net/) to track your DNS changes worldwide.

> [!WARNING]
> **CNAME Conflicts:** Don't have both an A record AND a CNAME record for the same subdomain. Pick one per hostname.

---

## 🔗 Reference Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Name.com DNS Management](https://www.name.com/support/articles/115004149548)
- [GitHub Pages IP Addresses](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [DNS Propagation Checker](https://www.whatsmydns.net/)
