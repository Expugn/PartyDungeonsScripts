/**
 * NONE type script
 *
 * GIVES A RANDOM TYPE OF TIPPED_ARROW, ENCHANTED_BOOK, etc
 * USEFUL WITH BonusDropHandler TO GIVE RANDOM ENCHANTED ITEMS OR POTIONS
 *
 * TO IMPORT:
 *   const RandomItemGenerator = load(`${sm.getScriptDirectory("AlbyDungeon")}/RandomItemGenerator.js`);
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        const Collections = Java.type("java.util.Collections");
        const Arrays = Java.type("java.util.Arrays");
        const ItemStack = Java.type("org.bukkit.inventory.ItemStack");
        const Enchantment = Java.type("org.bukkit.enchantments.Enchantment");
        const Material = Java.type("org.bukkit.Material");
        const PotionData = Java.type("org.bukkit.potion.PotionData");
        const PotionType = Java.type("org.bukkit.potion.PotionType");

        const enchantment_list = Collections.unmodifiableList(Arrays.asList(Enchantment.values()));
        const potion_type_list = Collections.unmodifiableList(Arrays.asList(PotionType.values()));
        const potion_type_blacklist = [ // IGNORED TIPPED ARROWS WITH NO/UNOBTAINABLE EFFECTS
            PotionType.AWKWARD,
            PotionType.MUNDANE,
            PotionType.WATER,
            PotionType.THICK,
            PotionType.UNCRAFTABLE,
            PotionType.LUCK
        ];

        return {
            potion:             Potion,
            splash_potion:      SplashPotion,
            lingering_potion:   LingeringPotion,
            tipped_arrow:       TippedArrow,
            enchanted_book:     EnchantedBook,
            enchanted_item:     EnchantedItem,

            random_arrow: (min_amount, max_amount) => TippedArrow(Math.floor(Math.random() * (max_amount - min_amount)) + min_amount),
            random_book: (max_level, max_enchants) => EnchantedBook(Math.floor(Math.random() * (max_level) + 1), Math.floor(Math.random() * (max_enchants) + 1)),
            random_item: (material, max_level, max_enchants) => EnchantedItem(material, Math.floor(Math.random() * (max_level) + 1), Math.floor(Math.random() * (max_enchants) + 1)),

            random_enchant:     RandomEnchant(),
            random_potion_data: RandomPotionData()
        }

        function TippedArrow(amount) {
            return create();

            function create() {
                const item = new ItemStack(Material.TIPPED_ARROW, amount);
                const meta = item.getItemMeta();
                meta.setBasePotionData(RandomPotionData());
                item.setItemMeta(meta);
                return item;
            }
        }

        function Potion() {
            return create();

            function create() {
                const item = new ItemStack(Material.POTION, 1);
                const meta = item.getItemMeta();
                meta.setBasePotionData(RandomPotionData());
                item.setItemMeta(meta);
                return item;
            }
        }

        function SplashPotion() {
            return create();

            function create() {
                const item = new ItemStack(Material.SPLASH_POTION, 1);
                const meta = item.getItemMeta();
                meta.setBasePotionData(RandomPotionData());
                item.setItemMeta(meta);
                return item;
            }
        }

        function LingeringPotion() {
            return create();

            function create() {
                const item = new ItemStack(Material.LINGERING_POTION, 1);
                const meta = item.getItemMeta();
                meta.setBasePotionData(RandomPotionData());
                item.setItemMeta(meta);
                return item;
            }
        }

        function EnchantedBook(max_level, enchant_amount) {
            return create();

            function create() {
                const item = new ItemStack(Material.ENCHANTED_BOOK, 1);
                const meta = item.getItemMeta();
                for (let i = 0 ; i < enchant_amount || meta.getStoredEnchants().size() < 1 ; i++) {
                    // MAKE SURE AT LEAST RESULT ENDS WITH 1 ENCHANTMENT
                    get_enchant(meta);
                }
                item.setItemMeta(meta);
                return item;
            }

            function get_enchant(meta) {
                const enchant = RandomEnchant();
                meta.addStoredEnchant(enchant, (max_level > enchant.getMaxLevel() ? enchant.getMaxLevel() : max_level), false);
            }
        }

        function EnchantedItem(material, max_level, enchant_amount) {
            return create();

            function create() {
                const item = new ItemStack(material, 1);
                do {
                    const enchant = RandomEnchant();
                    if (enchant.canEnchantItem(item) && !item.getEnchantments().containsKey(enchant)) {
                        item.addEnchantment(enchant, (max_level > enchant.getMaxLevel() ? enchant.getMaxLevel() : max_level));
                    }
                } while (item.getEnchantments().size() <= enchant_amount);

                return item;
            }
        }

        function RandomEnchant() {
            return enchantment_list.get(Math.floor(Math.random() * enchantment_list.size()));
        }

        function RandomPotionData() {
            let potion_type, extended, upgraded;
            do {
                potion_type = potion_type_list.get(Math.floor(Math.random() * potion_type_list.size()));
                // POTIONS CAN'T BE EXTENDED AND UPGRADED
                extended = potion_type.isExtendable() ? (Math.random() < 0.5) : false;
                upgraded = potion_type.isUpgradeable() && !extended ? (Math.random() < 0.5) : false;
            } while (potion_type_blacklist.indexOf(potion_type) >= 0);
            return new PotionData(potion_type, extended, upgraded);
        }
    })();
}
main();