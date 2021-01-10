---
id: coding-resources
title: Coding Resources
---

KubeRig scans your Kotlin code for annotations. The main annotations are `@EnvResource` and `@EnvResources`.

From an `@EnvResource` annotated method you need to return a resource.
From an `@EnvResources` annotated method you can emit multiple resources.

Additionally, there are the `@EnvFilter`, and the `@Tick` annotations.

# Annotation Details

## `@EnvResource`

You place the `@EnvResource` annotation on public methods. Inside the function you can use factory methods that match the kind name.

An example.
```kotlin
package example

import io.kuberig.annotations.EnvResource
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
```

The return type of the method must always come from inside the `kinds` package.

The `@EnvResource` annotation also has a `group` attribute that allows you to create groups of resources that you can deploy together. Check [resource grouping](resource-grouping.md) for more information.

The `@EnvResource` annotation also has a `action` attribute that allows you to tweak how the resource is applied to the cluster. Check [resource apply action](resource-apply-action.md) for more information.

## `@EnvResources`

You place the `@EnvResources` annotation on public methods. Inside the function you can use the `DslResourceEmitter.emit` function to emit resources.

An example.
```kotlin
package ingress

import io.kuberig.annotations.EnvResources
import io.kuberig.dsl.support.DslResourceEmitter.emit
import kinds.cert_manager.io.v1.issuer

class CertManagerResources {

    @EnvResources
    fun certManagerIssuer() {
        emit(
            issuer {
                metadata {
                    name("test-selfsigned")
                }
                spec {
                    selfSigned { }
                }
            }
        )
    }
}
```

You can call `emit` as many times as needed. You use the same factory methods that you would in an `@EnvResource` annotated method. 

The `@EnvResources` annotation also has a `group` attribute that allows you to create groups of resources that you can deploy together. Check [resource grouping](resource-grouping.md) for more information.

The `@EnvResources` annotation also has a `defaultAction` attribute that allows you to tweak how the resource is applied to the cluster. Check [resource apply action](resource-apply-action.md) for more information.

The `emit` method also has an `applyActionOverwrite` attribute that allows you to tweak how the emitted resources by that `emit` call are applied to the cluster. Check [resource apply action](resource-apply-action.md) for more information.

## `EnvFilter`

The `@EnvFilter` annotation provides a way to select the environments the resource needs to be deployed to. Only needs to be added when the resource is not needed on all the environments.

An example.
```kotlin
package example

import io.kuberig.annotations.EnvFilter
import io.kuberig.annotations.EnvResource
import kinds.v1.ConfigMapDsl
import kinds.v1.configMap

class FirstResource {

    @EnvResource
    @EnvFilter(["dev", "test"])
    fun firstResource() : ConfigMapDsl {
        return configMap {
            metadata {
                name("first-resource")
            }
            data("some-key", "some-value")
        }
    }

}
```

## `@Tick`

The `@Tick` annotation provides a way to do staged deployments. Methods without the `@Tick` annotation default to tick 1.

An example.

```kotlin
package example

import io.kuberig.annotations.EnvResource
import io.kuberig.annotations.Tick
import kinds.v1.ConfigMapDsl
import kinds.v1.configMap

class FirstResource {

    @EnvResource
    @Tick(10)
    fun firstResource() : ConfigMapDsl {
        return configMap {
            metadata {
                name("first-resource")
            }
            data("some-key", "some-value")
        }
    }

}
```

# Related blogs

[First blog](https://kuberig.io/blog/2019/05/27/kuberig-coding-resources) on the topic of resource coding may also be of interest.