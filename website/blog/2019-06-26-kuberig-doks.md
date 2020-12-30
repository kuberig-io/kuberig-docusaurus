---
title: KubeRig + Digital Ocean Kubernetes (DOKS)
tags: kuberig, doks
authorURL: https://twitter.com/teyckmans
author: Tom Eyckmans
authorImageURL: https://kuberig.io/authors/tom-eyckmans.jpg
---

Today I am going to show you how to setup a KubeRig environment using the Kubernetes service of Digital Ocean or DOKS for short.

# KubeRig project setup

In case you want to jump right in you can download or clone the [kuberig-empty](https://github.com/teyckmans/kuberig-empty) repository.

In case KubeRig is new for you or you want to know the details about the project setup. Please read [this](https://rigel.dev/kuberig-microk8s/) first.

# Create a DOKS cluster

To create a kubernetes cluster we can use the [doctl](https://github.com/digitalocean/doctl) command line tool.

Customize the kubernetes cluster to your liking.

I am specifying the region and the size of the nodes.

    $ doctl kubernetes cluster create --region ams3 --size s-2vcpu-4gb kuberig-doks-setup-example
    

After this command completes your kubectl context is updated to the newly created cluster.

# Initialize the KubeRig environment

We can use the `initEnvironment` task to initialize the KubeRig environment.

With the following command we create an environment called dev based on the current Kubectl context.

    $ ./gradlew initEnvironment --currentKubectlContext --name dev
    

The new `--currentKubectlContext` flag is key.

For details about what the task does when using the `--currentKubectlContext` flag please visit the [initEnvironment](https://rigel.dev/kuberig-init-environment/) task page.

The environment is now ready for use.

Start [coding resources](https://rigel.dev/kuberig-coding-resources/) and execute the deployDevEnvironment task to deploy them.

# Limitations

The `--currentKubectlContext` flag of the `initEnvironment` task is brand new (available from KubeRig version 0.0.27).

It is currently only known to work for Digital Ocean Kubernetes clusters created with the `doctl` command line.

The Kubectl configuration file has a lot of possible ways to configure access to a Kubernetes cluster and it will take more work to make the `--currentKubectlContext` deal with them all.

In case you run into problems please create an issue on [github](https://github.com/teyckmans/kuberig/issues) or jump in and create a pull-request.

# What is next?

Make the `--currentKubectlContext` work for GKE is next on my todo.

Stay tuned and happy resource coding!
