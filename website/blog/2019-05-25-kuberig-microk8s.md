---
title: Kuberig + Microk8s
date: 2019-05-25
tags:
- microk8s
categories:
- Development
authors:
- Tom Eyckmans
---
Today I am going to show you how easy it is to get started with KubeRig and microk8s.

KubeRig is a tool to deploy to Kubernetes, you define the resources in real code by using a Kotlin DSL.

Microk8s is a very easy to use local Kubernetes distribution.

## Prerequisites
You need to have a Java JDK installed. This examples uses OpenJDK 12.0.1.
You need to have Gradle installed. This example uses Gradle 5.4.1.
You need to have Git installed. This examples uses Git 2.20.1.
You need to have microk8s installed. This example uses microk8s v1.14.1

I am performing these steps on an Ubuntu 19.04.
## Initial project setup
KubeRig is a Gradle plugin. So we need to create a new Gradle project.

Create a new project directory and enter it (I am using kuberig-microk8s-example).

Execute Gradle init and accept the defaults
```
> gradle init --type basic --dsl kotlin
Project name (default: kuberig-microk8s-example): 


BUILD SUCCESSFUL in 2s
2 actionable tasks: 2 executed
```
This creates an empty Gradle project. In order to verify that our setup was successful lets use the Gradle wrapper to check what tasks are available. In case this is the first time you run a Gradle wrapper configured for Gradle version 5.4.1 you will see it being downloaded.
```
> ./gradlew tasks

Task :tasks

------------------------------------------------------------
Tasks runnable from root project
------------------------------------------------------------

Build Setup tasks
-----------------
...

Help tasks
----------
...

To see all tasks and more detail, run gradlew tasks --all

To see more detail about a task, run gradlew help --task <task>


BUILD SUCCESSFUL in 4s
1 actionable task: 1 executed
```

Now is a good time to initialize Git and make our first commit.
```
> git init
> git add --all
> git commit -m "initial setup"
```
The git add --all will give a warning about CRLF. I am not going to bother with this in this post.

## Add KubeRig
Now that we have an empty Gradle project we can add the KubeRig plugin.
Visit the [Gradle Plugin Portal](https://plugins.gradle.org/plugin/io.kuberig.kuberig) to check for the latest version.

Add the following to your build.gradle.kts file.
```kotlin
plugins {
  id("io.kuberig.kuberig") version "0.0.44" // TODO use latest version
}

repositories {
  jcenter()
}
```

In order for Gradle to be able to download KubeRig and other dependencies it needs to know where it should download them from. We specify that Gradle should use jcenter in the repositories section.

In the plugins section we specify that we want to add the KubeRig plugin and what version of it. Please check the Gradle plugin portal for the latest version and use that one.

Lets check what tasks are available now.
```
> ./gradlew tasks --group kuberig

Task :tasks

------------------------------------------------------------
Tasks runnable from root project
------------------------------------------------------------

Kuberig tasks
-------------
initEnvironment
initGitIgnore

...extra output omitted...

BUILD SUCCESSFUL in 8s
1 actionable task: 1 executed
```

Now is a good time to commit.
```
> git add --all
> git commit -m "added kuberig"
```
## Define the KubeRig environment
Now that the KubeRig plugin is added to the project we can define our first environment.

This can be done by using the initEnvironment task. With Gradle it easy to find out what the task needs by using the help command.
```
> ./gradlew help --task initEnvironment

Task :help
Detailed task information for initEnvironment

Path
     :initEnvironment

Type
     InitEnvironmentTask (io.kuberig.gradle.tasks.InitEnvironmentTask)

Options
     --apiServerUrl     The URL of the api server of your cluster

     --environmentName     The name of the environment that you want to create

Description
     -

Group
     kuberig

BUILD SUCCESSFUL in 0s
1 actionable task: 1 executed
```

For microk8s this becomes:
```
> ./gradlew initEnvironment --environmentName local --apiServerUrl http://localhost:8080

BUILD SUCCESSFUL in 0s
1 actionable task: 1 executed
```

This will make a bunch of tasks become available for the local environment.
```
> ./gradlew tasks --group kuberig

Task :tasks

------------------------------------------------------------
Tasks runnable from root project
------------------------------------------------------------

Kuberig tasks
-------------
createEncryptionKeyLocalEnvironment
decryptConfigLocalEnvironment
decryptFileLocalEnvironment
decryptLocalEnvironment
deployLocalEnvironment
encryptConfigLocalEnvironment
encryptFileLocalEnvironment
encryptLocalEnvironment
generateYamlLocalEnvironment
initEnvironment
initGitIgnore

To see all tasks and more detail, run gradlew tasks --all

To see more detail about a task, run gradlew help --task <task>

BUILD SUCCESSFUL in 5s
1 actionable task: 1 executed
```

Now is a good time to commit:
```
> git add --all
> git commit -m "local environment created"
```


## Deploy your first resource
Now we are ready to add our first resource. You can use your favorite IDE if you like.

In case you are unfamiliar with Kotlin. Kotlin sources are placed inside the src/main/kotlin directory.

For our first resource I'm creating a package example (a subdirectory inside the src/main/kotlin directory).

Inside the example package we add a FirstResource.kt file containing the following code.

```kotlin
package example

import io.kuberig.core.annotations.EnvResource
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

By annotating the firstResource method with @EnvResource KubeRig will detect it.

Kubernetes resources are available inside the kinds package of the KubeRig DSL. Inside this package they follow the Kubernetes groups structure for packages.

In this example we are defining a simple ConfigMap resource. The structure is almost 1-on-1 with the structure of the YAML files. More on this topic will be covered in more detail in future posts.

We are now ready to deploy our first resource. Run deployLocalEnvironment.
```
> ./gradlew deployLocalEnvironment

> Task :deployLocalEnvironment
created ConfigMap - first-resource in default namespace

BUILD SUCCESSFUL in 3s
4 actionable tasks: 3 executed, 1 up-to-date
```

Congrats you have just deployed your first resource with KubeRig!

Again a good time to commit
```
> git add --all
> git commit -m "first resource added"
```

## What is next
Let your imagination go crazy and use the power of Kotlin to come up with clever/clean ways to define your Kubernetes resources.

More information about coding resources can be found in this [post](https://rigel.dev/kuberig-coding-resources/).