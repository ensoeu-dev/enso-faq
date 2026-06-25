/* GENERATED FILE — do not edit by hand.
   Source: data/troubleshooting-master.xlsx
   Rebuild: .venv/bin/python scripts/import_troubleshooting.py */
window.ENSO_TROUBLESHOOTING = {
  "generatedAt": "2026-06-25",
  "categories": [
    "Power & startup",
    "Charging",
    "Heating chamber",
    "Sound",
    "LED",
    "Water",
    "Cosmetic",
    "Air leak",
    "Parts & packaging"
  ],
  "issues": [
    {
      "id": "POW-01",
      "category": "Power & startup",
      "issue": "Device does not turn on",
      "checks": [
        {
          "question": "Is the battery protection sheet still inside the battery compartment?",
          "options": [
            {
              "label": "It is still inside",
              "guidance": "Remove the protection sheet from the battery compartment, then try turning the device on again.",
              "outcome": "next",
              "evidence": "",
              "images": [
                {
                  "dark": "assets/manual/battery-remove.png",
                  "light": "assets/manual/battery-remove-ink.png"
                }
              ]
            }
          ],
          "images": [
            {
              "dark": "assets/manual/battery-remove.png",
              "light": "assets/manual/battery-remove-ink.png"
            }
          ]
        },
        {
          "question": "Is the battery fully charged?",
          "options": [
            {
              "label": "Not fully charged",
              "guidance": "Charge the battery fully (about 1h45m over USB-C), then try again. Use a 30W PD charger (minimum) for a steady top-up, and watch the four LEDs climb to full. For a complete charge, leave the battery on for at least 1 hour 45 minutes even once the LEDs read full.",
              "outcome": "next",
              "evidence": "",
              "images": [
                {
                  "dark": "assets/manual/step-charge.png",
                  "light": "assets/manual/step-charge-ink.png"
                }
              ]
            }
          ],
          "images": [
            {
              "dark": "assets/manual/step-charge.png",
              "light": "assets/manual/step-charge-ink.png"
            }
          ]
        },
        {
          "question": "With the sheet removed and a full charge, does it now turn on?",
          "options": [
            {
              "label": "Yes, it turns on",
              "guidance": "Great — it was a setup issue. You're good to go.",
              "outcome": "solved",
              "evidence": ""
            },
            {
              "label": "No, still does not turn on",
              "guidance": "It looks like this one needs our team. Let's get you to support.",
              "outcome": "support",
              "evidence": "A short video showing the device not powering on (sheet removed, battery charged)."
            }
          ]
        }
      ]
    },
    {
      "id": "POW-04",
      "category": "Power & startup",
      "issue": "3 (red) flashes on power-on",
      "checks": [
        {
          "question": "Does the LED flash red three times after power-on, or after the pre-heat cycle?",
          "options": [
            {
              "label": "Yes, three red flashes",
              "guidance": "That's a fault our team needs to handle — let's get you to support.",
              "outcome": "support",
              "evidence": "A short video clearly showing the three red flashes (after power-on or after the pre-heat cycle)."
            }
          ]
        }
      ]
    },
    {
      "id": "POW-03",
      "category": "Power & startup",
      "issue": "7 (red) flashes on power-on",
      "checks": [
        {
          "question": "Seven flashes is overheating protection. If you're using it while charging, is the battery above 50%?",
          "options": [
            {
              "label": "Below 50% while used on USB",
              "guidance": "Charge above 50% before using it on the cable, then try again.",
              "outcome": "next",
              "evidence": "",
              "images": [
                {
                  "dark": "assets/manual/step-charge.png",
                  "light": "assets/manual/step-charge-ink.png"
                }
              ]
            }
          ],
          "images": [
            {
              "dark": "assets/manual/step-charge.png",
              "light": "assets/manual/step-charge-ink.png"
            }
          ]
        },
        {
          "question": "Above 50% and on the cable, does the 7-flash still appear?",
          "options": [
            {
              "label": "No, it's gone",
              "guidance": "Sorted — it was the low charge while plugged in.",
              "outcome": "solved",
              "evidence": "A short video showing the 10-flash pattern with a fully charged battery."
            },
            {
              "label": "Yes, it still appears",
              "guidance": "Remove the battery and let the device rest for about 30 minutes, then try again.",
              "outcome": "next",
              "evidence": "",
              "images": [
                {
                  "dark": "assets/manual/battery-remove.png",
                  "light": "assets/manual/battery-remove-ink.png"
                }
              ]
            }
          ]
        },
        {
          "question": "After the 30-minute cooldown, does the 7-flash still appear?",
          "options": [
            {
              "label": "No, it's gone",
              "guidance": "All good — it was temporary overheating.",
              "outcome": "solved",
              "evidence": ""
            },
            {
              "label": "Yes, it still appears",
              "guidance": "Let's get you to support to arrange the next step.",
              "outcome": "support",
              "evidence": "A short video showing the 7-flash after cooldown with battery above 50%."
            }
          ]
        }
      ]
    },
    {
      "id": "POW-02",
      "category": "Power & startup",
      "issue": "10 (red) flashes on power-on",
      "checks": [
        {
          "question": "Ten flashes means low battery. Is the battery fully charged?",
          "options": [
            {
              "label": "Not fully charged",
              "guidance": "Charge the battery fully (about 1h45m over USB-C), then try again. Use a 30W PD charger (minimum) for a steady top-up, and watch the four LEDs climb to full. For a complete charge, leave the battery on for at least 1 hour 45 minutes even once the LEDs read full.",
              "outcome": "next",
              "evidence": "",
              "images": [
                {
                  "dark": "assets/manual/step-charge.png",
                  "light": "assets/manual/step-charge-ink.png"
                }
              ]
            }
          ],
          "images": [
            {
              "dark": "assets/manual/step-charge.png",
              "light": "assets/manual/step-charge-ink.png"
            }
          ]
        },
        {
          "question": "After a full charge, does it turn on normally?",
          "options": [
            {
              "label": "Yes, it turns on",
              "guidance": "All set — it was just a low battery.",
              "outcome": "solved",
              "evidence": "A short video showing the 7-flash after cooldown with battery above 50%."
            },
            {
              "label": "No, still 10 flashes and won't turn on",
              "guidance": "Let's get you to support so we can take a closer look.",
              "outcome": "support",
              "evidence": "A short video showing the 10-flash pattern with a fully charged battery."
            }
          ]
        }
      ]
    },
    {
      "id": "CHG-01",
      "category": "Charging",
      "issue": "Does not charge over USB",
      "checks": [
        {
          "question": "Is the battery protection sheet still inside?",
          "options": [
            {
              "label": "It is still inside",
              "guidance": "Remove the protection sheet, then try charging again.",
              "outcome": "next",
              "evidence": "",
              "images": [
                {
                  "dark": "assets/manual/battery-remove.png",
                  "light": "assets/manual/battery-remove-ink.png"
                }
              ]
            }
          ],
          "images": [
            {
              "dark": "assets/manual/battery-remove.png",
              "light": "assets/manual/battery-remove-ink.png"
            }
          ]
        },
        {
          "question": "Does a different USB cable charge it?",
          "options": [
            {
              "label": "Yes, another cable works",
              "guidance": "It was a faulty cable — you're all set.",
              "outcome": "solved",
              "evidence": "A clear photo of the USB port and a short video of the charging attempt."
            }
          ]
        },
        {
          "question": "Is the USB port visibly damaged, or does it still not charge with a known-good cable?",
          "options": [
            {
              "label": "Port looks damaged, or still won't charge",
              "guidance": "Let's get you to support so we can sort the charging out.",
              "outcome": "support",
              "evidence": "A clear photo of the USB port and a short video of the charging attempt."
            }
          ]
        }
      ]
    },
    {
      "id": "CHM-01",
      "category": "Heating chamber",
      "issue": "Heating chamber moves",
      "checks": [
        {
          "question": "Gently touch the ceramic chamber. Is there only a slight left-right wobble / movement?",
          "options": [
            {
              "label": "Slight wobble / movement only",
              "guidance": "That slight movement is normal — it's within the design tolerance and isn't a fault.",
              "outcome": "solved",
              "evidence": "A short video showing the chamber collapsing or rotating freely."
            }
          ]
        },
        {
          "question": "Does the chamber collapse, or spin/rotate freely and excessively? (Do not try to move it with force when testing)",
          "options": [
            {
              "label": "Yes, it collapses or spins freely",
              "guidance": "That's not expected — let's get you to support.",
              "outcome": "support",
              "evidence": "A short video showing the chamber collapsing or rotating freely."
            }
          ]
        }
      ]
    },
    {
      "id": "SND-01",
      "category": "Sound",
      "issue": "No sound / speaker",
      "checks": [
        {
          "question": "Is mute mode switched on? Sounds are off while muted.",
          "options": [
            {
              "label": "Mute mode is on",
              "guidance": "Turn mute mode off — sound notifications are disabled while it's active.",
              "outcome": "next",
              "evidence": ""
            }
          ]
        },
        {
          "question": "With sound enabled before power-on, do you hear a sound when it powers on?",
          "options": [
            {
              "label": "Yes, there's a sound",
              "guidance": "The speaker is working normally — you're all set.",
              "outcome": "solved",
              "evidence": "A short video showing no sound on power-on with sound enabled."
            }
          ]
        },
        {
          "question": "With sound enabled, is there no sound at all on power-on or status change?",
          "options": [
            {
              "label": "No sound at all",
              "guidance": "Let's get you to support to look into the speaker.",
              "outcome": "support",
              "evidence": "A short video showing no sound on power-on with sound enabled."
            }
          ]
        }
      ]
    },
    {
      "id": "LED-01",
      "category": "LED",
      "issue": "LED color / behaviour",
      "checks": [
        {
          "question": "Does the LED move when you adjust the temperature? The higher the setting, the closer the LED strips sit to the middle.",
          "options": [
            {
              "label": "No, it doesn't change",
              "guidance": "Let's get you to support — we'll take a look at the LED.",
              "outcome": "support",
              "evidence": "A short video showing the LED not changing as you adjust temperature."
            }
          ],
          "images": [
            {
              "dark": "assets/manual/dial-turn.png",
              "light": "assets/manual/dial-turn-ink.png",
              "scale": 0.6
            },
            {
              "dark": "assets/manual/led-temp.png",
              "light": "assets/manual/led-temp-ink.png"
            }
          ]
        },
        {
          "question": "After turning on, with a battery charged, do the colors change by themselves?",
          "options": [
            {
              "label": "Yes, they change on their own",
              "guidance": "That's not expected — let's get you to support.",
              "outcome": "support",
              "evidence": "A short video showing the colors changing on their own."
            }
          ]
        },
        {
          "question": "Is the color-mixing only during power-off (often when the battery is low), and normal after a restart?",
          "options": [
            {
              "label": "Yes, only at power-off and fine after restart",
              "guidance": "That's normal when the battery is low and doesn't affect use — nothing to worry about.",
              "outcome": "solved",
              "evidence": "A short video showing the continuous leakage from the body."
            }
          ]
        }
      ]
    },
    {
      "id": "WTR-01",
      "category": "Water",
      "issue": "Water leaking from the body",
      "checks": [
        {
          "question": "Is water continuously leaking from the device body during normal use?",
          "options": [
            {
              "label": "Yes, continuous leakage",
              "guidance": "That's not expected — let's get you to support.",
              "outcome": "support",
              "evidence": "A short video showing the continuous leakage from the body."
            }
          ]
        },
        {
          "question": "Is it only small droplets inside, with no continuous flow?",
          "options": [
            {
              "label": "Only small droplets, no flow",
              "guidance": "That's most likely normal condensation rather than a leak — see the condensation guidance below.",
              "outcome": "solved",
              "evidence": ""
            }
          ]
        }
      ]
    },
    {
      "id": "WTR-02",
      "category": "Water",
      "issue": "Small droplets inside (condensation)",
      "checks": [
        {
          "question": "Are there only small droplets inside during or after use?",
          "options": [
            {
              "label": "Yes, small droplets",
              "guidance": "Warm vapor condenses into droplets when it meets cooler surfaces. This is normal and not a fault.",
              "outcome": "solved",
              "evidence": ""
            }
          ]
        },
        {
          "question": "Is there no continuous water flow or body leakage?",
          "options": [
            {
              "label": "No continuous flow",
              "guidance": "This is normal condensation, not a defect — nothing to worry about.",
              "outcome": "solved",
              "evidence": "Clear photos (and a short video if possible) showing the damage, and whether it was before or after first use."
            }
          ]
        }
      ]
    },
    {
      "id": "COS-01",
      "category": "Cosmetic",
      "issue": "Scratches / cosmetic damage",
      "checks": [
        {
          "question": "Cosmetic concerns are handled case by case by our team.",
          "options": [
            {
              "label": "Any cosmetic damage or scratch",
              "guidance": "If you notice cosmetic damage after unpacking, please don't use the device — contact support first and we'll look at it with you.",
              "outcome": "support",
              "evidence": "Clear photos (and a short video if possible) showing the damage, and whether it was before or after first use."
            }
          ]
        }
      ]
    },
    {
      "id": "CHM-02",
      "category": "Heating chamber",
      "issue": "Heating chamber cracked or broken",
      "checks": [
        {
          "question": "Is there a visible crack or break in the heating chamber?",
          "options": [
            {
              "label": "Yes, a visible crack or break",
              "guidance": "That needs our team to take a look — let's get you to support.",
              "outcome": "support",
              "evidence": "A clear photo or short video showing the crack or break in the heating chamber."
            }
          ]
        }
      ]
    },
    {
      "id": "CHM-03",
      "category": "Heating chamber",
      "issue": "Powers on but no heat",
      "checks": [
        {
          "question": "Does the device power on but produce no heat at all during use?",
          "options": [
            {
              "label": "Yes, it powers on but doesn't heat",
              "guidance": "Let's get you to support so we can look into the heating.",
              "outcome": "support",
              "evidence": "A short video showing the device powered on but producing no heat during use."
            }
          ]
        }
      ]
    },
    {
      "id": "CHM-04",
      "category": "Heating chamber",
      "issue": "Ceramic cup doesn't fit the chamber",
      "checks": [
        {
          "question": "Does the ceramic cup fail to fit correctly into the heating chamber?",
          "options": [
            {
              "label": "Yes, the cup doesn't fit properly",
              "guidance": "Let's get you to support — this usually starts with a set of replacement cups.",
              "outcome": "support",
              "evidence": "A short video showing the cup not fitting correctly into the heating chamber."
            }
          ]
        }
      ]
    },
    {
      "id": "AIR-01",
      "category": "Air leak",
      "issue": "Air escapes from the device body",
      "checks": [
        {
          "question": "Is there a visible gap between the glass water tank and the device connection?",
          "options": [
            {
              "label": "Yes, there's a visible gap",
              "guidance": "Reseat the glass water tank firmly so it sits flush against the device, then retest.",
              "outcome": "next",
              "evidence": "",
              "images": [
                {
                  "dark": "assets/manual/tank-seat.png",
                  "light": "assets/manual/tank-seat-ink.png"
                }
              ]
            }
          ],
          "images": [
            {
              "dark": "assets/manual/tank-seat.png",
              "light": "assets/manual/tank-seat-ink.png"
            }
          ]
        },
        {
          "question": "After reseating the tank, does smoke still escape from the body instead of the valves?",
          "options": [
            {
              "label": "No, reseating fixed it",
              "guidance": "Great — it just needed a firm reseat.",
              "outcome": "solved",
              "evidence": ""
            },
            {
              "label": "Yes, it still escapes",
              "guidance": "Let's get you to support.",
              "outcome": "support",
              "evidence": "A short video showing smoke escaping from the body, with the correct water level and no bubbling when you inhale."
            }
          ]
        }
      ]
    },
    {
      "id": "PKG-01",
      "category": "Parts & packaging",
      "issue": "Damaged gift box",
      "checks": [
        {
          "question": "Is there visible damage to the ENSŌ gift box, noticed after unboxing?",
          "options": [
            {
              "label": "Yes, the gift box is damaged",
              "guidance": "Let's get you to support to sort a replacement.",
              "outcome": "support",
              "evidence": "A clear photo or short video showing the damage to the gift box."
            }
          ]
        }
      ]
    },
    {
      "id": "PKG-02",
      "category": "Parts & packaging",
      "issue": "Cracked or broken water tank",
      "checks": [
        {
          "question": "Is there a crack or visible damage on the glass water tank, noticed after unboxing?",
          "options": [
            {
              "label": "Yes, the water tank is cracked or damaged",
              "guidance": "Let's get you to support to arrange a replacement tank.",
              "outcome": "support",
              "evidence": "A clear photo or short video showing the crack or damage on the glass water tank."
            }
          ]
        }
      ]
    },
    {
      "id": "PKG-03",
      "category": "Parts & packaging",
      "issue": "Rusty or broken mouthpiece",
      "checks": [
        {
          "question": "Is there rust or visible damage on the mouthpiece?",
          "options": [
            {
              "label": "Yes, the mouthpiece is rusty or damaged",
              "guidance": "Let's get you to support to arrange a replacement mouthpiece.",
              "outcome": "support",
              "evidence": "A clear photo or short video showing the rust or damage on the mouthpiece."
            }
          ]
        }
      ]
    }
  ]
};
