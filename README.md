# TacticShot - Intelligentes Schießtraining

## Überblick
TacticShot ist eine moderne Trainingsanwendung für den Schießsport, die mithilfe von LED-Matrizen und Bluetooth-Kommunikation ein interaktives und effizientes Training ermöglicht. Die Anwendung unterstützt verschiedene Trainingsmodi und ermöglicht die individuelle Konfiguration von Trainingseinheiten.

## Funktionen
- **Verschiedene Trainingsmodi**
  - Schnellfeuer: Reaktionsschnelles Schießtraining
  - Präzision: Zeitgesteuertes Präzisionsschießen
  - Taktisch: Komplexe Schießabläufe
  - Wettkampf: Wettkampforientiertes Training
  - Individuell: Benutzerdefinierte Konfigurationen

- **Bluetooth-Konnektivität**
  - Verbindung mit mehreren Clients gleichzeitig
  - Echtzeit-Kommunikation
  - Stabile Verbindungsverwaltung

- **LED-Matrix Steuerung**
  - 8x8 RGB LED-Matrix Unterstützung
  - Verschiedene Beleuchtungsmodi
  - Individuelle Farbeinstellungen
  - Timing-Konfiguration

- **Gruppenverwaltung**
  - Erstellung von Trainingsgruppen
  - Individuelle Einstellungen pro Gruppe
  - Flexible Client-Zuweisung

## Technische Details

### Voraussetzungen
- Node.js (Version 16 oder höher)
- NPM (wird mit Node.js installiert)
- Ein moderner Webbrowser
- Bluetooth-fähiges Gerät

### Installation

1. Repository klonen:
```bash
git clone https://github.com/P3ac3mak3r96/WEBAPPajsldjfaslkdjfhalskdjfhlaksjdflkjadsflkjasdlfkjaldfs.git
```

2. In das Projektverzeichnis wechseln:
```bash
cd WEBAPPajsldjfaslkdjfhalskdjfhlaksjdflkjadsflkjasdlfkjaldfs
```

3. Abhängigkeiten installieren:
```bash
npm install
```

4. Entwicklungsserver starten:
```bash
npm run dev
```

### Projektstruktur
```
src/
├── app/                    # App-spezifische Konfigurationen
│   ├── constants/         # Konstanten (Farben, Spacing etc.)
│   ├── i18n/             # Mehrsprachigkeit
│   ├── navigation/       # Navigationslogik
│   ├── state/           # State Management
│   └── theme/           # Design-System
├── components/            # UI Komponenten
│   ├── atoms/           # Basis-Komponenten
│   ├── molecules/       # Zusammengesetzte Komponenten
│   ├── organisms/       # Komplexe Komponenten
│   └── templates/       # Seitentemplates
├── features/             # Feature-spezifische Module
│   └── Bluetooth/       # Bluetooth-Funktionalität
├── screens/              # Hauptseiten der App
├── services/             # Externe Services
└── utils/               # Hilfsutilitäten
```

## Erste Schritte

### Client-Verbindung
1. Starten Sie die Anwendung
2. Klicken Sie auf "Modi"
3. Wählen Sie einen Trainingsmodus oder erstellen Sie einen eigenen
4. Verbinden Sie die Clients über Bluetooth
5. Konfigurieren Sie die Gruppen und Einstellungen
6. Starten Sie das Training

### Eigenen Modus erstellen
1. Wählen Sie "Neu erstellen" im Modi-Menü
2. Erstellen Sie Gruppen nach Bedarf
3. Weisen Sie Clients den Gruppen zu
4. Konfigurieren Sie LED und Sound-Einstellungen
5. Speichern Sie den Modus

## Beitragen
Wir freuen uns über Beiträge! Bitte lesen Sie unsere Beitragsrichtlinien und eröffnen Sie einen Pull Request.

## Support
Bei Fragen oder Problemen erstellen Sie bitte ein Issue in diesem Repository.

## Lizenz
[MIT](LICENSE)

## Kontakt
- Entwickler: [IhrName]
- E-Mail: [IhreEmail]
- GitHub: [IhrGitHubProfil]

---

**Hinweis**: Dieses Projekt befindet sich in aktiver Entwicklung. Features und Funktionen können sich ändern.