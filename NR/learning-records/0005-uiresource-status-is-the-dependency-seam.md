# UIResourceStatus is the dependency seam

The empty <code>UIResourceSpec</code> is intentional because <code>UIResource</code> does not specify desired behavior; it exposes a read model of legacy engine state.
Static manifest dependencies should therefore be published in <code>UIResourceStatus</code> by <code>toUIResource()</code>, alongside other UI-facing engine summaries.
