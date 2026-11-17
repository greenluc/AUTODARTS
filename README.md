# 🎯 Dartly – Peer-to-Peer Kamera & Auto-Scoring System

**Dartly** ist eine webbasierte Computer-Vision- und Streaming-Lösung für Steeldart-Boards. Das System ermöglicht es, ein oder zwei Smartphones als hochauflösende Board-Kameras zu nutzen und den Videostream verzögerungsfrei (Peer-to-Peer via WebRTC) an ein Tablet oder einen PC zu übertragen. Dort erkennt eine integrierte Bildverarbeitungs-Engine (OpenCV.js & Custom Homography) automatisch die geworfenen Darts und berechnet die Punktzahl.

## ✨ Hauptfunktionen

### 📱 Handy-Kamera (`camera_stream.html`)

* **Einfaches Pairing:** Verbindung über einen 6-stelligen Zahlencode oder durch direktes Scannen des QR-Codes vom Tablet.
* **WebRTC-Streaming:** Direkte Peer-to-Peer-Übertragung (inklusive STUN/TURN-Fallback) mit Live-Statistiken zu Auflösung, FPS und Bitrate.
* **Kamera-Steuerung:** Stufenloser digitaler/optischer Kamera-Zoom (sofern vom Gerät unterstützt) mit automatischer Speicherung der Zoom-Stufe.
* **Energiespar- & Dauerbetrieb:** Integrierte *Wake-Lock*-Funktion verhindert das Ausschalten des Displays; ein Abdunkelungs-Modus (*Dim-Screen*) schont den Akku während des Spiels.

### 🖥️ Tablet-Empfänger & Analyse-Hub (`camera_tablet.html`)

* **1-Kamera- & Multi-View-Modus:** Optionales Zuschalten einer zweiten Kamera (Ansicht rechts) zur Reduzierung von Verdeckungen (Bouncern/Gruppierungen) und zum millimetergenauen Abgleich beider Perspektiven.
* **Automatische & Manuelle Kalibrierung:**
  * *Auto-Kalibrierung:* Erkennt mithilfe von **OpenCV.js** (Ellipsen-Fit, Sektor-Musteranalyse, Subpixel-Verfeinerung und Drahtkreuzungs-Abgleich) automatisch das Dartboard.
  * *19-Punkte-Kalibrierung:* Präzise manuelle Kalibrierung mit integrierter **Zoom-Lupe** für höchste Genauigkeit (inklusive Berechnung des Kamera-Abstands in cm und des Kalibrierungsfehlers in mm).
* **Echtzeit-Treffererkennung:**
  * Differenzbild-Analyse mit automatischer Bewegungserkennung und Ruhephasen-Prüfung.
  * Erkennung von Dartspitze, Flight und Wurfwinkel unter Berücksichtigung der Kameraperspektive.
  * Automatische Erkennung der Dart-Entnahme zum Zurücksetzen der Aufnahme (inkl. konfigurierbarer Dartpause).
* **Interaktive Korrektur & Sprachsteuerung:** Nach jedem Wurf erscheint ein Overlay zur Bestätigung. Falsche Erkennungen können per Klick oder per **Spracheingabe** (z. B. *„Triple 20“*, *„Double 16“*, *„Bullseye“*) korrigiert werden.
* **Offline-Analyse-Tools:** Hochladen und Analysieren von aufgezeichneten Videos (inkl. Frame-genauem Spulen & Screenshot-Export) sowie statischen Screenshots.

## 🚀 Schnellstart-Anleitung

1. **Empfänger starten:** Öffne die Tablet-Ansicht (`camera_tablet.html`) auf deinem Tablet oder PC. Auf dem Bildschirm erscheinen ein **6-stelliger Pairing-Code** und ein **QR-Code**.
2. **Kamera verbinden:** Öffne die Kamera-Ansicht (`camera_stream.html`) auf deinem Smartphone, tippe auf **„QR-Code scannen“** (oder gib den Code manuell ein) und erlaube den Kamerazugriff.
3. **Handy positionieren:** Befestige das Smartphone stabil (z. B. an einem Stativ oder Lichtring) mit freier Sicht auf das gesamte Dartboard und schließe es idealerweise an ein Ladekabel an. Nutze bei Bedarf den Zoom-Regler.
4. **Board kalibrieren:**
   * Klicke auf dem Tablet auf **„Auto kalibrieren“** und prüfe das gelbe Kalibrierungsraster.
   * Falls nötig, passe die **19 Ankerpunkte** mithilfe der Lupe exakt an die Drahtkreuzungen an und klicke auf **„Übernehmen“**.
5. **Spielen:** Sobald das System *„Bereit“* anzeigt, kannst du werfen. Nach 3 Darts startet automatisch ein 10-Sekunden-Countdown zum Ziehen der Pfeile.

## 🧩 Architektur-Überblick

| Komponente | Beschreibung |
| :--- | :--- |
| **`Homography`** | Berechnet die projektive Transformationsmatrix ($3 \times 3$) zwischen Kamerabild und standardisiertem Board-Koordinatensystem ($200 \times 200$ Einheiten, Außenradius Double-Ring = $170\text{ mm}$). |
| **`AutoBoardDetector`** | Nutzt OpenCV.js für Canny-Kantenerkennung, Ellipsen-Approximation, radiale Kontrastanalyse der 20 Sektoren und Subpixel-Optimierung. |
| **`MotionDetector`** | Vergleicht Graustufenbilder innerhalb der Board-ROI (Region of Interest), erkennt Bewegungen und extrahiert zusammenhängende Pixel-Blobs. |
| **`DartLocator`** | Analysiert Differenz-Blobs anhand der Oberflächennormale des Boards, trennt Spitze und Flight und filtert Fehlauslösungen (z. B. Hände oder Schatten). |
| **`ScoreFeedback`** | Verwaltet das Bestätigungs-Popup inklusive Timer-Balken und Web Speech API Integration. |

## 💡 Tipps für beste Erkennungsraten

* **Beleuchtung:** Ein schattenfreier LED-Lichtring (Surround-Light) verbessert die Auto-Kalibrierung und verhindert falsche Schatten-Blobs beim Werfen.
* **Stabilität:** Das Smartphone darf nach der Kalibrierung nicht mehr bewegt werden. Aktiviere am Handy den Modus *„Bildschirm abdunkeln“* und lasse den Browser im Vordergrund geöffnet.
* **2-Kamera-Setup:** Positioniere zwei Kameras in einem Winkel von ca. $60^\circ$ bis $90^\circ$ zueinander (z. B. oben links und oben rechts), um verdeckte Darts zuverlässig aufzulösen.
  
