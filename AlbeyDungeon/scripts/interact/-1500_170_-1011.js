/**
 * INTERACT type script for BLOCK (-1500, 170, -1011)
 *
 * Albey Dungeon Hall of Fame Sign Interaction
 * Only players who have completed AlbeyDungeon in Impossible difficulty will appear in the hall of fame.
 *
 * @author      Expugn
 * @version     0.1
 * @type        INTERACT
 * @block       -1500, 170, -1011
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 */
function main() {
    const ChatColor = Java.type("org.bukkit.ChatColor");
    player.sendMessage(`${ChatColor.GRAY}The following is a list of players who have completed the\ndungeon in ${ChatColor.RED}IMPOSSIBLE ${ChatColor.GRAY}difficulty. Congratulations!`);
    const dungeon = sm.getDungeon(player);
    const hall_of_fame = dungeon.getDungeon().getDungeonFile().getVariable("hall_of_fame");
    for (const obj of hall_of_fame) {
        player.sendMessage(`${ChatColor.DARK_GRAY}- ${ChatColor.GOLD}${obj[1]} ${ChatColor.GRAY}(${new Date(obj[2]).toString()})`);
    }
}
main();