module.exports = {
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
  },
  documents: {
    // Enforce `required` on relations (e.g. blog.categories) when publishing.
    // Without this, Strapi treats required relations as optional.
    strictRelations: true,
  },
};
