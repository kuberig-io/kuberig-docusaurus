---
title: CRD support a challenge!
date: 2020-10-16
thumbnail: https://images.unsplash.com/photo-1587093336587-eeca6cb17cf2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ
image: https://images.unsplash.com/photo-1587093336587-eeca6cb17cf2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ
tags:
- CRD
- Support
categories:
- Development
authors:
- Tom Eyckmans
---

With the KubeRig DSL you can easily define standard Kubernetes resources with Kotlin code which is great. But...

> The world is moving towards Custom Resource Definitions!

With [Customer Resource Definitions](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) or CRDs for short you can extend Kubernetes with your own ideas.

# The Challenge
Both Kotlin and the KubeRig DSL are typesafe. Therefor we need deep type information about CRDs
otherwise we can't generate the KubeRig DSL for them. This is a major challenge due to a number of reasons:

- CRD definitions are flattened. Deep type information is lost.
- CRD definitions can be defined with the x-kubernetes-preserve-unknown-fields:
  true flag which means we don't have any type information available.

After realizing the needed data was not available I was a bit down. But soon realized I needed to dig deeper at the problem.

After trying a couple of things that did not work out at all. I found the controller-tools repository!
It contains tools to build controllers. Controllers are background processes that make your own CRDs come to life
and actually implement the functionality behind them.

The [controller-tools](https://github.com/kubernetes-sigs/controller-tools) CLI has a command which generates
the CRD definitions based on markers in GO-code. Perfect, here we have all the type information we need, to generate the API specification needed.

I've never done any development in GO but that was not going to stop me.

> Down the controller-tools rabbit hole I went!

# The Solution
In my fork of the controller-tools repo I added a `swagger` command.
The `swagger` command generates the API specification for a CRD group preserving all the type information.

It reuses the same markers as the CRD command so there is no additional burdon on CRD creators.

I've been developing this by trying it out on a fork of the [Tekton pipeline](https://github.com/teyckmans/pipeline) code base.
I did need to add a marker here and there to get it working to Tekton, but I thought it was the perfect candidate
to try it on since it uses the `x-kubernetes-preserve-unknown-fields` flag extensively.

After a couple of months working in the evening and really early morning hours. Digging in the controller-tools GO code.
Figuring out how it works. Learning how to do things in GO. Having to Google every simple thing you can imagine.
Like how to do a loop and stuff and in the meantime trying to get something that works.

> Something emerged that allowed me to generate the KubeRig DSL for Tekton pipelines!

You can find the default installed API and the generated API specifications [here](https://github.com/teyckmans/pipeline/tree/crd-swagger/config/crd/swagger).

# The Result
With a KubeRig DSL generator project set up. We can start to consume the KubeRig DSL.

And it looks like this...
![Result DSL usage example](/screenshots/kuberig-crd-dsl-tektoncd-pipeline-getting-started.png)

The KubeRig DSL generator project can be found [here](https://github.com/kuberig-io/kuberig-crd-dsl/tree/main/tektoncd-pipeline),
and the example code [here](https://github.com/kuberig-io/kuberig-crd-dsl/blob/main/tektoncd-pipeline/src/test/kotlin/GettingStarted.kt).

# Wrapping up
Really happy with this milestone!

Really learned a lot and done my first GO development on the way.

I can hardly imagine what is possible with being able to really code Tektoncd pipelines like this. Something to find out!

I'll be adding more CRD DSLs to the [kuberig-crd-dsl](https://github.com/kuberig-io/kuberig-crd-dsl) repository
in the future and make it easy to consume them with KubeRig.

If you are missing your favorite CRDs in the [kuberig-crd-dsl](https://github.com/kuberig-io/kuberig-crd-dsl) repository let me know!