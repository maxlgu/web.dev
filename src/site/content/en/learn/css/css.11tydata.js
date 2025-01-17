module.exports = function () {
  return {
    layout: 'course',
    // The key is used to look up the data for the course in _data.
    // e.g. A course with a key of 'a11y' would have a corresponding
    // _data/courses/a11y directory.
    projectKey: 'css',
    // Exclude course content from the /tags/ pages.
    excludeFromTags: true,
    // Exclude course content from the /authors/ pages.
    excludeFromAuthors: true,
    eleventyComputed: {
      thumbnail: (data) => {
        const {projectKey} = data;
        // Use thumbnail defined in the frontmatter or in the meta.yml file.
        return data.thumbnail || data?.courses?.[projectKey]?.meta?.thumbnail;
      },
      permalink: (data) => {
        if (process.env.ELEVENTY_ENV === 'prod') {
          return false;
        }

        // I'm not sure why the output-permalinks.js eleventyComputed function
        // isn't stripping this for me, maybe it has to do with the order that
        // eleventy runs these in. But it's not a big deal as this is a short
        // lived 11tydata.js file that we're going to remove when the course
        // ships.
        return (data.page.filePathStem + '.html').replace(/^\/en\//, '/');
      },
    },
  };
};
