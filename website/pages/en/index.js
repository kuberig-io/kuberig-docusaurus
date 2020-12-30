/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = (props) => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = (props) => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = (props) => (
      <h2 className="projectTitle">
        {props.title}
        <small>{props.tagline}</small>
      </h2>
    );

    const PromoSection = (props) => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = (props) => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
        <div className={"intro"}>
            <div className={"container"}>
                <div style={{textAlign: "center", marginTop: "75px"}}>

                    <img src={baseUrl + "img/logo/website_logo_transparent_background_vertical.png"} />
                    <h1 className="tagline">Kubernetes without the the YAML-burnout!</h1>
                    <h2 className="subtagline">Real code to the rescue</h2>
                </div>


            </div>
        </div>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = (props) => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCalloutDsl = () => (
        <div className={"strip strip-white features pt-6 pb-4 pt-md-14 pb-md-20"}>
            <div className="container">
              <div className="row justify-space-between">
                  <div className={"col-12 col-md-5"}>
                      <div className={"product-text"}>
                          <h2>Powerful Kotlin DSL</h2>
                          <p>Using our Kotlin DSL you will enjoy total control in the way you want to define your Kubernetes resources.</p>
                      </div>
                  </div>
                  <div className={"col-12 col-md-7 position-relative"}>
                      <img width="800" src={baseUrl + "img/features/kuberig-powerful-dsl.png"} />

                  </div>
              </div>
            </div>
        </div>
    );

    const FeatureCalloutGradleTasks = () => (
        <div className={"strip strip-white features pt-6 pb-4 pt-md-14 pb-md-20"}>
            <div className="container">
                <div className="row justify-space-between">
                    <div className={"col-12 col-md-7 position-relative"}>
                        <img width="833" src={baseUrl + "img/features/kuberig-tasks.png"} />
                    </div>
                    <div className={"col-12 col-md-5"}>
                        <div className={"product-text"}>
                            <h2>Gradle Tasks</h2>
                            <p>Get work done faster with dedicated Gradle tasks for working with environments, securing sensitive data, managing container versions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

      const FeatureCalloutCrdReady = () => (
          <div className={"strip strip-white features pt-6 pb-4 pt-md-14 pb-md-20"}>
              <div className="container">
                  <div className="row justify-space-between">
                      <div className={"col-12 col-md-5"}>
                          <div className={"product-text"}>
                              <h2>CRD Ready!</h2>
                              <p>Are you using or have your own Custom Resource Definitions? </p>
                              <br/>
                              <p>No problem!</p>
                              <br/>
                              <p>The Kuberig DSL code is generated so the DSL for your favorite CRDs is just a generation away.</p>
                          </div>
                      </div>
                      <div className={"col-12 col-md-7 position-relative"}>
                          <img width="800" src={baseUrl + "img/features/kuberig-powerful-dsl.png"} />

                      </div>
                  </div>
              </div>
          </div>
      )

    const TryOut = () => (
      <Block id="try">
        {[
          {
            content:
              'To make your landing page more attractive, use illustrations! Check out ' +
              '[**unDraw**](https://undraw.co/) which provides you with customizable illustrations which are free to use. ' +
              'The illustrations you see on this page are from unDraw.',
            image: `${baseUrl}img/undraw_code_review.svg`,
            imageAlign: 'left',
            title: 'Wonderful SVG Illustrations',
          },
        ]}
      </Block>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              'This is another description of how this project is useful',
            image: `${baseUrl}img/undraw_note_list.svg`,
            imageAlign: 'right',
            title: 'Description',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content:
              'Each new Docusaurus project has **randomly-generated** theme colors.',
            image: `${baseUrl}img/undraw_youtube_tutorial.svg`,
            imageAlign: 'right',
            title: 'Randomly Generated Theme Colors',
          },
        ]}
      </Block>
    );

    const Features = () => (
        <div className={"strip strip-white features pt-6 pb-4 pt-md-14 pb-md-20"}>
            <div className={"container"}>
                <div className={"row justify-content-center"}>
                    <div className={"col-12 col-md-4 mb-2"}>
                        <div className={"highlight"}>
                            <div className={"highlight-image"}>
                                <a href={"https://kotlinlang.org"}>
                                    <img src={baseUrl + "img/features/kotlin-250x250.png"}
                                         className={"img-fluid"}></img>
                                </a>
                            </div>
                            <h2>Kotlin</h2>
                            <p>Use real code and enjoy total control.</p>
                        </div>
                    </div>
                    <div className={"col-12 col-md-4 mb-2"}>
                        <div className={"highlight"}>
                            <div className={"highlight-image"}>
                                <a href={"https://git-scm.com"}>
                                    <img src={baseUrl + "img/features/git-logo.svg"}
                                         className={"img-fluid"}></img>
                                </a>
                            </div>
                            <h2>Git</h2>
                            <p>Track all changes and enable Git-based workflows.</p>
                        </div>
                    </div>
                    <div className={"col-12 col-md-4 mb-2"}>
                        <div className={"highlight"}>
                            <div className={"highlight-image"}>
                                <a href={"https://gradle.org"}>
                                    <img src={baseUrl + "img/features/gradle-elephant-icon-gradient-primary.png"}
                                         className={"img-fluid"}></img>
                                </a>
                            </div>
                            <h2>Gradle</h2>
                            <p>Built with Gradle for maximum extensibility.</p>
                        </div>
                    </div>
                    <div className={"col-12 col-md-4 mb-2"}>
                        <div className={"highlight"}>
                            <div className={"highlight-image"}>
                                <a href={"https://opensource.org"}>
                                    <img src={baseUrl + "img/features/osi_symbol_0.png"}
                                         className={"img-fluid"}></img>
                                </a>
                            </div>
                            <h2>Open Source</h2>
                            <p>This software is licensed under an Open Source Initiative approved license.</p>
                            <p className="small">The OSI logo trademark is the trademark of Open Source Initiative.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter((user) => user.pinned)
        .map((user) => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = (page) =>
        baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    const Spacer = () => (
        <div className={"pt-5 pb-5"}>

        </div>
    )

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="highlights">
            <Features />
        </div>
        <FeatureCalloutDsl/>
          <FeatureCalloutCrdReady />
          <FeatureCalloutGradleTasks />
      </div>
    );
  }
}

module.exports = Index;
