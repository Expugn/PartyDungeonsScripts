/**
 * NONE type script
 *
 * OPENS AND CLOSES AlbeyDungeon's DOORS.
 * THIS REQUIRES ScheduleHandler.js TO PLACE BLOCKS IN GAME.
 *
 * TO IMPORT:
 *   const DoorHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/DoorHandler.js`);
 *
 * EXAMPLE USAGE:
 *   const DoorHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/DoorHandler.js`);
 *   const ScheduleHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/ScheduleHandler.js`);
 *   ScheduleHandler(() => {
 *      const doors = DoorHandler.init(player.getWorld());
 *      doors.room_one_south.run_south(false);
 *   });
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        const Location = Java.type("org.bukkit.Location");
        const Material = Java.type("org.bukkit.Material");
        const Sound = Java.type("org.bukkit.Sound");

        const VOLUME = 3;
        const PITCH = 0.5;

        /**
         * GET ALL AlbeyDungeon DOORS
         *
         * DOOR pos IS DETERMINED BY THE CARDINAL DIRECTION WHILE INSIDE THE ROOM
         * AND THE STARTING POSITION IS THE LOWEST BLOCKS IN x, y, z (DEPENDING ON DIRECTION)
         *
         * Example Usage:
         *   const doors = init_doors(player.getWorld());
         *   doors.room_one_west.run_west(false); // CLOSE ROOM ONE WEST DOOR
         *
         * @param {} world
         * @returns
         */
        function init(world) {
            return {
                "key_one_east":                 KeyDoor(world, [-1430, 143, -1002]),
                "room_one_east":                BasicDoor(world, [-1413, 143, -1051]),
                "room_one_south":               BasicDoor(world, [-1428, 143, -1036]),
                "room_one_west":                BasicDoor(world, [-1439, 143, -1051]),
                "room_two_west":                BasicDoor(world, [-1398, 143, -1002]),
                "key_two_south":                KeyDoor(world, [-1387, 143, -955]),
                "key_three_west":               KeyDoor(world, [-1518, 143, -970]),

                // FLOOR 2
                "emerald_one_south":            EmeraldDoor(world, [-1486, 132, -937]),
                "room_three_west":              BasicDoor(world, [-1432, 132, -943]),
                "key_four_east":                KeyDoor(world, [-1422, 132, -993]),
                "key_five_south":               KeyDoor(world, [-1371, 132, -962]),

                // FLOOR 3
                "emerald_two_east":             EmeraldDoor(world, [-1453, 99, -1002]),
                "emerald_three_east":           EmeraldDoor(world, [-1419, 99, -1002]),
                "emerald_four_east":            EmeraldDoor(world, [-1385, 99, -1002]),
                "boss_door_north":              BossDoor(world, [-1375, 99, -972]),
                "boss_door_south":              BossDoor(world, [-1375, 99, -920]),
                "boss_tower_nw":                BossTower(world, [-1388, 105, -961]),
                "boss_tower_ne":                BossTower(world, [-1358, 105, -961]),
                "boss_tower_se":                BossTower(world, [-1358, 105, -931]),
                "boss_tower_sw":                BossTower(world, [-1388, 105, -931]),
                "boss_tower_lock_nw":           BossTowerLock(world, [-1384, 96, -957]),
                "boss_tower_lock_ne":           BossTowerLock(world, [-1362, 96, -957]),
                "boss_tower_lock_se":           BossTowerLock(world, [-1362, 96, -935]),
                "boss_tower_lock_sw":           BossTowerLock(world, [-1384, 96, -935]),
                "chest_gate_extreme_west":      ChestGate(world, [-1384, 99, -909]),
                "chest_gate_impossible_west":   ChestGate(world, [-1394, 99, -909]),
            };
        }

        /**
         * BASIC DOORS USE THE SAME MATERIAL THROUGHOUT
         *
         * @param {World}       world
         * @param {[x, y, z]}   pos
         * @returns {Object}
         */
        function BasicDoor(world, pos) {
            // CONSTANTS
            const SOUND_OPEN =      Sound.BLOCK_PISTON_CONTRACT;
            const SOUND_CLOSE =     Sound.BLOCK_PISTON_EXTEND;
            const MATERIAL_OPEN =   Material.AIR;
            const MATERIAL_CLOSE =  Material.SPRUCE_LOG;

            return {
                "run_north": run_north_south,
                "run_south": run_north_south,
                "run_east": run_east_west,
                "run_west": run_east_west
            };

            function run_north_south(open) {
                for (let x = 0 ; x <= 4 ; x++) {
                    for (let y = 0 ; y < 4 ; y++) {
                        const loc = new Location(world, pos[0] + x, pos[1] + y, pos[2]);
                        loc.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_CLOSE);
                    }
                }
                play_sound(open);
            }
            function run_east_west(open) {
                for (let z = 0 ; z <= 4 ; z++) {
                    for (let y = 0 ; y < 4 ; y++) {
                        const loc = new Location(world, pos[0], pos[1] + y, pos[2] + z);
                        loc.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_CLOSE);
                    }
                }
                play_sound(open);
            }
            function play_sound(open) {
                world.playSound(new Location(world, pos[0], pos[1], pos[2]), (open ? SOUND_OPEN : SOUND_CLOSE), VOLUME, PITCH);
            }
        }

        /**
         * KEY DOORS USE MOSTLY THE SAME MATERIAL,
         * BUT THEY HAVE AN GOLD_BLOCK IN THE CENTER
         *
         * @param {World}       world
         * @param {[x, y, z]}   pos
         * @returns {Object}
         */
        function KeyDoor(world, pos) {
            // CONSTANTS
            const SOUND_OPEN =        Sound.BLOCK_IRON_DOOR_OPEN;
            const SOUND_CLOSE =       Sound.BLOCK_IRON_DOOR_CLOSE;
            const MATERIAL_OPEN =     Material.AIR;
            const MATERIAL_CLOSE =    Material.SPRUCE_LOG;
            const MATERIAL_SPECIAL =  Material.GOLD_BLOCK;

            return {
                "run_north": run_north_south,
                "run_south": run_north_south,
                "run_east": run_east_west,
                "run_west": run_east_west
            };

            function run_north_south(open) {
                for (let x = 0 ; x <= 4 ; x++) {
                    for (let y = 0 ; y < 4 ; y++) {
                        const loc = new Location(world, pos[0] + x, pos[1] + y, pos[2]);
                        if (y === 2 && x === 2) {
                            // DOOR CENTER
                            loc.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_SPECIAL);
                            continue;
                        }
                        loc.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_CLOSE);
                    }
                }
                play_sound(open);
            }
            function run_east_west(open) {
                for (let z = 0 ; z <= 4 ; z++) {
                    for (let y = 0 ; y < 4 ; y++) {
                        const loc = new Location(world, pos[0], pos[1] + y, pos[2] + z);
                        if (y === 2 && z === 2) {
                            // DOOR CENTER
                            loc.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_SPECIAL);
                            continue;
                        }
                        loc.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_CLOSE);
                    }
                }
                play_sound(open);
            }
            function play_sound(open) {
                world.playSound(new Location(world, pos[0], pos[1], pos[2]), (open ? SOUND_OPEN : SOUND_CLOSE), VOLUME, PITCH);
            }
        }

        /**
         * SAME DESIGN AS A KEY DOOR,
         * DIFFERENT METHOD OF UNLOCKING (4 EMERALDS IN A ROOM).
         *
         * @param {World} world
         * @param {[x, y, z]} pos
         * @returns {Object}
         */
        function EmeraldDoor(world, pos) {
            return KeyDoor(world, pos);
        }

        /**
         * BOSS TOWERS ARE TOWERS IN THE BOSS ROOM THAT PLAYERS CAN FIRE ARROWS TOWARDS
         * TO "DEACTIVATE" THEM. PLAYERS SHOULD NOT BE ABLE TO FIRE ARROWS BEFORE THE BOSS FIGHT
         * STARTS, SO BARRIERS WILL BLOCK THE TOWER'S BUTTONS UNTIL THEN.
         *
         * @param {World} world
         * @param {[x, y, z]} pos
         * @returns {Object}
         */
        function BossTower(world, pos) {
            const MATERIAL_OPEN = Material.AIR;
            const MATERIAL_CLOSE = Material.BARRIER;

            return {
                "run": run,
            }

            function run(open) {
                // NORTH / SOUTH
                for (let x = 0 ; x <= 2 ; x++) {
                    const loc = new Location(world, pos[0] - 1 + x, pos[1], pos[2] + 2);
                    const loc2 = new Location(world, pos[0] - 1 + x, pos[1], pos[2] - 2);
                    loc.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_CLOSE);
                    loc2.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_CLOSE);
                }
                // WEST / EAST
                for (let z = 0 ; z <= 2 ; z++) {
                    const loc = new Location(world, pos[0] + 2, pos[1], pos[2] - 1 + z);
                    const loc2 = new Location(world, pos[0] - 2, pos[1], pos[2] - 1 + z);
                    loc.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_CLOSE);
                    loc2.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_CLOSE);
                }
            }
        }

        /**
         * BOSS TOWER LOCKS LOCK BOSS TOWERS SO THAT ENEMIES CAN'T SPAWN.
         * ENEMIES SHOULDN'T BE ABLE TO SPAWN WHEN A BOSS FIGHT ISN'T IN PROGRESS.
         *
         * @param {World} world
         * @param {[x, y, z]} pos
         * @returns {Object}
         */
        function BossTowerLock(world, pos) {
            const MATERIAL_OPEN = Material.AIR;
            const MATERIAL_CLOSE = Material.REDSTONE_BLOCK;

            return {
                "run": run,
            }

            function run(open) {
                const loc = new Location(world, pos[0], pos[1], pos[2]);
                loc.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_CLOSE);
            }
        }

        /**
        * BOSS DOORS USE MOSTLY THE SAME MATERIAL,
        * BUT THEY HAVE AN LARGE SPECIAL PATTERN IN THE CENTER
        *
        * AlbeyDungeon does not have BossDoors in EAST/WEST,
        * so those functions aren't included.
        *
        * @param {World}       world
        * @param {[x, y, z]}   pos
        * @returns {Object}
        */
        function BossDoor(world, pos) {
            // CONSTANTS
            const SOUND_OPEN =        Sound.BLOCK_WOODEN_DOOR_OPEN;
            const SOUND_CLOSE =       Sound.BLOCK_WOODEN_DOOR_CLOSE;
            const MATERIAL_OPEN =     Material.AIR;
            const MATERIAL_CLOSE =    Material.SPRUCE_LOG;
            const MATERIAL_CENTER =   Material.GOLD_BLOCK;
            const MATERIAL_SPECIAL =  Material.REDSTONE_BLOCK;

            return {
                "run_north": run_north_south,
                "run_south": run_north_south
            };

            function run_north_south(open) {
                for (let x = 0 ; x <= 4 ; x++) {
                    for (let y = 0 ; y < 4 ; y++) {
                        const loc = new Location(world, pos[0] + x, pos[1] + y, pos[2]);
                        if (y === 2 && x === 2) {
                            // DOOR CENTER
                            loc.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_CENTER);
                            continue;
                        }
                        else if (y > 0 && x == 2) {
                            // DOOR MIDDLE VERTICAL (not bottom)
                            loc.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_SPECIAL);
                            continue;
                        }
                        else if (y == 2 && (x !== 0 && x !== 4)) {
                            // DOOR MIDDLE HORIZONTAL (not edges)
                            loc.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_SPECIAL);
                            continue;
                        }
                        loc.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_CLOSE);
                    }
                }
                play_sound(open);
            }
            function play_sound(open) {
                world.playSound(new Location(world, pos[0], pos[1], pos[2]), (open ? SOUND_OPEN : SOUND_CLOSE), VOLUME, PITCH);
            }
        }

        /**
         * CHEST GATES HIDE LOOT CHESTS BEHIND THEM DEPENDING ON THE CURRENT DIFFICULTY.
         * THEY ARE A 3x3 WALL OF IRON BARS.
         * SOUND ISN'T IMPORTANT BECAUSE THEY WILL BE OPENED WHILE THE PLAYER(S) IS FAR AWAY
         *
         * @param {World} world
         * @param {[x, y, z]} pos
         * @returns {Object}
         */
        function ChestGate(world, pos) {
            const MATERIAL_OPEN =     Material.AIR;
            const MATERIAL_CLOSE =    Material.RED_STAINED_GLASS;

            return {
                "run_west": run_east_west,
            };

            function run_east_west(open) {
                for (let z = 0 ; z <= 2 ; z++) {
                    for (let y = 0 ; y < 3 ; y++) {
                        const loc = new Location(world, pos[0], pos[1] + y, pos[2] + z);
                        loc.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_CLOSE);
                    }
                }
            }
        }

        return {
            init: init
        };
    })();
}
main();

