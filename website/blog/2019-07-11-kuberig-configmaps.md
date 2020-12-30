---
title: KubeRig + ConfigMaps
tags: kuberig, configmap
authorURL: https://twitter.com/teyckmans
author: Tom Eyckmans
authorImageURL: https://kuberig.io/authors/tom-eyckmans.jpg
---

Dealing with Kubernetes ConfigMaps in plain yaml files can be a hassle.

Especially when you need to include files. You loose all your file type specific editor support and are left back in the stone age.

KubeRig makes it easy to include environment specific files and values.

# Prerequisites

You have a working [local development](https://rigel.dev/kuberig-microk8s/) environment.

If KubeRig is new for you, you may also want to read [KubeRig Resource Coding](https://rigel.dev/kuberig-coding-resources/).

# Example

Lets jump right in with an example.

![blog-configmap-example](/content/images/2019/07/blog-configmap-example.png)

What makes defining ConfigMaps with KubeRig so easy is mainly because of the environment support.

Via the `ResourceGeneratorContext` you have access to:

- The current environment via `environment()`.
- Environment specific configuration values via `environmentConfig(configName)` read from the `environments/{environment-name}/{environment-name}-config.properties` file.
- Environment specific files via `environmentFileText(filePath)` and `environmentFileBytes(filePath)`; filePath is used within the environment directory `environments/{environment-name}`.

Via `"""...""".trimIndent()` available in Kotlin. You have a simple way of creating a template for files that contain a lot of configuration values.

# What is next?

Now that you know how to access environment specific files and values we can show you how to work with sensitive information and generate `Secrets` in a next post.

Stay tuned and happy resource coding!
