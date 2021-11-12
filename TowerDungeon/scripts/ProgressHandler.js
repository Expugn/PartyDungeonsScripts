/**
 * NONE type script
 *
 * Tower Dungeon - Progress Handler
 * - Handles the progress in which the party is teleported to next once they complete a game/puzzle
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        const Location = Java.type("org.bukkit.Location");
        const Material = Java.type("org.bukkit.Material");
        const locations = {
            1: [-2011.5, 18.25, -999.5], // NumberGuess
            2: [-2011.5, 34.25, -999.5], // RecordHunt
            3: [-2011.5, 50.25, -999.5], // TowerClimb
            4: [-2011.5, 82.25, -999.5], // MathGame
            5: [-2011.5, 98.25, -999.5], // GiantCombat
            6: [-2011.5, 114.25, -999.5], // DodgeGame
            7: [-2011.5, 148.25, -999.5], // TriviaGame
            finish: [-2011.5, 161.25, -999.5], // Top of Tower
        }

        return {
            get_progress: get_progress,
            advance: advance,
            return_player: return_player,
        };

        function get_progress() {
            const MAX_CHALLENGE_COUNT = 4;
            let result = [-1];
            for (let i = 0; i < MAX_CHALLENGE_COUNT; i++) {
                let random_digit = Math.floor(Math.random() * 7) + 1;
                while (result.indexOf(random_digit) !== -1) {
                    random_digit = Math.floor(Math.random() * 7) + 1;
                }
                result.push(random_digit);
            }
            return result;
        }

        function return_player(player) {
            const dungeon = sm.getDungeon(player);
            const progress = dungeon.getTempVariable("progress");
            const location = locations[progress[0]];
            load(`${sm.getScriptDirectory("TowerDungeon")}/ScheduleHandler.js`)(() =>
                player.teleport(new Location(dungeon.getDungeon().getDungeonFile().getWorld(), location[0], location[1], location[2], -90, 0)));
        }

        function advance(world, party, progress) {
            progress.shift();
            let next, dungeon;
            if (progress.length > 0) {
                // THERE ARE STILL FLOORS TO GO
                const next_floor = progress[0];
                next = new Location(world, locations[next_floor][0], locations[next_floor][1], locations[next_floor][2], -90, 0);
            }
            else {
                // DUNGEON COMPLETE, WARP TO END
                next = new Location(world, locations.finish[0], locations.finish[1], locations.finish[2], -90, 0);
            }
            load(`${sm.getScriptDirectory("TowerDungeon")}/ScheduleHandler.js`)(() => {
                for (const uuid in party) {
                    // TELEPORT PLAYERS, DO RESETS
                    const player = sm.getPlayerFromUUID(uuid);
                    if (!dungeon) {
                        // init dungeon if not already done
                        dungeon = sm.getDungeon(player);
                    }
                    player.teleport(next);

                    // REMOVE DUNGEON ITEMS
                    const inventory = player.getInventory();
                    for (let i = 0 ; i < inventory.getSize() ; i++) {
                        checkDungeonItem(inventory.getItem(i));
                    }

                    // CHECK ITEM ON CURSOR (THIS WON'T WORK FOR CREATIVE MODE USERS)
                    checkDungeonItem(player.getItemOnCursor());

                    // CLEAR POTION EFFECTS
                    const PotionEffectType = Java.type("org.bukkit.potion.PotionEffectType");
                    sm.clearPotionEffect(player, PotionEffectType.SPEED); // given in DodgeGame
                }

                const VariableHandler = load(`${sm.getScriptDirectory("TowerDungeon")}/VariableHandler.js`);
                if (progress.length <= 0) {
                    // DUNGEON COMPLETE
                    dungeon.clear();
                    const score = dungeon.getTempVariable("score");
                    const ChatColor = Java.type("org.bukkit.ChatColor");
                    dungeon.messageParty(`${ChatColor.GOLD}You have made it to the top of the tower!\n${ChatColor.AQUA}Your party has scored: ${score} / 16`);
                    load(`${sm.getScriptDirectory("TowerDungeon")}/BonusDropHandler.js`).init(dungeon.getDungeon().getDungeonFile().getWorld(), score).run();
                }
                else {
                    // need to write this ugly if/else chain cus switch doesnt support
                    // consts in them. nashorn is a pita sometimes
                    if (progress[0] === 1) {
                        // NumberGuess
                        const NumberGuess = load(`${sm.getScriptDirectory("TowerDungeon")}/NumberGuess.js`);
                        dungeon.messageParty(`${NumberGuess.instructions()}`);
                        VariableHandler.init_number_guess(dungeon);
                    }
                    else if (progress[0] === 2) {
                        // RecordHunt
                        const RecordHunt = load(`${sm.getScriptDirectory("TowerDungeon")}/RecordHunt.js`);
                        dungeon.messageParty(`${RecordHunt.instructions()}`);
                        VariableHandler.init_record_hunt(dungeon);
                    }
                    else if (progress[0] === 3) {
                        // TowerClimb
                        const TowerClimb = load(`${sm.getScriptDirectory("TowerDungeon")}/TowerClimb.js`);
                        dungeon.messageParty(`${TowerClimb.instructions()}`);
                        VariableHandler.init_tower_climb(dungeon);
                    }
                    else if (progress[0] === 4) {
                        // MathGame
                        const MathGame = load(`${sm.getScriptDirectory("TowerDungeon")}/MathGame.js`);
                        dungeon.messageParty(`${MathGame.instructions()}`);
                        VariableHandler.init_math(dungeon);
                    }
                    else if (progress[0] === 5) {
                        // GiantCombat
                        const GiantCombat = load(`${sm.getScriptDirectory("TowerDungeon")}/GiantCombat.js`);
                        dungeon.messageParty(`${GiantCombat.instructions()}`);
                        VariableHandler.init_giant_combat(dungeon);
                    }
                    else if (progress[0] === 6) {
                        // DodgeGame
                        const DodgeGame = load(`${sm.getScriptDirectory("TowerDungeon")}/DodgeGame.js`);
                        dungeon.messageParty(`${DodgeGame.instructions()}`);
                        VariableHandler.init_dodge_game(dungeon);
                    }
                    else if (progress[0] === 7) {
                        // TriviaGame
                        const TriviaGame = load(`${sm.getScriptDirectory("TowerDungeon")}/TriviaGame.js`);
                        dungeon.messageParty(`${TriviaGame.instructions()}`);
                        VariableHandler.init_trivia_game(dungeon);
                    }
                }

                dungeon.setTempVariable("progress", progress);

                function checkDungeonItem(item) {
                    if (item === null || item.getType() === Material.AIR) {
                        return;
                    }
                    if (!item.hasItemMeta()) {
                        return;
                    }
                    const item_meta = item.getItemMeta();
                    if (item_meta.hasLore() && item_meta.getLore().get(0).contains("Dungeon Item")) {
                        // REMOVE ITEM
                        item.setAmount(0);
                    }
                }
            }, 60);
        }
    })();
}
main();