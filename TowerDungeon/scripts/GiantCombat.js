/**
 * NONE type script
 *
 * Tower Dungeon - Tower Combat
 * - Party members work together to defeat a high-hp/high-def Giant.
 * - Minecraft giants have no AI, so they're basically a giant punching bag.
 * - The game/timer ends when the giant is defeated.
 *
 * Grading (based on time spent):
 * - S (4 points): ~2:00
 * - A (3 points): ~3:00
 * - B (2 points): ~4:00
 * - C (1 point):  ~5:00+
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        return {
            spawn: spawn_giant,
            grade: get_grade,
            instructions: spooky_instructions,
            comment: spooky_comment,
        }

        function spawn_giant(world) {
            const Giant = Java.type("org.bukkit.entity.Giant");
            const Location = Java.type("org.bukkit.Location");
            const Attribute = Java.type("org.bukkit.attribute.Attribute");
            load(`${sm.getScriptDirectory("TowerDungeon")}/ScheduleHandler.js`)(() => world.spawn(new Location(world, -1999.5, 98.25, -999.5, 90, 0), Giant.class, (giant) => {
                giant.setCustomName("Sturdy Giant");
                giant.setCustomNameVisible(true);
                giant.setMaxHealth(1000);
                giant.getAttribute(Attribute.GENERIC_MAX_HEALTH).setBaseValue(1000);
                giant.getAttribute(Attribute.GENERIC_KNOCKBACK_RESISTANCE).setBaseValue(1);
                giant.getAttribute(Attribute.GENERIC_ARMOR).setBaseValue(5);
                giant.setHealth(1000);
                giant.setPersistent(true);
                giant.setRemoveWhenFarAway(false);
            }));
        }

        function get_grade(time_start) {
            const time_end = new Date();
            const time_diff = time_end - time_start;
            if (time_diff < 120000) {
                return 4;
            } else if (time_diff < 180000) {
                return 3;
            } else if (time_diff < 240000) {
                return 2;
            } else {
                return 1;
            }
        }

        function spooky_instructions() {
            const ChatColor = Java.type("org.bukkit.ChatColor");
            const GRAY = `${ChatColor.GRAY}${ChatColor.ITALIC}`;
            const YELLOW = `${ChatColor.YELLOW}${ChatColor.ITALIC}`;
            const RED = `${ChatColor.RED}${ChatColor.ITALIC}`;
            return `${GRAY}Strength is what moves the world forward!\n`
                + `${GRAY}How fast can you defeat a tough foe? ${YELLOW}Use any method you have to slay this ${RED}Giant${GRAY}!\n`
                + `${GRAY}I want this task to be done ${YELLOW}as fast as possible${GRAY}!`;
        }

        function spooky_comment(grade_value) {
            switch(grade_value) {
                case 4:
                    return "I see your combat prowess and weapons are in peak condition. Well done!";
                case 3:
                    return "Well done! I believe you all have potential!";
                case 2:
                    return "A good sharpening of your blades may do the trick next time.";
                case 1:
                    return "That took quite a bit of time... I suppose I expected too much from you all.";
                default:
                    return "";
            }
        }
    })();
}
main();