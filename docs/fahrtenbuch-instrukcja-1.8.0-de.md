# Fahrtenbuch
# Bedienungsanleitung

**Bedienungsanleitung • Android-App 1.8.0 • Deutsche Ausgabe • 17.10.2026**

Fahrtenbuch erfasst Kilometerstände, Tankvorgänge und Ladevorgänge. Die Einträge ergeben eine Fahrzeughistorie, gefahrene Strecken und den berechenbaren Kraftstoffverbrauch. Kosten finden Sie in exportierten PDF- und CSV-Berichten.

Diese Anleitung beschreibt die aktuelle App-Version. Die Beschriftungen einzelner Schaltflächen können je nach Sprachversion leicht abweichen.

## 1. Schnellstart

1. Fügen Sie ein Fahrzeug hinzu und tragen Sie den aktuellen Kilometerstand als Anfangsstand ein.
2. Wählen Sie die Antriebsart und die Währung für Berichte.
3. Tragen Sie nach einer Fahrt den neuen Kilometerstand ein.
4. Wenn Sie tanken oder laden, wählen Sie die entsprechende Option und ergänzen Sie die Angaben.
5. Speichern Sie den Eintrag. Prüfen Sie Kilometerstand, Kraftstoffmenge und Energiemenge.
6. Speichern Sie regelmäßig eine Sicherung außerhalb der App.

**Besonders wichtig:** Geben Sie den Wert des Fahrzeugkilometerzählers ein, beispielsweise **148.501 km**, und nicht die Strecke der letzten Fahrt, beispielsweise 524 km.

## 2. Fahrzeug hinzufügen

Beim ersten Start fügen Sie ein Fahrzeug auf dem Startbildschirm hinzu. Weitere Fahrzeuge können Sie über **Einstellungen > Fahrzeug hinzufuegen** anlegen. Die Einstellungen öffnen Sie mit dem Zahnrad in der oberen Leiste.

Füllen Sie das Formular aus:

| Feld | Eingabe |
| --- | --- |
| Marke und Modell | Angaben, an denen Sie das Fahrzeug erkennen. |
| Baujahr | Herstellungsjahr des Fahrzeugs. |
| Kraftstoff / Antrieb | Passender Fahrzeugtyp; siehe Tabelle unten. |
| Hubraum | Hubraum des Verbrennungsmotors. Bei Elektrofahrzeugen ausgeblendet. |
| Anfangskilometerstand | Ausgangspunkt der in der App geführten Historie. |
| Kennzeichen | Kennzeichen zur Unterscheidung der Fahrzeuge. |
| Kostenwährung | Währung, mit der Preise und Kosten bezeichnet werden. |

### Antriebsart wählen

| Typ | Erfassung |
| --- | --- |
| Benzin, Diesel, LPG | Tanken: Liter und Preis pro Liter. |
| Hybrid (HEV) | Herkömmlicher Hybrid ohne Laden an der Steckdose. Sie erfassen Tankvorgänge. |
| Plug-in-Hybrid (PHEV) | Tankvorgänge, Ladevorgänge oder beides in einem Eintrag erfassen. |
| Elektro | Laden: kWh und Preis pro kWh. Ohne Hubraum und ohne neue Tankeinträge. |

Wenn früher die allgemeine Option „Hybrid“ gewählt wurde, können Sie das Fahrzeug bearbeiten und HEV oder PHEV festlegen. Die App trifft diese Wahl nicht automatisch und bewahrt die Historie.

### Mehrere Fahrzeuge

Prüfen Sie vor einem neuen Eintrag das ausgewählte Fahrzeug auf dem Hauptbildschirm. Historie und Berichte gehören zu einem bestimmten Fahrzeug. Der Fahrzeugwechsel ist im Fahrzeugbereich des Hauptbildschirms möglich; die Verwaltung finden Sie auch unter **Einstellungen > Fahrzeuge**.

**Achtung:** Beim Löschen eines Fahrzeugs werden auch seine Einträge gelöscht. Erstellen Sie vorher eine Sicherung.

