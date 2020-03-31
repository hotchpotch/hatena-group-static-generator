/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Hatena::Group::SubTech id:secondlife`,
    groupName: 'subtech',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/hatena-group-exports/`,
        name: `hatena-group`,
      },
    },
    'gatsby-plugin-eslint',
    `gatsby-plugin-react-helmet`,
  ]
}
