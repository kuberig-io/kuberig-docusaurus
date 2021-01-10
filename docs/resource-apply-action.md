---
id: resource-apply-action
title: Resource Apply Action
---

The apply action you set on an annotated method allows you to tweak the way the resource is applied. 

This may seem counterintuitive for a tool that works for Kubernetes a system that allows you to define resources in a declarative way. 
Not all resources can be changed in the same way. Some are immutable and require additional attention. 
The resource itself can be immutable or only some parts.

This is where the apply action comes in. 

The apply action provides 3 modes:
- create only 
- create or update (this is the default)
- recreate 

## Create Only 

Will only create the resource if it does not exist yet. 

## Create Or Update

Will create or update the resource. This is the default mode.

## Recreate

Will always create the resource. In case the resource already exists it will be deleted first.

Use this for immutable resources or when a part is immutable.

# Examples

## `@EnvResource`

An example of how to use the apply action on an `@EnvResource` annotated method.

```kotlin
package example

import io.kuberig.annotations.ApplyAction.RECREATE
import io.kuberig.annotations.EnvResource
import kinds.v1.ConfigMapDsl
import kinds.v1.configMap

class FirstResource {

    @EnvResource(action = RECREATE)
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

## `@EnvResources`

An example of how to use the apply action on an `@EnvResources` annotated method.
On an `@EnvResources` annotated method you provide the `defaultAction` for resources emitted from the method.
The `emit` method also provides an `applyActionOverwrite` parameter that allows you to overwrite the `defaultAction` provided on the annotation. 

```kotlin
package example

import io.kuberig.annotations.ApplyAction.CREATE_ONLY
import io.kuberig.annotations.ApplyAction.RECREATE
import io.kuberig.annotations.EnvResources
import io.kuberig.dsl.support.DslResourceEmitter.emit
import io.kuberig.dsl.support.UseOverwrite
import kinds.v1.configMap

class FirstEmit {

    @EnvResources(defaultAction = RECREATE)
    fun firstEmit() {
        emit(
            configMap {
                metadata {
                    name("first-emit")
                }
                data("some-key", "some-value")
            }
        )

        emit(
            configMap {
                metadata {
                    name("create-only")
                }
                data("some-key", "some-other-value")
            },
            applyActionOverwrite = UseOverwrite(CREATE_ONLY)
        )
    }

}
```