## 3. Eintrag ohne Tanken oder Laden

1. Wählen Sie das richtige Fahrzeug.
2. Tragen Sie den neuen Wert unter **Aktueller Kilometerstand** ein.
3. Lassen Sie **Tankvorgang: Nein** und, falls verfügbar, **Laden: Nein** ausgewählt.
4. Speichern Sie den Eintrag.

Die App berechnet die Differenz zum vorherigen Kilometerstand. Beim ersten Eintrag dient der Anfangskilometerstand des Fahrzeugs als Bezugspunkt.

**Beispiel:** vorheriger Stand 148.000 km, neuer Stand 148.125 km. Die erfasste Strecke beträgt **125 km**.

Der neue Stand muss höher sein als der vorherige. Diese Version erlaubt keinen weiteren Eintrag mit identischem Kilometerstand. Datum und Uhrzeit werden beim Speichern automatisch vergeben; das Formular unterstützt keine nachträglichen Einträge mit frei gewähltem früherem Datum.

Sie können täglich oder nur beim Tanken beziehungsweise Laden Einträge speichern. Je seltener Sie Einträge erstellen, desto weniger detailliert ist die Fahrhistorie.

## 4. Tanken

Für Fahrzeuge mit Verbrennungsmotor, HEV oder PHEV:

1. Geben Sie den aktuellen Kilometerstand ein.
2. Wählen Sie **Tankvorgang: Ja**.
3. Wählen Sie **Vollgetankt: Ja** oder **Nein** entsprechend dem tatsächlichen Tankvorgang.
4. Geben Sie die getankte Menge in Litern ein.
5. Tragen Sie den Preis für **einen Liter** in der Fahrzeugwährung ein.
6. Speichern Sie den Eintrag.

Als Dezimaltrennzeichen können Sie Komma oder Punkt verwenden, zum Beispiel `41,27` oder `41.27`.

**Geben Sie nicht den Gesamtbetrag des Kassenbons ein.** Die App berechnet die Kosten aus Litern und Literpreis. Kaffee, Lebensmittel oder Scheibenreiniger dürfen nicht in den Kraftstoffpreis einfließen.

### Was bedeutet „Vollgetankt“?

Wählen Sie „Ja“, wenn der Tank nach dem Tanken voll ist. Er muss vorher weder leer gewesen sein, noch muss die Reserveleuchte geleuchtet haben.

Für vergleichbare Ergebnisse tanken Sie bis zu einem gleichbleibenden Füllstand und beachten Sie die Hinweise des Fahrzeugs und der Zapfsäule. Füllen Sie nicht gewaltsam nach, um eine bestimmte Literzahl zu erreichen.

### Wie wird der Verbrauch berechnet?

Es werden zwei Tankvorgänge benötigt, die als **vollgetankt** markiert sind. Die App teilt die Summe der nach dem ersten vollen Tank nachgefüllten Liter einschließlich des nächsten Volltankens durch die dazwischen gefahrene Strecke.

**Verbrauch [l/100 km] = nachgefüllte Liter ÷ Strecke [km] × 100**

Beispiel:

| Ereignis | Kilometerstand | Getankte Menge | Vollgetankt |
| --- | --- | --- | --- |
| Beginn der Messung | 100.000 km | 35 l | Ja |
| Teilbetankung | 100.300 km | 15 l | Nein |
| Ende der Messung | 100.600 km | 30 l | Ja |

Ergebnis: `(15 + 30) ÷ 600 × 100 = 7,5 l/100 km`.

Die anfänglichen 35 l werden nicht mitgerechnet. Der erste volle Tank legt den Beginn der Messung fest.

Das Ergebnis erscheint beim Eintrag, der die Messung abschließt, also beim nächsten Volltanken. Teilbetankungen werden summiert, schließen die Messung aber nicht ab. Tägliche Einträge nur mit Kilometerstand unterbrechen sie nicht.

