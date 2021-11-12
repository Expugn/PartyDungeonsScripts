/**
 * NONE type script
 *
 * Handles all variables and the initialization of them.
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        const VARIABLES = {
            // SYSTEM
            init: "variables_initialized",
            score: "score",
            progress: "progress",

            // NUMBER GUESS
            number_guess_answer: "number_guess_answer",
            number_guess_start: "number_guess_start",
            number_guess_clear: "number_guess_clear",

            // RECORD HUNT
            record_hunt_start: "record_hunt_start",
            record_hunt_clear: "record_hunt_clear",

            // TOWER CLIMB
            tower_climb_start: "tower_climb_start",
            tower_climb_answer: "tower_climb_answer",
            tower_climb_clear: "tower_climb_clear",

            // MATH
            math_count: "math_count",
            math_incorrect: "math_incorrect",
            math_problem: "math_problem",
            math_answer: "math_answer",

            // GIANT COMBAT
            giant_combat_start: "giant_combat_start",

            // DODGE GAME
            dodge_game_players: "dodge_game_players",
            dodge_game_in_progress: "dodge_game_in_progress",

            // TRIVIA GAME
            trivia_game_incorrect: "trivia_game_incorrect",
            trivia_game_complete: "trivia_game_complete",
            // trivia_game_complete_<player_name>
            // trivia_game_answers_<player_name>
        }

        function init(dungeon) {
            const ProgressHandler = load(`${sm.getScriptDirectory("TowerDungeon")}/ProgressHandler.js`);
            dungeon.setTempVariable(VARIABLES.init, true);
            dungeon.setTempVariable(VARIABLES.score, 0);
            dungeon.setTempVariable(VARIABLES.progress, ProgressHandler.get_progress());
        }

        function init_number_guess(dungeon) {
            const NumberGuess = load(`${sm.getScriptDirectory("TowerDungeon")}/NumberGuess.js`);
            dungeon.setTempVariable(VARIABLES.number_guess_answer, NumberGuess.answer());
            dungeon.setTempVariable(VARIABLES.number_guess_start, Date.now());
            dungeon.setTempVariable(VARIABLES.number_guess_clear, false);
        }

        function init_record_hunt(dungeon) {
            dungeon.setTempVariable(VARIABLES.record_hunt_start, Date.now());
            dungeon.setTempVariable(VARIABLES.record_hunt_clear, false);
        }

        function init_tower_climb(dungeon) {
            const TowerClimb = load(`${sm.getScriptDirectory("TowerDungeon")}/TowerClimb.js`);
            dungeon.setTempVariable(VARIABLES.tower_climb_start, Date.now());
            dungeon.setTempVariable(VARIABLES.tower_climb_answer, TowerClimb.answer());
            dungeon.setTempVariable(VARIABLES.tower_climb_clear, false);
        }

        function init_math(dungeon) {
            const MathGame = load(`${sm.getScriptDirectory("TowerDungeon")}/MathGame.js`);
            dungeon.setTempVariable(VARIABLES.math_count, 0);
            dungeon.setTempVariable(VARIABLES.math_incorrect, 0);
            const problem = MathGame.problem();
            dungeon.setTempVariable(VARIABLES.math_problem, problem[0]);
            dungeon.setTempVariable(VARIABLES.math_answer, problem[1]);
            const ChatColor = Java.type("org.bukkit.ChatColor");
            dungeon.messageParty(`${ChatColor.GRAY}The first problem is: ${problem[0]}`);
        }

        function init_giant_combat(dungeon) {
            const GiantCombat = load(`${sm.getScriptDirectory("TowerDungeon")}/GiantCombat.js`);
            dungeon.setTempVariable(VARIABLES.giant_combat_start, Date.now());
            GiantCombat.spawn(dungeon.getDungeon().getDungeonFile().getWorld());
        }

        function init_dodge_game(dungeon) {
            dungeon.setTempVariable(VARIABLES.dodge_game_players, 0);
            dungeon.setTempVariable(VARIABLES.dodge_game_in_progress, false);
        }

        function init_trivia_game(dungeon) {
            const TriviaGame = load(`${sm.getScriptDirectory("TowerDungeon")}/TriviaGame.js`);
            dungeon.setTempVariable(VARIABLES.trivia_game_incorrect, 0);
            dungeon.setTempVariable(VARIABLES.trivia_game_complete, 0);
            const party = dungeon.getParty();
            const ChatColor = Java.type("org.bukkit.ChatColor");
            for (const uuid in party) {
                const player = sm.getPlayerFromUUID(uuid);
                const question = TriviaGame.question();
                dungeon.setTempVariable(`trivia_game_complete_${player.getName()}`, false);
                dungeon.setTempVariable(`trivia_game_answers_${player.getName()}`, question[1]);
                player.sendMessage(`${ChatColor.YELLOW}${question[0]}`);
            }
        }

        return {
            names: VARIABLES,
            init: init,
            init_number_guess: init_number_guess,
            init_record_hunt: init_record_hunt,
            init_tower_climb: init_tower_climb,
            init_math: init_math,
            init_giant_combat: init_giant_combat,
            init_dodge_game: init_dodge_game,
            init_trivia_game: init_trivia_game,
        };
    })();
}
main();