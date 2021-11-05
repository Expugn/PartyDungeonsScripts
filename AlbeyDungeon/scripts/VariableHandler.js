/**
 * NONE type script
 *
 * MANAGES ALL VARIABLE NAMES AND INITIALIZES THEM TO A DEFAULT STATE AS NEEDED
 *
 * TO IMPORT:
 *   const VariableHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/VariableHandler.js`);
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

            // ROOM VARIABLES, IF TRUE THE CHEST/EMERALD HAS BEEN TRIGGERED
            room_one: "room_one",
            room_two: "room_two",
            room_three: "room_three",
            room_boss: "room_boss",
            emerald_one_one: "emerald_one_1",
            emerald_one_two: "emerald_one_2",
            emerald_one_three: "emerald_one_3",
            emerald_one_four: "emerald_one_4",
            emerald_two_one: "emerald_two_1",
            emerald_two_two: "emerald_two_2",
            emerald_two_three: "emerald_two_3",
            emerald_two_four: "emerald_two_4",
            emerald_three_one: "emerald_three_1",
            emerald_three_two: "emerald_three_2",
            emerald_three_three: "emerald_three_3",
            emerald_three_four: "emerald_three_4",
            emerald_four_one: "emerald_four_1",
            emerald_four_two: "emerald_four_2",
            emerald_four_three: "emerald_four_3",
            emerald_four_four: "emerald_four_4",
            four_chests_one_one: "four_chests_one_1",
            four_chests_one_two: "four_chests_one_2",
            four_chests_one_three: "four_chests_one_3",
            four_chests_one_four: "four_chests_one_4",
            four_chests_two_one: "four_chests_two_1",
            four_chests_two_two: "four_chests_two_2",
            four_chests_two_three: "four_chests_two_3",
            four_chests_two_four: "four_chests_two_4",
            four_chests_three_one: "four_chests_three_1",
            four_chests_three_two: "four_chests_three_2",
            four_chests_three_three: "four_chests_three_3",
            four_chests_three_four: "four_chests_three_4",
            key_door_one: "key_door_one",
            key_door_two: "key_door_two",
            key_door_three: "key_door_three",
            key_door_four: "key_door_four",
            key_door_five: "key_door_five",
            key_door_boss: "key_door_boss",

            // CLEAR VARIABLES, IF TRUE THEN ROOM IS CLEARED AND KEY IS OBTAINED OR DOOR IS UNLOCKED
            room_one_clear: "room_one_clear",
            room_two_clear: "room_two_clear",
            room_three_clear: "room_three_clear",
            emerald_one_clear: "emerald_one_clear",
            emerald_two_clear: "emerald_two_clear",
            emerald_three_clear: "emerald_three_clear",
            emerald_four_clear: "emerald_four_clear",

            // EMERALD / FOUR CHESTS RANDOM VALUE, SELECTED VALUE HAS THE KEY/UNLOCKS THE DOOR
            emerald_one_value: "emerald_one_value",
            emerald_two_value: "emerald_two_value",
            emerald_three_value: "emerald_three_value",
            emerald_four_value: "emerald_four_value",
            four_chests_one_value: "four_chests_one_value",
            four_chests_two_value: "four_chests_two_value",
            four_chests_three_value: "four_chests_three_value",

            // DUNGEON STATUS
            keys: "keys",
            difficulty: "difficulty",
            impossible: "impossible",
            drop_rate: "drop_rate",
            soul_essence: "soul_essence",
            zombie_kill_count: "zombie_kill_count",

            // PERMANENT VARIABLES
            cash_money_start: "cash_money_start", // string with start date of money collection
            cash_money: "cash_money", // count how much money spent in AlbeyDungeon
            hall_of_fame: "hall_of_fame", // List of player names/uuids who cleared impossible difficulty
        }

        function init(dungeon) {
            dungeon.setTempVariable(VARIABLE_NAMES.init, true);
            dungeon.setTempVariable(VARIABLE_NAMES.start, false);

            dungeon.setTempVariable(VARIABLE_NAMES.room_one, false);
            dungeon.setTempVariable(VARIABLE_NAMES.room_two, false);
            dungeon.setTempVariable(VARIABLE_NAMES.room_three, false);
            dungeon.setTempVariable(VARIABLE_NAMES.room_boss, false);

            dungeon.setTempVariable(VARIABLE_NAMES.emerald_one_one, false);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_one_two, false);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_one_three, false);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_one_four, false);

            dungeon.setTempVariable(VARIABLE_NAMES.emerald_two_one, false);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_two_two, false);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_two_three, false);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_two_four, false);

            dungeon.setTempVariable(VARIABLE_NAMES.emerald_three_one, false);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_three_two, false);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_three_three, false);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_three_four, false);

            dungeon.setTempVariable(VARIABLE_NAMES.emerald_four_one, false);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_four_two, false);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_four_three, false);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_four_four, false);

            dungeon.setTempVariable(VARIABLE_NAMES.four_chests_one_one, false);
            dungeon.setTempVariable(VARIABLE_NAMES.four_chests_one_two, false);
            dungeon.setTempVariable(VARIABLE_NAMES.four_chests_one_three, false);
            dungeon.setTempVariable(VARIABLE_NAMES.four_chests_one_four, false);

            dungeon.setTempVariable(VARIABLE_NAMES.four_chests_two_one, false);
            dungeon.setTempVariable(VARIABLE_NAMES.four_chests_two_two, false);
            dungeon.setTempVariable(VARIABLE_NAMES.four_chests_two_three, false);
            dungeon.setTempVariable(VARIABLE_NAMES.four_chests_two_four, false);

            dungeon.setTempVariable(VARIABLE_NAMES.four_chests_three_one, false);
            dungeon.setTempVariable(VARIABLE_NAMES.four_chests_three_two, false);
            dungeon.setTempVariable(VARIABLE_NAMES.four_chests_three_three, false);
            dungeon.setTempVariable(VARIABLE_NAMES.four_chests_three_four, false);

            dungeon.setTempVariable(VARIABLE_NAMES.key_door_one, false);
            dungeon.setTempVariable(VARIABLE_NAMES.key_door_two, false);
            dungeon.setTempVariable(VARIABLE_NAMES.key_door_three, false);
            dungeon.setTempVariable(VARIABLE_NAMES.key_door_four, false);
            dungeon.setTempVariable(VARIABLE_NAMES.key_door_five, false);
            dungeon.setTempVariable(VARIABLE_NAMES.key_door_boss, false);

            dungeon.setTempVariable(VARIABLE_NAMES.room_one_clear, false);
            dungeon.setTempVariable(VARIABLE_NAMES.room_two_clear, false);
            dungeon.setTempVariable(VARIABLE_NAMES.room_three_clear, false);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_one_clear, false);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_two_clear, false);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_three_clear, false);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_four_clear, false);

            dungeon.setTempVariable(VARIABLE_NAMES.keys, 0);
            dungeon.setTempVariable(VARIABLE_NAMES.difficulty, "");
            dungeon.setTempVariable(VARIABLE_NAMES.impossible, false);
            dungeon.setTempVariable(VARIABLE_NAMES.drop_rate, 1);
            dungeon.setTempVariable(VARIABLE_NAMES.soul_essence, 0);
            dungeon.setTempVariable(VARIABLE_NAMES.zombie_kill_count, 0);

            // SET EMERALD/FOUR_CHESTS RNG VALUE
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_one_value, Math.floor(Math.random() * 4) + 1);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_two_value, Math.floor(Math.random() * 4) + 1);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_three_value, Math.floor(Math.random() * 4) + 1);
            dungeon.setTempVariable(VARIABLE_NAMES.emerald_four_value, Math.floor(Math.random() * 4) + 1);
            dungeon.setTempVariable(VARIABLE_NAMES.four_chests_one_value, Math.floor(Math.random() * 4) + 1);
            dungeon.setTempVariable(VARIABLE_NAMES.four_chests_two_value, Math.floor(Math.random() * 4) + 1);
            dungeon.setTempVariable(VARIABLE_NAMES.four_chests_three_value, Math.floor(Math.random() * 4) + 1);
        }

        return {
            variable_names: VARIABLE_NAMES,
            init: init
        };
    })();
}
main();