Fehlen passende Volltankvorgänge, kann statt eines Ergebnisses ein Strich erscheinen. Literangaben allein reichen nicht aus. Ältere Einträge ohne Volltankinformation werden nicht automatisch als Volltanken gewertet.

**Wichtige Unterscheidung:** Die Strecke zwischen zwei Tankvorgängen kann von der Strecke der gesamten Verbrauchsmessung abweichen, die auch Teilbetankungen umfasst.

## 5. Elektrofahrzeug oder Plug-in-Hybrid laden

1. Wählen Sie ein Elektrofahrzeug oder einen PHEV.
2. Geben Sie den aktuellen Kilometerstand ein.
3. Wählen Sie **Laden: Ja**.
4. Tragen Sie die gelieferte Energie in **kWh** ein, zum Beispiel `23,456`.
5. Geben Sie den Preis für **eine kWh** in der Fahrzeugwährung ein.
6. Speichern Sie den Eintrag.

Bei kostenlosem Laden geben Sie den Preis **0** ein. Die Energiemenge muss größer als null sein. Tragen Sie hier weder den Akkustand in Prozent noch die Ladeleistung in kW oder die Akkukapazität ein.

Beim PHEV können Sie Tanken und Laden gleichzeitig auswählen und beide Mengen und Einheitspreise eingeben. So lassen sich beide Ereignisse auch beim selben Kilometerstand erfassen.

Die Historie zeigt die gelieferte Energiemenge und ab dem zweiten Ladeeintrag die Strecke zwischen Ladevorgängen. Gemeint ist die Differenz der Kilometerstände, nicht die angegebene elektrische Reichweite.

### Was berechnet die App derzeit nicht?

Die App berechnet weder **kWh/100 km** noch **Stromkosten pro 100 km**. Sie erfasst keine Energiebilanz des Akkus am Anfang und Ende eines Abschnitts. Geladene Energie wird deshalb nicht automatisch als auf dieser Strecke verbrauchte Energie gewertet.

Beim PHEV umfasst die Strecke alle Fahrten. Der Kraftstoffverbrauch bezieht sich auf die gesamte Strecke zwischen den passenden Tankvorgängen, nicht ausschließlich auf mit Verbrennungsmotor gefahrene Kilometer. Die App trennt elektrische und mit Kraftstoff gefahrene Kilometer nicht.

Historische Literangaben werden beim Ändern des Fahrzeugtyps nicht in kWh umgerechnet.

## 6. Hauptbildschirm verstehen

| Element | Bedeutung |
| --- | --- |
| Kilometerstand | Letzter gespeicherter Zählerstand, nicht die in der App erfasste Strecke. |
| Einträge | Anzahl gespeicherter Einträge des ausgewählten Fahrzeugs. |
| Verbrauch | Durchschnitt der verfügbaren Verbrauchsergebnisse abgeschlossener Messungen. Kein Wert aus dem Bordcomputer. |
| Energie — bei Elektrofahrzeugen | Summe der gespeicherten kWh, kein Energieverbrauch pro 100 km. |
| Historie | Einzelne Einträge, neueste zuerst, mit Strecke sowie Tank- oder Ladedaten. |

Kosten werden nicht direkt in der Historie angezeigt. Sie finden sie in den exportierten Berichten.

## 7. Einträge bearbeiten und löschen

Öffnen Sie auf dem Hauptbildschirm das Menü eines Historieneintrags und wählen Sie Bearbeiten oder Löschen. Das ist nur möglich, wenn **beide Bedingungen** erfüllt sind:

- der Eintrag wurde heute nach dem lokalen Datum des Telefons erstellt;
- er gehört zu den 10 neuesten Einträgen des Fahrzeugs.

Dies ist kein Zeitraum von 24 Stunden. Ein Eintrag von 23:50 erfüllt am nächsten Tag die Bedingung „heute“ nicht mehr. Speichern Sie mehr als 10 Einträge für ein Fahrzeug an einem Tag, liegen auch die ältesten davon außerhalb des bearbeitbaren Bereichs.

