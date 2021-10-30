/**
 * NONE type script
 *
 * MANAGES INFORMATION ABOUT AlbyDungeon's CURRENT DIFFICULTY LEVEL
 * (difficulty names and messages).
 *
 * TO IMPORT:
 *   const DifficultyHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/DifficultyHandler.js`);
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        const DIFFICULTY = {
            UNKNOWN: "???",
            EASY: "Easy",
            NORMAL: "Normal",
            HARD: "Hard",
            EXTREME: "Extreme"
        }

        function get_difficulty(party_size, extreme_flag = false) {
            if (party_size >= 5 && extreme_flag) {
                return DIFFICULTY.EXTREME;  // 5+ players and extreme_flag triggered
            }
            else if (party_size >= 5) {
                return DIFFICULTY.HARD;     // 5+ players
            }
            else if(party_size >= 3) {
                return DIFFICULTY.NORMAL;   // 3-4 players
            }
            else if (party_size >= 1) {
                return DIFFICULTY.EASY;     // 1-2 players
            }
            return DIFFICULTY.UNKNOWN;
        }

        function get_message(difficulty) {
            switch(difficulty) {
                case DIFFICULTY.NORMAL:
                    return "A hostile feeling looms over you...";
                case DIFFICULTY.HARD:
                    return "A dark aura from the dungeon makes your stomach sick...";
                case DIFFICULTY.EXTREME:
                    return "A gloomy fog coats the entire dungeon. Maybe you should turn back...";
                default:
                    return "A silent breeze flows through the dungeon...";
            }
        }

        return {
            difficulty_names: DIFFICULTY,
            get_difficulty: get_difficulty,
            get_message: get_message
        };
    })();
}
main();