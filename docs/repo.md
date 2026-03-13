---
sidebar_position: 2
title: Create repo from template
---


Use this command to create a new repository from the Docusaurus template, where `aidocs.gksandbox.eu` is the name for the new reposirory:

```bash
gh repo create aidocs.gksandbox.eu \
  --template nand0l/docusaurus-template \
  --private \
  --description "AI and AWS documentation site" \
  --clone
```

See [Command Breakdown](#command-breakdown) below for a full explanation of each flag.

---

## Command Breakdown

`gh repo create` is the GitHub CLI subcommand for creating a new repository. Everything after it is a combination of the **target repo name** and **flags**.

### Positional Argument

The first **Positional Argument** is the name for The name of the new repository to create.

```bash
aidocs.gksandbox.eu
```

- Dots are valid in GitHub repo names — this becomes `github.com/<your-account>/aidocs.gksandbox.eu`
- No owner prefix specified → repo is created under the **authenticated account** (whatever `gh auth status` shows)
- To create under an org, prefix it: `nand0l/aidocs.gksandbox.eu`

### Flags

#### `--template nand0l/docusaurus-template`

- Tells GitHub to use `github.com/nand0l/docusaurus-template` as the source
- Copies the **default branch** only (not all branches) — unlike a fork
- The new repo starts with a **single commit** — no inherited commit history from the template
- Requires the source repo to have **"Template repository"** enabled under Settings → General
- You do not need to own the template; any public template works

#### `--private`

- Visibility of the **new** repo, not the template
- Options: `--public`, `--private`, `--internal` (internal = org-only, requires GitHub org)
- The template can be public while the new repo is private — no conflict

#### `--description "AI and AWS documentation site"`

- Sets the repository description shown on the GitHub UI and API
- Quoted because of spaces — single quotes also work in PowerShell

#### `--clone`

- After creating the remote repo, automatically runs `git clone` into the **current working directory**
- Creates a subdirectory named after the repo: `.\aidocs.gksandbox.eu\`
- Sets `origin` remote to the new repo's URL
- Uses HTTPS or SSH depending on your `gh` auth configuration (`gh auth status` shows which protocol)

### Execution Flow

```text
gh auth token validated
        │
        ▼
POST /repos/nand0l/docusaurus-template/generate
        │   (GitHub API: create from template)
        ▼
New repo created at github.com/<you>/aidocs.gksandbox.eu
        │
        ▼
git clone https://github.com/<you>/aidocs.gksandbox.eu
        │
        ▼
Local directory: .\aidocs.gksandbox.eu\
```

### What You Get Locally After Execution

```text
aidocs.gksandbox.eu\
├── .git\               ← initialized, origin = new repo
├── docusaurus.config.js
├── package.json
└── ...                 ← all files from template default branch
```

No template history — `git log` shows one commit: the template snapshot.

### Common Follow-up After Clone

```powershell
Set-Location .\aidocs.gksandbox.eu
npm install          # install Docusaurus dependencies
npm run start        # local dev server on http://localhost:3000
```

### Useful Verification Commands

| Command | Purpose |
| :--- | :--- |
| `gh auth status` | Confirm authenticated account and protocol |
| `gh repo view aidocs.gksandbox.eu` | View new repo metadata |
| `git remote -v` | Confirm origin URL in cloned dir |
| `gh repo view nand0l/docusaurus-template --json isTemplate` | Verify template flag is set on source |
