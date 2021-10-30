/**
 * NONE type script
 *
 * MANAGES ALL VARIABLE NAMES AND INITIALIZES THEM TO A DEFAULT STATE AS NEEDED
 *
 * TO IMPORT:
 *   const VariableHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/VariableHandler.js`);
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        const VARIABLE_NAMES = {
            // SYSTEM
            init: "variables_initialized",
            start: "start",

            // ROOM VARIABLES, IF TRUE THE ENEMY CHEST HAS OPENED
            room_one: "room_one",
            room_two: "room_two",
            room_three: "room_three",
            room_four: "room_four",
            room_boss: "room_boss",

            // KEY VARIABLES, IF TRUE THEN THE KEY IS OBTAINED
            key_one: "key_one",
            key_two: "key_two",
            key_three: "key_three",
            key_boss: "key_boss",

            // KEY DOOR VARIABLES, IF TRUE THEN THE DOOR IS OPENED/UNLOCKED
            key_one_used: "key_one_used",
            key_two_used: "key_two_used",
            key_three_used: "key_three_used",
            key_boss_used: "key_boss_used",

            // DUNGEON STATUS
            difficulty: "difficulty",
            extreme: "extreme",
            drop_rate: "drop_rate",
            soul_essence: "soul_essence",

            // PERMANENT VARIABLES
            cash_money_start: "cash_money_start", // string with start date of money collection
            cash_money: "cash_money", // count how much money spent in AlbyDungeon

            // NOT INCLUDED
            // <entity_name>_killed     USED BY onEntityDeath, USED TO COUNT HOW MANY ENEMIES DIED
        }

        function init(dungeon) {
            dungeon.setTempVariable(VARIABLE_NAMES.init, true);
            dungeon.setTempVariable(VARIABLE_NAMES.start, false);
            dungeon.setTempVariable(VARIABLE_NAMES.key_one_used, false);
            dungeon.setTempVariable(VARIABLE_NAMES.key_two_used, false);
            dungeon.setTempVariable(VARIABLE_NAMES.key_three_used, false);
            dungeon.setTempVariable(VARIABLE_NAMES.key_boss_used, false);
            dungeon.setTempVariable(VARIABLE_NAMES.key_one, false);
            dungeon.setTempVariable(VARIABLE_NAMES.key_two, false);
            dungeon.setTempVariable(VARIABLE_NAMES.key_three, false);
            dungeon.setTempVariable(VARIABLE_NAMES.key_boss, false);
            dungeon.setTempVariable(VARIABLE_NAMES.difficulty, "");
            dungeon.setTempVariable(VARIABLE_NAMES.extreme, false);
            dungeon.setTempVariable(VARIABLE_NAMES.drop_rate, 1);
            dungeon.setTempVariable(VARIABLE_NAMES.soul_essence, 0);
        }

        return {
            variable_names: VARIABLE_NAMES,
            init: init
        };
    })();
}
main();