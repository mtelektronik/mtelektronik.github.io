# Fahrtenbuch
# User guide

**User guide • Android app 1.8.0 • English edition • 17 October 2026**

Fahrtenbuch records odometer readings, refuelling and charging. Your entries provide a vehicle history, distances and fuel consumption where it can be calculated. Costs are available in exported PDF and CSV reports.

This guide describes the current app version. Button wording may vary slightly between language versions.

## 1. Quick start

1. Add a vehicle and enter its current odometer reading as the starting reading.
2. Select the drivetrain and report currency.
3. After driving, enter the new odometer reading.
4. If you refuel or charge, select the corresponding option and complete the details.
5. Save the entry. Check the odometer, fuel quantity and energy quantity.
6. Regularly save a backup outside the app.

**Most importantly:** enter the value shown on the vehicle's odometer, such as **148,501 km**, rather than the distance of the last trip, such as 524 km.

## 2. Adding a vehicle

On first launch, add a vehicle from the opening screen. Add further vehicles through **Settings > Add vehicle**. Open settings using the gear icon in the top bar.

Complete the form:

| Field | What to enter |
| --- | --- |
| Make and model | Details that identify the vehicle. |
| Year | The vehicle's year of manufacture. |
| Fuel / drivetrain | The correct vehicle type; see below. |
| Engine capacity | Combustion engine capacity. Hidden for electric vehicles. |
| Initial odometer reading | The starting point of the history recorded in the app. |
| Registration number | A number that helps distinguish vehicles. |
| Cost currency | The currency used to label prices and costs. |

### Selecting a drivetrain

| Type | How to record entries |
| --- | --- |
| Petrol, diesel, LPG | Refuelling: litres and price per litre. |
| Hybrid (HEV) | A conventional hybrid without plug-in charging. Record refuelling. |
| Plug-in hybrid (PHEV) | Record refuelling, charging or both in a single entry. |
| Electric | Charging: kWh and price per kWh. No engine capacity or new refuelling entries. |

If the generic “Hybrid” option was selected previously, edit the vehicle to specify HEV or PHEV. The app does not choose automatically and preserves the history.

### Multiple vehicles

Check the selected vehicle on the home screen before adding an entry. History and reports belong to a specific vehicle. Switch vehicles in the vehicle section of the home screen; vehicle management is also available under **Settings > Vehicles**.

**Warning:** deleting a vehicle also deletes its entries. Make a backup before deleting it.

## 3. An entry without refuelling or charging

1. Select the correct vehicle.
2. Enter the new value in **Current odometer**.
3. Leave **Refueling: No** and, where available, **Charging: No** selected.
4. Save the entry.

The app calculates the difference from the previous reading. For the first entry, the vehicle's initial reading is the reference point.

**Example:** previous reading 148,000 km, new reading 148,125 km. The recorded distance is **125 km**.

The new reading must be higher than the previous one. This version does not allow another entry with an identical odometer reading. The date and time are assigned automatically when saving; the form does not support backdating an entry.

You can record entries daily or only when refuelling or charging. Less frequent entries produce a less detailed driving history.

## 4. Refuelling

For a combustion-engine vehicle, HEV or PHEV:

1. Enter the current odometer reading.
2. Select **Refueling: Yes**.
3. Set **Full tank: Yes** or **No** according to the actual refuelling.
4. Enter the number of litres added.
5. Enter the price of **one litre** in the vehicle's selected currency.
6. Save the entry.

Use either a comma or a dot as the decimal separator, for example `41,27` or `41.27`.

**Do not enter the receipt total.** The app calculates the cost from litres and price per litre. Coffee, food or washer fluid purchases must not be included in the fuel price.

### What does “Full tank” mean?

Select “Yes” if the tank is full after refuelling. The tank does not need to have been empty beforehand, and the low-fuel warning does not need to have been on.

For comparable results, fill to a consistent level in accordance with the vehicle's and pump's instructions. Do not force extra fuel into the tank to reach a particular number of litres.

### How is fuel consumption calculated?

Two refuelling entries marked **full tank** are required. The app divides the sum of litres added after the first full tank, including the next full tank, by the distance travelled between them.

**Fuel consumption [l/100 km] = litres added ÷ distance [km] × 100**

Example:

| Event | Odometer | Fuel added | Full tank |
| --- | --- | --- | --- |
| Start of measurement | 100,000 km | 35 l | Yes |
| Partial refuelling | 100,300 km | 15 l | No |
| End of measurement | 100,600 km | 30 l | Yes |

Result: `(15 + 30) ÷ 600 × 100 = 7.5 l/100 km`.

The initial 35 l are excluded. The first full tank establishes the start of the measurement.

