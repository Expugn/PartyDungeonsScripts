/**
 * NONE type script
 *
 * MANAGES SpecialItems THAT AlbeyDungeon USES (Soul Essence, Lucky Coupon, etc)
 * SOUL ESSENCE MUST BE THE SAME AS AlbyDungeon SINCE THEY SHOULD BE ABLE TO BE USED IN BOTH DUNGEONS.
 *
 * Soul Stone, Runic Emerald, AlbeyDungeon SpecialEquipment ARE UNIMPLEMENTED.
 *
 * TO IMPORT:
 *   const SpecialItemHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/SpecialItemHandler.js`);
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        const ChatColor = Java.type("org.bukkit.ChatColor");
        const ItemStack = Java.type("org.bukkit.inventory.ItemStack");
        const ItemFlag = Java.type("org.bukkit.inventory.ItemFlag");
        const Enchantment = Java.type("org.bukkit.enchantments.Enchantment");
        const Material = Java.type("org.bukkit.Material");

        const RARITY_COLOR = {
            COMMON:     ChatColor.WHITE,
            RARE:       ChatColor.AQUA,
            EPIC:       ChatColor.LIGHT_PURPLE,
            UNIQUE:     ChatColor.GOLD,
            LEGENDARY:  ChatColor.GREEN
        };
        const NAME_COLOR = ChatColor.DARK_PURPLE;

        const SOUL_ESSENCE = {
            NONE:               "None",
            SPEED_1:            "Speed I",
            STRENGTH_1:         "Strength I",
            SPEED_2:            "Speed II",
            FIRE_RESISTANCE_1:  "Fire Resistance I",
            STRENGTH_2:         "Strength II",
            RESISTANCE_1:       "Resistance I",
            HEALTH_BOOST_1:     "Health Boost I",
            REGENERATION_1:     "Regeneration I",
            HEALTH_BOOST_3:     "Health Boost III",
            STRENGTH_3:         "Strength III",
        }

        const SOUL_ESSENCE_NAME = {
            SPEED_1:            `${NAME_COLOR}Soul Essence ${RARITY_COLOR.COMMON}[Speed I]`,
            STRENGTH_1:         `${NAME_COLOR}Soul Essence ${RARITY_COLOR.COMMON}[Strength I]`,
            SPEED_2:            `${NAME_COLOR}Soul Essence ${RARITY_COLOR.RARE}[Speed II]`,
            FIRE_RESISTANCE_1:  `${NAME_COLOR}Soul Essence ${RARITY_COLOR.RARE}[Fire Resistance I]`,
            STRENGTH_2:         `${NAME_COLOR}Soul Essence ${RARITY_COLOR.EPIC}[Strength II]`,
            RESISTANCE_1:       `${NAME_COLOR}Soul Essence ${RARITY_COLOR.EPIC}[Resistance I]`,
            HEALTH_BOOST_1:     `${NAME_COLOR}Soul Essence ${RARITY_COLOR.UNIQUE}[Health Boost I]`,
            REGENERATION_1:     `${NAME_COLOR}Soul Essence ${RARITY_COLOR.UNIQUE}[Regeneration I]`,
            HEALTH_BOOST_3:     `${NAME_COLOR}Soul Essence ${RARITY_COLOR.LEGENDARY}[Health Boost III]`,
            STRENGTH_3:         `${NAME_COLOR}Soul Essence ${RARITY_COLOR.LEGENDARY}[Strength III]`,
        };

        const LUCKY_COUPON_NAME = {
            COUPON_x2: `${NAME_COLOR}Lucky Coupon ${RARITY_COLOR.RARE}[Drop Rate x2]`,
            COUPON_x3: `${NAME_COLOR}Lucky Coupon ${RARITY_COLOR.UNIQUE}[Drop Rate x3]`,
            COUPON_x4: `${NAME_COLOR}Lucky Coupon ${RARITY_COLOR.LEGENDARY}[Drop Rate x4]`,
        };

        return {
            "soul_essence": {
                SPEED_1:            SoulEssence(SOUL_ESSENCE_NAME.SPEED_1),
                STRENGTH_1:         SoulEssence(SOUL_ESSENCE_NAME.STRENGTH_1),
                SPEED_2:            SoulEssence(SOUL_ESSENCE_NAME.SPEED_2),
                FIRE_RESISTANCE_1:  SoulEssence(SOUL_ESSENCE_NAME.FIRE_RESISTANCE_1),
                STRENGTH_2:         SoulEssence(SOUL_ESSENCE_NAME.STRENGTH_2),
                RESISTANCE_1:       SoulEssence(SOUL_ESSENCE_NAME.RESISTANCE_1),
                HEALTH_BOOST_1:     SoulEssence(SOUL_ESSENCE_NAME.HEALTH_BOOST_1),
                REGENERATION_1:     SoulEssence(SOUL_ESSENCE_NAME.REGENERATION_1),
                HEALTH_BOOST_3:     SoulEssence(SOUL_ESSENCE_NAME.HEALTH_BOOST_3),
                STRENGTH_3:         SoulEssence(SOUL_ESSENCE_NAME.STRENGTH_3),
                get:                get_soul_essence,
                rarity:             soul_essence_rarity
            },
            "lucky_coupon": {
                COUPON_x2:          LuckyCoupon(LUCKY_COUPON_NAME.COUPON_x2),
                COUPON_x3:          LuckyCoupon(LUCKY_COUPON_NAME.COUPON_x3),
                COUPON_x4:          LuckyCoupon(LUCKY_COUPON_NAME.COUPON_x4),
            },
            soul_essence_name: SOUL_ESSENCE_NAME,
            lucky_coupon_name: LUCKY_COUPON_NAME,
            rarity_color: RARITY_COLOR,
            compare: compare_item
        }

        function SoulEssence(name) {
            // CONSTANTS
            const material = Material.GHAST_TEAR;
            const lore = [
                `${ChatColor.GRAY}${ChatColor.ITALIC}This mysterious item can give a`,
                `${ChatColor.GRAY}${ChatColor.ITALIC}potion effect to your entire party...`,
                `${ChatColor.RESET}`,
                `${ChatColor.DARK_GRAY}- ${ChatColor.GOLD}Dropped from: ${ChatColor.GREEN}Albey Dungeon`,
                `${ChatColor.RESET}`,
                `${ChatColor.LIGHT_PURPLE}Right-Click the ${ChatColor.GOLD}Mysterious Cauldron`,
                `${ChatColor.LIGHT_PURPLE}with this in your hand ${ChatColor.YELLOW}${ChatColor.ITALIC}while you are`,
                `${ChatColor.YELLOW}${ChatColor.ITALIC}in the party ${ChatColor.RESET}${ChatColor.LIGHT_PURPLE}to use.`
            ];

            return create(name, lore, material);
        }

        function LuckyCoupon(name) {
            // CONSTANTS
            const material = Material.PAPER;
            const lore = [
                `${ChatColor.GRAY}${ChatColor.ITALIC}Woo hoo! This coupon can grant a perk`,
                `${ChatColor.GRAY}${ChatColor.ITALIC}for free!`,
                `${ChatColor.RESET}`,
                `${ChatColor.DARK_GRAY}- ${ChatColor.GOLD}Dropped from: ${ChatColor.GREEN}Albey Dungeon`,
                `${ChatColor.RESET}`,
                `${ChatColor.LIGHT_PURPLE}Right-Click the matching ${ChatColor.GOLD}Drop Multiplier Shop`,
                `${ChatColor.LIGHT_PURPLE}with this in your hand ${ChatColor.YELLOW}${ChatColor.ITALIC}while you are in the`,
                `${ChatColor.YELLOW}${ChatColor.ITALIC}party ${ChatColor.RESET}${ChatColor.LIGHT_PURPLE}to use. Your party will have`,
                `${ChatColor.GOLD}increased drop rate ${ChatColor.LIGHT_PURPLE}during the run.`
            ];

            return create(name, lore, material);
        }

        function create(name, lore, material) {
            const item = new ItemStack(material, 1);
            const meta = item.getItemMeta();

            meta.setLore(lore);
            meta.setDisplayName(name);
            meta.addEnchant(Enchantment.ARROW_DAMAGE, 1, false);
            meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
            item.setItemMeta(meta);
            return item;
        }

        function compare_item(player, item_name) {
            const hand_item = player.getInventory().getItemInMainHand();
            if (hand_item.getType() === Material.AIR) {
                // DON'T CHECK AIR
                return false;
            }
            return hand_item.getItemMeta().getDisplayName() === item_name;
        }

        function get_soul_essence(type) {
            switch (type) {
                case 1:
                    return SOUL_ESSENCE.SPEED_1;
                case 2:
                    return SOUL_ESSENCE.STRENGTH_1;
                case 3:
                    return SOUL_ESSENCE.SPEED_2;
                case 4:
                    return SOUL_ESSENCE.FIRE_RESISTANCE_1;
                case 5:
                    return SOUL_ESSENCE.STRENGTH_2;
                case 6:
                    return SOUL_ESSENCE.RESISTANCE_1;
                case 7:
                    return SOUL_ESSENCE.HEALTH_BOOST_1;
                case 8:
                    return SOUL_ESSENCE.REGENERATION_1;
                case 9:
                    return SOUL_ESSENCE.HEALTH_BOOST_3;
                case 10:
                    return SOUL_ESSENCE.STRENGTH_3;
                default:
                    return SOUL_ESSENCE.NONE;
            }
        }

        function soul_essence_rarity(type) {
            switch (type) {
                case 3:
                case 4:
                    return RARITY_COLOR.RARE;
                case 5:
                case 6:
                    return RARITY_COLOR.EPIC;
                case 7:
                case 8:
                    return RARITY_COLOR.UNIQUE;
                case 9:
                case 10:
                    return RARITY_COLOR.LEGENDARY;
                default:
                    return RARITY_COLOR.COMMON;
            }
        }
    })();
}
main();