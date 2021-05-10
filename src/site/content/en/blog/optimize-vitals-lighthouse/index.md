---
layout: post
title: Optimizing Core Web Vitals using Lighthouse
subhead: Finding opportunities to improve user-experience with Chrome's web tooling.
authors:
  - addyosmani
description: |
  Today, we will cover new tooling features in Lighthouse, PageSpeed and DevTools to help identify how your site can improve on the Core Web Vitals.
date: 2021-05-07
hero: image/1L2RBhCLSnXjCnSlevaDjy3vba73/9pCniP0TdYM5O9PDydl4.jpeg
alt: "A Lighthouse lighting up the sea"
tags:
  - blog
  - fast
  - performance
  - web-vitals
---

Today, we'll cover new tooling features in Lighthouse, PageSpeed and DevTools to help identify
how your site can improve on the Core Web Vitals.

As a refresher on the tools, [Lighthouse](https://github.com/GoogleChrome/lighthouse) is an
open-source, automated tool for improving the quality of web pages. You can find it in the [Chrome
DevTools](https://developers.google.com/web/tools/chrome-devtools) suite of debugging tools and run
it against any web page, public or requiring authentication. You can also find Lighthouse in
[PageSpeed
Insights](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fstore.google.com),
[CI](https://github.com/GoogleChrome/lighthouse-ci) and
[WebPageTest](https://www.webpagetest.org/easy). 

Lighthouse 7.x includes new features like element screenshots, for easier visual inspection of
parts of your UI impacting user-experience metrics (e.g. what nodes are contributing to layout
shift).


<figure class="w-figure">
<video muted autoplay loop>      
<source type="video/mp4" src="https://storage.googleapis.com/web-dev-uploads/video/1L2RBhCLSnXjCnSlevaDjy3vba73/3G0x4Z1dmOcsusG7j1LE.mp4" type="video/mp4" width="1920" height="1080">    
</video>
</figure>

We've also shipped support for element screenshots on PageSpeed Insights, enabling a way to more
easily spot issues for one-off performance runs of pages.

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/mfkWFzyfO9XlJLYS80DE.png", alt="Element Screenshots highlighting the DOM node contributing to layout shift in the page", width="800", height="483" %}
</figure>


## Measure Core Web Vitals

Lighthouse can
[synthetically](/vitals-measurement-getting-started/#measuring-web-vitals-using-lab-data) measure
the [Core Web Vitals metrics](/vitals/) including [Largest Contentful Paint](/lcp/), [Cumulative
Layout Shift](/cls/) and [Total Blocking Time](/tbt/) (a lab proxy for [First Input Delay](/fid/)).
These metrics reflect loading, layout stability, and interaction readiness. Other metrics such as
[First Contentful Paint](/first-contentful-paint/) highlighted in the [future of
CWV](https://developer.chrome.com/devsummit/sessions/future-of-core-web-vitals/) are there too.

The "Metrics" section of the Lighthouse report includes lab versions of these metrics. You can use
this as a summary view of what aspects of user-experience require your attention. 

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/VkLhdNb3fxtfttFZ1S6E.png", alt="Lighthouse peformance metrics", width="800", height="485" %}
</figure>

{% Aside %} Lighthouse focuses on measuring user-experience during the initial page load in a lab
setting, emulating a slow phone or desktop machine. If there is behavior on your page that may cause
layout shifts or long JavaScript tasks after page-load, the lab metrics will not reflect this. Try
the DevTools Performance panel, [Search Console](https://search.google.com/search-console/about),
the [Web Vitals
extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma?hl=en),
or RUM for a post-load view into the metrics. {% endAside %}

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/PLMoiQpi12jT7BJUvlOJ.png", alt="Web Vitals lane in the devtools performance panel", width="800", height="476" %}
  <figcaption>The new Web Vitals option in the DevTools Performance panel displays a
track which highlights metric moments, such as Layout Shift (LS) shown above.</figcaption>
</figure>

[Field metrics](/vitals-field-measurement-best-practices/), such as those found in the [Chrome UX
Report](https://developers.google.com/web/tools/chrome-user-experience-report) or
[RUM](https://developer.mozilla.org/en-US/docs/Web/Performance/Rum-vs-Synthetic), do not have this
limitation and are a valuable complement to lab data as they reflect the experience real users
have. Field data can't offer the kinds of diagnostic information you get in the lab, so the two go
hand in hand.

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/iywvhTMqrgzG1k1v5vC1.png", alt="RUM vendor support for the core web vitals", width="800", height="518" %}
</figure>

Several third-party services offer dashboards for field and RUM data, including [SpeedCurve
(LUX)](https://speedcurve.com/blog/web-vitals-user-experience/), [Vercel
Analytics](https://vercel.com/docs/next.js/analytics), [Akamai
mPulse](https://www.akamai.com/us/en/products/performance/mpulse-real-user-monitoring.jsp) and
[Treo.sh](https://treo.sh/).

## Identify where you can improve on CWV

### Identify the Largest Contentful Paint element

LCP is a measurement of perceived loading experience. It marks the point during page load when the
primary–or "largest"–content has loaded and is visible to the user. 

Lighthouse has a "Largest Contentful Paint element" audit that identifies what element was the
largest contentful paint. Hovering over the element will highlight it in the main browser window.

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/qeNJwYAVxysRV0okWmf4.png", alt="Largest Contentful Paint element", width="800", height="505" %}
</figure>

If this element is an image, this information is a useful hint that you may want to optimize the loading
of this image. Lighthouse includes a number of image optimization audits for helping you understand
if your images could be better compressed, resized or delivered in a more optimal modern image
format.

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/8RVIyj6NiMfx7VDVbQmI.png", alt="Properly size images audit", width="800", height="468" %}
</figure>

You might also find [LCP
Bookmarklet](https://gist.github.com/anniesullie/cf2982342337fd1b2be95c2d5fe5ea06) by Annie
Sullivan useful for quickly identifying the LCP element with a red rectangle in just one click.

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/eZJdYsdfsNniDW1KRJkE.png", alt="Highlighting the LCP element with a bookmarklet", width="800", height="509" %}
</figure>

### Preload late-discovered images to improve LCP

To improve the Largest Contentful Paint, [preload](/preload-responsive-images/) your critical hero
images if they are being discovered late by the browser. A late discovery can happen if a
JavaScript bundle needs to be loaded before the image is discoverable.  

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/K9EPBZdSFoyXVDHoDjTx.png", alt="Preload the largest contentful paint image", width="800", height="489" %}
</figure>

Lighthouse 6.5 and above now suggests opportunities to apply this optimization.

There are a few common questions we are asked about preloading LCP images that may also be worth
briefly covering.

Can you preload responsive images? [Yes](/preload-responsive-images/#imagesrcset-and-imagesizes).
Let's say we have a responsive hero image as specified using `srcset` and `sizes` below:

```html
<img src="lighthouse.jpg"   
          srcset="lighthouse_400px.jpg 400w,   
                  lighthouse_800px.jpg 800w,   
                  lighthouse_1600px.jpg 1600w" sizes="50vw" alt="A helpful
Lighthouse">  
```

Thanks to the `imagesrcset` and `imagesizes` attributes added to the `link` attribute, we can
preload a responsive image using the same image selection logic used by `srcset` and `sizes`:

```html 
<link rel="preload" as="image" href="lighthouse.jpg"   
           imagesrcset="lighthouse_400px.jpg 400w,   
                        lighthouse_800px.jpg 800w,   
                        lighthouse_1600px.jpg 1600w"
imagesizes="50vw">  
```

Will the audit also highlight preload opportunities if the LCP image is defined via a CSS
background? Yes.

Any image flagged as the LCP image whether via CSS background or `<img>` is a candidate if it's
discovered at a waterfall depth of three or more.

### Identify CLS contributions

Cumulative Layout Shift is a measurement of visual stability. It quantifies how much a page's
content visually shifts around. Lighthouse has an audit for debugging CLS called "Avoid large
layout shifts". 

This audit highlights DOM elements that contribute the most to shifts of the page. In the Element
column to the left you will see the list of these DOM elements and to the right, their overall CLS
contribution.

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/X31lkLFtfjDZdO2O7ytV.png", alt="The avoid large layout shifts audit in Lighthouse highlighting relevant DOM nodes contributing to CLS", width="800", height="525" %}
</figure>

Thanks to the new Lighthouse Element Screenshots feature, we can both see a visual preview of the
key elements noted in the audit as well as click-to-zoom for a clearer view:

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/L9geZVvkATRlAVcZA6dx.png", alt="Clicking on an Element screenshot will expand it", width="800", height="525" %}
</figure>

For post-load CLS, I personally find a lot of value in _persistently_ visualizing with rectangles
which elements contributed the most to CLS. This is a feature you'll find in third-party tools like
SpeedCurve's [Core Web Vitals dashboard](https://speedcurve.com/blog/web-vitals-user-experience/)
and which I love using [Defaced's Layout Shift GIF
Generator](https://defaced.dev/tools/layout-shift-gif-generator/) for:

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/ju6XjKBYzF6G537myjUW.gif", alt="the layout shift generator highlighting shifts", width="800", height="450" %}
</figure>

For a site-wide view of layout shift issues, I get a lot of mileage out of [Search Console's Core
Web Vitals report](https://support.google.com/webmasters/answer/9205520?hl=en). This lets me see
the kinds of pages on my site with a high CLS (in this case helping self-identify what template
partials I need to spend my time on):

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/2Ihb2GYkbpGzYLYoZEDP.png", alt="Search Console displaying CLS issues", width="800", height="506" %}
</figure>

### Identifying CLS from images without dimensions

To [limit](/optimize-cls/#images-without-dimensions) Cumulative Layout Shift being caused by images
without dimensions, include width and height size attributes on your images and video elements.
This approach ensures that the browser can allocate the correct amount of space in the document
while the image is loading.

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/fZRkmM18rvfy6y7LB1Qx.png", alt="Audit for image elements without explicit width and height", width="800", height="489" %}
</figure>

See [Setting Height And Width On Images Is Important
Again](https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/) for a
good write-up on the importance of thinking about image dimensions and aspect ratio.

### Identifying CLS from advertisements

[Publisher Ads for Lighthouse](https://developers.google.com/publisher-ads-audits) allows you to
find opportunities to improve the loading experience of ads on your page, including contributions
to layout shift and long tasks that may push out how soon your page is usable by users. In
Lighthouse, you can enable this via Community Plugins.

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/kR3jgctso6Hg0OxD8xwi.png", alt="Ads related audits highlighting opportunities to reduce time to request and layout shift", width="800", height="527" %}
</figure>

Remember that ads are one of the
[largest](/optimize-cls/#ads-embeds-and-iframes-without-dimensions) contributors to layout shifts
on the web. It's important to:

+   Take care when placing non-sticky ads near the top of the viewport 
+   Eliminate shifts by reserving the largest possible size for the ad slot

### Preload optional fonts to prevent layout shifts

Layout shifts occur when the content on a page changes dynamically, causing a "shift" of other content. The fetching and rendering of web fonts is one such example that can cause layout shifts. This can happen due to fallback fonts being swapped in with a new font, causing FOUT (flash of unstyled text) or when invisible text is shown until the font required is rendered, causing FOIT (flash of invisible text).

Optimizations in Chrome can remove the first render cycle for [optional fonts that are preloaded](/preload-optional-fonts) using `<link rel=preload>`. Rendering is blocked until the custom font has finished loading or a certain amount of time has passed, meaning no FOIT.

Lighthouse highlights opportunities to preload fonts when one or more of them used `font-display: optional` and were not preloaded. 

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/GzqMzIzPVS1n5H11LdHf.png", alt="Lighthouse audit suggesting preloading optional fonts", width="800", height="545" %}
</figure>

Keep in mind that great care should be taken when considering preload for fonts as other options, such as [inlining font CSS at build-time](https://nextjs.org/blog/next-10-2#automatic-webfont-optimization), may also be able to get you far without as much risk of contending with requests for other important resources. [Preloading Fonts and the Puzzle of Prorities](https://andydavies.me/blog/2019/02/12/preloading-fonts-and-the-puzzle-of-priorities/) by Andy Davies is also a solid write-up on the trade-offs of font preloading.

{% Aside %}It can seem counterintuitive to use `font-display: optional` on critical fonts. There is a [spec issue](https://github.com/w3c/csswg-drafts/issues/5924) open for discussing if a new `font-display` value should be added for such fonts. {% endAside %}

### Avoid non-composited animations

Animations which are non-composited can present themselves as janky on lower-end devices if heavy
JavaScript tasks are keeping the main thread busy. Such animations can introduce layout shifts.

If Chrome discovers an animation couldn't be composited, it reports it to a DevTools trace
Lighthouse reads, allowing it to list which elements with animations weren't composited and for
what reason. You can find these in the [Avoid non-composited
animations](/non-composited-animations/) audit.

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/heGuYXKeMrUftMvfrDU7.png", alt="Audit for avoiding non-composited animations", width="800", height="528" %}
</figure>

### Debug First Input Delay / Total Blocking Time / Long Tasks

First Input measures the time from when a user first interacts with a page (e.g. when they click a
link, tap on a button, or use a custom, JavaScript-powered control) to the time when the browser is
actually able to begin processing event handlers in response to that interaction. Long JavaScript
Tasks can impact this metric and the proxy for this metric, Total Blocking Time. 

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/LqBCtAXdByd4fBzoNc1K.png", alt="Audit for avoiding long main thread tasks", width="800", height="485" %}
</figure>

Lighthouse includes an [Avoid long main-thread tasks](/long-tasks-devtools/) audit which lists the
longest tasks on the main thread. This can be helpful for identifying the worst contributors to
input delay. In the left column we can see the URL of scripts responsible for long main-thread
tasks. 

To the right we can see the duration of these tasks. As a reminder, Long Tasks are tasks which
execute for longer than 50 milliseconds. This is considered to block the main thread long enough to
impact frame rate or input latency.

If considering third-party services for monitoring, I also quite like the [main-thread execution
timeline](https://calibreapp.com/docs/features/main-thread-execution-timeline) visual Calibre has
for visualizing these costs, which highlights both parent and child tasks contributing to long
tasks that impact interactivity.

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/IGENqHBjC97pHslOQYc6.png", alt="The main-thread execution timeline visual Calibre has", width="800", height="155" %}
</figure>

### Block network requests to see the before/after impact in Lighthouse

Chrome DevTools supports [blocking network
requests](https://developers.google.com/web/updates/2017/04/devtools-release-notes#block-requests)
to see the impact of individual resources being removed or not being available. This can be helpful
for understanding the cost individual scripts (e.g such as third-party embeds or trackers) have on
metrics like Total Blocking Time (TBT) and Time to Interactive.

Network request blocking happens to also work with Lighthouse! Let's take a quick look at the
Lighthouse report for a site. The Perf score is 63/100 with a TBT of 400ms. Digging into the code,
we find this site loads an Intersection Observer polyfill in Chrome which isn't necessary. Let's
block it!

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/DPXEXhOZL0Czjm10lBox.png", alt="Network request blocking", width="800", height="508" %}
</figure>

We can right-click on a script in the DevTools Network panel and click `Block Request URL` to block
it. Here we'll do this for the Intersection Observer polyfill.

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/iWB0jAtL0PKpwkmecOPf.png", alt="Block request URLs in DevTools", width="800", height="354" %}
</figure>

Next we can re-run Lighthouse. This time we can see our performance score has improved (70/100) as
has Total Blocking Time (400ms => 300ms). 

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/LiaMMxvy4prpFBIuSgfo.png", alt="The after view of blocking costly network requests", width="800", height="508" %}
</figure>

### Replace costly third-party embeds with a facade

It's common to use third-party resources for embedding videos, social media posts or widgets into
pages. By default, most embeds eagerly load right away and can come with costly payloads that
negatively impact the user-experience. This is wasteful if the third-party isn't critical (e.g. if
the user needs to scroll before they see it).

One pattern to improve performance of such widgets is to [lazy-load them on user
interaction](https://addyosmani.com/blog/import-on-interaction/). This can be done by rendering a
lightweight preview of the widget (a facade) and only load the full version if a user interacts
with it. Lighthouse has an audit that will recommend third-party resources which can be
[lazy-loaded with a facade](/third-party-facades/), such as YouTube video embeds.  

<figure class="w-figure">
  {% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/iciXy3oVlPH7VuwN7toy.png", alt="Audit highlighting that some costly third party resources can be replaced", width="800", height="483" %}
</figure>

### Beyond Core Web Vitals

Beyond highlighting the Core Web Vitals, recent versions of Lighthouse and PageSpeed Insights also
try to provide concrete guidance you can follow for improving how quickly JavaScript-heavy web
applications can load if you have source maps turned on.

These include a growing collection of audits for reducing the cost of JavaScript in your page, such
as reducing reliance on polyfills and duplicates that may not be needed for the user-experience.

For more information on Core Web Vitals tooling, keep an eye on the [Lighthouse
team](https://twitter.com/____lighthouse) Twitter account and [What's new in
DevTools](https://developers.google.com/web/updates/2020/05/devtools).

[Hero image](https://unsplash.com/photos/D5OzyJ71mLI) by
[Robert Wiedemann](https://unsplash.com/@antilumen)
on [Unsplash](https://unsplash.com).

