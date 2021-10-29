/**
 * INTERACT type script for BLOCK (-1490, 69, -503)
 * 
 * Drop Multiplier x2 Shop interaction
 *
 * @author      Expugn
 * @version     0.1
 * @type        INTERACT
 * @block       -1490, 69, -503
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 */
function main() {
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const Material = Java.type("org.bukkit.Material");
    const var_names = load(`${sm.getScriptDirectory("AlbyDungeon")}/VariableHandler.js`).variable_names;
    const dungeon = sm.getDungeon(player);
    const drop_rate = dungeon.getTempVariable(var_names.drop_rate);

    if (drop_rate !== 1) {
        // DROP RATE ISN'T x1 ANYMORE, MUST'VE BEEN MODIFIED ALREADY
        player.sendMessage(`${ChatColor.GRAY}There is already a drop rate multiplier active.`);
        return;
    }

    // CHECK FOR LUCKY COUPON
    const SpecialItemHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/SpecialItemHandler.js`);
    const item = player.getInventory().getItemInHand();
    if (item.getType() === Material.PAPER && SpecialItemHandler.compare(player, SpecialItemHandler.lucky_coupon_name.COUPON_x2)) {
        // LUCKY COUPON FOUND
        sm.getDungeon(player).messageArea(`${ChatColor.GOLD}${player.getName()} ${ChatColor.GRAY}used a ${item.getItemMeta().getDisplayName()} ${ChatColor.GRAY}to purchase a drop rate multiplier.`);
        dungeon.setTempVariable(var_names.drop_rate, 2);
        item.setAmount(item.getAmount() - 1);
        player.getInventory().setItemInMainHand(item);
        return;
    }

    // NO LUCKY COUPON? GUESS WE GOTTA USE CASH
    if (!sm.isEconomyEnabled()) {
        // ECONOMY ISN'T ENABLED
        player.sendMessage(`${ChatColor.GRAY}There is no economy in this server. You must use a ${ChatColor.DARK_PURPLE}Lucky Coupon${ChatColor.GRAY}.`);
        return;
    }

    // HANDLE TRANSACTION
    const price = 1000;
    if (!sm.withdrawMoney(player, price)) {
        // TRANSACTION FAILED
        player.sendMessage(`${ChatColor.GRAY}You do not have enough money.`);
        return;
    }
    // TRANSACTION SUCCESSFUL
    const dungeon_file = dungeon.getDungeon().getDungeonFile();
    const cash_money = dungeon_file.getVariable(var_names.cash_money);
    dungeon_file.setVariable(var_names.cash_money, cash_money ? cash_money + price : price);
    dungeon_file.saveJSON(dungeon.getDungeon().getName());
    dungeon.messageArea(`${ChatColor.GOLD}${player.getName()} ${ChatColor.GRAY}has purchased the ${ChatColor.GOLD}x2 ${ChatColor.GRAY}drop rate multiplier.`);
    dungeon.setTempVariable(var_names.drop_rate, 2);
}
main();