/**
 * DUNGEON type script for DUNGEON RecklessCrafting
 *
 * onPartyMemberJoin is a script that containing instructions
 * on how to start the dungeon once a party member joins.
 *
 * @author      CONSOLE
 * @version     0.1
 * @version     DUNGEON
 * @dungeon     RecklessCrafting
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {LoadedDungeon}   dungeon    SCRIPT BINDING
 */
function main() {
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const prefix = `${ChatColor.BLACK}[${ChatColor.DARK_PURPLE}RecklessCrafting${ChatColor.BLACK}] `;
    const prefix_short = `${ChatColor.BLACK}[${ChatColor.DARK_PURPLE}*${ChatColor.BLACK}] `;

    // PLAYER INVENTORY MUST BE EMPTY (INVENTORY WILL BE CLEARED ON TELEPORT)
    if (!player.getInventory().isEmpty()) {
	    dungeon.leave(player);
	    player.sendMessage(`${ChatColor.RED}Sorry! Your inventory needs to be ${ChatColor.YELLOW}empty ${ChatColor.RED}to play.`);
	    return;
    }

    // THERE MUST BE AT LEAST 2 PARTY MEMBERS
    if (dungeon.getParty().size() <= 1) {
	    // NOT ENOUGH PLAYERS
	    dungeon.messageArea(`${prefix}${ChatColor.LIGHT_PURPLE}${player.getName()} ${ChatColor.DARK_AQUA}is ready to craft!\n`
		    + `${prefix_short}${ChatColor.GREEN}Use ${ChatColor.GOLD}/partydungeons join ${ChatColor.GREEN}to join and start the game!`);
	    return;
    }

    // ENOUGH PLAYERS
    const Location = Java.type("org.bukkit.Location");
    const world = dungeon.getDungeon().getDungeonFile().getWorld();
    const players = dungeon.getParty().keySet().toArray();
    const player_1 = sm.getPlayerFromUUID(players[0]);
    const player_2 = sm.getPlayerFromUUID(players[1]);
    dungeon.messageArea(`${prefix}${ChatColor.DARK_AQUA}The battle between between ${ChatColor.LIGHT_PURPLE}${player_1.getName()} ${ChatColor.DARK_AQUA}and ${ChatColor.LIGHT_PURPLE}${player_2.getName()} ${ChatColor.DARK_AQUA}is now starting!`);
    dungeon.start(false);
    load(`${sm.getScriptDirectory("RecklessCrafting")}/ScheduleHandler.js`)(() => {
	    player_1.teleport(new Location(world, -2011.5, 90.25, -500.5, -90, 0));
	    player_2.teleport(new Location(world, -2011.5, 90.25, -467.5, -90, 0));

	    // CLEAR INVENTORY
	    player_1.getInventory().clear();
	    player_2.getInventory().clear();

		// POTION EFFECTS
		const PotionEffect = Java.type("org.bukkit.potion.PotionEffect");
		const PotionEffectType = Java.type("org.bukkit.potion.PotionEffectType");
    	const Integer = Java.type("java.lang.Integer");
		player_1.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, Integer.MAX_VALUE, 1));
		player_2.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, Integer.MAX_VALUE, 1));
		player_1.addPotionEffect(new PotionEffect(PotionEffectType.FAST_DIGGING, Integer.MAX_VALUE, 1));
		player_2.addPotionEffect(new PotionEffect(PotionEffectType.FAST_DIGGING, Integer.MAX_VALUE, 1));
    });

    // COUNTDOWN
    const Sound = Java.type("org.bukkit.Sound");
    world.playSound(new Location(world, -2012, 90, -501), Sound.BLOCK_NOTE_BLOCK_CHIME, 10, 0.3);
    world.playSound(new Location(world, -2012, 90, -468), Sound.BLOCK_NOTE_BLOCK_CHIME, 10, 0.3);
    dungeon.messageArea(`${prefix_short}${ChatColor.YELLOW}3...`);
    java.lang.Thread.sleep(1000);
    if (!dungeon.isActive()) return;

    world.playSound(new Location(world, -2012, 90, -501), Sound.BLOCK_NOTE_BLOCK_CHIME, 10, 0.3);
    world.playSound(new Location(world, -2012, 90, -468), Sound.BLOCK_NOTE_BLOCK_CHIME, 10, 0.3);
    dungeon.messageArea(`${prefix_short}${ChatColor.YELLOW}2...`);
    java.lang.Thread.sleep(1000);
    if (!dungeon.isActive()) return;

    world.playSound(new Location(world, -2012, 90, -501), Sound.BLOCK_NOTE_BLOCK_CHIME, 10, 0.3);
    world.playSound(new Location(world, -2012, 90, -468), Sound.BLOCK_NOTE_BLOCK_CHIME, 10, 0.3);
    dungeon.messageArea(`${prefix_short}${ChatColor.YELLOW}1...`);
    java.lang.Thread.sleep(1000);
    if (!dungeon.isActive()) return;

    world.playSound(new Location(world, -2012, 90, -501), Sound.BLOCK_NOTE_BLOCK_CHIME, 10, 1);
    world.playSound(new Location(world, -2012, 90, -468), Sound.BLOCK_NOTE_BLOCK_CHIME, 10, 1);

    // GET ITEMS
    const ItemHandler = load(`${sm.getScriptDirectory("RecklessCrafting")}/ItemHandler.js`);
    dungeon.setTempVariable("items", ItemHandler.init());
    dungeon.messageArea(`${prefix_short}${ChatColor.GREEN}Go! ${ChatColor.YELLOW}This match's items:\n`
	    + `${ItemHandler.toString(dungeon.getTempVariable("items"))}`);

    // REMOVE PLAYER GATES
    const Objects = Java.type("java.util.Objects");
    const BukkitWorld = Java.type("com.sk89q.worldedit.bukkit.BukkitWorld");
    const BlockTypes = Java.type("com.sk89q.worldedit.world.block.BlockTypes");
    const WorldEdit = Java.type("com.sk89q.worldedit.WorldEdit");
    const CuboidRegion = Java.type("com.sk89q.worldedit.regions.CuboidRegion");
    const BlockVector3 = Java.type("com.sk89q.worldedit.math.BlockVector3");
    const bukkitWorld = new BukkitWorld(world);
    const air = Objects.requireNonNull(BlockTypes.AIR.getDefaultState());
    const edit = WorldEdit.getInstance().newEditSession(bukkitWorld);
    const cr_1 = new CuboidRegion(BlockVector3["at(int, int, int)"](-2011, 90, -502), BlockVector3["at(int, int, int)"](-2013, 93, -500));
    const cr_2 = new CuboidRegion(BlockVector3["at(int, int, int)"](-2011, 90, -469), BlockVector3["at(int, int, int)"](-2013, 93, -467));
    edit.makeWalls(cr_1, air);
    edit.makeWalls(cr_2, air);
    edit.flushQueue();
    edit.close();
}
main();