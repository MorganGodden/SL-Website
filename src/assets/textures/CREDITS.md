# Block textures

`blocks.png` is a texture atlas baked from the **Pixel Perfection** Minecraft
resource pack, by **XSSheep**, continued for current game versions by
**Nova_Wostra**.

- Source: <https://www.curseforge.com/minecraft/texture-packs/pixel-perfection-freshly-updated>
- Build used: `Pixel Perfection 26.3-97.1.zip`
  (<https://mediafilez.forgecdn.net/files/8894/871/Pixel%20Perfection%2026.3-97.1.zip>)
- The pack is published for free use; it is credited here and on the board
  itself, in the corner of the plot scene.

## What is in the atlas

Every block texture the pack ships, as 16x16 tiles in a grid, reworked for a
web renderer. The board draws whatever a builder places, so the atlas carries
the whole `block/` folder rather than a chosen few: anything narrower leaves a
newly placed block drawn as a flat colour.

Each tile is padded with a copy of its own edge pixels so that neighbouring
tiles cannot bleed into each other at a distance, biome-tinted textures (grass,
leaves, water) have their tint baked in, animated textures are reduced to their
first frame, and textures on blocks the board treats as solid are composited
onto an opaque background.

No other part of the pack is redistributed here, and the pack itself is not
checked in.

## Rebuilding

Download the pack, then:

```sh
npm run build:block-atlas -- ~/Downloads/'Pixel Perfection 26.3-97.1.zip'
```

Either the `.zip` or an unpacked pack folder works. That rewrites both
`blocks.png` and `src/plots/blockAtlas.generated.ts`, which are committed
together — the table indexes into the image, so one is meaningless without the
other. Which blocks are baked, and which textures each face uses, is in
`scripts/lib/blockTextures.mjs`.

Swapping in a different pack is the same command with a different archive: the
spec is written against vanilla texture names, which any pack that replaces
vanilla textures follows.
