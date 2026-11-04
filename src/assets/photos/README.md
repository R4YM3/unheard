# Foto's

Zet hier een bestand neer met de naam van een fotoplek, en de foto verschijnt vanzelf op de
site. Astro verkleint en converteert hem tijdens het bouwen. Zonder bestand laat de site op
die plek niets zien.

| Bestandsnaam (jpg, png, webp of avif) | Waar                       | Verhouding |
| ------------------------------------- | -------------------------- | ---------- |
| `home.webp`                           | Homepage, naast de kop     | 4:5 staand |
| `mijn-verhaal.webp`                   | Mijn verhaal, naast de kop | 4:5 staand |
| `wat-voel-ik.webp`                    | Wat voel ik?, naast de kop | 4:5 staand |
| `herstel.webp`                        | Herstel, naast de kop      | 4:5 staand |
| `hulp-vinden.webp`                    | Hulp vinden, naast de kop  | 4:5 staand |

Gebruik minstens 1200 × 1500 pixels. De alt-teksten staan in `src/lib/photos.ts`; pas ze aan
als je foto er anders uitziet.

## Prompts

Plak achter elke prompt dezelfde stijlregel, zodat de foto's samen één serie vormen:

> documentary photograph, natural window light, quiet and calm mood, muted sage green and warm
> beige tones, soft shadows, shallow depth of field, 35mm film look with subtle grain, Dutch home
> interior, no faces visible, no text, no logos, portrait orientation 4:5

1. **home:** close-up of a man's hands holding a ceramic mug of coffee at a wooden kitchen
   table, early morning, a folded letter beside the mug
2. **mijn-verhaal:** a man in a dark jacket walking alone on a forest path seen from behind,
   overcast autumn day, wet leaves, mist between the trees
3. **wat-voel-ik:** a smartphone lying face down on a wooden table next to a set of keys and a
   half-empty glass of water, evening lamp light
4. **herstel:** an open window with a linen curtain moving slightly, a small green plant on the
   sill, soft morning light falling into a quiet room
5. **hulp-vinden:** two people sitting across from each other at a small table, only their
   hands and two cups of tea visible, one hand resting calmly on the table

## Afspraken

- De footer meldt automatisch dat de foto's met AI zijn gemaakt, zodra er één foto staat.
- Laat geen portret van de oprichter genereren. Een gezicht bij het verhaal is een echte foto,
  of geen foto.
- Controleer handen, vingers en details voordat je een foto toevoegt.
