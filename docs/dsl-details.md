---
id: dsl-details
title: DSL Details
---
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