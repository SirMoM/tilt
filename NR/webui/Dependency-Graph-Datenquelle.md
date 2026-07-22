---
title: Dependency Graph Datenquelle
date: 2026-05-26
tags:
  - tilt
  - webui
  - graph
  - dependencies
aliases:
  - Dependency Graph Datenmodell
  - UIResource Dependencies
---

# Dependency Graph Datenquelle

Diese Notiz ergänzt [[Übung-Dependency-Graph-View]] und [[Dependency-Graph-Nodes-und-Storybook]].
Sie sammelt die Erkenntnisse zur Frage, woher die Dependency-Informationen für eine Graph-View kommen.

> [!summary]
> `view.uiResources` enthält UI-Statusdaten, aber keinen vollständigen statischen Dependency-Graphen.
> Die statischen Resource-Dependencies existieren im Backend auf Manifest-Ebene als `Manifest.ResourceDependencies`.

## `view.uiResources`

Im Web-View-Typ steht `uiResources?: UIResource[]`.
Das bedeutet: Die Web-UI bekommt eine Liste aktueller `UIResource`-Objekte.

Ein `UIResource` besteht im generierten Frontend-Typ aus:

- `metadata`
- `spec`
- `status`

`spec` ist bei `UIResource` aktuell leer.
Die relevanten Informationen für die UI stehen deshalb fast vollständig in `metadata` und `status`.

## Was im UIResource-Dump sichtbar ist

Der Beispiel-Dump liegt hier:

`/Users/i13az81/Library/Application Support/JetBrains/IntelliJIdea2026.1/scratches/scratch_2.json`

Er enthält eine Liste von `UIResource`-Objekten.
Typische Statusfelder sind:

- `runtimeStatus`
- `updateStatus`
- `buildHistory`
- `conditions`
- `disableStatus`
- `waiting`

> [!example] Aktueller Wartestatus
> Einige Ressourcen enthalten `status.waiting`.
> Bei `waiting.reason = "waiting-for-dep"` zeigt `waiting.on` auf andere `UIResource`-Objekte.

Beispiel aus dem Dump:

```json
{
  "name": "antragskopiefrontend",
  "waiting": {
    "reason": "waiting-for-dep",
    "on": [
      { "kind": "UIResource", "name": "abschlussbackend1" },
      { "kind": "UIResource", "name": "antragskopiefrontend-compile" }
    ]
  }
}
```

Das sieht wie eine Dependency-Kante aus.
Es ist aber nur der aktuelle Wartestatus dieser Ressource.

Sobald die Ressource nicht mehr wartet, kann diese Information verschwinden.
Darum reicht `status.waiting.on` nicht als vollständige Datenquelle für eine dauerhafte Dependency-Graph-View.

> [!warning]
> `status.waiting.on` beschreibt Blocker im aktuellen Zustand.
> Diese Blocker können echte Dependencies sein, müssen es aber nicht.

Ein Gegenbeispiel aus dem Dump ist `abschlusstestmock-reload`.
Diese Ressource hat `waiting.reason = "is-unparallelizable-local"`.
Das beschreibt einen Scheduler-Blocker, aber keine statische Resource-Dependency.

## Statische Dependencies im Backend

Die statischen Resource-Dependencies sind im Go-Backend auf Manifest-Ebene modelliert.
Der relevante Typ ist `Manifest` in `pkg/model/manifest.go`.

```go
ResourceDependencies []ManifestName
```

Dieses Feld ist keine Baumstruktur.
Es ist eine flache Liste direkter Abhängigkeiten pro Manifest.

Beispiel:

```text
frontend -> backend
frontend -> frontend-compile
backend -> database
```

Das ist eine Adjazenzliste.
Aus so einer Liste kann man einen Graphen bauen.
Ein Baum entsteht erst, wenn eine Darstellung daraus berechnet wird.

## Warum es kein echter Baum ist

Resource-Dependencies bilden eher einen gerichteten Graphen als einen klassischen Baum.
Eine Ressource kann mehrere direkte Dependencies haben.
Mehrere Ressourcen können dieselbe Dependency teilen.

Beispiel:

```text
frontend -> backend
admin -> backend
backend -> database
```

`backend` hängt in dieser Darstellung unter mehreren Pfaden.
Das ist kein sauberer Baum, sondern ein gerichteter Graph.

## Tree-View im CLI

Die CLI-Tree-View zeigt, wie aus den Backend-Daten eine Baumdarstellung gebaut wird.
Sie liest die statischen Dependencies separat aus `dump/engine`.
Danach wird aus den flachen `ResourceDependencies` ein Mapping für Eltern und Kinder erstellt.

Relevante Stellen:

- `internal/cli/tree_view.go`
- `fetchResourceDependencies`
- `buildDependencyGraph`
- `buildTreeNode`

`buildTreeNode` ist also nicht die eigentliche Datenquelle.
Es ist die rekursive Darstellung eines vorher berechneten Dependency-Graphen.

## Konsequenz für die Web-UI

Für eine erste minimale Graph-View kann man `view.uiResources` verwenden, um Nodes zu bauen.
Damit bekommt man Ressourcennamen, Status, Labels und Sortierreihenfolge.

Für echte Edges reicht `view.uiResources` allein nicht aus.
Die Web-UI braucht dafür zusätzlich die statischen Resource-Dependencies aus dem Backend.

> [!todo]
> Wenn die Graph-View echte Dependency-Kanten anzeigen soll, muss das Backend die statischen Dependencies an die Web-UI liefern.
> Der passende Pfad ist `UIResourceStatus.resourceDependencies`, weil `UIResource` ein Read Model für den Legacy-Engine-Zustand ist und sein Spec absichtlich leer bleibt.

Möglicher Ablauf:

1. `ResourceDependencies []string` in `UIResourceStatus` ergänzen.
2. Das Feld in `toUIResource()` aus `Manifest.ResourceDependencies` befüllen.
3. Mit tygo `web/src/core.d.ts` aktualisieren.
4. `view.uiResources` auf React-Flow-Nodes mit `SidebarItemView` mappen.
5. `resource.status.resourceDependencies` auf React-Flow-Edges mappen.
6. Dagre für die automatische Anordnung verwenden.

## Kurzantworten für Aufgabe 4

### Aufgabe 4.1

`view.uiResources` enthält aktuelle `UIResource`-Objekte für die Web-UI.
`UIResource` enthält keinen vollständigen statischen Dependency-Graphen.
`status.waiting.on` kann auf andere Ressourcen zeigen, ist aber nur ein aktueller Blocker-Status.

### Aufgabe 4.2

Im Backend werden statische Resource-Dependencies als `Manifest.ResourceDependencies []ManifestName` modelliert.
Die CLI-Tree-View liest sie separat aus `dump/engine` und baut daraus eine Baumdarstellung.
Über das normale `View.uiResources`-Objekt werden diese statischen Dependencies aktuell nicht geliefert.
