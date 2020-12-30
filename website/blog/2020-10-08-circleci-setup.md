---
title: CircleCI setup
tags: kuberig, circleci, ci
authorURL: https://twitter.com/teyckmans
author: Tom Eyckmans
authorImageURL: https://kuberig.io/authors/tom-eyckmans.jpg
---

It took some time to figure out how to setup the CircleCI pipelines for the [KubeRig](https://github.com/kuberig-io) repositories so I am sharing details on the setup here as it may help others figure it out faster.

## Context

KubeRig is made up of a couple of related repositories.

1. [kuberig-dsl](https://github.com/kuberig-io/kuberig) is the gradle plugin that can generate the kuberig DSL from a kubernetes or openshift swagger api specification file. 
2. [kuberig-dsl-vanilla-plugin](https://github.com/kuberig-io/kuberig-dsl-vanilla-plugin) is the grade plugin to generate the kuberig DSL for vanilla kubernetes and openshift versions.
3. [kuberig-dsl-kubernetes](https://github.com/kuberig-io/kuberig-dsl-kubernetes) uses the kuberig-dsl-vanilla-plugin to generate the kuberig-dsl for upstream kubernetes versions.
4. [kuberig-dsl-openshift](https://github.com/kuberig-io/kuberig-dsl-openshift) uses the kuberig-dsl-vanilla-plugin to generate the kuberig-dsl for upstream openshift versions.
5. [kuberig](https://github.com/kuberig-io/kuberig) is the gradle plugin that makes it easy to deploy resources defined using the kuberig DSL.

## Versioning

I don't like to have a version specified in the gradle.properties file. I like it to be determined either by the git tag or by the git branch name + the CI build number.

It took some time before I figured out how to get this done with CircleCI. I ended up using a [CircleCI command](https://circleci.com/docs/2.0/configuration-reference/#commands-requires-version-21) with a version parameter. The parameter value contains the environment variables to use to construct the actual version value. As each step is executed in a separate shell the value of the version parameter is used to set a VERSION environment variable that is passed to the gradle build with the `-Pversion` command line argument. `-P` is used to pass in Gradle project properties . 

The correct value of the parameter is defined in 2 different job definitions a build job that uses the branch name and build number and a release job that uses the git tag.  

Setting up the version based on Git tag or Git branch is used in the kuberig-dsl, kuberig-dsl-vanilla-plugin and the kuberig repositories.

The kuberig-dsl-kubernetes and kuberig-dsl-openshift follow the version number of the kuberig-dsl repository. They have the version of the kuberig-dsl they are currently generating with defined in the gradle build properties.

## Automatic version updates

The kuberig-dsl-kubernetes and kuberig-dsl-openshift repositories follow 2 upstream version streams:

- kubernetes and openshift versions
- kuberig-dsl versions

kubernetes or openshift versions: When new upstream versions are released I want them to be added automatically. For every upstream version a new sub project is added by custom tasks in the kuberig-dsl-vanilla-plugin. This is done by scheduling the job every hour.

The changes made by the pipeline are committed back to the repository. 

The missing versions are also published to jcenter (still one manual action needed every time a new version is released to have it included). 

kuberig-dsl versions: When a new kuberig DSL version is released all the DSLs for the upstream versions need to regenerate and publish.

This is done by the release pipeline of the kuberig-dsl repository. It commits on the kuberig-dsl-kubernetes and kuberig-dsl-openshift repositories. The commit is done with the [skip ci] flag as the downstream pipelines run every hour.

## Git Commit & Push

There are 2 places where KubeRig pipelines commit changes.

- When there are new upstream versions of either Kubernetes or OpenShift. 
- When there is a new version of kuberig-dsl.

In order to be able to commit from the pipeline you need to setup [deploy keys](https://circleci.com/docs/2.0/add-ssh-key/?utm_medium=SEM&amp;utm_source=gnb&amp;utm_campaign=SEM-gb-DSA-Eng-emea&amp;utm_content=&amp;utm_term=dynamicSearch-&amp;gclid=Cj0KCQjw8fr7BRDSARIsAK0Qqr61rn8oAZy3xitvM8epMJ1q_gR_tNiPUPb-emh9xIgk-xpYkBLA8BkaAveIEALw_wcB) that have write permission on the repository. Each repository requires a different deploy key, you can't reuse them on GitHub. 

The private keys are added to the CircleCI projects for host github.com.

In the pipelines you need to add the ssh keys using the fingerprint shown on the SSH keys page in CircleCI using the [add_ssh_keys](https://circleci.com/docs/2.0/configuration-reference/#add_ssh_keys) step.

## Publishing

Everything publishs to [rigeldev-oss-maven](https://bintray.com/teyckmans/rigeldev-oss-maven) on bintray. For the dependencies that are needed by users I also click the 'include on jcenter' button so there is no need to add the rigeldev-oss-maven repository.

The kuberig-dsl and kuberig repositories also publish to the gradle plugin portal.

The kuberig-dsl-vanilla-plugin is not published to the gradle plugin portal as it is an internal plugin not used by kuberig users.

## Possible improvements

This is already a nice setup that removes a lot of manual work from my plate but we can always do better.

Some improvements I am considering:

- Have the kuberig-dsl-vanilla-plugin also generate the CircleCI config.yml file to build all upstream version specific sub projects in parallel.
- Have the kuberig-dsl-vanilla-plugin send Slack notification when jcenter inclusion requests need to be made for new versions.
- Calculate better cache checksums as described [here](https://medium.com/@chrisbanes/circleci-cache-key-over-many-files-c9e07f4d471a).
- Spin up [kind](https://kind.sigs.k8s.io/) k8s clusters for integration testing.
