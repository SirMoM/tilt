# Resource dependencies added to UIResourceStatus

<code>UIResourceStatus.ResourceDependencies</code> now exposes static manifest dependencies as strings.
<code>toUIResource()</code> performs the conversion from <code>[]model.ManifestName</code>, and both the focused test and the full <code>internal/hud/webview</code> package tests pass.
