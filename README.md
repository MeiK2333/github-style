# theme-hugo

theme for my hugo projects

based originally on github-style

## init hugo site

```bash
hugo new site <name>
cd <name>
```

## install the theme

```bash
git submodule add git@github.com:m-c-frank/theme-hugo.git themes/theme-hugo
```

## update the theme

```bash
cd themes/github-style
git pull
```

then, you need to rename the previous `posts` folder to `post`

```bash
cd <your-project-folder>
mv content/posts content/post
```

## setup readme

```bash
cp README.md content/readme.md
```

## pin post

```
---
pin: true
---
```

## add new post

hugo will create a post with `draft: true`, change it to false in order for it to show in the website.

```
hugo new post/20240112.md
```

## limit display content

### approach 1: use summary

```
---
title: "levels of abstraction"
date: 2024-01-12 20:34
draft: false
summary: "summary content about levels of abstraction"
---
```

### approach 2: use `<!--more-->`

use `<!--more-->` to separate content that will display in the posts page as abstraction and the rest of the content. this is different from summary, as summary will not appear in the post.
```
---
title: "title"
date: 2024-01-12 20:34
draft: false
---
abstraction show in the post page
<!--more-->
other content
```

### todo: customizable abstraction

let the user enter their preferred prompt to prepare the data in a way that is useful for them

## support LaTeX

in the post add `math: true` to [front matter](https://gohugo.io/content-management/front-matter/)

```
---
katex: math
---
```

then the [katex script](https://katex.org/docs/autorender.html) will auto render the string enclosed by delimiters.

```
# replace ... with latex formula
display inline \\( ... \\)
display block $$ ... $$
```

## support collapsible block

you can create a collapsible block like this:

```
{{<details "summary title">}}

block content

{{</details>}}
```

and it will show like this:

<details>
  <summary>summary title</summary>
  <p>block content</p>
</details>

## deploy.sh example

there are various way to deploy to github, here is a link to official [document](https://gohugo.io/hosting-and-deployment/hosting-on-github/).

## todo
- [ ] add setup scrip for configuration
- [ ] secret handling instructions
