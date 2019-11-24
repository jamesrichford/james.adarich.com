import * as React from "react";
import Helmet from "react-helmet";
import SiteShell from "./index";

interface PageProps {
  readonly title: string;
  readonly description: string;
  readonly keywords?: Array<string>;
}

export abstract class Page extends React.PureComponent<PageProps> {
  private get keywords() {
    return [
      "James",
      "Adarich",
      "developer",
      "software engineer",
      "blog"
    ].concat(this.props.keywords);
  }

  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <SiteShell>
        <div className="page-container">
          <Helmet
            title={`James Adarich - ${this.props.title}`}
            meta={[
              { name: "description", content: this.props.description },
              { name: "keywords", content: this.keywords.join(", ") },
              { name: "google-site-verification", content: "bJBNl5V0jiXwQhRhx9_w-dWSaN-H3QIQxfAZVx2-gUU" }
            ]}
          >
            <html lang="en" />
          </Helmet>
          {this.props.children}
        </div>
      </SiteShell>
    );
  }
}
