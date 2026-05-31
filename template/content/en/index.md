---
title: Home
layout: landing
---

{% hero
  title="Your product name"
  titleAccent="tagline here."
  description="A short description of what your docs cover and who they're for."
%}
{% button path="/getting-started" %}Get started{% /button %}
{% /hero %}

{% section title="Everything you need" %}
{% cardGrid cols="3" %}
{% card title="Getting Started" path="/getting-started" %}
A short description of this section.
{% /card %}
{% card title="Core Concepts" path="/getting-started" %}
A short description of this section.
{% /card %}
{% card title="Reference" path="/getting-started" %}
A short description of this section.
{% /card %}
{% /cardGrid %}
{% /section %}
