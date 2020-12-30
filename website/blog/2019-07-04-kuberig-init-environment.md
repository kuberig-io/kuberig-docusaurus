---
title: The initEnvironment Task
tags: kuberig, init-environment
authorURL: https://twitter.com/teyckmans
author: Tom Eyckmans
authorImageURL: https://kuberig.io/authors/tom-eyckmans.jpg
---

On this page I am gathering some details on the `initEnvironment` task that would otherwise have to be repeated in multiple places.

# In Action

- [KubeRig + microk8s](/blog/2019/05/25/kuberig-microk8s)
- [KubeRig + Digital Ocean Kubernetes (DOKS)](/blog/2019/06/26/kuberig-doks)
- [KubeRig + Google Kubernetes Engine (GKE)](/blog/2019/07/04/kuberig-gke)
- [KubeRig + Elastic Kubernetes Service (Amazon EKS)](/blog/2019/07/07/kuberig-eks)
- planned KubeRig + minikube
- ...

# Details

The `initEnvironment` task is intented to make it easy to configure a KubeRig environment and start deploying resources to an existing Kubernetes Cluster.

The `initEnvironment` task will make sure that:

- The environment directory (environments/$environment.name$) is created
- The environment configs file ($environment.name$-configs.properties) is created inside the environment directory.
- The api server url is added to the environment configs file as an encrypted value.
- The environment encryption key ($environment-name$.keyset.json) is generated inside the environment directory.

Everything except for the environment encryption key are safe to commit.

I advise you to create a secure backup of your environment encryption key.

# Flags

## `--name`

The name to use for the new environment.

## `--apiServerUrl`

Mostly only usable for local development environments without authentication/authorization like [microk8s](https://microk8s.io/).

No service account is created when using this flag.

## `--currentKubectlContext`

When using the `--currentKubectlContext` flag there is no need to specify the `--apiServerUrl` flag because all details will be read from the `kubectl` config file.

The `--currentKubectlContext` flag triggers the initEnvironment to use the current Kubectl context to create the kuberig service account.

The kuberig service account is created in the namespace of the Kubectl context. In case no namespace is set the default namespace is used.

A kuberig-edit rolebinding is created granting ClusterRole edit to the kuberig service account.

The access token for the kuberig service acount is added to the environment and encrypted (see environments/$environment.name$/.encrypted.$environment.name$.access-token)

### Limitations

The Kubectl configuration file has a lot of possible ways to configure access to a Kubernetes cluster and it will take more work to make the `--currentKubectlContext` deal with them all.

Currently it is known to work for:

- Digital Ocean Kubernetes service
- Google Kubernetes Engine
- minikube

In case you run into problems please create an issue on [github](https://github.com/kuberig-io/kuberig/issues) or jump in and create a pull-request.

# Task Help

With Gradle it easy to get some more information about a task. So always remember that help is only a single command away.

If you run `help --task initEnvironment` you get details about what arguments the task takes with additional information about them.

    $ ./gradlew help --task initEnvironment
    
    > Task :help
    Detailed task information for initEnvironment
    
    Path
         :initEnvironment
    
    Type
         InitEnvironmentTask (eu.rigeldev.kuberig.gradle.tasks.InitEnvironmentTask)
    
    Options
         --apiServerUrl     The URL of the api server of your cluster
    
         --currentKubectlContext     From the current kubectl context
    
         --name     The name of the environment that you want to create
    
    Description
         -
    
    Group
         kuberig
    
    BUILD SUCCESSFUL in 0s
    1 actionable task: 1 executed
    
