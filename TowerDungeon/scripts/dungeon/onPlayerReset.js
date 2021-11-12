/**
 * DUNGEON type script for DUNGEON TowerDungeon
 *
 * onPlayerReset is a script that contains instructions on how
 * to revert a player back to their original state if the dungeon
 * has modified their health or potion effects.
 *
 * @author      CONSOLE
 * @version     0.1
 * @version     DUNGEON
 * @dungeon     TowerDungeon
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {LoadedDungeon}   dungeon    SCRIPT BINDING
 */
function main() {
	const Material = Java.type("org.bukkit.Material");
	load(`${sm.getScriptDirectory("TowerDungeon")}/ScheduleHandler.js`)(() => {
		// CHECK INVENTORY
		const inventory = player.getInventory();
		for (let i = 0 ; i < inventory.getSize() ; i++) {
			checkDungeonItem(inventory.getItem(i));
		}

		// CHECK ITEM ON CURSOR (THIS WON'T WORK FOR CREATIVE MODE USERS)
		checkDungeonItem(player.getItemOnCursor());


		// CLEAR POTION EFFECTS
		const PotionEffectType = Java.type("org.bukkit.potion.PotionEffectType");
		sm.clearPotionEffect(player, PotionEffectType.SPEED); // given in DodgeGame

		function checkDungeonItem(item) {
			if (item === null || item.getType() === Material.AIR) {
				return;
			}
			if (!item.hasItemMeta()) {
				return;
			}
			const item_meta = item.getItemMeta();
			if (item_meta.hasLore() && item_meta.getLore().get(0).contains("Dungeon Item")) {
				// REMOVE ITEM
				item.setAmount(0);
			}
		}
	});
}
main();