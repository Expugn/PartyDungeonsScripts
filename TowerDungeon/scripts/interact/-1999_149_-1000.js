/**
 * INTERACT type script for BLOCK (-1999, 149, -1000)
 *
 * Trivia Game - Answer Submit Button
 *
 * @author      Expugn
 * @version     0.1
 * @type        INTERACT
 * @block       -1999, 149, -1000
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 */
function main() {
    const TriviaGame = load(`${sm.getScriptDirectory("TowerDungeon")}/TriviaGame.js`);
    const var_names = load(`${sm.getScriptDirectory("TowerDungeon")}/VariableHandler.js`).names;
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const Material = Java.type("org.bukkit.Material");
    const dungeon = sm.getDungeon(player);
    const item = player.getInventory().getItemInMainHand();

    if (dungeon.getTempVariable(`${var_names.trivia_game_complete}_${player.getName()}`)) {
        player.sendMessage(`${ChatColor.RED}You have already solved your trivia question.`);
        return;
    }

    if (item.getType() !== Material.PAPER || !item.getItemMeta().getDisplayName().contains("Trivia Ticket")) {
        player.sendMessage(`${ChatColor.RED}Make sure you are holding a ${ChatColor.WHITE}Trivia Ticket ${ChatColor.RED}.`);
        return;
    }

    const answer = dungeon.getTempVariable(`trivia_game_answers_${player.getName()}`);
    if (!TriviaGame.check(item, answer)) {
        // WRONG ANSWER
        dungeon.setTempVariable(var_names.trivia_game_incorrect, dungeon.getTempVariable(var_names.trivia_game_incorrect) + 1);
        dungeon.messageParty(`${ChatColor.GOLD}${player.getName()} ${ChatColor.RED}got the answer to their question wrong!`);
        return;
    }
    dungeon.messageParty(`${ChatColor.GOLD}${player.getName()} ${ChatColor.GREEN}answered their question correctly!`);
    item.setAmount(item.getAmount() - answer);

    dungeon.setTempVariable(`trivia_game_complete_${player.getName()}`, true);
    dungeon.setTempVariable(var_names.trivia_game_complete, dungeon.getTempVariable(var_names.trivia_game_complete) + 1);

    if (dungeon.getTempVariable(var_names.trivia_game_complete) >= 4) {
        // EVERYONE SOLVED THEIR QUESTIONS
        const grade = TriviaGame.grade(dungeon.getTempVariable(var_names.trivia_game_incorrect));
        dungeon.messageParty(`${ChatColor.GREEN}Everyone answered their questions correctly!\n${ChatColor.ITALIC}${ChatColor.GRAY}${TriviaGame.comment(grade)}`);
        dungeon.setTempVariable(var_names.score, dungeon.getTempVariable(var_names.score) + grade);

        const ProgressHandler = load(`${sm.getScriptDirectory("TowerDungeon")}/ProgressHandler.js`);
        ProgressHandler.advance(player.getWorld(), dungeon.getParty(), dungeon.getTempVariable(var_names.progress));
    }
}
main();