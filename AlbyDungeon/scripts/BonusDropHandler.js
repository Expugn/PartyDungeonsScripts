/**
 * NONE type script
 *
 * BonusDropHander IS TO HANDLE DROP TABLES TO BE PASSED
 * TO PartyDungeon's ItemDrop FEATURE.
 *
 * TO IMPORT:
 *   const BonusDropHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/BonusDropHandler.js`);
 *
 * @author      Expugn
 * @version     0.2
 * @type        NONE
 */
 function main() {
    return (function () {
        const ScheduleHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/ScheduleHandler.js`);
        const SpecialItemHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/SpecialItemHandler.js`);
        const RandomItemGenerator = load(`${sm.getScriptDirectory("AlbyDungeon")}/RandomItemGenerator.js`);
        const ItemStack = Java.type("org.bukkit.inventory.ItemStack");
        const Location = Java.type("org.bukkit.Location");
        const Material = Java.type("org.bukkit.Material");
        const HashMap = Java.type("java.util.HashMap")

        const DROP_AMOUNT = {
            NORMAL: 2,
            BOSS: 3
        }

        function init(world, multiplier = 1) {
            const DROP_LOCATION = {
                ROOM_ONE: new Location(world, -1448.5, 43, -500.5),
                ROOM_TWO: new Location(world, -1380.5, 43, -484.5),
                ROOM_THREE: new Location(world, -1464.5, 43, -568.5),
                ROOM_FOUR: new Location(world, -1542.5, 43, -524.5),
                ROOM_BOSS: new Location(world, -1607.5, 43, -552.5),
            }
            return {
                "room_one": () => run(DROP_LOCATION.ROOM_ONE, room_one_table(), DROP_AMOUNT.NORMAL * multiplier),
                "room_two": () => run(DROP_LOCATION.ROOM_TWO, room_two_table(), DROP_AMOUNT.NORMAL * multiplier),
                "room_three": () => run(DROP_LOCATION.ROOM_THREE, room_three_table(), DROP_AMOUNT.NORMAL * multiplier),
                "room_four": () => run(DROP_LOCATION.ROOM_FOUR, room_four_table(), DROP_AMOUNT.NORMAL * multiplier),
                "room_boss": () => run(DROP_LOCATION.ROOM_BOSS, room_boss_table(), DROP_AMOUNT.BOSS * multiplier)
            }
        }

        function room_one_table() {
            const table = new HashMap();
            table.put(new ItemStack(Material.DIAMOND_ORE, 1), 1);
            table.put(new ItemStack(Material.IRON_ORE, 2), 1);
            table.put(new ItemStack(Material.GOLD_ORE, 2), 1);
            table.put(new ItemStack(Material.NETHER_QUARTZ_ORE, 2), 1);
            table.put(new ItemStack(Material.DIRT, 2), 1);

            table.put(new ItemStack(Material.STONE, 8), 5);
            table.put(new ItemStack(Material.ANDESITE, 8), 5);
            table.put(new ItemStack(Material.GRANITE, 8), 5);
            table.put(new ItemStack(Material.DIORITE, 8), 5);
            table.put(new ItemStack(Material.OAK_LOG, 8), 5);
            table.put(new ItemStack(Material.SPRUCE_LOG, 8), 5);
            table.put(new ItemStack(Material.BIRCH_LOG, 8), 5);
            table.put(new ItemStack(Material.COBWEB, 1), 5);
            table.put(new ItemStack(Material.COBBLESTONE, 32), 5);
            table.put(new ItemStack(Material.GLOWSTONE, 4), 5);
            table.put(new ItemStack(Material.CLAY, 8), 5);
            table.put(new ItemStack(Material.IRON_HELMET, 1), 5);
            table.put(new ItemStack(Material.IRON_CHESTPLATE, 1), 5);
            table.put(new ItemStack(Material.IRON_LEGGINGS, 1), 5);
            table.put(new ItemStack(Material.IRON_BOOTS, 1), 5);
            table.put(new ItemStack(Material.IRON_SWORD, 1), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_HELMET, 3, 2, true), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_CHESTPLATE, 3, 2, true), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_LEGGINGS, 3, 2, true), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_BOOTS, 3, 2, true), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_SWORD, 3, 2, true), 5);
            table.put(RandomItemGenerator.random_arrow(4, 8), 5);
            table.put(RandomItemGenerator.potion(), 5);
            table.put(RandomItemGenerator.splash_potion(), 5);

            table.put(new ItemStack(Material.EXPERIENCE_BOTTLE, 8), 7);
            table.put(new ItemStack(Material.PRISMARINE_CRYSTALS, 8), 7);
            table.put(new ItemStack(Material.PRISMARINE_SHARD, 8), 7);
            return table;
        }
        function room_two_table() {
            const table = new HashMap();
            table.put(new ItemStack(Material.DIAMOND_ORE, 1), 1);
            table.put(SpecialItemHandler.soul_essence.SPEED_2, 1);
            table.put(SpecialItemHandler.soul_essence.FIRE_RESISTANCE_1, 1);

            table.put(new ItemStack(Material.IRON_ORE, 2), 3);
            table.put(new ItemStack(Material.GOLD_ORE, 2), 3);
            table.put(new ItemStack(Material.NETHER_QUARTZ_ORE, 4), 3);
            table.put(new ItemStack(Material.DIRT, 2), 3);

            table.put(new ItemStack(Material.GLOWSTONE, 4), 5);
            table.put(new ItemStack(Material.CLAY, 16), 5);
            table.put(new ItemStack(Material.IRON_HELMET, 1), 5);
            table.put(new ItemStack(Material.IRON_CHESTPLATE, 1), 5);
            table.put(new ItemStack(Material.IRON_LEGGINGS, 1), 5);
            table.put(new ItemStack(Material.IRON_BOOTS, 1), 5);
            table.put(new ItemStack(Material.IRON_SWORD, 1), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_HELMET, 3, 2, true), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_CHESTPLATE, 3, 2, true), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_LEGGINGS, 3, 2, true), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_BOOTS, 3, 2, true), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_SWORD, 3, 2, true), 5);
            table.put(new ItemStack(Material.SPECTRAL_ARROW, 5), 3);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.potion(), 5);
            table.put(RandomItemGenerator.splash_potion(), 5);
            table.put(RandomItemGenerator.random_book(1, 2, true), 5);

            table.put(new ItemStack(Material.EXPERIENCE_BOTTLE, 8), 7);
            table.put(new ItemStack(Material.PRISMARINE_CRYSTALS, 16), 7);
            table.put(new ItemStack(Material.PRISMARINE_SHARD, 16), 7);
            return table;
        }
        function room_three_table() {
            const table = new HashMap();
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_SWORD, 3, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_HELMET, 3, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_CHESTPLATE, 3, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_LEGGINGS, 3, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_BOOTS, 3, 2, true), 1);
            table.put(new ItemStack(Material.DIAMOND_HELMET, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_CHESTPLATE, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_LEGGINGS, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_BOOTS, 1), 1);
            table.put(SpecialItemHandler.soul_essence.SPEED_2, 1);
            table.put(SpecialItemHandler.soul_essence.FIRE_RESISTANCE_1, 1);

            table.put(SpecialItemHandler.soul_essence.SPEED_1, 2);
            table.put(SpecialItemHandler.soul_essence.STRENGTH_1, 2);

            table.put(new ItemStack(Material.SPECTRAL_ARROW, 8), 3);
            table.put(new ItemStack(Material.COAL_ORE, 8), 3);
            table.put(new ItemStack(Material.IRON_ORE, 4), 3);
            table.put(new ItemStack(Material.GOLD_ORE, 4), 3);
            table.put(new ItemStack(Material.LAPIS_ORE, 3), 3);
            table.put(new ItemStack(Material.NETHER_QUARTZ_ORE, 6), 3);

            table.put(new ItemStack(Material.GLOWSTONE, 8), 5);
            table.put(new ItemStack(Material.CLAY, 16), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_HELMET, 3, 3, true), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_CHESTPLATE, 3, 3, true), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_LEGGINGS, 3, 3, true), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_BOOTS, 3, 3, true), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_SWORD, 3, 3, true), 5);
            table.put(RandomItemGenerator.random_arrow(4, 8), 5);
            table.put(RandomItemGenerator.potion(), 5);
            table.put(RandomItemGenerator.splash_potion(), 5);
            table.put(RandomItemGenerator.lingering_potion(), 5);
            table.put(RandomItemGenerator.random_book(3, 3, true), 5);

            table.put(new ItemStack(Material.COOKED_CHICKEN, 3), 7);
            table.put(new ItemStack(Material.COOKED_BEEF, 3), 7);
            table.put(new ItemStack(Material.EXPERIENCE_BOTTLE, 8), 7);
            return table;
        }
        function room_four_table() {
            const table = new HashMap();
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_SWORD, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_PICKAXE, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_SHOVEL, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_AXE, 4, 2, true), 1);
            table.put(new ItemStack(Material.DIAMOND_SWORD, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_PICKAXE, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_SHOVEL, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_AXE, 1), 1);
            table.put(SpecialItemHandler.soul_essence.STRENGTH_2, 1);
            table.put(SpecialItemHandler.soul_essence.RESISTANCE_1, 1);
            table.put(SpecialItemHandler.lucky_coupon.COUPON_x2, 1);

            table.put(SpecialItemHandler.soul_essence.SPEED_2, 2);
            table.put(SpecialItemHandler.soul_essence.FIRE_RESISTANCE_1, 2);
            table.put(SpecialItemHandler.soul_essence.SPEED_1, 2);
            table.put(SpecialItemHandler.soul_essence.STRENGTH_1, 2);

            table.put(new ItemStack(Material.COAL_ORE, 8), 3);
            table.put(new ItemStack(Material.IRON_ORE, 6), 3);
            table.put(new ItemStack(Material.GOLD_ORE, 6), 3);
            table.put(new ItemStack(Material.REDSTONE_ORE, 3), 3);
            table.put(new ItemStack(Material.LAPIS_ORE, 3), 3);
            table.put(new ItemStack(Material.EMERALD_ORE, 3), 3);
            table.put(new ItemStack(Material.DIAMOND_ORE, 1), 3);
            table.put(new ItemStack(Material.NETHER_QUARTZ_ORE, 16), 3);

            table.put(new ItemStack(Material.GLOWSTONE, 16), 5);
            table.put(new ItemStack(Material.OBSIDIAN, 8), 5);
            table.put(new ItemStack(Material.DIRT, 8), 5);
            table.put(new ItemStack(Material.SAND, 8), 5);
            table.put(new ItemStack(Material.CLAY, 16), 5);
            table.put(new ItemStack(Material.STONE, 32), 5);
            table.put(new ItemStack(Material.ANDESITE, 32), 5);
            table.put(new ItemStack(Material.GRANITE, 32), 5);
            table.put(new ItemStack(Material.DIORITE, 32), 5);
            table.put(RandomItemGenerator.random_arrow(4, 8), 5);
            table.put(RandomItemGenerator.potion(), 5);
            table.put(RandomItemGenerator.splash_potion(), 5);
            table.put(RandomItemGenerator.lingering_potion(), 5);
            table.put(RandomItemGenerator.random_book(3, 3, true), 5);

            table.put(new ItemStack(Material.COOKED_CHICKEN, 8), 7);
            table.put(new ItemStack(Material.COOKED_BEEF, 8), 7);
            table.put(new ItemStack(Material.EXPERIENCE_BOTTLE, 8), 7);
            table.put(new ItemStack(Material.PRISMARINE_CRYSTALS, 16), 7);
            table.put(new ItemStack(Material.PRISMARINE_SHARD, 16), 7);
            return table;
        }
        function room_boss_table() {
            const table = new HashMap();
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_HELMET, 4, 4, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_CHESTPLATE, 4, 4, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_LEGGINGS, 4, 4, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_BOOTS, 4, 4, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_SWORD, 4, 4, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_PICKAXE, 4, 4, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_SHOVEL, 4, 4, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_AXE, 4, 4, true), 1);
            table.put(new ItemStack(Material.DIAMOND_SWORD, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_PICKAXE, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_SHOVEL, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_AXE, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_HELMET, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_CHESTPLATE, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_LEGGINGS, 1), 1);
            table.put(new ItemStack(Material.DIAMOND_BOOTS, 1), 1);
            table.put(SpecialItemHandler.soul_essence.STRENGTH_3, 1);
            table.put(SpecialItemHandler.soul_essence.HEALTH_BOOST_3, 1);
            table.put(SpecialItemHandler.lucky_coupon.COUPON_x4, 1);

            table.put(SpecialItemHandler.soul_essence.REGENERATION_1, 2);
            table.put(SpecialItemHandler.soul_essence.HEALTH_BOOST_1, 2);
            table.put(SpecialItemHandler.lucky_coupon.COUPON_x3, 2);


            table.put(new ItemStack(Material.COAL_ORE, 8), 3);
            table.put(new ItemStack(Material.IRON_ORE, 6), 3);
            table.put(new ItemStack(Material.GOLD_ORE, 6), 3);
            table.put(new ItemStack(Material.REDSTONE_ORE, 3), 3);
            table.put(new ItemStack(Material.LAPIS_ORE, 3), 3);
            table.put(new ItemStack(Material.EMERALD_ORE, 3), 3);
            table.put(new ItemStack(Material.DIAMOND_ORE, 1), 3);
            table.put(new ItemStack(Material.NETHER_QUARTZ_ORE, 16), 3);
            table.put(new ItemStack(Material.MUSIC_DISC_13, 1), 3);
            table.put(new ItemStack(Material.MUSIC_DISC_CAT, 1), 3);
            table.put(new ItemStack(Material.MUSIC_DISC_BLOCKS, 1), 3);
            table.put(new ItemStack(Material.MUSIC_DISC_CHIRP, 1), 3);
            table.put(new ItemStack(Material.MUSIC_DISC_FAR, 1), 3);
            table.put(new ItemStack(Material.MUSIC_DISC_MALL, 1), 3);
            table.put(new ItemStack(Material.MUSIC_DISC_MELLOHI, 1), 3);
            table.put(new ItemStack(Material.MUSIC_DISC_STAL, 1), 3);
            table.put(new ItemStack(Material.MUSIC_DISC_STRAD, 1), 3);
            table.put(new ItemStack(Material.MUSIC_DISC_WARD, 1), 3);
            table.put(new ItemStack(Material.MUSIC_DISC_11, 1), 3);
            table.put(new ItemStack(Material.MUSIC_DISC_WAIT, 1), 3);
            table.put(new ItemStack(Material.MUSIC_DISC_PIGSTEP, 1), 3);

            table.put(new ItemStack(Material.GLOWSTONE, 16), 5);
            table.put(new ItemStack(Material.OBSIDIAN, 16), 5);
            table.put(new ItemStack(Material.DIRT, 8), 5);
            table.put(new ItemStack(Material.SAND, 8), 5);
            table.put(new ItemStack(Material.CLAY, 16), 5);
            table.put(new ItemStack(Material.STONE, 32), 5);
            table.put(new ItemStack(Material.ANDESITE, 32), 5);
            table.put(new ItemStack(Material.GRANITE, 32), 5);
            table.put(new ItemStack(Material.DIORITE, 32), 5);
            table.put(new ItemStack(Material.PRISMARINE, 32), 5);
            table.put(new ItemStack(Material.DARK_PRISMARINE, 32), 5);
            table.put(new ItemStack(Material.PRISMARINE_BRICKS, 32), 5);
            table.put(new ItemStack(Material.SEA_LANTERN, 32), 5);
            table.put(new ItemStack(Material.IRON_HELMET, 1), 5);
            table.put(new ItemStack(Material.IRON_CHESTPLATE, 1), 5);
            table.put(new ItemStack(Material.IRON_LEGGINGS, 1), 5);
            table.put(new ItemStack(Material.IRON_BOOTS, 1), 5);
            table.put(new ItemStack(Material.IRON_SWORD, 1), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_HELMET, 4, 4, true), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_CHESTPLATE, 4, 4, true), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_LEGGINGS, 4, 4, true), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_BOOTS, 4, 4, true), 5);
            table.put(RandomItemGenerator.random_item(Material.IRON_SWORD, 4, 4, true), 5);
            table.put(SpecialItemHandler.soul_essence.STRENGTH_2, 5);
            table.put(SpecialItemHandler.soul_essence.RESISTANCE_1, 5);
            table.put(SpecialItemHandler.soul_essence.SPEED_2, 5);
            table.put(SpecialItemHandler.soul_essence.FIRE_RESISTANCE_1, 5);
            table.put(SpecialItemHandler.soul_essence.SPEED_1, 5);
            table.put(SpecialItemHandler.soul_essence.STRENGTH_1, 5);
            table.put(SpecialItemHandler.lucky_coupon.COUPON_x2, 5);
            table.put(RandomItemGenerator.random_arrow(4, 8), 5);
            table.put(RandomItemGenerator.potion(), 5);
            table.put(RandomItemGenerator.splash_potion(), 5);
            table.put(RandomItemGenerator.lingering_potion(), 5);
            table.put(RandomItemGenerator.random_book(4, 5, true), 5);

            table.put(new ItemStack(Material.INK_SAC, 8), 7);
            table.put(new ItemStack(Material.COD, 8), 7);
            table.put(new ItemStack(Material.SALMON, 8), 7);
            table.put(new ItemStack(Material.PUFFERFISH, 3), 7);
            table.put(new ItemStack(Material.TROPICAL_FISH, 3), 7);
            table.put(new ItemStack(Material.PRISMARINE_SHARD, 16), 7);
            table.put(new ItemStack(Material.EXPERIENCE_BOTTLE, 16), 7);
            table.put(new ItemStack(Material.PRISMARINE_CRYSTALS, 16), 7);
            table.put(new ItemStack(Material.PRISMARINE_SHARD, 16), 7);
            return table;
        }

        function run(location, table, amount) {
            const ItemDrop = sm.createItemDrop(location, table);
            ScheduleHandler(() => {
                ItemDrop.run(amount);
            });
        }

        return {
            init: init
        }
    })();
}
main();