The result appears on the entry that completes the measurement: the next full tank. Partial refuellings contribute to the total but do not complete the measurement. Daily odometer-only entries do not interrupt it.

Without suitable full-tank entries, a dash may appear instead of a result. Entering litres alone is insufficient. Older entries without full-tank information are not automatically treated as full tanks.

**Important distinction:** the distance between two refuellings may differ from the distance of the complete consumption measurement, which can include partial refuellings.

## 5. Charging an electric vehicle or plug-in hybrid

1. Select an electric vehicle or PHEV.
2. Enter the current odometer reading.
3. Select **Charging: Yes**.
4. Enter the energy delivered in **kWh**, for example `23.456`.
5. Enter the price of **one kWh** in the vehicle's currency.
6. Save the entry.

For free charging, enter a price of **0**. The energy quantity must be greater than zero. Do not enter the battery percentage, charger power in kW or battery capacity in this field.

For a PHEV, select both refuelling and charging and enter both quantities and unit prices. This also lets you record both events at the same odometer reading.

History shows the kWh delivered and, from the second charging entry onwards, the distance between charges. This is the difference between odometer readings, not the vehicle's stated electric range.

### What does the app currently not calculate?

The app does not calculate **kWh/100 km** or **electricity cost per 100 km**. It does not record the battery energy balance at the beginning and end of a section. Energy delivered during charging is therefore not automatically treated as energy consumed over the recorded distance.

For a PHEV, distance includes all driving. Fuel consumption refers to the total distance between the relevant refuellings, rather than only distance driven using the combustion engine. The app does not separate electric and combustion-engine kilometres.

Historical data recorded in litres are not converted into kWh when changing the vehicle type.

## 6. Reading the home screen

| Element | Meaning |
| --- | --- |
| Odometer | The last saved odometer reading, not the distance recorded by the app. |
| Entries | Number of saved entries for the selected vehicle. |
| Consumption | Average of the available fuel-consumption results from completed measurements. Not a reading from the vehicle's trip computer. |
| Energy — electric vehicles | Sum of recorded kWh, not energy consumption per 100 km. |
| History | Individual entries, newest first, with distance and refuelling or charging details. |

Costs are not displayed directly in the history. They are available in exported reports.

## 7. Editing and deleting entries

On the home screen, open an entry's menu in the history and select edit or delete. Entries are editable only if **both conditions** are met:

- they were created today according to the phone's local date;
- they are among the vehicle's 10 most recent entries.

This is not a rolling 24-hour period. An entry saved at 23:50 no longer meets the “today” condition the next day. If you save more than 10 entries for a vehicle in one day, the oldest also become unavailable for editing.

A padlock means editing and deletion are unavailable. Entries in the reports screen are read-only; return to the home screen to make corrections.

When changing an odometer reading, the app checks it against neighbouring entries. Editing or deleting recalculates related distances and fuel consumption. Deletion requires confirmation.

**Always check your data before saving.** A backup restores the complete data set; it does not unlock individual entries.

## 8. PDF and CSV reports

1. Select the correct vehicle.
2. Open **Settings > Reports** or the reports button beside the history.
3. Choose a start and end date or select **All entries**.
4. Check the summary and list of entries.
5. Select CSV export or PDF report.
6. In the system sharing dialog, choose the app or location where you want to keep the file.

Both selected dates are included. If the period contains no entries, no report with data is generated.

**PDF** provides a readable overview for viewing and sharing. **CSV** is for further processing in a spreadsheet. In this version, CSV column headings are in Polish and columns are separated by semicolons.

Reports include data appropriate to the vehicle:

- odometer readings and distances;
- litres, prices per litre, full-tank status and available fuel-consumption results;
- fuel costs and fuel cost per 100 km for correctly completed measurements with complete price information;
- kWh, prices per kWh and charging costs;
- for PHEVs, separate fuel and charging details plus the combined purchase costs.

Fuel purchase cost is **litres × price per litre**; charging cost is **kWh × price per kWh**. Fuel cost per 100 km excludes charging, servicing, insurance and other vehicle expenses. Dividing all fuel purchases by an arbitrary distance will not necessarily reproduce the result of a completed full-tank measurement.

Missing prices in older data mean cost information is incomplete. Totals of known costs cannot then confirm the full expenditure.

**Period boundaries:** dates filter entries rather than actual driving times. The section assigned to the first report entry may start before the selected start date. The app does not track routes using GPS or split driving exactly at day or month boundaries.

## 9. Currency

Select the currency in the vehicle form. Available currencies:

| Currency | Code | Symbol |
| --- | --- | --- |
| Euro | EUR | € |
| Polish zloty | PLN | zł |
| US dollar | USD | $ |
| Pound sterling | GBP | £ |
| Swiss franc | CHF | CHF |
| Czech koruna | CZK | Kč |

