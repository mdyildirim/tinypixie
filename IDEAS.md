# Pixie — to-do ideas

A scratchpad for things we might add later. Nothing here is committed; it's a
place to park sparks so they don't get lost. Keep ideas in the spirit of Pixie:
wordless, gentle, no scores, no guilt — delights that reward time spent together.

## Ideas still on the bench

- **Constellation visits** — she drifts up and nuzzles a star you drew, humming
  its hue. Uses the existing `save.stars`.
- **Bedtime ritual** — real-clock late night: a moon rises, more yawns, she
  settles asleep curled in your last arc.

## Done / shipped

- **Draw-an-arc → a rainbow in the sky** (this version): draw a wide upward arch
  and the gesture is recognised (`classifyShape` → `'arc'`) and bloomed into a
  full rainbow that fans out concentrically from the line you drew, painting on
  like an arc of light and lingering ~6s before it fades. Only blooms when a
  rainbow pen is active (gated on `c.rainbow || c.golden` in `bloomCast`); with
  the plain pen an arch just draws normally. With the rainbow pen it's
  full-spectrum ROYGBIV (red outside); with the golden pen it's a warm, sparkly
  golden rainbow that keeps shedding sparkle dust. Pixie flies up to its apex.
  See `bloomRainbow` / `spawnRainbow` / `drawRainbows`.
- **Golden rainbow** (this version): a gentle, *per-session* reward — not a
  permanent unlock. Every visit starts without it; once you've played
  `GOLDEN_SECONDS` (~4 min, counting only time she's awake, so wandering off
  pauses the clock) the button quietly fades in with a soft golden shimmer.
  Nothing is persisted, so it's earned fresh each visit. The pen draws a warm
  gold/amber shimmering
  ribbon (additive, so it glows brightest against the night sky), with a richer
  struck-bell voice (added fifth + octave, long reverb tail). Mutually exclusive
  with the rainbow pen. `goldenNote` / golden branch in `drawPolyline`.
- **Spontaneous antics** (this version): when she's awake, content, and you've
  paused a moment, she entertains herself — a loop-the-loop, a sparkle sneeze
  (`sneezeChime`), a little dart-and-return chase, or a twirl that flings out a
  ring of stars. Throttled with a randomised cooldown so it never feels canned.
  See `doAntic` + the antic trigger in `update`.

- **Rainbow pen** (this version): toggle button below the sound button; while on,
  the line you draw is rendered as a true full-spectrum rainbow (hue rolls along
  the path, so an arc becomes a rainbow), the sparkles match, and it stays a
  rainbow when Pixie traces it back (the "cast"). Comes with a dreamier "lydian
  shimmer" pen voice and a rainbow-sparkle burst + rising chime when switched on.
