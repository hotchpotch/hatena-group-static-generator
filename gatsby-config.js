/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Hatena::Group::SubTech::secondlife`,
  },
  plugins: [
    'gatsby-plugin-eslint',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/hatena-group-exports/`,
        name: `hatena-group`,
      },
    },
  ]
}
