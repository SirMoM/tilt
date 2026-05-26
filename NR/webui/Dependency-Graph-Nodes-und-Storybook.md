---
title: Dependency Graph Nodes und Storybook
date: 2026-05-20
tags:
  - tilt
  - webui
  - graph
  - storybook
  - react-flow
aliases:
  - Dependency Graph Nodes
---

# Dependency Graph Nodes und Storybook

Diese Notiz ergänzt [[Übung-Dependency-Graph-View]].
Sie fokussiert nur auf die Knoten-Komponente und ihre Storybook-Stories.

## Ziel

Baue die visuelle Darstellung eines Dependency-Graph-Knotens isoliert, bevor der ganze Graph gerendert wird.
Der Knoten soll später in React Flow als Custom Node registriert werden.

## Technische Empfehlung

React Flow ist für diese View die beste Basis.
Es ist React-basiert und passt deshalb gut zu Material UI v4, `styled-components` und den bestehenden Komponenten im Web-UI.

Die aktuelle React-Flow-Dokumentation verwendet das Paket `@xyflow/react`.
Ältere Beispiele verwenden teilweise noch `reactflow`.
Prüfe vor der Installation, welche Version mit React 17 kompatibel ist.

## Warum React Flow?

- Custom Nodes sind normale React-Komponenten.
- Node-Inhalte können bestehende Material-UI-v4-Komponenten verwenden.
- Status, Aktionen und Details lassen sich ohne SVG-Speziallogik darstellen.
- Pan, Zoom, Auswahl und Handles sind bereits vorhanden.
- Das Layout kann später top-down, left-to-right oder mit Layout-Helfern ergänzt werden.

## Aufgabe 1: Node-API festlegen

> [!question]
> Welche Daten braucht ein Graph-Knoten wirklich?

Empfohlener Start:

- `name`: Ressourcen-Name
- `status`: verdichteter Ressourcen-Status
- `isSelected`: ob der Knoten aktiv ausgewählt ist
- `onOpen`: Callback zur Ressourcen-Detailansicht
- `onRestart`: optionaler Callback für Restart-Aktionen

Halte die Props klein.
Die Komponente soll nicht das komplette `View`-Objekt kennen.

## Aufgabe 2: Statusdarstellung entwerfen

> [!question]
> Welche Statuszustände muss man auf einen Blick unterscheiden?

Empfohlene Stories:

- Healthy: grüner Statusindikator
- Warning: gelber Statusindikator
- Unhealthy: roter Statusindikator, optional mit auffälligerem Rand
- Building: laufender oder neutraler Statusindikator
- Disabled: visuell zurückgenommen
- LongName: langer Ressourcen-Name ohne Layoutbruch

Nutze dafür die bestehenden Statusbegriffe aus `web/src/types.ts`.
So bleibt die Übung näher am echten Code.

## Aufgabe 3: Storybook-Datei anlegen

Lege neben der Komponente eine Storybook-Datei an, zum Beispiel:

- `web/src/DependencyGraphNode.tsx`
- `web/src/DependencyGraphNode.stories.tsx`

Orientiere dich an vorhandenen Stories wie `StarredResourceBar.stories.tsx` und `OverviewActionBar.stories.tsx`.
Nutze statische Beispiel-Props, damit die Komponente ohne WebSocket und ohne echte View-Daten gerendert werden kann.

## Aufgabe 4: React-Flow-Anschluss vorbereiten

React Flow rendert Custom Nodes über eine `nodeTypes`-Map.
Ein Dependency-Graph-Knoten sollte deshalb so gebaut sein, dass er später als Custom Node verwendet werden kann.

Wichtige Begriffe aus React Flow:

- `ReactFlow`: Canvas-Komponente für Nodes und Edges
- `NodeProps`: Props, die React Flow an eine Custom Node übergibt
- `Handle`: Anschlussstellen für eingehende und ausgehende Edges
- `Position`: Position von Handles, zum Beispiel oben und unten
- `ReactFlowProvider`: Provider, wenn Hooks oder isolierte Storybook-Szenarien ihn brauchen

> [!tip]
> Der erste Storybook-Schritt muss noch keinen kompletten React-Flow-Canvas rendern.
> Starte mit der reinen Node-Komponente.
> Danach kann eine zweite Story zeigen, wie dieselbe Komponente in einem minimalen React-Flow-Canvas aussieht.

## Aufgabe 5: Graph-Integration

Wenn die Node-Komponente in Storybook stabil ist, integriere sie in `DependencyGraphPane`.
Erst dann sollten echte `view.uiResources` auf React-Flow-Nodes abgebildet werden.

Empfohlene Reihenfolge:

1. Node-Komponente mit statischen Props in Storybook.
2. Storybook-Stories für alle relevanten Statuszustände.
3. Minimaler React-Flow-Canvas mit zwei bis drei Test-Knoten.
4. Mapping von `view.uiResources` auf React-Flow-Nodes.
5. Mapping echter Dependency-Daten auf React-Flow-Edges, sobald die Datenquelle geklärt ist.

## Akzeptanzkriterien

- Die Node-Komponente lässt sich isoliert in Storybook öffnen.
- Alle wichtigen Ressourcen-Statuszustände haben eigene Stories.
- Lange Namen beschädigen das Layout nicht.
- Die Komponente nutzt Material UI v4 und `styled-components` konsistent zum bestehenden Web-UI.
- Die Komponente ist klein genug, um später als React-Flow-Custom-Node registriert zu werden.
