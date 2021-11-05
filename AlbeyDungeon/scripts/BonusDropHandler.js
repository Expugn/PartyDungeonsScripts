/**
 * NONE type script
 *
 * BonusDropHander IS TO HANDLE DROP TABLES TO BE PASSED
 * TO PartyDungeon's ItemDrop FEATURE.
 *
 * TO IMPORT:
 *   const BonusDropHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/BonusDropHandler.js`);
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        const ScheduleHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/ScheduleHandler.js`);
        const SpecialItemHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/SpecialItemHandler.js`);
        const RandomItemGenerator = load(`${sm.getScriptDirectory("AlbeyDungeon")}/RandomItemGenerator.js`);
        const ItemStack = Java.type("org.bukkit.inventory.ItemStack");
        const Location = Java.type("org.bukkit.Location");
        const Material = Java.type("org.bukkit.Material");
        const HashMap = Java.type("java.util.HashMap");

        const DROP_AMOUNT = {
            NORMAL: 2,
            BOSS: 3
        }

        function init(world, multiplier = 1) {
            const DROP_LOCATION = {
                ROOM_ONE: new Location(world, -1425.5, 143, -1048.5),
                ROOM_TWO: new Location(world, -1384.5, 143, -999.5),
                ROOM_THREE: new Location(world, -1418.5, 132, -940.5),
                ROOM_BOSS: new Location(world, -1372.5, 99, -945.5),
            }
            return {
                "room_one": () => run(DROP_LOCATION.ROOM_ONE, room_one_table(), DROP_AMOUNT.NORMAL * multiplier),
                "room_two": () => run(DROP_LOCATION.ROOM_TWO, room_two_table(), DROP_AMOUNT.NORMAL * multiplier),
                "room_three": () => run(DROP_LOCATION.ROOM_THREE, room_three_table(), DROP_AMOUNT.NORMAL * multiplier),
                "room_boss": () => run(DROP_LOCATION.ROOM_BOSS, room_boss_table(), DROP_AMOUNT.BOSS * multiplier)
            }
        }

        function room_one_table() {
            const table = new HashMap();
            table.put(new ItemStack(Material.DIAMOND_ORE, 1), 1);
            table.put(new ItemStack(Material.IRON_ORE, 2), 1);
            table.put(new ItemStack(Material.GOLD_ORE, 2), 1);
            table.put(new ItemStack(Material.REDSTONE_ORE, 2), 1);
            table.put(new ItemStack(Material.LAPIS_ORE, 2), 1);
            table.put(new ItemStack(Material.EMERALD_ORE, 1), 1);
            table.put(new ItemStack(Material.NETHER_QUARTZ_ORE, 2), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_SWORD, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_PICKAXE, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_SHOVEL, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_AXE, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_HELMET, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_CHESTPLATE, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_LEGGINGS, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_BOOTS, 4, 2, true), 1);
            table.put(SpecialItemHandler.lucky_coupon.COUPON_x2, 1);

            table.put(new ItemStack(Material.COAL_ORE, 2), 3);
            table.put(new ItemStack(Material.ENDER_PEARL, 1), 3);
            table.put(new ItemStack(Material.BLAZE_ROD, 1), 3);
            table.put(new ItemStack(Material.FIRE_CHARGE, 1), 3);
            table.put(new ItemStack(Material.WITHER_ROSE, 1), 3);
            table.put(new ItemStack(Material.SHULKER_SHELL, 1), 3);
            table.put(new ItemStack(Material.DIRT, 2), 3);
            table.put(new ItemStack(Material.SAND, 2), 3);
            table.put(new ItemStack(Material.OBSIDIAN, 2), 3);
            table.put(RandomItemGenerator.potion(), 3);
            table.put(RandomItemGenerator.splash_potion(), 3);
            table.put(RandomItemGenerator.lingering_potion(), 3);
            table.put(RandomItemGenerator.potion(), 3);
            table.put(RandomItemGenerator.splash_potion(), 3);
            table.put(RandomItemGenerator.lingering_potion(), 3);
            table.put(RandomItemGenerator.potion(), 3);
            table.put(RandomItemGenerator.splash_potion(), 3);
            table.put(RandomItemGenerator.lingering_potion(), 3);
            table.put(SpecialItemHandler.soul_essence.STRENGTH_2, 3);
            table.put(SpecialItemHandler.soul_essence.RESISTANCE_1, 3);
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
            table.put(RandomItemGenerator.random_book(4, 3, true), 3);
            table.put(RandomItemGenerator.random_book(4, 3, true), 3);
            table.put(RandomItemGenerator.random_book(4, 3, true), 3);
            table.put(RandomItemGenerator.random_book(4, 3, true), 3);
            table.put(RandomItemGenerator.random_book(4, 3, true), 3);

            table.put(SpecialItemHandler.soul_essence.SPEED_2, 5);
            table.put(SpecialItemHandler.soul_essence.FIRE_RESISTANCE_1, 5);
            table.put(new ItemStack(Material.BREAD, 2), 5);
            table.put(new ItemStack(Material.COOKED_PORKCHOP, 2), 5);
            table.put(new ItemStack(Material.COOKED_BEEF, 2), 5);
            table.put(new ItemStack(Material.COOKED_CHICKEN, 2), 5);
            table.put(new ItemStack(Material.BAKED_POTATO, 2), 5);
            table.put(new ItemStack(Material.COOKED_RABBIT, 2), 5);
            table.put(new ItemStack(Material.COOKED_MUTTON, 2), 5);
            table.put(new ItemStack(Material.GOLDEN_CARROT, 2), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(new ItemStack(Material.GLOWSTONE, 4), 5);
            table.put(new ItemStack(Material.CLAY, 8), 5);

            table.put(SpecialItemHandler.soul_essence.SPEED_1, 7);
            table.put(SpecialItemHandler.soul_essence.STRENGTH_1, 7);
            table.put(new ItemStack(Material.EXPERIENCE_BOTTLE, 8), 7);
            return table;
        }
        function room_two_table() {
            const table = new HashMap();
            table.put(new ItemStack(Material.DIAMOND_ORE, 1), 1);
            table.put(new ItemStack(Material.IRON_ORE, 2), 1);
            table.put(new ItemStack(Material.GOLD_ORE, 2), 1);
            table.put(new ItemStack(Material.REDSTONE_ORE, 2), 1);
            table.put(new ItemStack(Material.LAPIS_ORE, 2), 1);
            table.put(new ItemStack(Material.EMERALD_ORE, 1), 1);
            table.put(new ItemStack(Material.NETHER_QUARTZ_ORE, 2), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_SWORD, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_PICKAXE, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_SHOVEL, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_AXE, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_HELMET, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_CHESTPLATE, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_LEGGINGS, 4, 2, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_BOOTS, 4, 2, true), 1);
            table.put(SpecialItemHandler.soul_essence.REGENERATION_1, 1);
            table.put(SpecialItemHandler.soul_essence.HEALTH_BOOST_1, 1);
            table.put(SpecialItemHandler.lucky_coupon.COUPON_x3, 1);

            table.put(SpecialItemHandler.lucky_coupon.COUPON_x2, 3);
            table.put(new ItemStack(Material.COAL_ORE, 2), 3);
            table.put(new ItemStack(Material.ENDER_PEARL, 1), 3);
            table.put(new ItemStack(Material.BLAZE_ROD, 1), 3);
            table.put(new ItemStack(Material.FIRE_CHARGE, 1), 3);
            table.put(new ItemStack(Material.WITHER_ROSE, 1), 3);
            table.put(new ItemStack(Material.SHULKER_SHELL, 1), 3);
            table.put(new ItemStack(Material.DIRT, 2), 3);
            table.put(new ItemStack(Material.SAND, 2), 3);
            table.put(new ItemStack(Material.OBSIDIAN, 2), 3);
            table.put(RandomItemGenerator.potion(), 3);
            table.put(RandomItemGenerator.splash_potion(), 3);
            table.put(RandomItemGenerator.lingering_potion(), 3);
            table.put(RandomItemGenerator.potion(), 3);
            table.put(RandomItemGenerator.splash_potion(), 3);
            table.put(RandomItemGenerator.lingering_potion(), 3);
            table.put(RandomItemGenerator.potion(), 3);
            table.put(RandomItemGenerator.splash_potion(), 3);
            table.put(RandomItemGenerator.lingering_potion(), 3);
            table.put(SpecialItemHandler.soul_essence.STRENGTH_2, 3);
            table.put(SpecialItemHandler.soul_essence.RESISTANCE_1, 3);
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
            table.put(RandomItemGenerator.random_book(4, 3, true), 3);
            table.put(RandomItemGenerator.random_book(4, 3, true), 3);
            table.put(RandomItemGenerator.random_book(4, 3, true), 3);
            table.put(RandomItemGenerator.random_book(4, 3, true), 3);
            table.put(RandomItemGenerator.random_book(4, 3, true), 3);

            table.put(SpecialItemHandler.soul_essence.SPEED_2, 5);
            table.put(SpecialItemHandler.soul_essence.FIRE_RESISTANCE_1, 5);
            table.put(new ItemStack(Material.BREAD, 2), 5);
            table.put(new ItemStack(Material.COOKED_PORKCHOP, 2), 5);
            table.put(new ItemStack(Material.COOKED_BEEF, 2), 5);
            table.put(new ItemStack(Material.COOKED_CHICKEN, 2), 5);
            table.put(new ItemStack(Material.BAKED_POTATO, 2), 5);
            table.put(new ItemStack(Material.COOKED_RABBIT, 2), 5);
            table.put(new ItemStack(Material.COOKED_MUTTON, 2), 5);
            table.put(new ItemStack(Material.GOLDEN_CARROT, 2), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(new ItemStack(Material.GLOWSTONE, 4), 5);
            table.put(new ItemStack(Material.CLAY, 8), 5);

            table.put(SpecialItemHandler.soul_essence.SPEED_1, 7);
            table.put(SpecialItemHandler.soul_essence.STRENGTH_1, 7);
            table.put(new ItemStack(Material.EXPERIENCE_BOTTLE, 8), 7);
            return table;
        }
        function room_three_table() {
            const table = new HashMap();
            table.put(new ItemStack(Material.DIAMOND_ORE, 1), 1);
            table.put(new ItemStack(Material.IRON_ORE, 2), 1);
            table.put(new ItemStack(Material.GOLD_ORE, 2), 1);
            table.put(new ItemStack(Material.REDSTONE_ORE, 2), 1);
            table.put(new ItemStack(Material.LAPIS_ORE, 2), 1);
            table.put(new ItemStack(Material.EMERALD_ORE, 1), 1);
            table.put(new ItemStack(Material.NETHER_QUARTZ_ORE, 2), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_SWORD, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_PICKAXE, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_SHOVEL, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_AXE, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_HELMET, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_CHESTPLATE, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_LEGGINGS, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_BOOTS, 4, 3, true), 1);
            table.put(SpecialItemHandler.soul_essence.STRENGTH_3, 1);
            table.put(SpecialItemHandler.soul_essence.HEALTH_BOOST_3, 1);
            table.put(SpecialItemHandler.lucky_coupon.COUPON_x4, 1);

            table.put(SpecialItemHandler.soul_essence.REGENERATION_1, 3);
            table.put(SpecialItemHandler.soul_essence.HEALTH_BOOST_1, 3);
            table.put(SpecialItemHandler.lucky_coupon.COUPON_x3, 3);
            table.put(new ItemStack(Material.COAL_ORE, 2), 3);
            table.put(new ItemStack(Material.ENDER_PEARL, 1), 3);
            table.put(new ItemStack(Material.BLAZE_ROD, 1), 3);
            table.put(new ItemStack(Material.FIRE_CHARGE, 1), 3);
            table.put(new ItemStack(Material.WITHER_ROSE, 1), 3);
            table.put(new ItemStack(Material.SHULKER_SHELL, 1), 3);
            table.put(new ItemStack(Material.DIRT, 2), 3);
            table.put(new ItemStack(Material.SAND, 2), 3);
            table.put(new ItemStack(Material.OBSIDIAN, 2), 3);
            table.put(RandomItemGenerator.potion(), 3);
            table.put(RandomItemGenerator.splash_potion(), 3);
            table.put(RandomItemGenerator.lingering_potion(), 3);
            table.put(RandomItemGenerator.potion(), 3);
            table.put(RandomItemGenerator.splash_potion(), 3);
            table.put(RandomItemGenerator.lingering_potion(), 3);
            table.put(RandomItemGenerator.potion(), 3);
            table.put(RandomItemGenerator.splash_potion(), 3);
            table.put(RandomItemGenerator.lingering_potion(), 3);
            table.put(SpecialItemHandler.soul_essence.STRENGTH_2, 3);
            table.put(SpecialItemHandler.soul_essence.RESISTANCE_1, 3);
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
            table.put(RandomItemGenerator.random_book(4, 3, true), 3);
            table.put(RandomItemGenerator.random_book(4, 3, true), 3);
            table.put(RandomItemGenerator.random_book(4, 3, true), 3);
            table.put(RandomItemGenerator.random_book(4, 3, true), 3);
            table.put(RandomItemGenerator.random_book(4, 3, true), 3);

            table.put(SpecialItemHandler.lucky_coupon.COUPON_x2, 5);
            table.put(SpecialItemHandler.soul_essence.SPEED_2, 5);
            table.put(SpecialItemHandler.soul_essence.FIRE_RESISTANCE_1, 5);
            table.put(new ItemStack(Material.BREAD, 2), 5);
            table.put(new ItemStack(Material.COOKED_PORKCHOP, 2), 5);
            table.put(new ItemStack(Material.COOKED_BEEF, 2), 5);
            table.put(new ItemStack(Material.COOKED_CHICKEN, 2), 5);
            table.put(new ItemStack(Material.BAKED_POTATO, 2), 5);
            table.put(new ItemStack(Material.COOKED_RABBIT, 2), 5);
            table.put(new ItemStack(Material.COOKED_MUTTON, 2), 5);
            table.put(new ItemStack(Material.GOLDEN_CARROT, 2), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(new ItemStack(Material.GLOWSTONE, 4), 5);
            table.put(new ItemStack(Material.CLAY, 8), 5);

            table.put(SpecialItemHandler.soul_essence.SPEED_1, 7);
            table.put(SpecialItemHandler.soul_essence.STRENGTH_1, 7);
            table.put(new ItemStack(Material.EXPERIENCE_BOTTLE, 8), 7);
            return table;
        }
        function room_boss_table() {
            const table = new HashMap();
            table.put(new ItemStack(Material.DIAMOND_ORE, 1), 1);
            table.put(new ItemStack(Material.IRON_ORE, 2), 1);
            table.put(new ItemStack(Material.GOLD_ORE, 2), 1);
            table.put(new ItemStack(Material.REDSTONE_ORE, 2), 1);
            table.put(new ItemStack(Material.LAPIS_ORE, 2), 1);
            table.put(new ItemStack(Material.EMERALD_ORE, 1), 1);
            table.put(new ItemStack(Material.NETHER_QUARTZ_ORE, 2), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_SWORD, 5, 4, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_PICKAXE, 5, 4, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_SHOVEL, 5, 4, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_AXE, 5, 4, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_HELMET, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_CHESTPLATE, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_LEGGINGS, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_BOOTS, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_SWORD, 5, 4, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_PICKAXE, 5, 4, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_SHOVEL, 5, 4, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_AXE, 5, 4, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_HELMET, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_CHESTPLATE, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_LEGGINGS, 4, 3, true), 1);
            table.put(RandomItemGenerator.random_item(Material.DIAMOND_BOOTS, 4, 3, true), 1);

            table.put(new ItemStack(Material.TOTEM_OF_UNDYING, 1), 3);
            table.put(new ItemStack(Material.NETHERITE_SCRAP, 1), 3);
            table.put(new ItemStack(Material.PUFFERFISH_BUCKET, 1), 3);
            table.put(SpecialItemHandler.soul_essence.STRENGTH_3, 3);
            table.put(SpecialItemHandler.soul_essence.HEALTH_BOOST_3, 3);
            table.put(SpecialItemHandler.lucky_coupon.COUPON_x4, 3);
            table.put(new ItemStack(Material.COAL_ORE, 2), 3);
            table.put(new ItemStack(Material.ENDER_PEARL, 2), 3);
            table.put(new ItemStack(Material.BLAZE_ROD, 2), 3);
            table.put(new ItemStack(Material.FIRE_CHARGE, 2), 3);
            table.put(new ItemStack(Material.WITHER_ROSE, 2), 3);
            table.put(new ItemStack(Material.SHULKER_SHELL, 2), 3);
            table.put(new ItemStack(Material.DIRT, 2), 3);
            table.put(new ItemStack(Material.SAND, 2), 3);
            table.put(new ItemStack(Material.OBSIDIAN, 2), 3);
            table.put(RandomItemGenerator.potion(), 3);
            table.put(RandomItemGenerator.splash_potion(), 3);
            table.put(RandomItemGenerator.lingering_potion(), 3);
            table.put(RandomItemGenerator.potion(), 3);
            table.put(RandomItemGenerator.splash_potion(), 3);
            table.put(RandomItemGenerator.lingering_potion(), 3);
            table.put(RandomItemGenerator.potion(), 3);
            table.put(RandomItemGenerator.splash_potion(), 3);
            table.put(RandomItemGenerator.lingering_potion(), 3);
            table.put(RandomItemGenerator.potion(), 3);
            table.put(RandomItemGenerator.splash_potion(), 3);
            table.put(RandomItemGenerator.lingering_potion(), 3);
            table.put(RandomItemGenerator.potion(), 3);
            table.put(RandomItemGenerator.splash_potion(), 3);
            table.put(RandomItemGenerator.lingering_potion(), 3);
            table.put(RandomItemGenerator.potion(), 3);
            table.put(RandomItemGenerator.splash_potion(), 3);
            table.put(RandomItemGenerator.lingering_potion(), 3);
            table.put(SpecialItemHandler.soul_essence.STRENGTH_2, 3);
            table.put(SpecialItemHandler.soul_essence.RESISTANCE_1, 3);
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
            table.put(RandomItemGenerator.random_book(4, 4, true), 3);
            table.put(RandomItemGenerator.random_book(3, 5, true), 3);
            table.put(RandomItemGenerator.random_book(4, 4, true), 3);
            table.put(RandomItemGenerator.random_book(3, 5, true), 3);
            table.put(RandomItemGenerator.random_book(4, 4, true), 3);
            table.put(RandomItemGenerator.random_book(3, 5, true), 3);
            table.put(RandomItemGenerator.random_book(4, 4, true), 3);
            table.put(RandomItemGenerator.random_book(3, 5, true), 3);
            table.put(RandomItemGenerator.random_book(4, 4, true), 3);
            table.put(RandomItemGenerator.random_book(3, 5, true), 3);

            table.put(SpecialItemHandler.soul_essence.REGENERATION_1, 5);
            table.put(SpecialItemHandler.soul_essence.HEALTH_BOOST_1, 5);
            table.put(SpecialItemHandler.lucky_coupon.COUPON_x3, 5);
            table.put(new ItemStack(Material.BREAD, 2), 5);
            table.put(new ItemStack(Material.COOKED_PORKCHOP, 2), 5);
            table.put(new ItemStack(Material.COOKED_BEEF, 2), 5);
            table.put(new ItemStack(Material.COOKED_CHICKEN, 2), 5);
            table.put(new ItemStack(Material.BAKED_POTATO, 2), 5);
            table.put(new ItemStack(Material.COOKED_RABBIT, 2), 5);
            table.put(new ItemStack(Material.COOKED_MUTTON, 2), 5);
            table.put(new ItemStack(Material.GOLDEN_CARROT, 2), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(RandomItemGenerator.random_arrow(2, 4), 5);
            table.put(new ItemStack(Material.GLOWSTONE, 4), 5);
            table.put(new ItemStack(Material.CLAY, 8), 5);

            table.put(SpecialItemHandler.lucky_coupon.COUPON_x2, 7);
            table.put(SpecialItemHandler.soul_essence.SPEED_2, 7);
            table.put(SpecialItemHandler.soul_essence.FIRE_RESISTANCE_1, 7);
            table.put(SpecialItemHandler.soul_essence.SPEED_1, 7);
            table.put(SpecialItemHandler.soul_essence.STRENGTH_1, 7);
            table.put(new ItemStack(Material.EXPERIENCE_BOTTLE, 8), 7);
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