Ein Schloss bedeutet, dass Bearbeiten und Löschen nicht verfügbar sind. In der Berichtsansicht sind Einträge nur lesbar; zum Korrigieren kehren Sie zum Hauptbildschirm zurück.

Bei einer Änderung prüft die App den Kilometerstand anhand benachbarter Einträge. Nach dem Bearbeiten oder Löschen werden zugehörige Strecken und Verbrauchswerte neu berechnet. Das Löschen muss bestätigt werden.

**Prüfen Sie Ihre Daten immer vor dem Speichern.** Eine Sicherung stellt den gesamten Datensatz wieder her und entsperrt keinen einzelnen Eintrag.

## 8. PDF- und CSV-Berichte

1. Wählen Sie das richtige Fahrzeug.
2. Öffnen Sie **Einstellungen > Berichte** oder die Berichtsschaltfläche neben der Historie.
3. Wählen Sie Anfangs- und Enddatum oder **Alle Einträge**.
4. Prüfen Sie die Zusammenfassung und die Eintragsliste.
5. Wählen Sie CSV-Export oder PDF-Bericht.
6. Wählen Sie im Teilen-Dialog des Systems eine App oder einen Speicherort für die Datei.

Die gewählten Daten werden einschließlich berücksichtigt. Enthält der Zeitraum keine Einträge, entsteht kein Bericht mit Daten.

**PDF** bietet eine lesbare Übersicht zum Anzeigen und Teilen. **CSV** dient der Weiterverarbeitung in einer Tabellenkalkulation. In dieser Version sind die CSV-Spaltenüberschriften polnisch; als Spaltentrennzeichen dient das Semikolon.

Berichte enthalten die für das Fahrzeug passenden Angaben:

- Kilometerstände und Strecken;
- Liter, Literpreise, Volltankstatus und verfügbare Verbrauchswerte;
- Kraftstoffkosten und Kraftstoffkosten pro 100 km für korrekt abgeschlossene Messungen mit vollständigen Preisen;
- kWh, Preise pro kWh und Ladekosten;
- bei PHEV getrennte Kraftstoff- und Ladedaten sowie die gemeinsamen Einkaufskosten.

Kraftstoffkosten ergeben sich aus **Litern × Literpreis**, Ladekosten aus **kWh × Preis pro kWh**. Kraftstoffkosten pro 100 km enthalten weder Lade-, Wartungs- und Versicherungskosten noch andere Fahrzeugausgaben. Die Division aller Kraftstoffkäufe durch eine beliebige Strecke muss nicht dasselbe Ergebnis liefern wie eine abgeschlossene Messung zwischen vollen Tanks.

Fehlende Preise in älteren Daten bedeuten unvollständige Kostenangaben. Die Summe bekannter Kosten belegt dann nicht die gesamten Ausgaben.

**Zeitraumgrenzen:** Die Datumsangaben filtern Einträge, nicht die tatsächlichen Fahrtzeiten. Der dem ersten Berichtseintrag zugeordnete Abschnitt kann vor dem gewählten Anfangsdatum beginnen. Die App zeichnet keine GPS-Routen auf und teilt Fahrten nicht genau an Tages- oder Monatsgrenzen.

## 9. Währung

Die Währung wählen Sie im Fahrzeugformular. Verfügbar sind:

| Währung | Code | Symbol |
| --- | --- | --- |
| Euro | EUR | € |
| Polnischer Złoty | PLN | zł |
| US-Dollar | USD | $ |
| Britisches Pfund | GBP | £ |
| Schweizer Franken | CHF | CHF |
| Tschechische Krone | CZK | Kč |

Sie können die Währung später beim Bearbeiten des Fahrzeugs ändern. **Dabei werden Beträge nicht anhand von Wechselkursen umgerechnet.** Auch frühere Preise und Kosten dieses Fahrzeugs erhalten die neue Währungsbezeichnung.

