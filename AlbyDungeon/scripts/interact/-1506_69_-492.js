/**
 * INTERACT type script for BLOCK (-1506, 69, -492)
 *
 * Mysterious Cauldron Interaction
 *
 * @author      Expugn
 * @version     0.1
 * @type        INTERACT
 * @block       -1506, 69, -492
 *
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {Player}          player     SCRIPT BINDING
 */
function main() {
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const Material = Java.type("org.bukkit.Material");
    const var_names = load(`${sm.getScriptDirectory("AlbyDungeon")}/VariableHandler.js`).variable_names;
    const soul_essence = dungeon.getTempVariable(var_names.soul_essence);
    if (soul_essence !== 0) {
        // SOUL ESSENCE HAS ALREADY BEEN ADDED
        player.sendMessage(`${ChatColor.GRAY}The ${ChatColor.GOLD}Mysterious Cauldron ${ChatColor.GRAY}is dissipating the ${ChatColor.DARK_PURPLE}Soul Essence${ChatColor.GRAY}.`);
        return;
    }
    const item = player.getInventory().getItemInMainHand();
    if (item.getType() !== Material.GHAST_TEAR) {
        // NOT A GHAST TEAR? IGNORE.
        player.sendMessage(`${ChatColor.GRAY}The ${ChatColor.GOLD}Mysterious Cauldron ${ChatColor.GRAY}bubbles and boils.`);
        return;
    }

    // POSSIBLY A SOUL ESSENCE?
    const SpecialItemHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/SpecialItemHandler.js`);
    const item_name = item.getItemMeta().getDisplayName();
    switch(item_name) {
        case SpecialItemHandler.soul_essence_name.SPEED_1:
            dungeon.setTempVariable(var_names.soul_essence, 1);
            break;
        case SpecialItemHandler.soul_essence_name.STRENGTH_1:
            dungeon.setTempVariable(var_names.soul_essence, 2);
            break;
        case SpecialItemHandler.soul_essence_name.SPEED_2:
            dungeon.setTempVariable(var_names.soul_essence, 3);
            break;
        case SpecialItemHandler.soul_essence_name.FIRE_RESISTANCE_1:
            dungeon.setTempVariable(var_names.soul_essence, 4);
            break;
        case SpecialItemHandler.soul_essence_name.STRENGTH_2:
            dungeon.setTempVariable(var_names.soul_essence, 5);
            break;
        case SpecialItemHandler.soul_essence_name.RESISTANCE_1:
            dungeon.setTempVariable(var_names.soul_essence, 6);
            break;
        case SpecialItemHandler.soul_essence_name.HEALTH_BOOST_1:
            dungeon.setTempVariable(var_names.soul_essence, 7);
            break;
        case SpecialItemHandler.soul_essence_name.REGENERATION_1:
            dungeon.setTempVariable(var_names.soul_essence, 8);
            break;
        case SpecialItemHandler.soul_essence_name.HEALTH_BOOST_3:
            dungeon.setTempVariable(var_names.soul_essence, 9);
            break;
        case SpecialItemHandler.soul_essence_name.STRENGTH_3:
            dungeon.setTempVariable(var_names.soul_essence, 10);
            break;
        default:
            player.sendMessage(`${ChatColor.GRAY}The ${ChatColor.GOLD}Mysterious Cauldron ${ChatColor.GRAY}bubbles and boils.`);
            return;
    }
    // REMOVE ITEM FROM HAND AND ALERT AREA
    item.setAmount(item.getAmount() - 1);
    player.getInventory().setItemInMainHand(item);
    sm.getDungeon(player).messageArea(`${ChatColor.GOLD}${player.getName()} ${ChatColor.GRAY}placed a ${item_name} ${ChatColor.GRAY}into the ${ChatColor.GOLD}Mysterious Cauldron${ChatColor.GRAY}.`);
}
main();