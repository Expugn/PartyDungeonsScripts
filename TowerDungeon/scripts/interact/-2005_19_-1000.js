/**
 * INTERACT type script for BLOCK (-2005, 19, -1000)
 *
 * Number Guess - Answer Submit Button
 *
 * @author      Expugn
 * @version     0.1
 * @type        INTERACT
 * @block       -2005, 19, -1000
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 */
function main() {
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const NumberGuess = load(`${sm.getScriptDirectory("TowerDungeon")}/NumberGuess.js`);
    const var_names = load(`${sm.getScriptDirectory("TowerDungeon")}/VariableHandler.js`).names;
    const dungeon = sm.getDungeon(player);

    if (dungeon.getTempVariable(var_names.number_guess_clear)) {
        return;
    }

    const result = NumberGuess.check(dungeon.getParty(), dungeon.getTempVariable(var_names.number_guess_answer));
    if (!result[0]) {
        // INCORRECT
        dungeon.messageParty(`${ChatColor.RED}Wrong guess! Try again.`);
        return;
    }

    // CORRECT
    const grade = NumberGuess.grade(dungeon.getTempVariable(var_names.number_guess_start));
    dungeon.messageParty(`${ChatColor.GREEN}Correct! ${ChatColor.GOLD}${result[1].join("")} ${ChatColor.GREEN}was the answer!\n${ChatColor.ITALIC}${ChatColor.GRAY}${NumberGuess.comment(grade)}`);
    dungeon.setTempVariable(var_names.score, dungeon.getTempVariable(var_names.score) + grade);
    dungeon.setTempVariable(var_names.number_guess_clear, true);

    // MOVE PARTY TO NEXT PUZZLE HERE
    const ProgressHandler = load(`${sm.getScriptDirectory("TowerDungeon")}/ProgressHandler.js`);
    ProgressHandler.advance(player.getWorld(), dungeon.getParty(), dungeon.getTempVariable(var_names.progress));
}
main();