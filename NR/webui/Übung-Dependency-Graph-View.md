---
title: "Übung: Dependency Graph View"
date: 2026-05-08
tags:
  - tilt
  - webui
  - übung
  - graph
aliases:
  - Graph View Übung
---

# Übung: Eine dritte View – Dependency Graph

> [!abstract] Ziel
> Du erstellst eine dritte Route neben der Tabellen-Overview (`/`) und der Ressourcen-Detailansicht (`/r/:name/overview`).
> Die neue View zeigt einen Dependency-Graphen aller Tilt-Ressourcen an.

## Voraussetzungen

Bevor du loslegst, lies und verstehe:

- [[webui/Rendering-Stack]] – wie die UI grundsätzlich aufgebaut ist
- `web/src/HUD.tsx` – wo Routes definiert werden
- `web/src/OverviewTablePane.tsx` – als Vorlage für eine Pane-Komponente

---

## Teil 1: Routing verstehen

> [!question] Aufgabe 1.1
> Öffne `web/src/HUD.tsx` und finde die Methode `renderOverviewSwitch()`.
> - Welche `<Route>`-Elemente gibt es dort?
> - Welchen `path` haben sie?
> - Was ist der `*`-Catch-All?

> [!tip] Hinweis
> Schau dir an, wie `this.path(...)` funktioniert – es nutzt den `PathBuilder`, um relative Pfade mit Snapshot-Prefix zu bauen.

> [!question] Aufgabe 1.2
> Füge eine neue Route hinzu: `/graph`
> - Sie soll neben den bestehenden Routes stehen
> - Erstelle zunächst eine Platzhalter-Komponente, die nur `<div>Graph View</div>` rendert
> - Überprüfe im Browser, ob `/graph` erreichbar ist

---

## Teil 2: Pane-Komponente erstellen

> [!question] Aufgabe 2.1
> Erstelle eine Datei `web/src/DependencyGraphPane.tsx`.
> Orientiere dich an `OverviewTablePane.tsx`:
> - Sie bekommt `view: View` und `isSocketConnected: boolean` als Props
> - Sie rendert zunächst die `HeaderBar` und darunter einen Platzhalter

> [!tip] Hinweis
> Schau dir an, welche Imports `OverviewTablePane` nutzt.
> Du brauchst mindestens: `React`, `styled-components`, `HeaderBar`, `View`.

> [!question] Aufgabe 2.2
> Erweitere die `HeaderBar`:
> - In `HeaderBar.tsx` gibt es ein Enum `HeaderBarPage`. Füge dort `Graph` hinzu.
> - Welche Auswirkung hat die `currentPage`-Prop auf die Navigation?

---

## Teil 3: Daten verstehen

> [!important] Schlüsselfrage
> Woher kommen die Dependency-Informationen?

> [!question] Aufgabe 3.1
> Untersuche das `View`-Objekt in `web/src/webview.d.ts`:
> - Was steht in `uiResources`?
> - Öffne `web/src/core.d.ts` und schau dir `UIResource` an
> - Hat `UIResource` Felder, die auf andere Ressourcen verweisen?

> [!question] Aufgabe 3.2
> Recherchiere im Go-Backend:
> - Suche in `pkg/model/` oder `internal/` nach "DependsOn", "Dependencies", oder ähnlichen Feldern
> - Wie werden Abhängigkeiten zwischen Ressourcen im Backend modelliert?
> - Werden sie über den WebSocket an die UI geliefert?

> [!warning] Mögliches Ergebnis
> Es kann sein, dass Dependencies nicht direkt im `View`-Objekt stehen.
> Falls nicht: Was wäre nötig, um sie hinzuzufügen?
> (Backend-Änderung → Typen-Generierung → Frontend-Nutzung)

---

## Teil 4: Graph rendern

> [!question] Aufgabe 4.1
> Entscheide dich für eine Rendering-Strategie:
>
> **Option A:** SVG manuell (volle Kontrolle, mehr Arbeit)
> - Nodes als `<rect>` + `<text>`
> - Edges als `<line>` oder `<path>`
>
> **Option B:** Bestehende Library nutzen
> - z.B. `dagre` für Layout + manuelle SVG-Darstellung
> - z.B. `reactflow` / `elkjs` für interaktive Graphen
>
> Welche passt besser zum bestehenden Stack (kein Next.js, CRA-basiert, Material UI)?

> [!question] Aufgabe 4.2
> Implementiere einen minimalen Graphen:
> - Extrahiere Ressourcen-Namen aus `view.uiResources`
> - Rendere jeden als Knoten (einfacher Kasten)
> - Wenn du Dependencies gefunden hast: zeichne Kanten zwischen ihnen

> [!tip] Minimalbeispiel-Ansatz
> Beginne mit hardcodierten Test-Daten, bevor du echte View-Daten nutzt:
> ```typescript
> const testNodes = [
>   { id: "frontend", dependsOn: ["backend"] },
>   { id: "backend", dependsOn: ["database"] },
>   { id: "database", dependsOn: [] },
> ]
> ```

---

## Teil 5: Navigation integrieren

> [!question] Aufgabe 5.1
> Wie kommt der User zur Graph-View?
> - Füge einen Nav-Link/Button hinzu
> - Schau dir an, wie zwischen Table-View und Resource-View gewechselt wird
> - Wo sitzt die Navigation? (Hinweis: `HeaderBar`, `GlobalNav`)

> [!question] Aufgabe 5.2
> Klick auf einen Graphen-Knoten soll zur Ressourcen-Detailansicht navigieren (`/r/:name/overview`).
> - Wie funktioniert Navigation in dieser App? (Hinweis: `useNavigate` aus react-router)
> - Wie wird der Ressourcen-Name URL-encodet? (Hinweis: `PathBuilder.encpath`)

---

## Checkliste

- [ ] Neue Route `/graph` in `HUD.tsx` eingetragen
- [ ] `DependencyGraphPane.tsx` erstellt mit grundlegendem Layout
- [ ] `HeaderBarPage.Graph` hinzugefügt
- [ ] Dependency-Datenquelle identifiziert (oder Feature-Gap erkannt)
- [ ] Minimaler Graph gerendert (erst mit Testdaten)
- [ ] Navigation zum/vom Graphen funktioniert
- [ ] Klick auf Knoten navigiert zur Ressourcen-Detailansicht

---

## Weiterführende Ideen

- Farbliche Codierung der Knoten nach Ressourcen-Status (grün/rot/gelb)
- Zoom und Pan für große Graphen
- Gruppierung nach Labels oder Resource-Groups
- Animierte Kanten bei aktiven Builds

---

*Siehe auch: [[Overview]], [[webui/Rendering-Stack]]*
