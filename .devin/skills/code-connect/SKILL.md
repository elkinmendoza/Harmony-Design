---
name: code-connect
description: Map a Figma component set to its Vue/React/RN source with Code Connect
---

# Workflow: Code Connect Setup

Use to link a Figma component to its code implementation(s).

1. Confirm the component exists in code (run component-build first if not).
2. Get the Figma **file key + node id** of the component set.
3. Inspect structure with MCP `get_context_for_code_connect` (props, variants,
   descendant tree) so the mapping matches real Figma properties.
4. Get suggestions with `get_code_connect_suggestions`; review against the actual
   source path and component name.
5. Build the prop mapping so Figma props → code props 1:1:
   - `variant` → `variant`, `size` → `size`, boolean → boolean, instance-swap → slot/prop.
6. Save with `send_code_connect_mappings` (one mapping per framework label:
   `React`, `Vue`, `React Native` where the source exists).
7. Verify with `get_code_connect_map` that the node resolves to the intended source.
8. Record the mapping in the component's docs.

**Guardrails:** never guess node ids; label each mapping with the correct framework;
keep source paths accurate.