Führen Sie Ihre Historie in EUR, geben Sie Preise in EUR ein. Bezahlen Sie in einer anderen Währung, rechnen Sie den Einheitspreis vor der Eingabe selbst in die Fahrzeugwährung um. Die App ruft keine Wechselkurse ab und speichert keine eigene Währung je Tank- oder Ladevorgang.

Ein Währungswechsel schließt keinen Abrechnungszeitraum ab und erzeugt keinen automatischen Bericht.

## 10. Sicherung und Wiederherstellung

### Sicherung speichern

1. Öffnen Sie **Einstellungen > Datensicherung**.
2. Wählen Sie **Sicherung speichern**.
3. Wählen Sie im Systemdialog einen Speicherort und speichern Sie die `.json`-Datei.
4. Prüfen Sie die Bestätigungsmeldung.
5. Bewahren Sie die Datei auch außerhalb des Telefons auf, beispielsweise auf dem Computer oder an einem selbst gewählten Dateispeicherort.

Die Sicherung enthält Fahrzeuge und ihre Historie einschließlich Tank- und Ladedaten. Sie ist nicht verschlüsselt und kann Kennzeichen und Angaben zur Fahrzeugnutzung enthalten. Geben Sie sie nur mit Bedacht weiter.

Sichern Sie regelmäßig, insbesondere vor Updates, einem Telefonwechsel, einer Wiederherstellung und dem Löschen eines Fahrzeugs. Gehen Sie nicht davon aus, dass die App die Historie automatisch mit einer Cloud synchronisiert.

### Sicherung wiederherstellen

1. Sichern Sie zuerst die aktuellen Daten.
2. Wählen Sie **Einstellungen > Datensicherung > Sicherung wiederherstellen**.
3. Wählen Sie eine Sicherungsdatei von Fahrtenbuch.
4. Prüfen Sie Sicherungsdatum sowie Anzahl der Fahrzeuge und Einträge im Bestätigungsdialog.
5. Bestätigen Sie nur, wenn Sie die aktuellen Daten ersetzen möchten.

**Die Wiederherstellung ersetzt alle aktuellen Fahrzeuge und Einträge. Zwei Historien werden nicht zusammengeführt.** Neuere Einträge, die in der gewählten Sicherung fehlen, bleiben im wiederhergestellten Datensatz nicht erhalten.

Version 1.8.0 unterstützt auch ältere Sicherungen im Format 1. Sicherungen mit neuen Ladedaten verwenden Format 2; ältere Apps unterstützen diese möglicherweise nicht. Bearbeiten Sie Sicherungsdateien nicht von Hand. Ungültige, nicht unterstützte oder zu große Dateien werden nicht wiederhergestellt; die Grenze beträgt 10 MiB.

**Ein Bericht ist keine Sicherung.** PDF- und CSV-Dateien können die Historie in der App nicht wiederherstellen.

## 11. Sprache und Darstellung

### Sprache

Öffnen Sie **Einstellungen > Sprache** und wählen Sie Polnisch, Englisch oder Deutsch. Der Sprachwechsel rechnet keine Beträge um und ändert die Fahrzeugwährung nicht.

### Design

Unter **Einstellungen > Darstellung** wählen Sie:

- **Wie System** — heller oder dunkler Modus folgt dem Telefon;
- **Hell** — die App bleibt hell;
- **Dunkel** — die App bleibt dunkel.

Der Schalter **Systemfarben** steuert die Palette unabhängig von der Helligkeit. Eingeschaltet verwendet er ab Android 12 die Systemakzentfarbe des Telefons. Ausgeschaltet bleibt die blaue Basispalette aktiv. Ist keine Systemakzentfarbe verfügbar, verwendet die App ebenfalls die blaue Palette.

Standardmäßig folgt die App dem Systemmodus und verwendet Systemfarben. Die Darstellungseinstellungen werden gespeichert.

## 12. Widget auf dem Startbildschirm

