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
    const slots = `${ChatColor.YELLOW}(${dungeon.getParty().size()}/${dungeon.getDungeon().getDungeonFile().getMaxParty()})`;

    // THERE MUST BE AT LEAST 2 PARTY MEMBERS
    if (dungeon.getParty().size() <= 1) {
        // NOT ENOUGH PLAYERS
        dungeon.messageArea(`${prefix}${ChatColor.LIGHT_PURPLE}${player.getName()} ${ChatColor.DARK_AQUA}is ready to craft! ${slots}\n`
            + `${prefix_short}${ChatColor.GREEN}Use ${ChatColor.GOLD}/partydungeons join ${ChatColor.GREEN}to join and start the game!`);
        return;
    }

    if (dungeon.getParty().size() >= 3) {
        // PLAYER THREE OR FOUR JOINED
        dungeon.messageArea(`${prefix}${ChatColor.LIGHT_PURPLE}${player.getName()} ${ChatColor.DARK_AQUA}is ready to craft! ${slots}\n`);
        return;
    }

    // ENOUGH PLAYERS, KEEP LOOKING FOR A PLAYER THREE AND FOUR
    if (dungeon.getParty().size() >= 2) {
        dungeon.messageArea(`${prefix}${ChatColor.LIGHT_PURPLE}${player.getName()} ${ChatColor.DARK_AQUA}is ready to craft! ${slots}\n`
            + `${prefix_short}${ChatColor.GREEN}A battle is beginning soon! Use ${ChatColor.GOLD}/partydungeons join ${ChatColor.GREEN}to join!`);
        for (let i = 0; i < 60; i++) {
            if (i % 10 === 0) {
                dungeon.messageArea(`${prefix}${ChatColor.GOLD}${60 - i} ${ChatColor.DARK_AQUA}seconds until the battle begins!`);
            }
            java.lang.Thread.sleep(1000);
            if (dungeon.getParty().size() >= 4) {
                // FOUR PLAYERS READY
                break;
            }
            if (dungeon.getParty().size() <= 1) {
                // NOT ENOUGH PLAYERS
                dungeon.messageArea(`${prefix}${ChatColor.RED}Not enough players. The pending battle has been cancelled.`);
                return;
            }
        }
    }

    // STILL MORE THAN 2 PLAYERS
    const Location = Java.type("org.bukkit.Location");
    const world = dungeon.getDungeon().getDungeonFile().getWorld();
    const players = dungeon.getParty().keySet().toArray();
    const player_1 = sm.getPlayerFromUUID(players[0]);
    const player_2 = sm.getPlayerFromUUID(players[1]);
    const player_3 = players.length >= 3 ? sm.getPlayerFromUUID(players[2]) : null;
    const player_4 = players.length >= 4 ? sm.getPlayerFromUUID(players[3]) : null;
    if (players.length >= 4) {
        dungeon.messageArea(`${prefix}${ChatColor.DARK_AQUA}The battle between between ${ChatColor.LIGHT_PURPLE}${player_1.getName()}${ChatColor.DARK_AQUA}, ${ChatColor.LIGHT_PURPLE}${player_2.getName()}${ChatColor.DARK_AQUA}, ${ChatColor.LIGHT_PURPLE}${player_3.getName()}${ChatColor.DARK_AQUA}, and ${ChatColor.LIGHT_PURPLE}${player_4.getName()} ${ChatColor.DARK_AQUA}is now starting!`);
    }
    else if (players.length >= 3) {
        dungeon.messageArea(`${prefix}${ChatColor.DARK_AQUA}The battle between between ${ChatColor.LIGHT_PURPLE}${player_1.getName()}${ChatColor.DARK_AQUA}, ${ChatColor.LIGHT_PURPLE}${player_2.getName()}${ChatColor.DARK_AQUA}, and ${ChatColor.LIGHT_PURPLE}${player_3.getName()} ${ChatColor.DARK_AQUA}is now starting!`);
    }
    else {
        dungeon.messageArea(`${prefix}${ChatColor.DARK_AQUA}The battle between between ${ChatColor.LIGHT_PURPLE}${player_1.getName()} ${ChatColor.DARK_AQUA}and ${ChatColor.LIGHT_PURPLE}${player_2.getName()} ${ChatColor.DARK_AQUA}is now starting!`);
    }

    dungeon.start(false);
    load(`${sm.getScriptDirectory("RecklessCrafting")}/ScheduleHandler.js`)(() => {
        const PotionEffect = Java.type("org.bukkit.potion.PotionEffect");
        const PotionEffectType = Java.type("org.bukkit.potion.PotionEffectType");
        const Integer = Java.type("java.lang.Integer");

        player_1.teleport(new Location(world, -2011.5, 90.25, -500.5, -90, 0));
        player_1.getInventory().clear();
        player_1.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, Integer.MAX_VALUE, 1));
        player_1.addPotionEffect(new PotionEffect(PotionEffectType.FAST_DIGGING, Integer.MAX_VALUE, 1));
        player_1.addPotionEffect(new PotionEffect(PotionEffectType.NIGHT_VISION, Integer.MAX_VALUE, 0));

        player_2.teleport(new Location(world, -2011.5, 90.25, -467.5, -90, 0));
        player_2.getInventory().clear();
        player_2.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, Integer.MAX_VALUE, 1));
        player_2.addPotionEffect(new PotionEffect(PotionEffectType.FAST_DIGGING, Integer.MAX_VALUE, 1));
        player_2.addPotionEffect(new PotionEffect(PotionEffectType.NIGHT_VISION, Integer.MAX_VALUE, 0));

        if (player_3 !== null) {
            player_3.teleport(new Location(world, -2011.5, 90.25, -533.5, -90, 0));
            player_3.getInventory().clear();
            player_3.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, Integer.MAX_VALUE, 1));
            player_3.addPotionEffect(new PotionEffect(PotionEffectType.FAST_DIGGING, Integer.MAX_VALUE, 1));
            player_3.addPotionEffect(new PotionEffect(PotionEffectType.NIGHT_VISION, Integer.MAX_VALUE, 0));
        }

        if (player_4 !== null) {
            player_4.teleport(new Location(world, -2011.5, 90.25, -434.5, -90, 0));
            player_4.getInventory().clear();
            player_4.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, Integer.MAX_VALUE, 1));
            player_4.addPotionEffect(new PotionEffect(PotionEffectType.FAST_DIGGING, Integer.MAX_VALUE, 1));
            player_4.addPotionEffect(new PotionEffect(PotionEffectType.NIGHT_VISION, Integer.MAX_VALUE, 0));
        }
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
    if (player_3 !== null) {
        const cr_3 = new CuboidRegion(BlockVector3["at(int, int, int)"](-2011, 90, -535), BlockVector3["at(int, int, int)"](-2013, 93, -533));
        edit.makeWalls(cr_3, air);
    }
    if (player_4 !== null) {
        const cr_4 = new CuboidRegion(BlockVector3["at(int, int, int)"](-2011, 90, -436), BlockVector3["at(int, int, int)"](-2013, 93, -434));
        edit.makeWalls(cr_4, air);
    }

    edit.flushQueue();
    edit.close();
}
main();