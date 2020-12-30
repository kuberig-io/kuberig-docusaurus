---
title: Google Kubernetes Engine (GKE)
tags: kuberig, google cloud, gke
authorURL: https://twitter.com/teyckmans
author: Tom Eyckmans
authorImageURL: https://kuberig.io/authors/tom-eyckmans.jpg
---

As promised [earlier](https://rigel.dev/kuberig-doks/) GKE support was next on my todo and today it is ready.

From version 0.0.29 on KubeRig makes it super easy to start using a Google Kubernetes Engine cluster.

# KubeRig project setup

In case you want to jump right in you can download or clone the [kuberig-empty](https://github.com/teyckmans/kuberig-empty) repository.

In case KubeRig is new for you or you want to know the details about the project setup. Please read [this](https://rigel.dev/kuberig-microk8s/) first.

# Create a GKE cluster

To create a kubernets cluster we can use the [gcloud](https://cloud.google.com/sdk/gcloud/) command line tool.

I am only specifying the zone, there are many options please consult the [documentation](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-cluster) for more information.

    gcloud container clusters create kuberig-gke --zone europe-west1-b
    

After a couple of minutes the cluster is up and running and your kubectl context will be updated to the newly created cluster.

# Initialize the KubeRig environment

As was already possible for DOKS clusters. We can now use the `initEnvironment` task to initialize a KubeRig environment based on the `kubectl` config for GKE clusters.

With the following command we create an environment called dev based on the current `kubectl` context.

    $./gradlew initEnvironment --currentKubectlContext --name dev
    

The  `--currentKubectlContext` flag is key.

For details about the `initEnvironment` task please visit the [initEnvironment](https://rigel.dev/kuberig-init-environment/) task page.

After the command completes you can start [coding resources](https://rigel.dev/kuberig-coding-resources/) and execute the deployDevEnvironment task to deploy them.

# Limitations

The `--currentKubectlContext` flag of the `initEnvironment` task is still brand new (available from KubeRig version 0.0.27).

For limitations about the `initEnvironment` task please visit the [initEnvironment](https://rigel.dev/kuberig-init-environment/) task page.

In case you run into problems please create an issue on [github](https://github.com/teyckmans/kuberig/issues) or jump in and create a pull-request.

# What is next?

A post about how KubeRig supports safe handling of secrets is long overdue.

Stay tuned and happy resource coding!
