---
title: Resource Coding
tags: kuberig, Kubernetes, Kotlin, dsl
authorURL: https://twitter.com/teyckmans
author: Tom Eyckmans
authorImageURL: https://kuberig.io/authors/tom-eyckmans.jpg
---

After setting up your [local development](/blog/2019/05/25/kuberig-microk8s) environment you may be wondering. Now what?

KubeRig works by scanning your Kotlin code for annotations. Methods that have the `@EnvResource` annotation will be used to generate a resource.

The `@EnvFilter` annotation that allows you to define resources that are only needed in specific environments.

When using the `@Tick` annotation KubeRig will perform staged deployments. This allows you to gradually allow traffic to your new deployment.

Besides the annotations there is the Kotlin DSL that needs to be used to define your resources. We will dive a little deeper on the Kotlin DSL later.

First a little more detail on the annotations.

# Annotation Details

## @EnvResource

You place the `@EnvResource` annotation on public methods. The methods need to return a DSL type. This comes down to taking the name of the Kind and adding the suffix 'Dsl'. So ConfigMap becomes ConfigMapDsl for the DSL type.

Inside the function you can use factory methods that match the kind name. These factory methods take a function to configure the DSL type.

For example:

    package example
    
    import eu.rigeldev.kuberig.core.annotations.EnvResource
    import kinds.v1.ConfigMapDsl
    import kinds.v1.configMap
    
    class FirstResource {
    
        @EnvResource
        fun firstResource() : ConfigMapDsl {
            return configMap {
                metadata {
                    name("first-resource")
                }
                data("some-key", "some-value")
            }
        }
    
    }
    

## @EnvFilter

You place the `@EnvFilter` annotation on a method that is already annotated with the `@EnvResource` annotation.

In the environments parameter of the annotation you specify the names of the environments this resource should be applied to.

For example:

    @EnvResource
    @EnvFilter(environments = ["dev", "test"])
    fun firstResource() : ConfigMapDsl { ... }
    

This example shows how to apply a resource only to the 'dev' and 'test' environments.

I am using this to run a database inside the 'dev' and 'test' environments. The other environments have dedicated external databases.

## @Tick

You place the `@Tick` annotation on a method that is already annotated with the `@EnvResource` annotation.

In the tick parameter of the annotation you specify which stage this resource should be applied for.

For example:

    @EnvResource
    @Tick(10)
    fun firstResource() : ConfigMapDsl { ... }
    

This example show how to have a resource applied for stage 10.

More details on staged deployments will follow in a dedicated post.

## Annotation Limitations

At present the annotation scanning only works for code inside your kotlin source directory. Annotations placed on classes of dependencies are not detected. Also annotations on parent types are not detected yet.

This is a limitation that will be removed in one of the next versions of KubeRig.

# DSL Details

The `@EnvResource` annotations require you to return a DSL type.

All DSL types can be found in the 'kinds' package. Sub-packages of the 'kinds' package follow the Kubernetes group structure.

All DSL types are the kind name + 'DSL'.

All DSL types have a factory method named after the kind. These methods also reside in the 'kinds' package and sub-packages.

The DSL follows the YAML file structure you are used to. With one small enhancement to lower the amount of levels.

For containers that have singular name like 'data' in ConfigMaps the DSL provides a shortcut. The name of the container provides direct access to add the container elements.

Without this the ConfigMap DSL usage would look like this:

    @EnvResource
    fun firstResource() : ConfigMapDsl {
        return configMap {
            metadata {
                name("first-resource")
            }
            data { // this level is skipped
                data("some-key", "some-value")
            }
        }
    }
    

You will notice that there are no properties available on the DSL types. This is intentional. All DSL usage is method based to have a consistent look.

All DSL types are open so you can add your own extension methods.

My personal [favorite](https://gist.github.com/teyckmans/0e1c18b7e6409425191ee7c3bbd80d51) at the moment is an extension function to specify resource requests/limits. The function itself is not sexy but the usage is.

Without the extension function:

    container {
        ...
        resources {
            requests {
                request("cpu") {
                    quantity("250m")
                }
                request("memory") {
                    quantity("64Mi")
                }
            }
            limits {
                limit("cpu") {
                    quantity("500m")
                }
                limit("memory") {
                    quantity("128Mi")
                }
            }
        }
        ...
    }
    

With the extension function:

    container {
        ...
        resourcesHelper(
                cpuRequest = "250m",
                memoryRequest = "64Mi",
                cpuLimit = "500m",
                memoryLimit = "128Mi"
        )
        ...
    }
    

## Looking ahead

### More/Smarter annotations

More annotations to limit the amount of DSL code that needs to be used.

I am thinking of adding parameters for the name and the namespace of the resource to the `@EnvResource` annotation. Adding an `@EnvNamespace` annotation that can be placed on packages to limit a lot of repetition.

I am also playing with the idea of adding an `@EnvConfigCheck` annotation. That can be used to validate configuration before performing a deploy. This would be perfect for e.g. validating credentials are valid. In case you are not in Vault dynamic credentials land off course.

### Beyond annotations

I am also working on DSL pre/post-processors. This will provide a powerful mechanism to enhance DSL types and validate the generated resources.

I am thinking of things like, configuring all Spring-Boot applications in a consistent way so they expose prometheus metrics in the same way. Without bothering the applications developers with it.

# What is next

Put your new knowledge to work!

More posts, at least one on staged deployments!
