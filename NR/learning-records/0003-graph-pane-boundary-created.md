# Graph pane boundary created

The user now has a dedicated <code>DependencyGraphPane.tsx</code> that owns the <code>/graph</code> page boundary and shared header instead of composing graph internals directly in <code>HUD.tsx</code>.
Future work can treat <code>HUD</code> as routing-only for this feature and focus on header navigation, node API cleanup, and real data mapping.
