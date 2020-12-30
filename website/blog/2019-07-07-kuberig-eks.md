---
title: Elastic Kubernetes Service (Amazon EKS)
tags: kuberig, amazon, eks
authorURL: https://twitter.com/teyckmans
author: Tom Eyckmans
authorImageURL: https://kuberig.io/authors/tom-eyckmans.jpg
---

From KubeRig version 0.0.30 on the `initEnvironment` task also supports Amazon Elastic Kubernetes Service (EKS).

# KubeRig project setup

In case you want to jump right in you can download or clone the [kuberig-starter](https://github.com/kuberig-io/kuberig-starter) repository.

In case KubeRig is new for you or you want to know the details about the project setup. Please read [this](/blog/2019/05/25/kuberig-microk8s) first.

# Create an EKS cluster

Having never used any AWS service (I know what planet am I from, right). Trying to use the EKS service from Amazon was a real pain. It was a total suprise to experience how difficult it was.

After inspecting the [aws](https://aws.amazon.com/cli/) command line and the options needed (subnet-ids,security-group-id,role-arn) I gave up trying to use it directly. Because I remembered [this tweet](https://twitter.com/weaveworks/status/1146935586189717504) from [Weaveworks](https://www.weave.works/) about the [eksctl](https://eksctl.io/) command line tool. Thank god they made this command line tool!

In addition to `eksctl` you will also need [aws-iam-authenticator](https://github.com/kubernetes-sigs/aws-iam-authenticator) installed otherwise you will get an warning and `kubectl` will not be able to authenticate to the cluster.

Now we can just execute this simple command.

    eksctl create cluster
    

After a couple of minutes the cluster is up and running and your kubectl context will be updated to the newly created cluster.

# Initialize the KubeRig environment

We can now use the `initEnvironment` task to initialize a KubeRig environment based on the `kubectl` config for EKS clusters.

With the following command we create an environment called dev based on the current `kubectl` context.

    $./gradlew initEnvironment --currentKubectlContext --name dev
    

The  `--currentKubectlContext` flag is key.

For details about the `initEnvironment` task please visit the [initEnvironment](/blog/2019/07/04/kuberig-init-environment) task page.

After the command completes you can start [coding resources](/blog/2019/05/27/kuberig-coding-resources) and execute the deployDevEnvironment task to deploy them.

# Limitations

The `--currentKubectlContext` flag of the `initEnvironment` task is still brand new (available from KubeRig version 0.0.27).

For limitations about the `initEnvironment` task please visit the [initEnvironment](/blog/2019/07/04/kuberig-init-environment) task page.

In case you run into problems please create an issue on [github](https://github.com/kuberig-io/kuberig/issues) or jump in and create a pull-request.

# What is next?

Now that the most important providers are supported by the `initEnvironment` task. I'll be focusing on adding new features.

Stay tuned and happy resource coding!
