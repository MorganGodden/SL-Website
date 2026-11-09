/**
 * GENERATED FILE - do not edit.
 *
 * Written by `npm run build:modpack` from the exported .mrpack, with names,
 * blurbs and icons from Modrinth. Regenerate rather than patch.
 */

export interface ModpackEntry {
  kind: 'shader' | 'resourcepack' | 'mod'
  title: string
  description: string
  /** Modrinth's icon; null for a file carried inside the pack. */
  icon: string | null
  /** The Modrinth page; null for a file carried inside the pack. */
  url: string | null
  /** There for other mods to use, with nothing of its own to see. */
  library: boolean
  /** Resource packs and shaders only: switched on in a fresh instance. */
  on?: boolean
}

export interface Modpack {
  name: string
  version: string
  minecraft: string
  loader: string | null
  /** Its name in public/. */
  file: string
  icon: string | null
  entries: ModpackEntry[]
}

export const MODPACK: Modpack = {
  "name": "Snow Leagues 1",
  "version": "1.0.0",
  "minecraft": "26.3",
  "loader": "Fabric 0.20.1",
  "file": "snow-leagues-1.mrpack",
  "icon": "data:image/png;base64,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",
  "entries": [
    {
      "kind": "shader",
      "title": "I Like Vanilla",
      "description": "A shader that improves minecraft's style instead of replacing it",
      "icon": "https://cdn.modrinth.com/data/DoODk4HD/5b4af5f29752b405d5e2244d3757551ef323cdbd_96.webp",
      "url": "https://modrinth.com/shader/i-like-vanilla",
      "library": false,
      "on": true
    },
    {
      "kind": "resourcepack",
      "title": "A Good Place Sample Pack",
      "description": "Carried inside the pack.",
      "icon": null,
      "url": null,
      "library": false,
      "on": false
    },
    {
      "kind": "resourcepack",
      "title": "Hyper Punchy",
      "description": "Hyper Punchy is a animation feature for punchy",
      "icon": "https://cdn.modrinth.com/data/NVBMhec4/1f130dc6f8d5d61034f5f2cd00eb9b9efd75a100_96.webp",
      "url": "https://modrinth.com/resourcepack/hyper-punchy",
      "library": false,
      "on": true
    },
    {
      "kind": "resourcepack",
      "title": "Simple Grass Flowers",
      "description": "Gives Grass, Podzol, Mycelium, Crimson Nylium, and Warped Nylium vanilla-friendly flowers, clovers, and rocks!",
      "icon": "https://cdn.modrinth.com/data/ti9KkMHm/3d335c25a18ca44c7c2dd449eab25a7de82016eb.gif",
      "url": "https://modrinth.com/resourcepack/simple-grass-flowers",
      "library": false,
      "on": true
    },
    {
      "kind": "mod",
      "title": "3D Skin Layers",
      "description": "Render the player skin layer in 3d!",
      "icon": "https://cdn.modrinth.com/data/zV5r3pPn/ff7010d4ec0275609866c8b0f603b25e25949c08_96.webp",
      "url": "https://modrinth.com/mod/3dskinlayers",
      "library": false
    },
    {
      "kind": "mod",
      "title": "A Good Place",
      "description": "A mod that adds placement animations to blocks",
      "icon": "https://cdn.modrinth.com/data/BwPeriwJ/14d853d0b21c0d37b926497237fb396e14a8a6cf_96.webp",
      "url": "https://modrinth.com/mod/a-good-place",
      "library": false
    },
    {
      "kind": "mod",
      "title": "BetterF3",
      "description": "BetterF3 is a mod that replaces Minecraft's original debug HUD with a highly customizable, more human-readable HUD.",
      "icon": "https://cdn.modrinth.com/data/8shC1gFX/icon.png",
      "url": "https://modrinth.com/mod/betterf3",
      "library": false
    },
    {
      "kind": "mod",
      "title": "Camera Overhaul",
      "description": "A mod that makes gameplay & movement more satisfying through the use of various camera rotations, and more!",
      "icon": "https://cdn.modrinth.com/data/m0oRwcZx/bebf0a98167f737c643abe85382a7ec14d264cbf.png",
      "url": "https://modrinth.com/mod/cameraoverhaul",
      "library": false
    },
    {
      "kind": "mod",
      "title": "Chat Heads",
      "description": "See who you're chatting with!",
      "icon": "https://cdn.modrinth.com/data/Wb5oqrBJ/icon.png",
      "url": "https://modrinth.com/mod/chat-heads",
      "library": false
    },
    {
      "kind": "mod",
      "title": "Cloth Config API",
      "description": "Configuration Library for Minecraft Mods",
      "icon": "https://cdn.modrinth.com/data/9s6osm5g/ed8a2316cbb6f4fc5f510e8e13a59a85cbbbff4d_96.webp",
      "url": "https://modrinth.com/mod/cloth-config",
      "library": true
    },
    {
      "kind": "mod",
      "title": "Entity Culling",
      "description": "Using async path-tracing to hide Block-/Entities that are not visible",
      "icon": "https://cdn.modrinth.com/data/NNAgCjsB/7873452d6cede4daed12da3d7d8c193ab88b4fd6_96.webp",
      "url": "https://modrinth.com/mod/entityculling",
      "library": false
    },
    {
      "kind": "mod",
      "title": "Fabric API",
      "description": "Lightweight and modular API providing common hooks and intercompatibility measures utilized by mods using the Fabric toolchain.",
      "icon": "https://cdn.modrinth.com/data/P7dR8mSH/icon.png",
      "url": "https://modrinth.com/mod/fabric-api",
      "library": true
    },
    {
      "kind": "mod",
      "title": "Falling Leaves",
      "description": "Adds a neat little particle effect to leaf blocks",
      "icon": "https://cdn.modrinth.com/data/WhbRG4iK/58f5b66cb54787d9c25228d667f61144371c3867_96.webp",
      "url": "https://modrinth.com/mod/fallingleaves",
      "library": false
    },
    {
      "kind": "mod",
      "title": "FerriteCore",
      "description": "Memory usage optimizations",
      "icon": "https://cdn.modrinth.com/data/uXXizFIs/222a126f26f8f9ae1eb339f3b767677f18bff31f_96.webp",
      "url": "https://modrinth.com/mod/ferrite-core",
      "library": false
    },
    {
      "kind": "mod",
      "title": "Forge Config API Port",
      "description": "NeoForge's & Forge's config systems provided to other modding ecosystems. Designed for a multiloader architecture.",
      "icon": "https://cdn.modrinth.com/data/ohNO6lps/cb3b942cc18a66a0f35f802e004713f134e46cc2_96.webp",
      "url": "https://modrinth.com/mod/forge-config-api-port",
      "library": true
    },
    {
      "kind": "mod",
      "title": "Inventory Particles",
      "description": "Beautiful particles for your inventory items! Make your inventory more alive and dynamic! \n✨ Now with modded items support! ✨",
      "icon": "https://cdn.modrinth.com/data/XYnKrsxH/e6973926d0f896e2bf7df8d69a7e53e78502606f_96.webp",
      "url": "https://modrinth.com/mod/inventory-particles",
      "library": false
    },
    {
      "kind": "mod",
      "title": "Iris Shaders",
      "description": "A modern shader pack loader for Minecraft intended to be compatible with existing OptiFine shader packs",
      "icon": "https://cdn.modrinth.com/data/YL57xq9U/18d0e7f076d3d6ed5bedd472b853909aac5da202_96.webp",
      "url": "https://modrinth.com/mod/iris",
      "library": false
    },
    {
      "kind": "mod",
      "title": "Lithium",
      "description": "No-compromises game logic optimization mod, useful for both single-player games and multi-player servers.",
      "icon": "https://cdn.modrinth.com/data/gvQqBUqZ/bcc8686c13af0143adf4285d741256af824f70b7_96.webp",
      "url": "https://modrinth.com/mod/lithium",
      "library": false
    },
    {
      "kind": "mod",
      "title": "Mod Menu",
      "description": "Adds a mod menu to view the list of mods you have installed.",
      "icon": "https://cdn.modrinth.com/data/mOgUt4GM/5a20ed1450a0e1e79a1fe04e61bb4e5878bf1d20.png",
      "url": "https://modrinth.com/mod/modmenu",
      "library": false
    },
    {
      "kind": "mod",
      "title": "MossyLib",
      "description": "Library with basic utilities for Mossy projects.",
      "icon": "https://cdn.modrinth.com/data/ffLDUGbm/1787470c1ca81b2d0e0b3a9370d6f039d4f13207_96.webp",
      "url": "https://modrinth.com/mod/mossylib",
      "library": true
    },
    {
      "kind": "mod",
      "title": "Mouse Tweaks",
      "description": "Enhances inventory management by adding various functions to the mouse buttons. ",
      "icon": "https://cdn.modrinth.com/data/aC3cM3Vq/6c0eaa4e60a9c87f4766f222ff63286f09da32c0_96.webp",
      "url": "https://modrinth.com/mod/mouse-tweaks",
      "library": false
    },
    {
      "kind": "mod",
      "title": "Presence Footsteps",
      "description": "..An Overly complicated Sound Mod...",
      "icon": "https://cdn.modrinth.com/data/rcTfTZr3/c08dc581f0bf3b729f86e962fa800463af86e9a2_96.webp",
      "url": "https://modrinth.com/mod/presence-footsteps",
      "library": false
    },
    {
      "kind": "mod",
      "title": "Punchy!",
      "description": "A mod that adds various first person animations and visible hands with held items!",
      "icon": "https://cdn.modrinth.com/data/8aoMKplv/a9171ec026d659ccad5c3dff6fdfc80259d63e09.gif",
      "url": "https://modrinth.com/mod/punchy-fpa",
      "library": false
    },
    {
      "kind": "mod",
      "title": "Shoulder Surfing Reloaded",
      "description": "Highly configurable third person camera mod",
      "icon": "https://cdn.modrinth.com/data/kepjj2sy/4e83375b655b3a9f0e981bd747b095a4009df4e9_96.webp",
      "url": "https://modrinth.com/mod/shoulder-surfing-reloaded",
      "library": false
    },
    {
      "kind": "mod",
      "title": "Smooth Swapping",
      "description": "Moves items smoothly in inventories",
      "icon": "https://cdn.modrinth.com/data/ydZic5r4/2d949628d59149ec28c08f50f61d2984dd81ecbb_96.webp",
      "url": "https://modrinth.com/mod/smooth-swapping",
      "library": false
    },
    {
      "kind": "mod",
      "title": "Sodium",
      "description": "A high-performance rendering engine replacement for Minecraft, which greatly improves frame rates and reduces micro-stutter.",
      "icon": "https://cdn.modrinth.com/data/AANobbMI/295862f4724dc3f78df3447ad6072b2dcd3ef0c9_96.webp",
      "url": "https://modrinth.com/mod/sodium",
      "library": false
    },
    {
      "kind": "mod",
      "title": "Text Placeholder API",
      "description": "Placeholder and Text manipulation library for your Minecraft mods.",
      "icon": "https://cdn.modrinth.com/data/eXts2L7r/e9c9990896e6422bffc5f73d2c41b8f077348f83.png",
      "url": "https://modrinth.com/mod/placeholder-api",
      "library": true
    },
    {
      "kind": "mod",
      "title": "Wakes",
      "description": "Adds splashes and wakes while traveling on water",
      "icon": "https://cdn.modrinth.com/data/dlNu0RQY/46be95a28f27da8a98e9721b6695703fcec2d7d8_96.webp",
      "url": "https://modrinth.com/mod/wakes",
      "library": false
    }
  ]
}
