/**
 * NONE type script
 *
 * MANAGES INFORMATION ABOUT AlbeyDungeon's CURRENT DIFFICULTY LEVEL
 * (difficulty names and messages).
 *
 * TO IMPORT:
 *   const DifficultyHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/DifficultyHandler.js`);
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        const DIFFICULTY = {
            UNKNOWN: "???",
            HARD: "Hard",
            EXTREME: "Extreme",
            IMPOSSIBLE: "Impossible"
        }

        function get_difficulty(party_size, impossible_flag = false) {
            if (party_size >= 5 && impossible_flag) {
                return DIFFICULTY.IMPOSSIBLE;   // 5+ players and impossible_flag triggered
            }
            else if (party_size >= 4) {
                return DIFFICULTY.EXTREME;      // 4+ players
            }
            else if(party_size >= 1) {
                return DIFFICULTY.HARD;         // 1-3 players
            }
            return DIFFICULTY.UNKNOWN;
        }

        function get_message(difficulty) {
            switch(difficulty) {
                case DIFFICULTY.EXTREME:
                    return "A satanic pulse rushes through the corridors, making you nauseous...";
                case DIFFICULTY.IMPOSSIBLE:
                    return "Wha... What are you still doing here?! G... Go away!";
                default:
                    return "The demonic gusts roast your body...";
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