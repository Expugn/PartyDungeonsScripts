/**
 * INTERACT type script for BLOCK (-2010, 90, -532)
 *
 * Player Three - Item Submit Block
 *
 * @author      Expugn
 * @version     0.1
 * @type        INTERACT
 * @block       -2010, 90, -532
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 */
function main() {
    const ItemHandler = load(`${sm.getScriptDirectory("RecklessCrafting")}/ItemHandler.js`);
    const dungeon = sm.getDungeon(player);

    if (dungeon.isCleared()) {
        return;
    }

    const items = dungeon.getTempVariable("items");
    if (!ItemHandler.check(player, items)) {
        ItemHandler.print_check(player, items);
        return;
    }

    // PLAYER HAS ALL ITEMS;
    dungeon.clear();
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const prefix = `${ChatColor.BLACK}[${ChatColor.DARK_PURPLE}RecklessCrafting${ChatColor.BLACK}] `;
    const prefix_short = `${ChatColor.BLACK}[${ChatColor.DARK_PURPLE}*${ChatColor.BLACK}] `;
    dungeon.messageArea(`${prefix}${ChatColor.LIGHT_PURPLE}${player.getName()} ${ChatColor.YELLOW}has crafted all the items and won the game!`);

    // KICK ALL PLAYERS OUT OF ARENA AND TELEPORT WINNING PLAYER TO LOOT CHEST
    const ScheduleHandler = load(`${sm.getScriptDirectory("RecklessCrafting")}/ScheduleHandler.js`);
    ScheduleHandler(() => {
        const Location = Java.type("org.bukkit.Location");
        for (const uuid in dungeon.getParty()) {
            const party_member = sm.getPlayerFromUUID(uuid);
            if (uuid === player.getUniqueId()) {
                const prize_money = 100;
                if (sm.depositMoney(player, prize_money)) {
                    player.sendMessage(`${prefix_short}${ChatColor.DARK_AQUA}Congratulations! You have been rewarded ${ChatColor.YELLOW}$${prize_money} ${ChatColor.DARK_AQUA}for your efforts!`);
                }
            }
            else {
                party_member.sendMessage(`${prefix_short}${ChatColor.DARK_AQUA}Better luck next time!`);
            }
        }
        dungeon.stop();
        ScheduleHandler(() => player.teleport(new Location(player.getWorld(), -2022.5, 80.25, -495.5, -90, 0)));
    });
}
main();