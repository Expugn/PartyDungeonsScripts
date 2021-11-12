/**
 * INTERACT type script for BLOCK (-2005, 83, -1000)
 *
 * Math Game - Answer Submit Button
 *
 * @author      Expugn
 * @version     0.1
 * @type        INTERACT
 * @block       -2005, 83, -1000
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 */
function main() {
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const MathGame = load(`${sm.getScriptDirectory("TowerDungeon")}/MathGame.js`);
    const var_names = load(`${sm.getScriptDirectory("TowerDungeon")}/VariableHandler.js`).names;
    const dungeon = sm.getDungeon(player);

    if (dungeon.getTempVariable(var_names.math_count) >= 5) {
        return;
    }

    const result = MathGame.check(dungeon.getParty(), dungeon.getTempVariable(var_names.math_answer));
    if (!result[0]) {
        // INCORRECT
        dungeon.messageParty(`${ChatColor.RED}Wrong answer! Try again. ${ChatColor.GRAY}The question is:\n${dungeon.getTempVariable(var_names.math_problem)}`);
        dungeon.setTempVariable(var_names.math_incorrect, dungeon.getTempVariable(var_names.math_incorrect) + 1);
        return;
    }

    // CORRECT ANSWER
    dungeon.setTempVariable(var_names.math_count, dungeon.getTempVariable(var_names.math_count) + 1);
    if (dungeon.getTempVariable(var_names.math_count) < 5) {
        // ASK ANOTHER QUESTION
        const previous_answer = dungeon.getTempVariable(var_names.math_answer);
        const problem = MathGame.problem();
        dungeon.setTempVariable(var_names.math_problem, problem[0]);
        dungeon.setTempVariable(var_names.math_answer, problem[1]);
        dungeon.messageParty(`${ChatColor.GOLD}${previous_answer} (${result[1]}) ${ChatColor.GREEN}was the correct answer!\n${ChatColor.GRAY}Next problem: ${dungeon.getTempVariable(var_names.math_problem)}`);
        return;
    }

    // MATH GAME COMPLETE
    const grade = MathGame.grade(dungeon.getTempVariable(var_names.math_incorrect));
    dungeon.messageParty(`${ChatColor.GREEN}All five problems have been solved!\n${ChatColor.ITALIC}${ChatColor.GRAY}${MathGame.comment(grade)}`);
    dungeon.setTempVariable(var_names.score, dungeon.getTempVariable(var_names.score) + grade);

    const ProgressHandler = load(`${sm.getScriptDirectory("TowerDungeon")}/ProgressHandler.js`);
    ProgressHandler.advance(player.getWorld(), dungeon.getParty(), dungeon.getTempVariable(var_names.progress));
}
main();