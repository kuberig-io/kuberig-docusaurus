---
id: resource-grouping
title: Resource Grouping
---

Both the `@EnvResource` and `@EnvResources` annotation provide a `group` attribute that allows you to create groups of resources.

Both the `deploy` and `generateYaml` Gradle tasks provide command line options to specify what groups you want to execute the task for.

The default mode for the `deploy` and `generateYaml` tasks is to deploy the resources generated from methods that do not specify a group.

When providing a value for the `--group` option only that group will be considered. Group name matching is done in a case-insensitive way.

If you have a group for kafka resources you can deploy it using the following command line.
```shell
./gradlew deployLocalEnvironment --group kafka
```

In case you want to deploy all resources regardless of the value of the `group` attribute you can use the `--allGroups` option.

On the command line this becomes:
```shell
./gradlew deployLocalEnvironment --allGroups
```

# Examples

# `@EnvResource`

Shows how to specify a `group` attribute on the `@EnvResource` annotation. 

```kotlin
package example

import io.kuberig.annotations.EnvResource
import kinds.v1.ConfigMapDsl
import kinds.v1.configMap

class FirstResource {

    @EnvResource(group = "kafka")
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

# `@EnvResources`

Shows how to specify a `group` attribute on the `@EnvResources` annotation.

```kotlin
package example

import io.kuberig.annotations.EnvResources
import io.kuberig.dsl.support.DslResourceEmitter.emit
import kinds.v1.configMap

class FirstEmit {

    @EnvResources(group = "kafka")
    fun firstEmit() {
        emit(
            configMap {
                metadata {
                    name("first-emit")
                }
                data("some-key", "some-value")
            }
        )
    }

}
```