/**
 * NONE type script
 *
 * BonusDropHander IS TO HANDLE DROP TABLES TO BE PASSED TO PartyDungeon's ItemDrop FEATURE.
 *
 * TO IMPORT:
 *   const BonusDropHandler = load(`${sm.getScriptDirectory("TowerDungeon")}/BonusDropHandler.js`);
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        const ScheduleHandler = load(`${sm.getScriptDirectory("TowerDungeon")}/ScheduleHandler.js`);
        const RandomItemGenerator = load(`${sm.getScriptDirectory("TowerDungeon")}/RandomItemGenerator.js`);
        const ItemStack = Java.type("org.bukkit.inventory.ItemStack");
        const Location = Java.type("org.bukkit.Location");
        const Material = Java.type("org.bukkit.Material");
        const HashMap = Java.type("java.util.HashMap");

        return {
            init: init
        }

        function init(world, score) {
            const DROP_LOCATION = new Location(world, -1999.5, 161, -999.5, 0, 0);
            let table;
            if (score >= 13) {
                table = s_rank();
            } else if (score >= 9) {
                table = a_rank();
            }
            else if (score >= 5) {
                table = b_rank();
            }
            else {
                table = c_rank();
            }
            return {
                "run": () => {
                    const ItemDrop = sm.createItemDrop(DROP_LOCATION, table);
                    ScheduleHandler(() => {
                        ItemDrop.run(score);
                    })
                },
            }
        }

        function s_rank() {
            const table = new HashMap();
            table.put(new ItemStack(Material.ELYTRA, 1), 3);
            table.put(RandomItemGenerator.random_item(Material.ELYTRA, 3, 1, false), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_SWORD, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_HELMET, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_CHESTPLATE, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_LEGGINGS, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_BOOTS, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_AXE, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_HOE, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_PICKAXE, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_SHOVEL, 4, 3, true), 1);

            table.put(new ItemStack(Material.TOTEM_OF_UNDYING, 1), 3);
            table.put(new ItemStack(Material.ENDER_CHEST, 1), 3);
            table.put(new ItemStack(Material.ANVIL, 1), 3);
            table.put(new ItemStack(Material.CHIPPED_ANVIL, 1), 3);
            table.put(new ItemStack(Material.DAMAGED_ANVIL, 1), 3);
            table.put(new ItemStack(Material.ENCHANTING_TABLE, 1), 3);
            table.put(new ItemStack(Material.SHULKER_BOX, 1), 3);
            table.put(new ItemStack(Material.WITHER_SKELETON_SKULL, 1), 3);
            table.put(new ItemStack(Material.COAL_ORE, 2), 3);
            table.put(new ItemStack(Material.IRON_ORE, 2), 3);
            table.put(new ItemStack(Material.GOLD_ORE, 2), 3);
            table.put(new ItemStack(Material.LAPIS_ORE, 2), 3);
            table.put(new ItemStack(Material.COPPER_ORE, 2), 3);
            table.put(new ItemStack(Material.REDSTONE_ORE, 2), 3);
            table.put(new ItemStack(Material.EMERALD_ORE, 2), 3);
            table.put(new ItemStack(Material.DIAMOND_ORE, 2), 3);
            table.put(new ItemStack(Material.NETHER_QUARTZ_ORE, 2), 3);
            table.put(new ItemStack(Material.DEEPSLATE_COAL_ORE, 2), 3);
            table.put(new ItemStack(Material.DEEPSLATE_IRON_ORE, 2), 3);
            table.put(new ItemStack(Material.DEEPSLATE_GOLD_ORE, 2), 3);
            table.put(new ItemStack(Material.DEEPSLATE_LAPIS_ORE, 2), 3);
            table.put(new ItemStack(Material.DEEPSLATE_COPPER_ORE, 2), 3);
            table.put(new ItemStack(Material.DEEPSLATE_REDSTONE_ORE, 2), 3);
            table.put(new ItemStack(Material.DEEPSLATE_EMERALD_ORE, 2), 3);
            table.put(new ItemStack(Material.DEEPSLATE_DIAMOND_ORE, 2), 3);
            table.put(new ItemStack(Material.COAL, 4), 3);
            table.put(new ItemStack(Material.IRON_INGOT, 4), 3);
            table.put(new ItemStack(Material.GOLD_INGOT, 4), 3);
            table.put(new ItemStack(Material.LAPIS_LAZULI, 4), 3);
            table.put(new ItemStack(Material.COPPER_INGOT, 4), 3);
            table.put(new ItemStack(Material.REDSTONE, 8), 3);
            table.put(new ItemStack(Material.EMERALD, 2), 3);
            table.put(new ItemStack(Material.DIAMOND, 2), 3);
            table.put(new ItemStack(Material.QUARTZ, 4), 3);
            table.put(new ItemStack(Material.END_CRYSTAL, 1), 3);
            table.put(new ItemStack(Material.ANCIENT_DEBRIS, 1), 3);
            table.put(new ItemStack(Material.NETHERITE_SCRAP, 1), 3);
            table.put(RandomItemGenerator.random_item(Material.FLINT_AND_STEEL, 3, 1, true), 3);
            table.put(RandomItemGenerator.random_item(Material.SHEARS, 3, 1, true), 3);
            table.put(RandomItemGenerator.random_item(Material.TURTLE_HELMET, 4, 3, true), 3);
            table.put(RandomItemGenerator.random_item(Material.TRIDENT, 4, 3, true), 3);
            table.put(RandomItemGenerator.random_item(Material.CROSSBOW, 3, 1, true), 3);

            table.put(new ItemStack(Material.DIAMOND_SWORD, 1), 5);
            table.put(new ItemStack(Material.DIAMOND_PICKAXE, 1), 5);
            table.put(new ItemStack(Material.DIAMOND_AXE, 1), 5);
            table.put(new ItemStack(Material.DIAMOND_HOE, 1), 5);
            table.put(new ItemStack(Material.DIAMOND_SHOVEL, 1), 5);
            table.put(new ItemStack(Material.DIAMOND_HELMET, 1), 5);
            table.put(new ItemStack(Material.DIAMOND_CHESTPLATE, 1), 5);
            table.put(new ItemStack(Material.DIAMOND_LEGGINGS, 1), 5);
            table.put(new ItemStack(Material.DIAMOND_BOOTS, 1), 5);
            table.put(new ItemStack(Material.BUCKET, 1), 5);
            table.put(new ItemStack(Material.LAVA_BUCKET, 1), 5);
            table.put(new ItemStack(Material.WATER_BUCKET, 1), 5);
            table.put(new ItemStack(Material.GLOW_INK_SAC, 4), 5);
            table.put(new ItemStack(Material.BLAZE_POWDER, 4), 5);
            table.put(new ItemStack(Material.BLAZE_ROD, 4), 5);
            table.put(new ItemStack(Material.ENDER_PEARL, 4), 5);
            table.put(new ItemStack(Material.SHULKER_SHELL, 1), 5);
            table.put(new ItemStack(Material.LANTERN, 4), 5);
            table.put(new ItemStack(Material.SOUL_LANTERN, 4), 5);
            table.put(new ItemStack(Material.WITHER_ROSE, 4), 5);
            table.put(new ItemStack(Material.PISTON, 2), 5);
            table.put(new ItemStack(Material.STICKY_PISTON, 2), 5);
            table.put(new ItemStack(Material.REPEATER, 2), 5);
            table.put(new ItemStack(Material.COMPARATOR, 2), 5);
            table.put(new ItemStack(Material.DISPENSER, 2), 5);
            table.put(new ItemStack(Material.DROPPER, 2), 5);
            table.put(new ItemStack(Material.HOPPER, 1), 5);
            table.put(new ItemStack(Material.REDSTONE_LAMP, 1), 5);
            table.put(new ItemStack(Material.STONE, 32), 5);
            table.put(new ItemStack(Material.COBBLESTONE, 32), 5);
            table.put(new ItemStack(Material.GRAVEL, 16), 5);
            table.put(new ItemStack(Material.GLASS, 16), 5);
            table.put(new ItemStack(Material.SAND, 8), 5);
            table.put(new ItemStack(Material.DIRT, 8), 5);
            table.put(new ItemStack(Material.GOLDEN_CARROT, 8), 5);
            table.put(RandomItemGenerator.random_book(4, 3, true), 5);
            table.put(RandomItemGenerator.random_book(4, 3, true), 5);
            table.put(RandomItemGenerator.random_book(4, 3, true), 5);
            table.put(RandomItemGenerator.random_book(4, 3, true), 5);
            table.put(RandomItemGenerator.random_book(4, 3, true), 5);
            table.put(RandomItemGenerator.random_book(4, 3, true), 5);
            table.put(RandomItemGenerator.random_book(4, 3, true), 5);
            table.put(RandomItemGenerator.random_book(4, 3, true), 5);
            table.put(RandomItemGenerator.random_book(4, 3, true), 5);
            table.put(RandomItemGenerator.random_book(4, 3, true), 5);
            table.put(RandomItemGenerator.random_item(Material.BOW, 4, 4, true), 5);

            table.put(RandomItemGenerator.potion(), 7);
            table.put(RandomItemGenerator.splash_potion(), 7);
            table.put(RandomItemGenerator.lingering_potion(), 7);
            table.put(RandomItemGenerator.potion(), 7);
            table.put(RandomItemGenerator.splash_potion(), 7);
            table.put(RandomItemGenerator.lingering_potion(), 7);
            table.put(RandomItemGenerator.potion(), 7);
            table.put(RandomItemGenerator.splash_potion(), 7);
            table.put(RandomItemGenerator.lingering_potion(), 7);
            table.put(new ItemStack(Material.EXPERIENCE_BOTTLE, 8), 7);
            return table;
        }

        function a_rank() {
            const table = new HashMap();
            table.put(new ItemStack(Material.DIAMOND_SWORD, 1), 3);
            table.put(new ItemStack(Material.DIAMOND_PICKAXE, 1), 3);
            table.put(new ItemStack(Material.DIAMOND_AXE, 1), 3);
            table.put(new ItemStack(Material.DIAMOND_HOE, 1), 3);
            table.put(new ItemStack(Material.DIAMOND_SHOVEL, 1), 3);
            table.put(new ItemStack(Material.DIAMOND_HELMET, 1), 3);
            table.put(new ItemStack(Material.DIAMOND_CHESTPLATE, 1), 3);
            table.put(new ItemStack(Material.DIAMOND_LEGGINGS, 1), 3);
            table.put(new ItemStack(Material.DIAMOND_BOOTS, 1), 3);
            table.put(new ItemStack(Material.BUCKET, 1), 3);
            table.put(new ItemStack(Material.COD_BUCKET, 1), 3);
            table.put(new ItemStack(Material.SALMON_BUCKET, 1), 3);
            table.put(new ItemStack(Material.TROPICAL_FISH_BUCKET, 1), 3);
            table.put(new ItemStack(Material.PUFFERFISH_BUCKET, 1), 3);
            table.put(new ItemStack(Material.LAVA_BUCKET, 1), 3);
            table.put(new ItemStack(Material.WATER_BUCKET, 1), 3);
            table.put(new ItemStack(Material.MILK_BUCKET, 1), 3);
            table.put(new ItemStack(Material.ENDER_CHEST, 1), 3);
            table.put(new ItemStack(Material.DAMAGED_ANVIL, 1), 3);
            table.put(new ItemStack(Material.COAL_ORE, 1), 3);
            table.put(new ItemStack(Material.IRON_ORE, 1), 3);
            table.put(new ItemStack(Material.GOLD_ORE, 1), 3);
            table.put(new ItemStack(Material.LAPIS_ORE, 1), 3);
            table.put(new ItemStack(Material.COPPER_ORE, 1), 3);
            table.put(new ItemStack(Material.REDSTONE_ORE, 1), 3);
            table.put(new ItemStack(Material.EMERALD_ORE, 1), 3);
            table.put(new ItemStack(Material.DIAMOND_ORE, 1), 3);
            table.put(new ItemStack(Material.NETHER_QUARTZ_ORE, 1), 3);
            table.put(RandomItemGenerator.random_item(Material.FLINT_AND_STEEL, 3, 1, true), 3);
            table.put(RandomItemGenerator.random_item(Material.SHEARS, 3, 1, true), 3);
            table.put(RandomItemGenerator.random_item(Material.TURTLE_HELMET, 4, 3, true), 3);
            table.put(RandomItemGenerator.random_item(Material.TRIDENT, 4, 3, true), 3);
            table.put(RandomItemGenerator.random_item(Material.CROSSBOW, 3, 1, true), 3);

            table.put(new ItemStack(Material.GLOW_INK_SAC, 4), 5);
            table.put(new ItemStack(Material.BLAZE_POWDER, 4), 5);
            table.put(new ItemStack(Material.BLAZE_ROD, 4), 5);
            table.put(new ItemStack(Material.ENDER_PEARL, 4), 5);
            table.put(new ItemStack(Material.SHULKER_SHELL, 1), 5);
            table.put(new ItemStack(Material.LANTERN, 4), 5);
            table.put(new ItemStack(Material.SOUL_LANTERN, 4), 5);
            table.put(new ItemStack(Material.WITHER_ROSE, 4), 5);
            table.put(new ItemStack(Material.PISTON, 2), 5);
            table.put(new ItemStack(Material.STICKY_PISTON, 2), 5);
            table.put(new ItemStack(Material.REPEATER, 2), 5);
            table.put(new ItemStack(Material.COMPARATOR, 2), 5);
            table.put(new ItemStack(Material.DISPENSER, 2), 5);
            table.put(new ItemStack(Material.DROPPER, 2), 5);
            table.put(new ItemStack(Material.HOPPER, 1), 5);
            table.put(new ItemStack(Material.REDSTONE_LAMP, 1), 5);
            table.put(new ItemStack(Material.STONE, 32), 5);
            table.put(new ItemStack(Material.COBBLESTONE, 32), 5);
            table.put(new ItemStack(Material.GRAVEL, 16), 5);
            table.put(new ItemStack(Material.GLASS, 16), 5);
            table.put(new ItemStack(Material.SAND, 8), 5);
            table.put(new ItemStack(Material.DIRT, 8), 5);
            table.put(new ItemStack(Material.GOLDEN_CARROT, 8), 5);
            table.put(RandomItemGenerator.random_book(4, 3, true), 5);
            table.put(RandomItemGenerator.random_book(4, 3, true), 5);
            table.put(RandomItemGenerator.random_book(4, 3, true), 5);
            table.put(RandomItemGenerator.random_item(Material.BOW, 4, 4, true), 5);

            table.put(RandomItemGenerator.potion(), 7);
            table.put(RandomItemGenerator.splash_potion(), 7);
            table.put(RandomItemGenerator.lingering_potion(), 7);
            table.put(RandomItemGenerator.potion(), 7);
            table.put(RandomItemGenerator.splash_potion(), 7);
            table.put(RandomItemGenerator.lingering_potion(), 7);
            table.put(RandomItemGenerator.potion(), 7);
            table.put(RandomItemGenerator.splash_potion(), 7);
            table.put(RandomItemGenerator.lingering_potion(), 7);
            table.put(new ItemStack(Material.EXPERIENCE_BOTTLE, 8), 7);
            return table;
        }

        function b_rank() {
            const table = new HashMap();
            table.put(new ItemStack(Material.DIAMOND_SWORD, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_PICKAXE, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_AXE, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_HOE, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_SHOVEL, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_HELMET, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_CHESTPLATE, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_LEGGINGS, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_BOOTS, 1), 1);

            table.put(new ItemStack(Material.BUCKET, 1), 3);
            table.put(new ItemStack(Material.COD_BUCKET, 1), 3);
            table.put(new ItemStack(Material.SALMON_BUCKET, 1), 3);
            table.put(new ItemStack(Material.TROPICAL_FISH_BUCKET, 1), 3);
            table.put(new ItemStack(Material.PUFFERFISH_BUCKET, 1), 3);
            table.put(new ItemStack(Material.LAVA_BUCKET, 1), 3);
            table.put(new ItemStack(Material.WATER_BUCKET, 1), 3);
            table.put(new ItemStack(Material.MILK_BUCKET, 1), 3);

            table.put(new ItemStack(Material.STONE, 8), 5);
            table.put(new ItemStack(Material.COBBLESTONE, 8), 5);
            table.put(new ItemStack(Material.DIRT, 1), 5);
            table.put(new ItemStack(Material.GRASS, 1), 5);
            table.put(new ItemStack(Material.GRAVEL, 4), 5);
            table.put(new ItemStack(Material.SAND, 1), 5);
            table.put(new ItemStack(Material.SANDSTONE, 4), 5);
            table.put(new ItemStack(Material.SOUL_SAND, 4), 5);
            table.put(new ItemStack(Material.CLAY, 4), 5);
            table.put(new ItemStack(Material.GLASS, 4), 5);
            table.put(new ItemStack(Material.TORCH, 4), 5);
            table.put(new ItemStack(Material.SOUL_TORCH, 4), 5);
            table.put(new ItemStack(Material.COOKED_BEEF, 4), 5);
            table.put(new ItemStack(Material.COOKED_CHICKEN, 4), 5);
            table.put(new ItemStack(Material.COOKED_MUTTON, 4), 5);
            table.put(new ItemStack(Material.COOKED_RABBIT, 4), 5);
            table.put(new ItemStack(Material.COOKED_PORKCHOP, 4), 5);

            table.put(RandomItemGenerator.potion(), 7);
            table.put(RandomItemGenerator.splash_potion(), 7);
            table.put(RandomItemGenerator.lingering_potion(), 7);
            table.put(new ItemStack(Material.EXPERIENCE_BOTTLE, 4), 7);
            return table;
        }

        function c_rank() {
            const table = new HashMap();
            table.put(new ItemStack(Material.APPLE, 1), 5);
            table.put(new ItemStack(Material.BREAD, 1), 5);
            table.put(new ItemStack(Material.COOKED_BEEF, 1), 5);
            table.put(new ItemStack(Material.COOKED_CHICKEN, 1), 5);
            table.put(new ItemStack(Material.COOKED_COD, 1), 5);
            table.put(new ItemStack(Material.COOKED_MUTTON, 1), 5);
            table.put(new ItemStack(Material.COOKED_RABBIT, 1), 5);
            table.put(new ItemStack(Material.COOKED_PORKCHOP, 1), 5);
            table.put(new ItemStack(Material.MUSHROOM_STEW, 1), 5);
            table.put(new ItemStack(Material.BAKED_POTATO, 1), 5);
            table.put(new ItemStack(Material.PUMPKIN_PIE, 1), 5);
            table.put(new ItemStack(Material.HAY_BLOCK, 1), 5);
            return table;
        }

    })();
}
main();