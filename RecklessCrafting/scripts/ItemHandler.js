/**
 * NONE type script
 *
 * Manages everything about items for the RecklessCrafting minigame.
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        const Material = Java.type("org.bukkit.Material");
        const CATEGORY_TOOLS = [
            Material.DIAMOND_PICKAXE,
            Material.DIAMOND_AXE,
            Material.DIAMOND_HOE,
            Material.DIAMOND_SHOVEL,
            Material.DIAMOND_SWORD,
            Material.NETHERITE_PICKAXE,
            Material.NETHERITE_AXE,
            Material.NETHERITE_HOE,
            Material.NETHERITE_SHOVEL,
            Material.NETHERITE_SWORD,
        ];
        const CATEGORY_ARMOR = [
            Material.DIAMOND_HELMET,
            Material.DIAMOND_CHESTPLATE,
            Material.DIAMOND_LEGGINGS,
            Material.DIAMOND_BOOTS,
            Material.NETHERITE_HELMET,
            Material.NETHERITE_CHESTPLATE,
            Material.NETHERITE_LEGGINGS,
            Material.NETHERITE_BOOTS,
        ];
        const CATEGORY_FARM = [
            Material.HAY_BLOCK,
            Material.MUSHROOM_STEW,
            Material.BAKED_POTATO,
            Material.MELON,
            Material.BEETROOT_SOUP,
            Material.GLISTERING_MELON_SLICE,
        ];
        const CATEGORY_FOOD = [
            Material.BREAD,
            Material.COOKIE,
            Material.GOLDEN_APPLE,
            Material.GOLDEN_CARROT,
            Material.CAKE,
            Material.PUMPKIN_PIE,
            Material.COOKED_COD,
            Material.COOKED_SALMON,
        ];
        const CATEGORY_MINE = [
            Material.REDSTONE_BLOCK,
            Material.LAPIS_BLOCK,
            Material.EMERALD_BLOCK,
            Material.GOLD_BLOCK,
            Material.IRON_BLOCK,
            Material.COAL_BLOCK,
            Material.COPPER_BLOCK,
        ];
        const CATEGORY_MACHINE = [
            Material.PISTON,
            Material.DAYLIGHT_DETECTOR,
            Material.IRON_TRAPDOOR,
            Material.DISPENSER,
            Material.DROPPER,
            Material.TARGET,
            Material.OBSERVER,
            Material.LIGHTNING_ROD,
            Material.JUKEBOX,
            Material.ANVIL,
            Material.ENCHANTING_TABLE,
        ];
        const CATEGORY_CART = [
            Material.MINECART,
            Material.CHEST_MINECART,
            Material.FURNACE_MINECART,
            Material.HOPPER_MINECART,
            Material.RAIL,
            Material.POWERED_RAIL,
            Material.DETECTOR_RAIL,
            Material.ACTIVATOR_RAIL,
        ];
        const CATEGORY_REDSTONE = [
            Material.REPEATER,
            Material.COMPARATOR,
            Material.REDSTONE_LAMP,
            Material.LIGHT_WEIGHTED_PRESSURE_PLATE,
            Material.HEAVY_WEIGHTED_PRESSURE_PLATE,
            Material.NOTE_BLOCK,
        ];
        return {
            init: init,
            check: check,
            print_check: print_check,
            toString: toString,

            tools: CATEGORY_TOOLS,
            armor: CATEGORY_ARMOR,
            farm: CATEGORY_FARM,
            food: CATEGORY_FOOD,
            mine: CATEGORY_MINE,
            machine: CATEGORY_MACHINE,
            cart: CATEGORY_CART,
            redstone: CATEGORY_REDSTONE,
        };

        function init() {
            return [
                CATEGORY_TOOLS[Math.floor(Math.random() * CATEGORY_TOOLS.length)],
                CATEGORY_ARMOR[Math.floor(Math.random() * CATEGORY_ARMOR.length)],
                CATEGORY_FARM[Math.floor(Math.random() * CATEGORY_FARM.length)],
                CATEGORY_FOOD[Math.floor(Math.random() * CATEGORY_FOOD.length)],
                CATEGORY_MINE[Math.floor(Math.random() * CATEGORY_MINE.length)],
                CATEGORY_MACHINE[Math.floor(Math.random() * CATEGORY_MACHINE.length)],
                CATEGORY_CART[Math.floor(Math.random() * CATEGORY_CART.length)],
                CATEGORY_REDSTONE[Math.floor(Math.random() * CATEGORY_REDSTONE.length)],
            ];
        }
        function check(player, items) {
            const inventory = player.getInventory();
            return inventory.contains(items[0], 1)
                && inventory.contains(items[1], 1)
                && inventory.contains(items[2], 1)
                && inventory.contains(items[3], 1)
                && inventory.contains(items[4], 1)
                && inventory.contains(items[5], 1)
                && inventory.contains(items[6], 1)
                && inventory.contains(items[7], 1);
        }
        function print_check(player, items) {
            const ChatColor = Java.type("org.bukkit.ChatColor");
            const inventory = player.getInventory();
            player.sendMessage(`${ChatColor.GOLD}Craft These Items!\n`
                + `${ChatColor.DARK_RED}- ${ChatColor.GOLD}1: ${inventory.contains(items[0], 1) ? ChatColor.GREEN : ChatColor.RED}${items[0]}\n`
                + `${ChatColor.DARK_RED}- ${ChatColor.GOLD}2: ${inventory.contains(items[1], 1) ? ChatColor.GREEN : ChatColor.RED}${items[1]}\n`
                + `${ChatColor.DARK_RED}- ${ChatColor.GOLD}3: ${inventory.contains(items[2], 1) ? ChatColor.GREEN : ChatColor.RED}${items[2]}\n`
                + `${ChatColor.DARK_RED}- ${ChatColor.GOLD}4: ${inventory.contains(items[3], 1) ? ChatColor.GREEN : ChatColor.RED}${items[3]}\n`
                + `${ChatColor.DARK_RED}- ${ChatColor.GOLD}5: ${inventory.contains(items[4], 1) ? ChatColor.GREEN : ChatColor.RED}${items[4]}\n`
                + `${ChatColor.DARK_RED}- ${ChatColor.GOLD}6: ${inventory.contains(items[5], 1) ? ChatColor.GREEN : ChatColor.RED}${items[5]}\n`
                + `${ChatColor.DARK_RED}- ${ChatColor.GOLD}7: ${inventory.contains(items[6], 1) ? ChatColor.GREEN : ChatColor.RED}${items[6]}\n`
                + `${ChatColor.DARK_RED}- ${ChatColor.GOLD}8: ${inventory.contains(items[7], 1) ? ChatColor.GREEN : ChatColor.RED}${items[7]}`);
        }
        function toString(items) {
            const ChatColor = Java.type("org.bukkit.ChatColor");
            return `${ChatColor.DARK_RED}- ${ChatColor.GOLD}1: ${ChatColor.YELLOW}${items[0]}\n`
                + `${ChatColor.DARK_RED}- ${ChatColor.GOLD}2: ${ChatColor.YELLOW}${items[1]}\n`
                + `${ChatColor.DARK_RED}- ${ChatColor.GOLD}3: ${ChatColor.YELLOW}${items[2]}\n`
                + `${ChatColor.DARK_RED}- ${ChatColor.GOLD}4: ${ChatColor.YELLOW}${items[3]}\n`
                + `${ChatColor.DARK_RED}- ${ChatColor.GOLD}5: ${ChatColor.YELLOW}${items[4]}\n`
                + `${ChatColor.DARK_RED}- ${ChatColor.GOLD}6: ${ChatColor.YELLOW}${items[5]}\n`
                + `${ChatColor.DARK_RED}- ${ChatColor.GOLD}7: ${ChatColor.YELLOW}${items[6]}\n`
                + `${ChatColor.DARK_RED}- ${ChatColor.GOLD}8: ${ChatColor.YELLOW}${items[7]}`;
        }
    })();
}
main();