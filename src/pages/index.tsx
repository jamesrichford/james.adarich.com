import * as React from "react";
import { PostLink } from "../components/post-link";
import { Page } from "../layouts/page";
import { BlogPostQueryModel } from "../graphql/blog-post";
import { graphql } from "gatsby";

interface BlogListProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{ node: BlogPostQueryModel }>;
    };
  };
}

export default function BlogList(props: BlogListProps) {
  const POSTS = props.data.allMarkdownRemark.edges
    .filter(edge => !edge.node.frontmatter.draft) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  const DESCRIPTION =
    "A collection of musings, " +
    "thoughts and down right outrageous ideas " +
    "about software and all things nerdy!";

  return (
    <Page title="Blog" description={DESCRIPTION}>
      {POSTS}
    </Page>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            description
            draft
          }
        }
      }
    }
  }
`;
