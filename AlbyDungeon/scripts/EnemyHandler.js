/**
 * NONE type script
 *
 * SPAWNS ENEMIES IN VARYING DIFFICULTIES IN DIFFERENT LOCATIONS AND
 * APPLIES THEIR EQUIPMENT AND POTION EFFECTS.
 * THIS REQUIRES ScheduleHandler.js TO SPAWN ENEMIES IN GAME.
 *
 * TO IMPORT:
 *   const EnemyHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/EnemyHandler.js`);
 *
 * EXAMPLE USAGE:
 *   const EnemyHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/EnemyHandler.js`);
 *   const ScheduleHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/ScheduleHandler.js`);
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
        const Zombie = Java.type("org.bukkit.entity.Zombie");
        const Skeleton = Java.type("org.bukkit.entity.Skeleton");
        const WitherSkeleton = Java.type("org.bukkit.entity.WitherSkeleton");
        const ElderGuardian = Java.type("org.bukkit.entity.ElderGuardian");
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
            ROOM_FOUR_GUARD:  "Room Four Guard",
            ROOM_BOSS_GUARD:  "Boss Room Guard",
            BOSS:             "Corrupted Guardian"
        }

        let drop_rate;
        function init(world, dr = 0) {
            drop_rate = dr;
            return {
                "room_one": room_one(world),
                "room_two": room_two(world),
                "room_three": room_three(world),
                "room_four": room_four(world),
                "room_boss": room_boss(world)
            };
        }

        /**
         * ROOM ONE ENEMIES
         * - 8 Zombies
         *
         * EASY: lv1 ; NORMAL: lv2 ; HARD: lv3 ; EXTREME: lv4
         *
         * @param {World} world
         * @returns {Object}
         */
        function room_one(world) {
            const locations = [
                new Location(world, -1458, 44, -504),
                new Location(world, -1458, 44, -498),
                new Location(world, -1452, 44, -492),
                new Location(world, -1446, 44, -492),
                new Location(world, -1440, 44, -497),
                new Location(world, -1440, 44, -504),
                new Location(world, -1446, 44, -510),
                new Location(world, -1452, 44, -510)
            ];

            return {
                "easy":   () => spawn_enemies(locations, Zombie, easy),
                "normal": () => spawn_enemies(locations, Zombie, normal),
                "hard": () => spawn_enemies(locations, Zombie, hard),
                "extreme": () => spawn_enemies(locations, Zombie, extreme)
            };

            function init(enemy) {
                enemy.setCustomName(ENEMY_NAMES.ROOM_ONE_GUARD);
            }

            function easy(enemy) {
                init(enemy);
                zombie_lv1(enemy);
            }

            function normal(enemy) {
                init(enemy);
                zombie_lv2(enemy);
            }

            function hard(enemy) {
                init(enemy);
                zombie_lv3(enemy);
            }

            function extreme(enemy) {
                init(enemy);
                zombie_lv4(enemy);
            }
        }

        /**
         * ROOM TWO ENEMIES
         * - 8 Skeletons
         *
         * EASY: lv1 ; NORMAL: lv2 ; HARD: lv3 ; EXTREME: lv4
         *
         * @param {World} world
         * @returns {Object}
         */
        function room_two(world) {
            const locations = [
                new Location(world, -1390, 44, -488),
                new Location(world, -1390, 44, -482),
                new Location(world, -1384, 44, -476),
                new Location(world, -1378, 44, -476),
                new Location(world, -1372, 44, -482),
                new Location(world, -1372, 44, -488),
                new Location(world, -1378, 44, -494),
                new Location(world, -1384, 44, -494)
            ];

            return {
                "easy":   () => spawn_enemies(locations, Skeleton, easy),
                "normal": () => spawn_enemies(locations, Skeleton, normal),
                "hard": () => spawn_enemies(locations, Skeleton, hard),
                "extreme": () => spawn_enemies(locations, Skeleton, extreme)
            };

            function init(enemy) {
                enemy.setCustomName(ENEMY_NAMES.ROOM_TWO_GUARD);
            }

            function easy(enemy) {
                init(enemy);
                skeleton_lv1(enemy);
            }

            function normal(enemy) {
                init(enemy);
                skeleton_lv2(enemy);
            }

            function hard(enemy) {
                init(enemy);
                skeleton_lv3(enemy);
            }

            function extreme(enemy) {
                init(enemy);
                skeleton_lv4(enemy);
            }
        }

        /**
         * ROOM THREE ENEMIES
         * - 4 Skeletons
         * - 4 Zombies
         *
         * EASY: lv1 ; NORMAL: lv2 ; HARD: lv3 ; EXTREME: lv4
         *
         * @param {World} world
         * @returns {Object}
         */
        function room_three(world) {
            const zombie_locations = [
                new Location(world, -1474, 44, -572),
                new Location(world, -1468, 44, -560),
                new Location(world, -1456, 44, -566),
                new Location(world, -1462, 44, -578)
            ];
            const skeleton_locations = [
                new Location(world, -1474, 44, -566),
                new Location(world, -1462, 44, -560),
                new Location(world, -1456, 44, -572),
                new Location(world, -1468, 44, -578)
            ];

            return {
                "easy":   () => {
                    spawn_enemies(zombie_locations, Zombie, easy_zombie);
                    spawn_enemies(skeleton_locations, Skeleton, easy_skeleton);
                },
                "normal": () => {
                    spawn_enemies(zombie_locations, Zombie, normal_zombie);
                    spawn_enemies(skeleton_locations, Skeleton, normal_skeleton);
                },
                "hard": () => {
                    spawn_enemies(zombie_locations, Zombie, hard_zombie);
                    spawn_enemies(skeleton_locations, Skeleton, hard_skeleton);
                },
                "extreme": () => {
                    spawn_enemies(zombie_locations, Zombie, extreme_zombie);
                    spawn_enemies(skeleton_locations, Skeleton, extreme_skeleton);
                }
            };

            function init(enemy) {
                enemy.setCustomName(ENEMY_NAMES.ROOM_THREE_GUARD);
            }

            function easy_zombie(enemy) {
                init(enemy);
                zombie_lv1(enemy);
            }
            function easy_skeleton(enemy) {
                init(enemy);
                skeleton_lv1(enemy);
            }

            function normal_zombie(enemy) {
                init(enemy);
                zombie_lv2(enemy);
            }
            function normal_skeleton(enemy) {
                init(enemy);
                skeleton_lv2(enemy);
            }

            function hard_zombie(enemy) {
                init(enemy);
                zombie_lv3(enemy);
            }
            function hard_skeleton(enemy) {
                init(enemy);
                skeleton_lv3(enemy);
            }

            function extreme_zombie(enemy) {
                init(enemy);
                zombie_lv4(enemy);
            }
            function extreme_skeleton(enemy) {
                init(enemy);
                skeleton_lv4(enemy);
            }
        }

        /**
         * ROOM FOUR ENEMIES
         * WAVE 1
         * - 8 Zombies
         *
         * WAVE 2
         * - 8 Skeleton
         *
         * EASY: lv2 ; NORMAL: lv3 ; HARD: lv4 ; EXTREME: lv5
         *
         * @param {World} world
         * @returns {Object}
         */
        function room_four(world) {
            const locations = [
                new Location(world, -1552, 44, -521),
                new Location(world, -1552, 44, -517),
                new Location(world, -1545, 44, -510),
                new Location(world, -1541, 44, -510),
                new Location(world, -1534, 44, -516),
                new Location(world, -1534, 44, -522),
                new Location(world, -1540, 44, -528),
                new Location(world, -1546, 44, -528)
            ];

            return {
                "easy":   () => spawn_enemies(locations, Zombie, easy_zombie),
                "easy_reinforcements": () => spawn_enemies(locations, Skeleton, easy_skeleton),
                "normal": () => spawn_enemies(locations, Zombie, normal_zombie),
                "normal_reinforcements": () => spawn_enemies(locations, Skeleton, normal_skeleton),
                "hard": () => spawn_enemies(locations, Zombie, hard_zombie),
                "hard_reinforcements": () => spawn_enemies(locations, Skeleton, hard_skeleton),
                "extreme": () => spawn_enemies(locations, Zombie, extreme_zombie),
                "extreme_reinforcements": () => spawn_enemies(locations, Skeleton, extreme_skeleton),
            };

            function init(enemy) {
                enemy.setCustomName(ENEMY_NAMES.ROOM_FOUR_GUARD);
            }

            function easy_zombie(enemy) {
                init(enemy);
                zombie_lv2(enemy);
            }
            function easy_skeleton(enemy) {
                init(enemy);
                skeleton_lv2(enemy);
            }

            function normal_zombie(enemy) {
                init(enemy);
                zombie_lv3(enemy);
            }
            function normal_skeleton(enemy) {
                init(enemy);
                skeleton_lv3(enemy);
            }

            function hard_zombie(enemy) {
                init(enemy);
                zombie_lv4(enemy);
            }
            function hard_skeleton(enemy) {
                init(enemy);
                skeleton_lv4(enemy);
            }

            function extreme_zombie(enemy) {
                init(enemy);
                zombie_lv5(enemy);
            }
            function extreme_skeleton(enemy) {
                init(enemy);
                skeleton_lv5(enemy);
            }
        }

        /**
         * BOSS ROOM ENEMIES
         * WAVE 1
         * - 5 Zombies
         * - 5 Skeleton
         *
         * WAVE 2
         * - 1 Elder Guardian (BOSS)
         *
         * EASY: lv3 ; NORMAL: lv4 ; HARD: lv5 ; EXTREME: lv6
         *
         * @param {World} world
         * @returns {Object}
         */
        function room_boss(world) {
            const zombie_locations = [
                new Location(world, -1601, 44, -560),
                new Location(world, -1604, 44, -544),
                new Location(world, -1608, 44, -563),
                new Location(world, -1612, 44, -544),
                new Location(world, -1615, 44, -560)
            ];
            const skeleton_locations = [
                new Location(world, -1601, 44, -546),
                new Location(world, -1604, 44, -562),
                new Location(world, -1608, 44, -543),
                new Location(world, -1612, 44, -562),
                new Location(world, -1615, 44, -546)
            ];
            const boss_locations = [
                new Location(world, -1607, 41, -552)
            ];

            return {
                "easy": () => {
                    spawn_enemies(zombie_locations, Zombie, easy_zombie);
                    spawn_enemies(skeleton_locations, Skeleton, easy_skeleton)
                },
                "easy_boss": () => spawn_enemies(boss_locations, ElderGuardian, easy_boss),
                "normal": () => {
                    spawn_enemies(zombie_locations, Zombie, normal_zombie);
                    spawn_enemies(skeleton_locations, Skeleton, normal_skeleton)
                },
                "normal_boss": () => spawn_enemies(boss_locations, ElderGuardian, normal_boss),
                "hard": () => {
                    spawn_enemies(zombie_locations, Zombie, hard_zombie);
                    spawn_enemies(skeleton_locations, Skeleton, hard_skeleton)
                },
                "hard_boss": () => spawn_enemies(boss_locations, ElderGuardian, hard_boss),
                "extreme": () => {
                    spawn_enemies(zombie_locations, Zombie, extreme_zombie);
                    spawn_enemies(skeleton_locations, WitherSkeleton, extreme_skeleton)
                },
                "extreme_boss": () => spawn_enemies(boss_locations, ElderGuardian, extreme_boss),
            };

            function init(enemy) {
                enemy.setCustomName(ENEMY_NAMES.ROOM_BOSS_GUARD);
            }

            function easy_zombie(enemy) {
                init(enemy);
                zombie_lv3(enemy);
            }
            function easy_skeleton(enemy) {
                init(enemy);
                skeleton_lv3(enemy);
            }
            function easy_boss(enemy) {
                init(enemy);
                init_enemy_basics(enemy);

                enemy.setCustomName(ENEMY_NAMES.BOSS);
                equip_diamond_armor(enemy);
            }

            function normal_zombie(enemy) {
                init(enemy);
                zombie_lv4(enemy);
            }
            function normal_skeleton(enemy) {
                init(enemy);
                skeleton_lv4(enemy);
            }
            function normal_boss(enemy) {
                easy_boss(enemy);
                enemy.setMaxHealth(40.0);
                enemy.getAttribute(Attribute.GENERIC_MAX_HEALTH).setBaseValue(40);
            }

            function hard_zombie(enemy) {
                init(enemy);
                zombie_lv5(enemy);
            }
            function hard_skeleton(enemy) {
                init(enemy);
                skeleton_lv5(enemy);
            }
            function hard_boss(enemy) {
                easy_boss(enemy);
                enemy.setMaxHealth(50.0);
                enemy.getAttribute(Attribute.GENERIC_MAX_HEALTH).setBaseValue(50);
            }

            function extreme_zombie(enemy) {
                init(enemy);
                zombie_lv6(enemy);
            }
            function extreme_skeleton(enemy) {
                init(enemy);
                skeleton_lv6(enemy);
            }
            function extreme_boss(enemy) {
                hard_boss(enemy);

                const equipment = enemy.getEquipment();
                equipment.setHelmet(enchant(equipment.getHelmet(), Enchantment.THORNS, 2));
                equipment.setChestplate(enchant(equipment.getChestplate(), Enchantment.THORNS, 2));
                equipment.setLeggings(enchant(equipment.getLeggings(), Enchantment.THORNS, 2));
                equipment.setBoots(enchant(equipment.getBoots(), Enchantment.THORNS, 2));
            }
        }



        function zombie_lv1(enemy) {
            init_enemy_basics(enemy);
            init_zombie_basics(enemy);
            equip_leather_armor(enemy);
        }
        function skeleton_lv1(enemy) {
            init_enemy_basics(enemy);
            init_skeleton_basics(enemy);
            equip_leather_armor(enemy);
        }

        function zombie_lv2(enemy) {
            zombie_lv1(enemy);
            equip_iron_armor(enemy);

            const equipment = enemy.getEquipment();
            equipment.setItemInMainHand( new ItemStack(Material.IRON_SWORD, 1), true);
        }
        function skeleton_lv2(enemy) {
            skeleton_lv1(enemy);
            equip_iron_armor(enemy);

            potion_effect(enemy, PotionEffectType.SPEED, 0);
        }

        function zombie_lv3(enemy) {
            zombie_lv2(enemy);
            equip_diamond_armor(enemy);
        }
        function skeleton_lv3(enemy) {
            skeleton_lv2(enemy);
            equip_diamond_armor(enemy);
        }

        function zombie_lv4(enemy) {
            zombie_lv3(enemy);

            const equipment = enemy.getEquipment();
            const weapon = enchant(equipment.getItemInMainHand(), Enchantment.DAMAGE_ALL, 1);
            enchant(weapon, Enchantment.KNOCKBACK, 1);
            equipment.setItemInMainHand(weapon);
        }
        function skeleton_lv4(enemy) {
            skeleton_lv3(enemy);

            const equipment = enemy.getEquipment();
            equipment.setItemInMainHand(enchant(equipment.getItemInMainHand(), Enchantment.ARROW_DAMAGE, 1));
        }

        function zombie_lv5(enemy) {
            zombie_lv4(enemy);
            const equipment = enemy.getEquipment();
            equipment.setItemInMainHand( new ItemStack(Material.DIAMOND_SWORD, 1), true);

            const weapon = enchant(equipment.getItemInMainHand(), Enchantment.DAMAGE_ALL, 1);
            equipment.setItemInMainHand(weapon);
        }
        function skeleton_lv5(enemy) {
            skeleton_lv4(enemy);

            const equipment = enemy.getEquipment();
            const weapon = enchant(equipment.getItemInMainHand(), Enchantment.ARROW_DAMAGE, 1);
            enchant(weapon, Enchantment.ARROW_FIRE, 1)
            equipment.setItemInMainHand(weapon);
        }

        function zombie_lv6(enemy) {
            zombie_lv5(enemy);
            enemy.setBaby();
            potion_effect(enemy, PotionEffectType.SPEED, 0);
        }
        function skeleton_lv6(enemy) {
            skeleton_lv5(enemy);

            const equipment = enemy.getEquipment();
            const weapon = enchant(equipment.getItemInMainHand(), Enchantment.ARROW_DAMAGE, 2);
            enchant(weapon, Enchantment.ARROW_FIRE, 1)
            equipment.setItemInMainHand(weapon);
        }

        function init_enemy_basics(enemy) {
            // ENEMY BASICS
            enemy.setCustomNameVisible(true);
            enemy.setMaxHealth(30.0);
            enemy.setGlowing(true);
            enemy.setPersistent(true);
            enemy.setRemoveWhenFarAway(false);
            enemy.getAttribute(Attribute.GENERIC_FOLLOW_RANGE).setBaseValue(100);
            enemy.getAttribute(Attribute.GENERIC_KNOCKBACK_RESISTANCE).setBaseValue(1);
            enemy.getAttribute(Attribute.GENERIC_MAX_HEALTH).setBaseValue(30);

            // DROP CHANCES
            const equipment = enemy.getEquipment();
            equipment.setHelmetDropChance         (drop_rate);
            equipment.setChestplateDropChance     (drop_rate);
            equipment.setLeggingsDropChance       (drop_rate);
            equipment.setBootsDropChance          (drop_rate);
            equipment.setItemInMainHandDropChance (drop_rate);
        }

        function equip_leather_armor(enemy) {
            // EQUIPMENT
            const equipment = enemy.getEquipment();
            equipment.setHelmet(         new ItemStack(Material.LEATHER_HELMET, 1), true);
            equipment.setChestplate(     new ItemStack(Material.LEATHER_CHESTPLATE, 1), true);
            equipment.setLeggings(       new ItemStack(Material.LEATHER_LEGGINGS, 1), true);
            equipment.setBoots(          new ItemStack(Material.LEATHER_BOOTS, 1), true);
        }
        function equip_iron_armor(enemy) {
            // EQUIPMENT
            const equipment = enemy.getEquipment();
            equipment.setHelmet(         new ItemStack(Material.IRON_HELMET, 1), true);
            equipment.setChestplate(     new ItemStack(Material.IRON_CHESTPLATE, 1), true);
            equipment.setLeggings(       new ItemStack(Material.IRON_LEGGINGS, 1), true);
            equipment.setBoots(          new ItemStack(Material.IRON_BOOTS, 1), true);
        }
        function equip_diamond_armor(enemy) {
            // EQUIPMENT
            const equipment = enemy.getEquipment();
            equipment.setHelmet(         new ItemStack(Material.DIAMOND_HELMET, 1), true);
            equipment.setChestplate(     new ItemStack(Material.DIAMOND_CHESTPLATE, 1), true);
            equipment.setLeggings(       new ItemStack(Material.DIAMOND_LEGGINGS, 1), true);
            equipment.setBoots(          new ItemStack(Material.DIAMOND_BOOTS, 1), true);
        }

        function init_zombie_basics(enemy) {
            enemy.setAdult();

            const equipment = enemy.getEquipment();
            equipment.setItemInMainHand( new ItemStack(Material.STONE_SWORD, 1), true);
        }
        function init_skeleton_basics(enemy) {
            const equipment = enemy.getEquipment();
            equipment.setItemInMainHand( new ItemStack(Material.BOW, 1), true);
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