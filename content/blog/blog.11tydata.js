export default {
  permalink: "blog/{{ page.date | date: '%Y/%m' }}/{{ page.fileSlug }}/index.html",
  tags: [
    "posts"
  ],
  layout: "layouts/post.njk",
};
