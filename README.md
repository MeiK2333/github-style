# github-style

## Init hugo site

```bash
hugo new site mysite
cd mysite
```

## Install the theme

```bash
git submodule add git@github.com:MeiK2333/github-style.git themes/github-style
```

## Update the theme
If you just installed the theme, it is already in the lattest version. If not, you can update using the below commands
```bash
cd themes/github-style
git pull
```

## Setup About page

```bash
hugo new about.md
```

This creates content/about.md file. Then add `layout = "about"` to `content/about.md`, and remove the line `draft:true`

```
---
title: "About"
date: 2019-10-22T18:46:47+08:00
layout: "about"
---

about me
```

## Add new posts
Hugo will create a post with `draft: true`, change it to false in order for it to show in the website. 
```
hugo new posts/title_of_the_post.md
```

## Limit display content

### Approch 1: use summary
```
---
title: "title"
date: 2019-10-22T18:46:47+08:00
draft: false
summary: "The summary content"
---
```

### Approch 2: use `<!--more-->`
Use `<!--more-->` to seperate content that will display in the posts page as abstraction and the rest of the content. This is different from summary, as summary will not appear in the post.
```
---
title: "title"
date: 2019-10-22T18:46:47+08:00
draft: false
---
abstraction show in the post page
<!--more-->
other content
```

## add last modified data
Unfortunately, hugo cannot automaticlly get files' modified date, and it needs to be manually set in page as `lastmode`. 
```
---
lastmode: 2019-10-22T18:46:47+08:00
---
```

## Support LaTex
In you post add `katex:true` to [front matter](https://gohugo.io/content-management/front-matter/)
```
---
katex: true
---
```
Then the [katex script](https://katex.org/docs/autorender.html) will auto render the string enclosed be delimiters. 
```
# replace ... with latex formula
display inline \\( ... \\)
display block $$ ... $$
```
![latex example](images/latex_example.png)

## config.toml example

```toml
baseURL = "https://example.com/"
title = "GitHub Style"
googleAnalytics = "UA-123-456-789"
theme = "github-style"
copyright = "© 2019. Theme by <a href=\"https://github.com/MeiK2333/github-style\"><span>github-style</span></a>"

[params]
  author = "example"
  description = "example"
  github = "example"
  facebook = "example"
  twitter = "example"
  misskey = "user profile url"
  mastodon = "user profile url"
  email = "example@domain.com"
  utterances = "example/example.github.io"
  avatar = "https://example.com/images/avatar.png"
  url = "https://example.com"
  keywords = "blog, google analytics"
```

## deploy.sh example
There are various way to deploy to github, here is a link to official [document](https://gohugo.io/hosting-and-deployment/hosting-on-github/). 

Here is an sample. Note line 22 have `env HUGO_ENV="production"`, makes sure googleAnalysis is loaded during production, but is not loaded when we are testing it in localhost.

```bash
#!/bin/sh

if [ "`git status -s`" ]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo "Deleting old publication"
rm -rf public
mkdir public
git worktree prune
rm -rf .git/worktrees/public/

echo "Checking out gh-pages branch into public"
git worktree add -B gh-pages public origin/gh-pages

echo "Removing existing files"
rm -rf public/*

echo "Generating site"
env HUGO_ENV="production" hugo -t github-style

echo "Updating gh-pages branch"
cd public && git add --all && git commit -m "Publishing to gh-pages (publish.sh)"

#echo "Pushing to github"
#git push --all
```
Then you can verify the site is working and use `git push --all` to push the change to github. If you don't want to check again every time, you can uncomment the `#git push --all` in the script.