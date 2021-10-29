/**
 * NONE type script
 * 
 * OPENS AND CLOSES AlbyDungeon's DOORS.
 * THIS REQUIRES ScheduleHandler.js TO PLACE BLOCKS IN GAME.
 * 
 * TO IMPORT:
 *   const DoorHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/DoorHandler.js`);
 * 
 * EXAMPLE USAGE:
 *   const DoorHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/DoorHandler.js`);
 *   const ScheduleHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/ScheduleHandler.js`);
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
         * GET ALL AlbyDungeon DOORS
         * 
         * DOOR pos IS DETERMINED BY THE CARDINAL DIRECTION WHILE INSIDE THE ROOM
         * AND THE STARTING POSITION IS THE LOWEST BLOCKS IN x, y, z (DEPENDING ON DIRECTION)
         * 
         * Example Usage:
         *   const doors = init_doors(player.getWorld());
         *   doors.room_one_south.run_south(false); // CLOSE ROOM ONE SOUTH DOOR
         * 
         * @param {} world 
         * @returns 
         */
        function init(world) {
            return {
                "room_one_south":   BasicDoor(world, [-1451, 43, -489]),
                "room_one_west":    BasicDoor(world, [-1461, 43, -503]),
                "room_one_north":   BasicDoor(world, [-1451, 43, -513]),
                "key_one_south":    KeyDoor  (world, [-1409, 43, -523]),
                "room_two_west":    BasicDoor(world, [-1393, 43, -487]),
                "room_two_north":   BasicDoor(world, [-1383, 43, -497]),
                "key_two_west":     KeyDoor  (world, [-1393, 43, -563]),
                "room_three_east":  BasicDoor(world, [-1453, 43, -571]),
                "room_three_south": BasicDoor(world, [-1467, 43, -557]),
                "room_three_west":  BasicDoor(world, [-1477, 43, -571]),
                "key_three_west":   KeyDoor  (world, [-1529, 43, -555]),
                "room_four_north":  BasicDoor(world, [-1545, 43, -531]),
                "boss_door_east":   BossDoor (world, [-1581, 43, -555]),
                "boss_door_west":   BossDoor (world, [-1634, 43, -555])
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
            const MATERIAL_CLOSE =  Material.OAK_LOG;

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
         * BUT THEY HAVE AN IRON_BLOCK IN THE CENTER
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
            const MATERIAL_CLOSE =    Material.OAK_LOG;
            const MATERIAL_SPECIAL =  Material.IRON_BLOCK;

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
        * BOSS DOORS USE MOSTLY THE SAME MATERIAL,
        * BUT THEY HAVE AN LARGE SPECIAL PATTERN IN THE CENTER
        * 
        * AlbyDungeon does not have BossDoors in NORTH/SOUTH,
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
            const MATERIAL_CLOSE =    Material.OAK_LOG;
            const MATERIAL_CENTER =   Material.IRON_BLOCK;
            const MATERIAL_SPECIAL =  Material.REDSTONE_BLOCK;

            return {
                "run_east": run_east_west,
                "run_west": run_east_west
            };

            function run_east_west(open) {
                for (let z = 0 ; z <= 4 ; z++) {
                    for (let y = 0 ; y < 4 ; y++) {
                        const loc = new Location(world, pos[0], pos[1] + y, pos[2] + z);
                        if (y === 2 && z === 2) {
                            // DOOR CENTER
                            loc.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_CENTER);
                            continue;
                        }
                        else if (y > 0 && z == 2) {
                            // DOOR MIDDLE VERTICAL (not bottom)
                            loc.getBlock().setType(open ? MATERIAL_OPEN : MATERIAL_SPECIAL);
                            continue;
                        }
                        else if (y == 2 && (z !== 0 && z !== 4)) {
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

        return {
            init: init
        };
    })();
}
main();





