/**
 * DUNGEON type script for DUNGEON RecklessCrafting
 *
 * DungeonStatus is a script that containing instructions
 * on how to handle a user when they run `/partydungeons status`.
 *
 * @author      CONSOLE
 * @version     0.1
 * @version     DUNGEON
 * @dungeon     RecklessCrafting
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {LoadedDungeon}   dungeon    SCRIPT BINDING
 */
function main() {
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const prefix = `${ChatColor.BLACK}[${ChatColor.DARK_PURPLE}RecklessCrafting${ChatColor.BLACK}] `;
    let status = "";
    status += `${prefix}${ChatColor.DARK_AQUA}Current Status:\n`;
    status += `${ChatColor.YELLOW}Players:\n`;
    for (const uuid in dungeon.getParty()) {
        status += `${ChatColor.DARK_RED}- ${ChatColor.GOLD}${sm.getPlayerFromUUID(uuid).getName()}\n`;
    }
    player.sendMessage(status);
    if (dungeon.isActive()) {
        const ItemHandler = load(`${sm.getScriptDirectory("RecklessCrafting")}/ItemHandler.js`);
        const items = dungeon.getTempVariable("items");
        ItemHandler.print_check(player, items)
    }
}
main();