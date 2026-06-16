# 🛠️ Troubleshooting & Decision Tree

Having trouble with your deployment or domain? Follow this guide.

## 🌳 Interactive Decision Tree

```mermaid
graph TD
    Start([🔴 Problem Detected]) --> Type{Where is the error?}

    Type -->|GitHub Actions| Actions[⚙️ Workflow Failed]
    Type -->|Domain/DNS| DNS[🌐 Site Not Loading]
    Type -->|HTTPS/SSL| SSL[🔒 Privacy Warning]
    Type -->|Other| Other[💭 Other Issue]

    %% GitHub Actions Branch
    Actions --> Act1{Error Message?}
    Act1 -->|Permission denied| Act2[🔑 Fix GITHUB_TOKEN permissions]
    Act1 -->|Broken Links| Act3[🔗 Check Markdown links in resources/]
    Act1 -->|Build Failed| Act4[🏗️ Verify build configuration]
    Act1 -->|Deploy Failed| Act5[📤 Check deployment settings]
    
    Act2 --> Act2a["Add these permissions to deploy.yml:<br/>- contents: write<br/>- pages: write"]
    Act3 --> Act3a[Review all links in .md files for typos]
    Act4 --> Act4a[Check resources/ folder structure]
    Act5 --> Act5a[Verify GitHub Pages enabled in Settings]

    %% DNS Branch
    DNS --> DNS1{Type of Error?}
    DNS1 -->|CNAME Collision| DNS2[❌ Check if www or @ duplicated]
    DNS1 -->|Not Found| DNS3[⏳ Wait 24h or check A Records]
    DNS1 -->|Timeout| DNS4[🔍 Verify DNS records at Name.com]
    
    DNS2 --> DNS2a["Solution: Keep ONE record per host"]
    DNS3 --> DNS3a["Use DNS Lookup tool to verify:<br/>DNS Propagation Time"]
    DNS4 --> DNS4a["Verify all 4 GitHub IPs are added:<br/>185.199.108.153<br/>185.199.109.153<br/>185.199.110.153<br/>185.199.111.153"]

    %% SSL Branch
    SSL --> SSL1{DNS configured?}
    SSL1 -->|Yes| SSL2[⏳ Wait for cert - 15-60 min]
    SSL1 -->|No| SSL3[🔧 Configure Name.com IPs first]
    
    SSL2 --> SSL2a["Don't toggle 'Enforce HTTPS' repeatedly!<br/>GitHub is processing your request"]
    SSL3 --> SSL3a["Go to DOMAIN_SETUP.md for full DNS config"]

    %% Other Branch
    Other --> Oth1["Check GitHub Status Page<br/>Try clearing browser cache<br/>Check if repo is public"]

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

## 📋 Common Issues & Solutions

### 1. CNAME Record Collisions
**Symptom:** You can't save DNS records in Name.com.
**Solution:** Ensure you don't have two records for the same host. For example, if you use a CNAME for `www`, you shouldn't have an A record for `www`.

```mermaid
graph LR
    A["❌ WRONG:<br/>A record: www<br/>CNAME: www"] --> B["⚠️ Conflict!"]
    C["✅ CORRECT:<br/>A record: @<br/>CNAME: www"] --> D["✓ Works!"]
    
    style A fill:#ff4757,color:#fff
    style B fill:#ff4757,color:#fff
    style C fill:#2ed573,color:#000
    style D fill:#2ed573,color:#000
```

### 2. HTTPS Certificate Delays
**Symptom:** "Your connection is not private" error.
**Solution:** After pointing DNS to GitHub, it takes about 15-60 minutes for GitHub to verify and issue an SSL certificate. **Do not** toggle the setting repeatedly; just wait.

```mermaid
timeline
    title SSL Certificate Timeline
    section Setup (0-5 min)
        DNS configured: GitHub receives DNS update
    section Verification (5-15 min)
        GitHub checks DNS: Verifies your domain
    section Issuance (15-30 min)
        Certificate issued: Let's Encrypt processes request
    section Active (30+ min)
        HTTPS enabled: Certificate active and verified
```

### 3. Workflow Permission Failures
**Symptom:** GitHub Actions logs say `Permission denied`.
**Solution:** If you are in an Academic Organization (University repo), they often restrict Actions. Ensure you have `contents: write` and `pages: write` in your `deploy.yml`.

```mermaid
graph TD
    A["🔐 Permissions Error"] --> B{Organization Type?}
    B -->|Academic| C["Most restrictive"]
    B -->|Standard| D["Default permissions"]
    B -->|Enterprise| E["Variable restrictions"]
    
    C --> C1["Add to deploy.yml:<br/>permissions:<br/>  contents: write<br/>  pages: write"]
    D --> D1["Usually works as-is"]
    E --> E1["Contact org admin"]
    
    style A fill:#ff4757,color:#fff
    style C fill:#ffa502,color:#fff
    style D fill:#ffa502,color:#fff
    style E fill:#ffa502,color:#fff
    style C1 fill:#2ed573,color:#000
    style D1 fill:#2ed573,color:#000
    style E1 fill:#2ed573,color:#000
```

---

## 🚀 GitHub Pages Deployment Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Code_Push: Push to main/master
    Code_Push --> GitHub_Actions: Workflow triggered
    GitHub_Actions --> Build: Build site files
    Build --> Tests: Run validation
    Tests --> Artifact: Create artifact
    Artifact --> Deploy: Deploy to Pages
    Deploy --> Live: Live on web
    Live --> [*]
    
    GitHub_Actions --> Error: Build fails?
    Error --> [*]: Check logs
    Tests --> Error: Tests fail?
```

## 📊 Troubleshooting Workflow

```mermaid
flowchart TD
    Start["🚀 Site Issue Reported"] --> Step1{Is site loading?}
    
    Step1 -->|No| Step2{Can access domain?}
    Step2 -->|No| Step3["Check DNS Records"]
    Step2 -->|Yes| Step4["Check GitHub Pages Settings"]
    
    Step1 -->|Yes| Step5{HTTPS error?}
    Step5 -->|Yes| Step6["Wait for Certificate<br/>or Check Enforce HTTPS"]
    Step5 -->|No| Step7{Build issue?}
    
    Step7 -->|Yes| Step8["Review Workflow Logs"]
    Step7 -->|No| Step9["Check Content Links"]
    
    Step3 --> Resolution["✅ DNS Issue Identified"]
    Step4 --> Resolution
    Step6 --> Resolution
    Step8 --> Resolution
    Step9 --> Resolution
    
    Resolution --> End["🎉 Issue Resolved"]
    
    style Start fill:#3498db,color:#fff
    style End fill:#2ed573,color:#000
    style Resolution fill:#2ed573,color:#000
```

## 🔍 Quick Diagnostics Checklist

```mermaid
checklist
    title Quick Diagnostics
    - Is repo public?
    - Have you waited 5-10 minutes after pushing?
    - Are all DNS records configured?
    - Is 'Enforce HTTPS' disabled (until cert ready)?
    - Does your CNAME match your domain?
    - Are Actions enabled in your repo?
    - Check GitHub Status at status.github.com
```

