/**
 * NONE type script
 *
 * Tower Dungeon - Dodge Game
 * - All party members need to enter the arena for the game to start.
 * - Upon entering the arena, the players are given a SPEED III potion effect
 * - When the game starts, red glass will appear on the floor.
 * - After three seconds, the red glass will turn to air, revealing the second floor.
 * - If a player falls to the second floor, they will be teleported back to the tower entrance and will be unable to re-enter
 * - The game ends after 15 rounds
 *
 * Grading (based on remaining players):
 * - S (4 points): 0 falls
 * - A (3 points): 1 fall
 * - B (2 points): 2-3 falls
 * - C (1 point):  4 falls (no survivors)
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        const ChatColor = Java.type("org.bukkit.ChatColor");
        const Location = Java.type("org.bukkit.Location");
        const PotionEffectType = Java.type("org.bukkit.potion.PotionEffectType");
        const var_names = load(`${sm.getScriptDirectory("TowerDungeon")}/VariableHandler.js`).names;

        return {
            run: run,
            join: join,
            leave: leave,
            grade: get_grade,
            instructions: spooky_instructions,
            comment: spooky_comment,
        };

        function join(player) {
            const dungeon = sm.getDungeon(player);
            if (dungeon.getTempVariable(var_names.dodge_game_in_progress)) {
                player.sendMessage(`${ChatColor.RED}You can not enter the arena while it is in progress.`);
                return;
            }
            dungeon.setTempVariable(var_names.dodge_game_players, dungeon.getTempVariable(var_names.dodge_game_players) + 1);
            load(`${sm.getScriptDirectory("TowerDungeon")}/ScheduleHandler.js`)(() => player.teleport(new Location(player.getWorld(), -1955.5, 4.25, -999.5, -90, 0)));
            sm.addPotionEffect(player, 999999, 2, PotionEffectType.SPEED);
            dungeon.messageParty(`${ChatColor.GOLD}${player.getName()} ${ChatColor.YELLOW}has entered the arena! (${dungeon.getTempVariable(var_names.dodge_game_players)}/4)`);
            run(player);
        }

        function leave(player) {
            const dungeon = sm.getDungeon(player);
            dungeon.setTempVariable(var_names.dodge_game_players, dungeon.getTempVariable(var_names.dodge_game_players) - 1);
            load(`${sm.getScriptDirectory("TowerDungeon")}/ScheduleHandler.js`)(() => player.teleport(new Location(player.getWorld(), -2011.5, 114.25, -999.5, -90, 0)));
            sm.clearPotionEffect(player, PotionEffectType.SPEED);
            dungeon.messageParty(`${ChatColor.GOLD}${player.getName()} ${ChatColor.YELLOW}fell! (${dungeon.getTempVariable(var_names.dodge_game_players)}/4)`);
        }

        function run(player) {
            const dungeon = sm.getDungeon(player);
            if (dungeon.getTempVariable(var_names.dodge_game_players) < 4) {
                return;
            }
            dungeon.setTempVariable(var_names.dodge_game_in_progress, true);
            dungeon.messageParty(`${ChatColor.GRAY}Game is now starting...`);

            const Objects = Java.type("java.util.Objects");
            const BukkitWorld = Java.type("com.sk89q.worldedit.bukkit.BukkitWorld");
            const WorldEdit = Java.type("com.sk89q.worldedit.WorldEdit");
            const BlockVector3 = Java.type("com.sk89q.worldedit.math.BlockVector3");
            const CylinderRegion = Java.type("com.sk89q.worldedit.regions.CylinderRegion");
            const Vector2 = Java.type("com.sk89q.worldedit.math.Vector2");
            const BlockTypes = Java.type("com.sk89q.worldedit.world.block.BlockTypes");
            const HashSet = Java.type("java.util.HashSet");
            const Sound = Java.type("org.bukkit.Sound");
            const world = player.getWorld();
            const bukkitWorld = new BukkitWorld(world);

            const white_stained_glass = Objects.requireNonNull(BlockTypes.WHITE_STAINED_GLASS.getDefaultState());
            const red_stained_glass = Objects.requireNonNull(BlockTypes.RED_STAINED_GLASS.getDefaultState());
            const air = Objects.requireNonNull(BlockTypes.AIR.getDefaultState());

            const filter = new HashSet();
            filter.add(white_stained_glass.toBaseBlock());
            filter.add(red_stained_glass.toBaseBlock());

            // GAME START
            java.lang.Thread.sleep(3000);
            let wave = 0;
            const y = 3;
            do {
                if (!dungeon.isActive()) {
                    reset();
                    break;
                }
                if (wave % 5 === 0) {
                    dungeon.messageParty(`${ChatColor.GRAY}Wave ${ChatColor.YELLOW}${wave}/15`);
                }

                const amount = Math.floor(Math.random() * 6) + 5; // 5 - 10
                let attacks = [];
                for (let i = 0 ; i < amount ; i++) {
                    attacks.push(get_position());
                }

                // WARNING PHASE
                for (let i = 0 ; i < amount ; i++) {
                    warning(attacks[i]);
                }
                java.lang.Thread.sleep(1000);
                for (let i = 0 ; i < amount ; i++) {
                    world.playSound(new Location(world, attacks[i][0], y, attacks[i][2]), Sound.BLOCK_NOTE_BLOCK_CHIME, 10, 0.3);
                }
                java.lang.Thread.sleep(1000);
                for (let i = 0 ; i < amount ; i++) {
                    world.playSound(new Location(world, attacks[i][0], y, attacks[i][2]), Sound.BLOCK_NOTE_BLOCK_CHIME, 10, 0.3);
                }
                java.lang.Thread.sleep(1000);
                for (let i = 0 ; i < amount ; i++) {
                    world.playSound(new Location(world, attacks[i][0], y, attacks[i][2]), Sound.BLOCK_NOTE_BLOCK_CHIME, 10, 1);
                }

                // ATTACK PHASE
                for (let i = 0 ; i < amount ; i++) {
                    attack(attacks[i]);
                }
                java.lang.Thread.sleep(5000);

                // RESET FOR NEXT ROUND
                reset();
                wave++;
                java.lang.Thread.sleep(1000);

                if (dungeon.getTempVariable(var_names.dodge_game_players) <= 0) {
                    // ALL PLAYERS ARE "DEAD"
                    const grade = get_grade(dungeon.getTempVariable(var_names.dodge_game_players));
                    dungeon.messageParty(`${ChatColor.RED}The party wiped out!\n${ChatColor.ITALIC}${ChatColor.GRAY}${spooky_comment(grade)}`);
                    dungeon.setTempVariable(var_names.score, dungeon.getTempVariable(var_names.score) + grade);

                    const ProgressHandler = load(`${sm.getScriptDirectory("TowerDungeon")}/ProgressHandler.js`);
                    ProgressHandler.advance(player.getWorld(), dungeon.getParty(), dungeon.getTempVariable(var_names.progress));
                    return;
                }

                if (wave >= 15) {
                    // WAVE LIMIT REACHED, GAME IS CLEARED
                    const grade = get_grade(dungeon.getTempVariable(var_names.dodge_game_players));
                    dungeon.messageParty(`${ChatColor.GREEN}The party has survived all rounds!\n${ChatColor.ITALIC}${ChatColor.GRAY}${spooky_comment(grade)}`);
                    dungeon.setTempVariable(var_names.score, dungeon.getTempVariable(var_names.score) + grade);

                    const ProgressHandler = load(`${sm.getScriptDirectory("TowerDungeon")}/ProgressHandler.js`);
                    ProgressHandler.advance(player.getWorld(), dungeon.getParty(), dungeon.getTempVariable(var_names.progress));
                    return;
                }
            } while (dungeon.isActive() && dungeon.getTempVariable(var_names.dodge_game_in_progress));
            // DUNGEON SHUT DOWN
            return;

            function get_position() {
                // [x, y, z, radius]
                const STAGE = [-1956, 3, -1000, 25];
                const r = STAGE[3] * Math.sqrt(Math.random());
                const attack_radius = Math.floor(Math.random() * 6) + 10; // 12 - 20
                const theta = Math.round(Math.random() * 2 * Math.PI);
                const x = STAGE[0] + Math.round(Math.cos(theta) * r);
                const z = STAGE[2] + Math.round(Math.sin(theta) * r);
                return [x, y, z, attack_radius];
            }

            function warning(attack) {
                const edit = WorldEdit.getInstance().newEditSession(bukkitWorld);
                const cylinderRegion = new CylinderRegion(BlockVector3["at(int, int, int)"](attack[0], attack[1], attack[2]), Vector2.at(attack[3], attack[3]), attack[1], attack[1]);
                edit.replaceBlocks(cylinderRegion, filter, red_stained_glass.toBaseBlock());
                edit.flushQueue();
                edit.close();
            }

            function attack(attack) {
                const edit = WorldEdit.getInstance().newEditSession(bukkitWorld);
                const cylinderRegion = new CylinderRegion(BlockVector3["at(int, int, int)"](attack[0], attack[1], attack[2]), Vector2.at(attack[3], attack[3]), attack[1], attack[1]);
                edit.replaceBlocks(cylinderRegion, filter, air.toBaseBlock());
                edit.flushQueue();
                edit.close();
            }

            function reset() {
                const edit = WorldEdit.getInstance().newEditSession(bukkitWorld);
                edit.makeCylinder(BlockVector3.at(-1956, 3, -1000), white_stained_glass.toBaseBlock(), 25, 1, true);
                edit.flushQueue();
                edit.close();
            }
        }

        function get_grade(remaining_players) {
            if (remaining_players >= 4) {
                return 4;
            }
            if (remaining_players >= 3) {
                return 3;
            }
            if (remaining_players >= 1) {
                return 2;
            }
            return 1;
        }

        function spooky_instructions() {
            const ChatColor = Java.type("org.bukkit.ChatColor");
            const GRAY = `${ChatColor.GRAY}${ChatColor.ITALIC}`;
            const YELLOW = `${ChatColor.YELLOW}${ChatColor.ITALIC}`;
            const RED = `${ChatColor.RED}${ChatColor.ITALIC}`;
            const WHITE = `${ChatColor.WHITE}${ChatColor.ITALIC}`;
            return `${GRAY}Reflexes and speed are important, can you all pass my game?\n`
                + `${YELLOW}Step through the gate to enter the arena ${GRAY}! ${YELLOW}All party members must enter ${GRAY}before the game starts.\n`
                + `${GRAY}Once the game starts, some parts of the glass floor will turn ${RED}red${GRAY}! Make your way to ${WHITE}white ${GRAY}glass to be safe!\n`
                + `${GRAY}I will be judging you all on ${YELLOW}how many survive${GRAY}.`;
        }

        function spooky_comment(grade_value) {
            switch(grade_value) {
                case 4:
                    return "Absolutely stunning performance!";
                case 3:
                    return "A satisfactory show, I can't complain.";
                case 2:
                    return "There were a few casualties, but passable.";
                case 1:
                    return "Looks like you all need more training...";
                default:
                    return "";
            }
        }
    })();
}
main();