# github-style

## Install the theme

```bash
mkdir themes
git submodule add git@github.com:MeiK2333/github-style.git themes/github-style
```

## Update the theme

```bash
cd themes/github-style
git pull
```

## Setup About page

```bash
hugo new about.md
```

add `layout = "about"` to `content/about.md`

```
---
title: "About"
date: 2019-10-22T18:46:47+08:00
layout: "about"
---

about me
```

## config.toml example

```toml
baseURL = "https://example.com/"
title = "GitHub Style"
googleAnalytics = "UA-123-456-789"
theme = "github-style"

[params]
  author = "example"
  description = "example"
  github = "example"
  twitter = "example"
  email = "example@domain.com"
  utterances = "example/example.github.io"
  avatar = "https://example.com/images/avatar.png"
  url = "https://example.com"
```
