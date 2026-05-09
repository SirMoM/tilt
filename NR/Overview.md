---
title: Tilt Projektüberblick
date: 2026-05-08
tags:
  - tilt
  - overview
aliases:
  - Tilt Overview
---

# Tilt - Grober Projektüberblick

Tilt ist ein Development-Tool für lokale Microservice-Entwicklung.

> [!info]
> Leitsatz: *Kubernetes for Prod, Tilt for Dev*.

## Ziel von Tilt

- automatisiert den Inner Loop bei Codeänderungen
- beobachtet Dateien
- baut Container-Images
- aktualisiert Ressourcen in Kubernetes oder Docker Compose

## Kernidee

Die Konfiguration läuft über ein `Tiltfile` (Starlark). Dort wird definiert:

- was gebaut wird
- was deployed wird
- welche Ressourcen in der UI sichtbar sind

## Wichtige Ordner im Repo

- `cmd/tilt` - CLI-Einstiegspunkt (`main.go`)
- `internal/engine` - Orchestrierung von Build/Deploy
- `internal/tiltfile` - Auswertung des Tiltfiles
- `internal/k8s` - Kubernetes-Integration
- `internal/watch` - File-Watching
- `internal/store` - zentraler State
- `internal/hud` - Terminal-HUD
- `web` - React/TypeScript Web-UI

## Tech-Stack

- Backend: **Go**
- Config: **Starlark**
- Web-UI: **React + TypeScript**
- Runtime-Fokus: **Kubernetes**, optional Docker Compose

## Typischer Ablauf

1. `tilt up` startet Tilt
2. Tilt lädt und evaluiert das `Tiltfile`
3. Dateien werden beobachtet
4. Bei Änderungen werden Build + Deploy angestoßen
5. Zustand erscheint in Terminal-HUD und Web-UI

## Nächster Lernschritt

Wenn du verstehen willst, wie die Web-UI rendert und Daten erhält, siehe:

- [[webui/Rendering-Stack]]

## Lokal UI erweitern
start des React Frontends mit
```shell
cd web
yarn start
```
Bauen von der Tilt binary
```shell
make install-debug
```
Starten eines Tilt Prozesses das das lokale React Frontend nutzt.
```shell
cd integrations/oneup # geht aber auch mit jeder anderen Tiltfile
"$(go env GOPATH)/bin/tilt" up --web-mode=local
```