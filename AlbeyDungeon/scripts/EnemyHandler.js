/**
 * NONE type script
 *
 * SPAWNS ENEMIES IN VARYING DIFFICULTIES IN DIFFERENT LOCATIONS AND
 * APPLIES THEIR EQUIPMENT AND POTION EFFECTS.
 * THIS REQUIRES ScheduleHandler.js TO SPAWN ENEMIES IN GAME.
 *
 * TO IMPORT:
 *   const EnemyHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/EnemyHandler.js`);
 *
 * EXAMPLE USAGE:
 *   const EnemyHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/EnemyHandler.js`);
 *   const ScheduleHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/ScheduleHandler.js`);
 *   ScheduleHandler(() => {
 *      const enemies = EnemyHandler.init(player.getWorld());
 *      enemies.room_one.easy();   // EASY DIFFICULTY
 *      enemies.room_one.normal(); // NORMAL DIFFICULTY
 *   });
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        const Husk = Java.type("org.bukkit.entity.Husk");
        const Stray = Java.type("org.bukkit.entity.Stray");
        const Witch = Java.type("org.bukkit.entity.Witch");
        const Zombie = Java.type("org.bukkit.entity.Zombie");
        const PiglinBrute = Java.type("org.bukkit.entity.PiglinBrute");
        const Blaze = Java.type("org.bukkit.entity.Blaze");
        const WitherSkeleton = Java.type("org.bukkit.entity.WitherSkeleton");
        const MagmaCube = Java.type("org.bukkit.entity.MagmaCube");
        const Location = Java.type("org.bukkit.Location");
        const ItemStack = Java.type("org.bukkit.inventory.ItemStack");
        const Material = Java.type("org.bukkit.Material");
        const Attribute = Java.type("org.bukkit.attribute.Attribute");
        const Enchantment = Java.type("org.bukkit.enchantments.Enchantment");
        const PotionEffectType = Java.type("org.bukkit.potion.PotionEffectType");

        const ENEMY_NAMES = {
            ROOM_ONE_GUARD:   "Room One Guard",
            ROOM_TWO_GUARD:   "Room Two Guard",
            ROOM_THREE_GUARD: "Room Three Guard",
            ROOM_BOSS_GUARD:  "Boss Room Guard",
            ROOM_BOSS_ZOMBIE: "Zombie",
            TRAP_GUARD:       "Trap Guard",
            BOSS:             "Corrupted Slime"
        }

        let drop_rate;
        function init(world, dr = 0) {
            drop_rate = dr;
            return {
                "room_one": room_one(world),
                "room_two": room_two(world),
                "room_three": room_three(world),
                "room_boss": room_boss(world),
                "emerald_one": emerald_one(world),
                "emerald_two": emerald_two(world),
                "emerald_three": emerald_three(world),
                "emerald_four": emerald_four(world),
                "trap_chest_one": trap_chest_one(world),
                "trap_chest_two": trap_chest_two(world),
                "trap_chest_three": trap_chest_three(world),
            };
        }

        /**
         * ROOM ONE ENEMIES
         * - 8 Husks (Hard)
         * - 8 Witch (Extreme/Impossible)
         *
         * @param {World} world
         * @returns {Object}
         */
        function room_one(world) {
            const locations = [
                new Location(world, -1429, 144, -1040),
                new Location(world, -1423, 144, -1040),
                new Location(world, -1417, 144, -1046),
                new Location(world, -1417, 144, -1052),
                new Location(world, -1423, 144, -1058),
                new Location(world, -1429, 144, -1058),
                new Location(world, -1435, 144, -1052),
                new Location(world, -1435, 144, -1046)
            ];

            return {
                "hard": () => spawn_enemies(locations, Husk, hard),
                "extreme": () => spawn_enemies(locations, Witch, extreme),
                "impossible": () => spawn_enemies(locations, Witch, extreme),
            };

            function init(enemy) {
                enemy.setCustomName(ENEMY_NAMES.ROOM_ONE_GUARD);
            }

            function hard(enemy) {
                init(enemy);
                husk(enemy);
            }

            function extreme(enemy) {
                init(enemy);
                witch(enemy);
            }
        }

        /**
         * ROOM TWO ENEMIES
         * - 8 Zombies (Hard)
         * - 8 Zombie Pigman (Extreme/Impossible)
         *
         * @param {World} world
         * @returns {Object}
         */
        function room_two(world) {
            const locations = [
                new Location(world, -1395, 144, -1003),
                new Location(world, -1395, 144, -997),
                new Location(world, -1387, 144, -989),
                new Location(world, -1382, 144, -990),
                new Location(world, -1375, 144, -997),
                new Location(world, -1375, 144, -1003),
                new Location(world, -1382, 144, -1010),
                new Location(world, -1388, 144, -1010)
            ];

            return {
                "hard": () => spawn_enemies(locations, Zombie, hard),
                "extreme": () => spawn_enemies(locations, PiglinBrute, extreme),
                "impossible": () => spawn_enemies(locations, PiglinBrute, extreme)
            };

            function init(enemy) {
                enemy.setCustomName(ENEMY_NAMES.ROOM_TWO_GUARD);
            }

            function hard(enemy) {
                init(enemy);
                zombie(enemy);
            }

            function extreme(enemy) {
                init(enemy);
                piglin_brute(enemy);
            }
        }

        /**
         * ROOM THREE ENEMIES
         * - 4 Husk / 4 Zombie (Hard)
         * - 4 Witch / 4 ZombiePigman (Extreme/Impossible)
         *
         * @param {World} world
         * @returns {Object}
         */
        function room_three(world) {
            const locations_1 = [
                new Location(world, -1428, 133, -944),
                new Location(world, -1422, 133, -932),
                new Location(world, -1410, 133, -938),
                new Location(world, -1416, 133, -950)
            ];
            const locations_2 = [
                new Location(world, -1428, 133, -938),
                new Location(world, -1416, 133, -932),
                new Location(world, -1410, 133, -944),
                new Location(world, -1422, 133, -950)
            ];

            return {
                "hard": () => {
                    spawn_enemies(locations_1, Husk, hard_1);
                    spawn_enemies(locations_2, Zombie, hard_2);
                },
                "extreme": () => {
                    spawn_enemies(locations_1, Witch, extreme_1);
                    spawn_enemies(locations_2, PiglinBrute, extreme_2);
                },
                "impossible": () => {
                    spawn_enemies(locations_1, Witch, extreme_1);
                    spawn_enemies(locations_2, PiglinBrute, extreme_2);
                },
            };

            function init(enemy) {
                enemy.setCustomName(ENEMY_NAMES.ROOM_THREE_GUARD);
            }

            function hard_1(enemy) {
                init(enemy);
                husk(enemy);
            }
            function hard_2(enemy) {
                init(enemy);
                zombie(enemy);
            }

            function extreme_1(enemy) {
                init(enemy);
                witch(enemy);
            }
            function extreme_2(enemy) {
                init(enemy);
                piglin_brute(enemy);
            }
        }

        /**
         * BOSS ROOM ENEMIES
         * WAVE 1
         * - 3 WitherSkeleton
         *
         * WAVE 2
         * - 1 Magma Cube (BOSS)
         *
         * @param {World} world
         * @returns {Object}
         */
        function room_boss(world) {
            const locations = [
                new Location(world, -1377, 100, -946),
                new Location(world, -1373, 100, -946),
                new Location(world, -1369, 100, -946)
            ];
            const boss_locations = [
                new Location(world, -1373, 100, -946)
            ];

            return {
                "hard": () => spawn_enemies(locations, WitherSkeleton, guard),
                "hard_boss": () => spawn_enemies(boss_locations, MagmaCube, boss),
                "extreme": () => spawn_enemies(locations, WitherSkeleton, guard),
                "extreme_boss": () => spawn_enemies(boss_locations, MagmaCube, boss),
                "impossible": () => spawn_enemies(locations, WitherSkeleton, guard),
                "impossible_boss": () => spawn_enemies(boss_locations, MagmaCube, boss),
            };

            function init(enemy) {
                enemy.setCustomName(ENEMY_NAMES.ROOM_BOSS_GUARD);
            }

            function guard(enemy) {
                init(enemy);
                wither_skeleton(enemy)
            }
            function boss(enemy) {
                init(enemy);
                enemy.setCustomName(ENEMY_NAMES.BOSS);
                magma_cube(enemy);
            }
        }

        /**
         * EMERALD ROOM ONE ENEMIES
         * - 5 Stray
         *
         * @param {World} world
         * @returns {Object}
         */
        function emerald_one(world) {
            const locations = [
                new Location(world, -1482, 133, -948),
                new Location(world, -1486, 133, -948),
                new Location(world, -1484, 133, -950),
                new Location(world, -1482, 133, -952),
                new Location(world, -1486, 133, -952),
            ];

            return {
                "spawn": () => spawn_enemies(locations, Stray, spawn),
            };

            function spawn(enemy) {
                stray(enemy);
                init_trap_guard(enemy);
            }
        }

        /**
         * EMERALD ROOM TWO ENEMIES
         * - 5 Blaze
         *
         * @param {World} world
         * @returns {Object}
         */
        function emerald_two(world) {
            const locations = [
                new Location(world, -1464, 100, -998),
                new Location(world, -1464, 100, -1002),
                new Location(world, -1466, 100, -1000),
                new Location(world, -1468, 100, -1002),
                new Location(world, -1468, 100, -998),
            ];

            return {
                "spawn": () => spawn_enemies(locations, Blaze, spawn),
            };

            function spawn(enemy) {
                blaze(enemy);
                init_trap_guard(enemy);
            }
        }

        /**
         * EMERALD ROOM THREE ENEMIES
         * - 5 Stray
         *
         * @param {World} world
         * @returns {Object}
         */
        function emerald_three(world) {
            const locations = [
                new Location(world, -1430, 100, -998),
                new Location(world, -1430, 100, -1002),
                new Location(world, -1432, 100, -1000),
                new Location(world, -1434, 100, -1002),
                new Location(world, -1434, 100, -998),
            ];

            return {
                "spawn": () => spawn_enemies(locations, Stray, spawn),
            };

            function spawn(enemy) {
                stray(enemy);
                init_trap_guard(enemy);
            }
        }

        /**
         * EMERALD ROOM FOUR ENEMIES
         * - 4 Stray / 1 Blaze
         *
         * @param {World} world
         * @returns {Object}
         */
        function emerald_four(world) {
            const locations_1 = [
                new Location(world, -1396, 100, -998),
                new Location(world, -1396, 100, -1002),
                new Location(world, -1400, 100, -998),
                new Location(world, -1400, 100, -1002),
            ];
            const locations_2 = [
                new Location(world, -1398, 100, -1000),
            ];

            return {
                "spawn": () => {
                    spawn_enemies(locations_1, Stray, spawn_1);
                    spawn_enemies(locations_2, Blaze, spawn_2);
                },
            };

            function spawn_1(enemy) {
                stray(enemy);
                init_trap_guard(enemy);

            }

            function spawn_2(enemy) {
                blaze(enemy);
                init_trap_guard(enemy);
            }
        }

        /**
         * TRAP CHEST ONE ENEMIES
         * - 2 Zombie / 1 Husk
         *
         * @param {World} world
         * @returns {Object}
         */
        function trap_chest_one(world) {
            const locations_1 = [
                new Location(world, -1475, 144, -961),
                new Location(world, -1475, 144, -959),
            ];
            const locations_2 = [
                new Location(world, -1477, 144, -960),
            ];

            return {
                "spawn": () => {
                    spawn_enemies(locations_1, Zombie, spawn_1);
                    spawn_enemies(locations_2, Husk, spawn_2);
                },
            };

            function spawn_1(enemy) {
                zombie(enemy);
                init_trap_guard(enemy);
            }

            function spawn_2(enemy) {
                husk(enemy);
                init_trap_guard(enemy);
            }
        }

        /**
         * TRAP CHEST TWO ENEMIES
         * - 2 Husk / 1 Stray
         *
         * @param {World} world
         * @returns {Object}
         */
        function trap_chest_two(world) {
            const locations_1 = [
                new Location(world, -1459.5, 133, -1038.5),
                new Location(world, -1459.5, 133, -1040.5),
            ];
            const locations_2 = [
                new Location(world, -1457.5, 133, -1039.5),
            ];

            return {
                "spawn": () => {
                    spawn_enemies(locations_1, Husk, spawn_1);
                    spawn_enemies(locations_2, Stray, spawn_2);
                },
            };

            function spawn_1(enemy) {
                husk(enemy);
                init_trap_guard(enemy);
            }

            function spawn_2(enemy) {
                stray(enemy);
                init_trap_guard(enemy);
            }
        }

        /**
         * TRAP CHEST THREE ENEMIES
         * - 2 Zombie Pigman / 1 Stray
         *
         * @param {World} world
         * @returns {Object}
         */
        function trap_chest_three(world) {
            const locations_1 = [
                new Location(world, -1397.5, 100, -1022.5),
                new Location(world, -1397.5, 100, -1024.5),
            ];
            const locations_2 = [
                new Location(world, -1395.5, 100, -1023.5),
            ];

            return {
                "spawn": () => {
                    spawn_enemies(locations_1, PiglinBrute, spawn_1);
                    spawn_enemies(locations_2, Stray, spawn_2);
                },
            };

            function spawn_1(enemy) {
                piglin_brute(enemy);
                init_trap_guard(enemy);
            }

            function spawn_2(enemy) {
                stray(enemy);
                init_trap_guard(enemy);
            }
        }



        function husk(enemy) {
            init_enemy(enemy);
            init_zombie(enemy);
            equip_iron_armor(enemy, Enchantment.PROTECTION_ENVIRONMENTAL, 1);
            const equipment = enemy.getEquipment();
            equipment.setItemInMainHand(enchant(new ItemStack(Material.IRON_SWORD, 1), Enchantment.DAMAGE_ALL, 2), true);
        }

        function witch(enemy) {
            init_enemy(enemy);
            equip_diamond_armor(enemy);
        }

        function zombie(enemy) {
            init_enemy(enemy);
            init_zombie(enemy);
            equip_diamond_armor(enemy, Enchantment.PROTECTION_ENVIRONMENTAL, 1);
            const equipment = enemy.getEquipment();
            const weapon = new ItemStack(Material.DIAMOND_SWORD, 1);
            enchant(weapon, Enchantment.DAMAGE_ALL, 3);
            enchant(weapon, Enchantment.FIRE_ASPECT, 1);
            equipment.setItemInMainHand(weapon, true);
            equipment.setItemInOffHand(new ItemStack(Material.SHIELD, 1), true);
        }

        function piglin_brute(enemy) {
            init_enemy(enemy);
            init_zombie(enemy);
            equip_chainmail_armor(enemy, Enchantment.PROTECTION_ENVIRONMENTAL, 2);
            enemy.setImmuneToZombification(true);
            const equipment = enemy.getEquipment();
            const weapon = new ItemStack(Material.DIAMOND_AXE, 1);
            enchant(weapon, Enchantment.DAMAGE_ALL, 1);
            equipment.setItemInMainHand(weapon, true);

            enemy.setMaxHealth(30.0);
            enemy.getAttribute(Attribute.GENERIC_MAX_HEALTH).setBaseValue(30);
        }

        function stray(enemy) {
            init_enemy(enemy);
            equip_diamond_armor(enemy, Enchantment.PROTECTION_ENVIRONMENTAL, 1);
            const equipment = enemy.getEquipment();
            const weapon = new ItemStack(Material.DIAMOND_SWORD, 1);
            enchant(weapon, Enchantment.DAMAGE_ALL, 2);
            enchant(weapon, Enchantment.FIRE_ASPECT, 2);
            equipment.setItemInMainHand(weapon, true);
        }

        function blaze(enemy) {
            init_enemy(enemy);
            equip_diamond_armor(enemy, Enchantment.PROTECTION_ENVIRONMENTAL, 1);
        }

        function wither_skeleton(enemy) {
            init_enemy(enemy);
            equip_diamond_armor(enemy, Enchantment.PROTECTION_ENVIRONMENTAL, 2);
            const equipment = enemy.getEquipment();
            const weapon = new ItemStack(Material.DIAMOND_SWORD, 1);
            enchant(weapon, Enchantment.DAMAGE_ALL, 2);
            enchant(weapon, Enchantment.KNOCKBACK, 1);
            enchant(weapon, Enchantment.FIRE_ASPECT, 2);
            equipment.setItemInMainHand(weapon, true);
            equipment.setItemInOffHand(new ItemStack(Material.SHIELD, 1), true);

            enemy.setMaxHealth(50.0);
            enemy.getAttribute(Attribute.GENERIC_MAX_HEALTH).setBaseValue(50);
        }

        function magma_cube(enemy) {
            init_enemy(enemy);
            enemy.setSize(12);
            potion_effect(enemy, PotionEffectType.SLOW, 1);
            potion_effect(enemy, PotionEffectType.INCREASE_DAMAGE, 1);

            enemy.setMaxHealth(300.0);
            enemy.getAttribute(Attribute.GENERIC_MAX_HEALTH).setBaseValue(300);
            enemy.getAttribute(Attribute.GENERIC_ARMOR).setBaseValue(20);
            enemy.setHealth(300.0);
        }

        function init_enemy(enemy) {
            // ENEMY BASICS
            enemy.setCustomNameVisible(true);
            enemy.setMaxHealth(40.0);
            enemy.setGlowing(true);
            enemy.setPersistent(true);
            enemy.setRemoveWhenFarAway(false);
            enemy.getAttribute(Attribute.GENERIC_FOLLOW_RANGE).setBaseValue(100);
            enemy.getAttribute(Attribute.GENERIC_KNOCKBACK_RESISTANCE).setBaseValue(1);
            enemy.getAttribute(Attribute.GENERIC_MAX_HEALTH).setBaseValue(40);
            enemy.setHealth(40.0);

            // DROP CHANCES
            const equipment = enemy.getEquipment();
            equipment.setHelmetDropChance         (drop_rate);
            equipment.setChestplateDropChance     (drop_rate);
            equipment.setLeggingsDropChance       (drop_rate);
            equipment.setBootsDropChance          (drop_rate);
            equipment.setItemInMainHandDropChance (drop_rate);
        }

        function init_trap_guard(enemy) {
            enemy.setCustomName(ENEMY_NAMES.TRAP_GUARD);
            enemy.setCustomNameVisible(false);
            enemy.setGlowing(false);
            enemy.setPersistent(false);
            enemy.setRemoveWhenFarAway(true);
        }

        function equip_iron_armor(enemy, enchantment = null, level = 1) {
            // EQUIPMENT
            const equipment = enemy.getEquipment();
            if (enchantment !== null) {
                equipment.setHelmet(enchant(new ItemStack(Material.IRON_HELMET, 1), enchantment, level), true);
                equipment.setChestplate(enchant(new ItemStack(Material.IRON_CHESTPLATE, 1), enchantment, level), true);
                equipment.setLeggings(enchant(new ItemStack(Material.IRON_LEGGINGS, 1), enchantment, level), true);
                equipment.setBoots(enchant(new ItemStack(Material.IRON_BOOTS, 1), enchantment, level), true);
            }
            else {
                equipment.setHelmet(new ItemStack(Material.IRON_HELMET, 1), true);
                equipment.setChestplate(new ItemStack(Material.IRON_CHESTPLATE, 1), true);
                equipment.setLeggings(new ItemStack(Material.IRON_LEGGINGS, 1), true);
                equipment.setBoots(new ItemStack(Material.IRON_BOOTS, 1), true);
            }
        }
        function equip_chainmail_armor(enemy, enchantment = null, level = 1) {
            // EQUIPMENT
            const equipment = enemy.getEquipment();
            if (enchantment !== null) {
                equipment.setHelmet(enchant(new ItemStack(Material.CHAINMAIL_HELMET, 1), enchantment, level), true);
                equipment.setChestplate(enchant(new ItemStack(Material.CHAINMAIL_CHESTPLATE, 1), enchantment, level), true);
                equipment.setLeggings(enchant(new ItemStack(Material.CHAINMAIL_LEGGINGS, 1), enchantment, level), true);
                equipment.setBoots(enchant(new ItemStack(Material.CHAINMAIL_BOOTS, 1), enchantment, level), true);
            }
            else {
                equipment.setHelmet(new ItemStack(Material.CHAINMAIL_HELMET, 1), true);
                equipment.setChestplate(new ItemStack(Material.CHAINMAIL_CHESTPLATE, 1), true);
                equipment.setLeggings(new ItemStack(Material.CHAINMAIL_LEGGINGS, 1), true);
                equipment.setBoots(new ItemStack(Material.CHAINMAIL_BOOTS, 1), true);
            }
        }
        function equip_diamond_armor(enemy, enchantment = null, level = 1) {
            // EQUIPMENT
            const equipment = enemy.getEquipment();
            if (enchantment !== null) {
                equipment.setHelmet(enchant(new ItemStack(Material.DIAMOND_HELMET, 1), enchantment, level), true);
                equipment.setChestplate(enchant(new ItemStack(Material.DIAMOND_CHESTPLATE, 1), enchantment, level), true);
                equipment.setLeggings(enchant(new ItemStack(Material.DIAMOND_LEGGINGS, 1), enchantment, level), true);
                equipment.setBoots(enchant(new ItemStack(Material.DIAMOND_BOOTS, 1), enchantment, level), true);
            }
            else {
                equipment.setHelmet(new ItemStack(Material.DIAMOND_HELMET, 1), true);
                equipment.setChestplate(new ItemStack(Material.DIAMOND_CHESTPLATE, 1), true);
                equipment.setLeggings(new ItemStack(Material.DIAMOND_LEGGINGS, 1), true);
                equipment.setBoots(new ItemStack(Material.DIAMOND_BOOTS, 1), true);
            }
        }

        function init_zombie(enemy) {
            enemy.setAdult();
        }

        function enchant(item, enchant, level) {
            const meta = item.getItemMeta();
            meta.addEnchant(enchant, level, true);
            item.setItemMeta(meta);
            return item;
        }

        function potion_effect(enemy, type, amplifier) {
            const PotionEffect = Java.type("org.bukkit.potion.PotionEffect");
            const Integer = Java.type("java.lang.Integer");
            enemy.addPotionEffect(new PotionEffect(type, Integer.MAX_VALUE, amplifier));
        }

        /**
         * BULK SPAWN A GROUP OF ENEMIES
         *
         * @param {Location[]} locations
         * @param {Entity.class} enemy_type
         * @param {function} callback
         */
        function spawn_enemies(locations, enemy_type, callback) {
            const world = locations[0].getWorld();
            for (const loc of locations) {
                world.spawn(loc, enemy_type.class, (enemy) => callback(enemy));
            }
        }

        return {
            enemy_names: ENEMY_NAMES,
            init: init
        }
    })();
}
main();