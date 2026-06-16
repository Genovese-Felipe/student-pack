# 🛠️ Troubleshooting & Decision Tree

Having trouble with your deployment or domain? Follow this guide.

## 🌳 Decision Tree

```mermaid
graph TD
    Start[Problem Detected] --> Type{Where is the error?}

    Type -->|GitHub Actions| Actions[Workflow Failed]
    Type -->|Domain/DNS| DNS[Site Not Loading]
    Type -->|HTTPS/SSL| SSL[Privacy Warning]

    Actions --> Act1{Error Message?}
    Act1 -->|Permissions| Act2[Fix GITHUB_TOKEN permissions in deploy.yml]
    Act1 -->|Broken Links| Act3[Check Markdown links in resources/]

    DNS --> DNS1{Type of Error?}
    DNS1 -->|CNAME Collision| DNS2[Check if 'www' or '@' is duplicated]
    DNS1 -->|Not Found| DNS3[Wait 24h or check A Records]

    SSL --> SSL1{DNS configured?}
    SSL1 -->|Yes| SSL2[Wait for GitHub to issue the cert - 30min]
    SSL1 -->|No| SSL[Configure Name.com IPs first]
```

## 📋 Common Issues & Solutions

### 1. CNAME Record Collisions
**Symptom:** You can't save DNS records in Name.com.
**Solution:** Ensure you don't have two records for the same host. For example, if you use a CNAME for `www`, you shouldn't have an A record for `www`.

### 2. HTTPS Certificate Delays
**Symptom:** "Your connection is not private" error.
**Solution:** After pointing DNS to GitHub, it takes about 15-60 minutes for GitHub to verify and issue an SSL certificate. **Do not** toggle the setting repeatedly; just wait.

### 3. Workflow Permission Failures
**Symptom:** GitHub Actions logs say `Permission denied`.
**Solution:** If you are in an Academic Organization (University repo), they often restrict Actions. Ensure you have `contents: write` and `pages: write` in your `deploy.yml`.

---

## 🚀 GitHub Pages Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Commit
    Commit --> CI_Checks
    CI_Checks --> Artifact_Upload
    Artifact_Upload --> Deployment
    Deployment --> [*]
```