You can change the currency later by editing the vehicle. **Changing currency does not convert amounts using exchange rates.** It also relabels that vehicle's previous prices and costs.

If your history uses EUR, enter prices in EUR. If you pay in another currency, convert the unit price to the vehicle's currency yourself before entering it. The app does not retrieve exchange rates or store a separate currency for each refuelling or charge.

Changing the currency does not close an accounting period or automatically generate a report.

## 10. Backup and restore

### Saving a backup

1. Open **Settings > Backup**.
2. Select **Save backup**.
3. Choose a location in the system dialog and save the `.json` file.
4. Check the confirmation message.
5. Also keep the file outside the phone, for example on your computer or in a file-storage location of your choice.

Backups contain vehicles and their histories, including fuel and charging data. They are not encrypted and may contain registration numbers and vehicle-use information. Share them carefully.

Back up regularly, especially before updating, changing phones, restoring data or deleting a vehicle. Do not assume the app automatically synchronises history with the cloud.

### Restoring a backup

1. Back up your current data first.
2. Select **Settings > Backup > Restore backup**.
3. Choose a Fahrtenbuch backup file.
4. Check the backup date and the number of vehicles and entries in the confirmation dialog.
5. Confirm only if you want to replace your current data.

**Restoring replaces the entire current set of vehicles and entries. It does not merge two histories.** Newer entries missing from the selected backup will not be retained in the restored set.

Version 1.8.0 also supports older format-1 backups. Backups containing new charging data use format 2; older apps may not support them. Do not edit a backup file manually. Invalid, unsupported or oversized files are not restored; the size limit is 10 MiB.

**A report is not a backup.** PDF and CSV files cannot restore history in the app.

## 11. Language and appearance

### Language

Open **Settings > Language** and select Polish, English or German. Changing the language does not convert amounts or change the vehicle's currency.

### Theme

Under **Settings > Appearance**, choose:

- **Follow system** — light or dark mode follows the phone setting;
- **Light** — the app remains light;
- **Dark** — the app remains dark.

The **System colors** switch controls the palette independently of brightness. When enabled, it uses the phone's system accent on Android 12 or later. When disabled, the base blue palette is used. The app also uses blue if no system accent is available.

By default, the app follows system brightness and system colours are enabled. Appearance preferences are saved.

## 12. Home-screen widget

1. Touch and hold an empty area of the phone's home screen.
2. Open the widget list and find Fahrtenbuch.
3. Place the widget on the home screen. It is intended for approximately **3 columns × 1 row**; the actual size depends on the phone's launcher.
4. Tap the widget or its button to open the app's entry form.
5. Check the vehicle, enter the odometer reading and save.

The widget is a shortcut to the form, not a separate field for saving readings without opening the app. Its brightness and, on supported Android versions, accent follow the phone's system settings.

## 13. Updates and data safety

Before installing a new version, save a `.json` backup outside the app. If the installer allows an update, use it instead of uninstalling.

Uninstalling the app or clearing its data may delete the local history. Keeping the APK alone does not protect vehicles and entries. When moving to a release from a different source, do not assume the installer will preserve data; make sure a backup is available first.

Do not change the phone's date to try to bypass editing restrictions. Dates affect history, reports and entry-editing availability.

## 14. Frequently asked questions

**Why is there no fuel-consumption result even though I entered litres?**

Check for two suitable full-tank entries. The first starts the measurement; the next completes it. Missing full-tank information in older entries is not filled in automatically.

**Must I wait for the low-fuel warning before refuelling?**

No. What matters is a comparable full level after the refuellings that define the measurement, not whether the warning was on beforehand.

**Why does it show 148,501 km when I have not driven that far with the app?**

This is the vehicle's odometer reading. Reports show the distance recorded for a selected period.

**Why does an entry have a padlock?**

It was not created today or is no longer among the vehicle's 10 most recent entries. All entries in the reports screen are read-only.

**Where are the costs?**

In exported PDF or CSV files. They are not displayed directly beside history records.

**Can I record free charging?**

Yes. Enter a positive kWh quantity and a price per kWh of 0.

**Will changing PLN to EUR convert old amounts?**

No. It changes their label without converting their value.

**Is a PDF enough to transfer data to a new phone?**

No. Restoring requires a `.json` backup file.

## 15. App information

Under **Settings > About the creator**, you will find the installed version number and links to the developer's website and privacy policy.

- Developer's website: https://mtelektronik.github.io/en/
- Privacy policy: https://mtelektronik.github.io/en/fahrtenbuch-privacy.html

---

This guide describes the existing behaviour of version 1.8.0, not planned features. If you find an unclear instruction, contact the developer and include the installed app version.
