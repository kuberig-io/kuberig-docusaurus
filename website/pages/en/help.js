/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Help(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

  const supportLinks = [
    {
      content: `Learn more using the [documentation on this site.](${docUrl(
        'start.html',
      )})`,
      title: 'Browse Docs',
    },
    {
      content: 'Join the discussion on [Discord](https://discord.gg/AR67ZBvM)',
      title: 'Join the discussion',
    },
    {
      content: "Ask a question on [Stack Overflow](https://stackoverflow.com/questions/ask?tags=kuberig)",
      title: 'Ask a question',
    },
    {
      content: "Ask a question on [Twitter](https://twitter.com/teyckmans)",
      title: 'Twitter'
    },
    {
      content: 'Github Discussions is available on the [Kuberig repository](https://github.com/kuberig-io/kuberig/discussions)',
      title: 'GitHub Discussions'
    }
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Need help?</h1>
          </header>
          <p>Here are some options to get help.</p>
          <GridBlock contents={supportLinks} layout="twoColumn" />
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
