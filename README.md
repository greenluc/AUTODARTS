# 🎯 Dartly Arena – Dokumentation & Repository-Übersicht

**Dartly Arena** ist ein modulares, webbasiertes System zur automatischen Dart-Erkennung, Video-Analyse und Live-Übertragung. Es verwandelt ein Smartphone in eine Board-Kamera, streamt das Bild per WebRTC an ein Tablet-Dashboard und nutzt bildbasierte Algorithmen (sowie TensorFlow.js) zur Treffer- und Score-Berechnung.

---

## 📂 Die 3 Haupt-HTML-Seiten im Detail

Das System teilt sich in drei zentrale Bedien- und Funktions-Oberflächen auf, die über das zentrale Dashboard (`index.html`) gesteuert werden:

### 1. `index.html` (Das zentrale Dashboard & Arena-Hub)
* **Funktion:** Die Startseite und zentrale Anlaufstelle des gesamten Systems.
* **Hauptaufgaben:** 
  * Bietet eine saubere Übersicht mit Direktverknüpfungen zu allen Modulen (Tablet-Empfänger, Handy-Kamera, KI-Trainer).
  * Verwaltet die Progressive-Web-App-Funktionen (PWA) über den Service-Worker (`sw.js`), wodurch die App auf Wunsch auch offline-fähig ist und wie eine native App installiert werden kann.

### 2. `camera_tablet.html` (Der Tablet-Empfänger & Analyse-Hub)
* **Funktion:** Das visuelle und logische Steuerungszentrum für das Live-Spiel und die Auswertung.
* **Hauptaufgaben:**
  * Empfängt den Videostream des Smartphones in Echtzeit über eine sichere WebRTC-Verbindung (unterstützt durch Firestore-Signalisierung in `firebase_config.js`).
  * Führt die präzise **19-Punkt-Kalibrierung** (mit Homographie-Berechnung und OpenCV.js-Unterstützung) aus, um das Kamerabild perfekt auf das mathematische Dartboard einzumessen.
  * Besitzt einen automatischen `MotionDetector`, der Bewegungen auf dem Board erkennt, Darts lokalisiert und die Treffer in Echtzeit auf einer interaktiven SVG-Dartboard-Grafik anzeigt.

### 3. `camera_stream.html` (Der Handy-Kamera-Client)
* **Funktion:** Verwandelt jedes handelsübliche Smartphone in eine stabile, hochauflösende Board-Kamera.
* **Hauptaufgaben:**
  * Überträgt die Live-Kameraaufnahme performant per WebRTC an das Tablet.
  * Bietet eine integrierte **Zoom-Steuerung** (sowie die Möglichkeit, den Bildschirm abzudunkeln, um Strom zu sparen), damit das Handy nach dem Aufstellen am Stativ nicht mehr berührt werden muss.
  * Besitzt einen eingebauten **QR-Code-Scanner**, mit dem sich das Handy sekundenschnell mit dem auf dem Tablet angezeigten Code koppeln lässt.

---

## 🤖 Der KI-Trainer (`ai_trainer.html`) & das Training erklärt

Der **KI-Trainer v2** ist ein leistungsstarkes Tool, um neuronale Netze (basierend auf TensorFlow.js) direkt im Browser mit deinen eigenen Trainingsdaten zu füttern.

### 1. Was ist der Loss-Wert (Verlustwert)?
Der Loss-Wert misst, wie stark die Vorhersage der KI (für Dart-Spitzen und Flights) von deinen manuell gesetzten Markierungen abweicht:
* **Ziel:** Ein möglichst niedriger Wert nahe $0$.
* **Train-Loss:** Zeigt den Fehler auf den bekannten Trainingsbildern, mit denen aktiv gelernt wird.
* **Test-Loss:** Zeigt den Fehler auf unbekannten Testbildern (dieser Wert ist entscheidend, um zu sehen, wie gut die KI in der Realität funktioniert).
* **Overfitting-Warnung:** Wenn der Train-Loss kontinuierlich sinkt, der Test-Loss aber plötzlich wieder ansteigt, hat die KI die Bilder auswendig gelernt, statt sie zu verallgemeinern. *Gegenmaßnahmen:* Mehr Bilder hinzufügen oder die Augmentation erhöhen.

### 2. Die wichtigsten Trainings-Parameter im Detail

* **Eingabegröße (z. B. 128 oder 256):**
  Legt fest, auf welche Auflösung die Bilder für das neuronale Netz verkleinert werden.
  * *128:* Trainiert sehr schnell.
  * *256:* Erfasst feine Details wie dünne Dartspitzen noch präziser, benötigt aber mehr Rechenleistung.

* **Epochen (z. B. 40 bis 100):**
  Bestimmt, wie oft die KI den gesamten Trainingsdatensatz nacheinander komplett durchläuft.

* **Batchgröße (Standard: 8 bis 16):**
  Die Anzahl der Bilder, die die KI gleichzeitig verarbeitet, bevor sie ihre Gewichte anpasst.
  * *Klein (4–8):* Ideal bei kleineren Datensätzen oder schwächerer Hardware.
  * *Groß (16–32):* Sorgt für ein stabileres Training, erfordert aber mehr Daten (100+ Bilder).

* **Lernrate (Standard: 0.001 bis 0.002):**
  Bestimmt die Schrittgröße bei den mathematischen Anpassungen während des Lernens.
  * *Zu hoch:* Die Loss-Kurve springt wild hin und her.
  * *Zu niedrig:* Das Lernen dauert sehr lange, eignet sich aber hervorragend zum Feintuning (Weitertrainieren).

* **Erkennungsschwelle (Standard: 0.3 bis 0.7):**
  Die Mindestsicherheit in Prozent, ab der ein erkannter Dart als gültig gewertet wird.
  * *Erhöhen:* Sinnvoll, wenn Schatten oder Hintergrundobjekte fälschlicherweise als Darts erkannt werden.
  * *Verringern:* Hilft, wenn echte Darts im Schatten oder in Clustern übersehen werden.

### 3. Fortgeschrittene Trainings-Optionen
* **Augmentation:** Erzeugt künstliche Varianten der Trainingsbilder (durch Drehen, Zoomen, Helligkeitswechsel oder Rauschen). Dadurch wird die KI robuster gegenüber wechselnden Lichtverhältnissen im Raum oder kleinen Wacklern an der Halterung.
* **Darts kopieren (Apex-Modus):** Schneidet annotierte Darts aus und platziert sie virtuell an anderen Stellen des Boards. Das beschleunigt das Training enorm, selbst wenn bestimmte Doppel- oder Triple-Felder noch nicht oft abgeworfen wurden.
* **Vorhandenes Modell weitertrainieren:** Ermöglicht es, auf einem bereits trainierten Modell aufzubauen, statt von vorne zu beginnen. Perfekt geeignet, um nachträglich 10–20 neue Fehlerbilder mit einer niedrigen Lernrate (z. B. $0.001$) nachzulernen.

---