1. Halten Sie eine freie Stelle auf dem Startbildschirm des Telefons gedrückt.
2. Öffnen Sie die Widget-Liste und suchen Sie Fahrtenbuch.
3. Platzieren Sie das Widget auf dem Startbildschirm. Es ist ungefähr für **3 Spalten × 1 Zeile** vorgesehen; die tatsächliche Größe hängt vom Launcher des Telefons ab.
4. Tippen Sie auf das Widget oder seine Schaltfläche, um das Eingabeformular in der App zu öffnen.
5. Prüfen Sie das Fahrzeug, tragen Sie den Kilometerstand ein und speichern Sie.

Das Widget ist eine Verknüpfung zum Formular, kein eigenes Feld zum Speichern ohne Öffnen der App. Helligkeit und bei unterstützten Android-Versionen die Akzentfarbe folgen den Systemeinstellungen des Telefons.

## 13. Updates und Datensicherheit

Speichern Sie vor der Installation einer neuen Version eine `.json`-Sicherung außerhalb der App. Wenn das Installationsprogramm eine Aktualisierung erlaubt, verwenden Sie diese statt einer Deinstallation.

Eine Deinstallation oder das Löschen der App-Daten kann die lokale Historie entfernen. Die APK-Datei allein sichert keine Fahrzeuge und Einträge. Beim Wechsel zu einer Ausgabe aus anderer Quelle dürfen Sie nicht voraussetzen, dass das Installationsprogramm die Daten erhält; prüfen Sie zuerst, ob eine Sicherung verfügbar ist.

Ändern Sie nicht das Telefondatum, um die Bearbeitungssperre zu umgehen. Das Datum beeinflusst Historie, Berichte und die Verfügbarkeit der Eintragsbearbeitung.

## 14. Häufige Fragen

**Warum fehlt ein Verbrauchswert, obwohl Liter eingegeben wurden?**

Prüfen Sie, ob zwei passende Volltankvorgänge vorhanden sind. Der erste beginnt die Messung, der nächste schließt sie ab. Fehlende Volltankinformationen älterer Einträge werden nicht automatisch ergänzt.

**Muss ich vor dem Tanken bis zur Reserve fahren?**

Nein. Entscheidend ist ein vergleichbarer voller Füllstand nach den für die Messung verwendeten Tankvorgängen, nicht die Reserveanzeige davor.

**Warum stehen dort 148.501 km, obwohl ich mit der App nicht so weit gefahren bin?**

Das ist der Kilometerstand des Fahrzeugs. Die in einem Zeitraum erfasste Strecke finden Sie in den Berichten.

**Warum hat ein Eintrag ein Schloss?**

Er wurde nicht heute erstellt oder gehört nicht mehr zu den 10 neuesten Einträgen des Fahrzeugs. In der Berichtsansicht sind alle Einträge nur lesbar.

**Wo finde ich die Kosten?**

In exportierten PDF- oder CSV-Dateien. Sie werden nicht direkt neben den Historieneinträgen angezeigt.

**Kann ich kostenloses Laden erfassen?**

Ja. Geben Sie eine positive kWh-Menge und den Preis 0 pro kWh ein.

**Werden beim Wechsel von PLN zu EUR alte Beträge umgerechnet?**

Nein. Nur die Währungsbezeichnung ändert sich, nicht der Zahlenwert.

**Reicht ein PDF zum Übertragen auf ein neues Telefon?**

Nein. Für die Wiederherstellung benötigen Sie eine `.json`-Sicherungsdatei.

## 15. App-Informationen

Unter **Einstellungen > Über den Entwickler** finden Sie die installierte Versionsnummer und Links zur Website des Entwicklers und zur Datenschutzerklärung.

- Website des Entwicklers: https://mtelektronik.github.io/de/
- Datenschutzerklärung: https://mtelektronik.github.io/de/fahrtenbuch-privacy.html

---

Diese Anleitung beschreibt das bestehende Verhalten von Version 1.8.0, keine geplanten Funktionen. Melden Sie unklare Anweisungen dem Entwickler und geben Sie dabei die installierte App-Version an.
