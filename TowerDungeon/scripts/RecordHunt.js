/**
 * NONE type script
 *
 * Tower Dungeon - Record Hunt
 * - Players must find the record that matches the current day of the week
 * - Records:
 *   - Red (Sunday) - blocks
 *   - Orange/Yellow (Monday) - 13
 *   - Green (Tuesday) - cat
 *   - Blue (Wednesday) - wait
 *   - Purple (Thursday) - mall
 *   - Black (Friday) - stal
 *   - White (Saturday) - strad
 * - These records should have a "Dungeon Item" lore and they should be removed when a player is reset.
 * - The records will also be have a lore that states their states their day like "Disc 1 out of 7 of the album 'Now that's what I call spooky!'"
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
            check: check_item,
            grade: get_grade,
            instructions: spooky_instructions,
            comment: spooky_comment
        };

        function check_item(item) {
            const Material = Java.type("org.bukkit.Material");
            const day = new Date().getDay();
            if (item == null || item.getType() === Material.AIR) {
                return false;
            }
            if (!item.hasItemMeta()) {
                return false;
            }
            const item_meta = item.getItemMeta();
            if (!item_meta.hasLore() || !item_meta.getLore().get(0).contains("Dungeon Item")) {
                return false;
            }
            if ((item.getType() === Material.MUSIC_DISC_BLOCKS && day === 0)
                || (item.getType() === Material.MUSIC_DISC_13 && day === 1)
                || (item.getType() === Material.MUSIC_DISC_CAT && day === 2)
                || (item.getType() === Material.MUSIC_DISC_WAIT && day === 3)
                || (item.getType() === Material.MUSIC_DISC_MALL && day === 4)
                || (item.getType() === Material.MUSIC_DISC_STAL && day === 5)
                || (item.getType() === Material.MUSIC_DISC_STRAD && day === 6)) {
                return true;
            }
            return false;
        }

        function get_grade(time_start) {
            const time_end = Date.now();
            const time_taken = time_end - time_start;
            if (time_taken < 120000) {
                return 4;
            }
            else if (time_taken < 180000) {
                return 3;
            }
            else if (time_taken < 240000) {
                return 2;
            }
            else {
                return 1;
            }
        }

        function spooky_instructions() {
            const ChatColor = Java.type("org.bukkit.ChatColor");
            const GOLD = `${ChatColor.GOLD}${ChatColor.ITALIC}`;
            const YELLOW = `${ChatColor.YELLOW}${ChatColor.ITALIC}`;
            const GRAY = `${ChatColor.GRAY}${ChatColor.ITALIC}`;
            const RED = `${ChatColor.RED}${ChatColor.ITALIC}`;
            return `${GRAY}Oh... woe is me! I am but a spirit and can no longer play my favorite ${GOLD}Music Discs${GRAY}!\n`
                + `${GRAY}I'm sorry to impose, but ${YELLOW}place a ${GOLD}Music Disc ${GRAY}in the ${GOLD}Jukebox ${GRAY}for me! I have what you would call a ${YELLOW}colorful ${GRAY}taste in music, so ${YELLOW}not any old Music Disc will do${GRAY}!\n`
                + `${GRAY}The music I prefer ${YELLOW}changes depending on the day of the week${GRAY}.\n`
                + `${YELLOW}You can find my favorite Music Discs in the storage closet ahead${GRAY}, but it seems ${RED}Zombies ${GRAY}have gotten their repulsive hands on them!\n`
                + `${GRAY}Please hurry! I would like to listen to my favorite music again ${YELLOW}as soon as possible${GRAY}!`;
        }

        function spooky_comment(grade_value) {
            switch(grade_value) {
                case 4:
                    return "Marvelous! I should hire you all to be my personal record players!";
                case 3:
                    return "Superb! Ahh... how I've longed to hear this track again...";
                case 2:
                    return "Oh dear, I was afraid the Zombies lost this record...";
                case 1:
                    return "I must say, it felt like another eternity before I could hear this again...";
                default:
                    return "";
            }
        }

        function setSpawnerNBT(location) {
            // ZOMBIE SPAWNER THAT SPAWNS MULTIPLE DIFFERENT ZOMBIES HOLDING DIFFERENT MUSIC DISCS WITH LORE
            // too lazy to write nbt lol, here's the spawn command
            // /setblock ~ ~ ~ spawner{SpawnCount:7,SpawnRange:10,Delay:100,MinSpawnDelay:100,MaxSpawnDelay:100,MaxNearbyEntities:2,RequiredPlayerRange:40,SpawnData:{id:"minecraft:zombie",IsBaby:0b,HandItems:[{id:'minecraft:music_disc_blocks',Count:1b,tag:{display:{Lore:["{\"text\":\"Dungeon Item\",\"color\":\"red\",\"italic\":false}","{\"text\":\"Song 1 out of 7 from the\",\"color\":\"gray\"}","{\"text\":\"\\\"Now That's What I Call Spooky!\\\" album.\",\"color\":\"gray\"}"]}}},{}],HandDropChances:[0.750F,0.085F]},SpawnPotentials:[{Weight:1,Entity:{id:"minecraft:zombie",IsBaby:0b,HandItems:[{id:'minecraft:music_disc_blocks',Count:1b,tag:{display:{Lore:["{\"text\":\"Dungeon Item\",\"color\":\"red\",\"italic\":false}","{\"text\":\"Song 1 out of 7 from the\",\"color\":\"gray\"}","{\"text\":\"\\\"Now That's What I Call Spooky!\\\" album.\",\"color\":\"gray\"}"]}}},{}],HandDropChances:[0.750F,0.085F]}},{Weight:1,Entity:{id:"minecraft:zombie",IsBaby:0b,HandItems:[{id:'minecraft:music_disc_13',Count:1b,tag:{display:{Lore:["{\"text\":\"Dungeon Item\",\"color\":\"red\",\"italic\":false}","{\"text\":\"Song 2 out of 7 from the\",\"color\":\"gray\"}","{\"text\":\"\\\"Now That's What I Call Spooky!\\\" album.\",\"color\":\"gray\"}"]}}},{}],HandDropChances:[0.750F,0.085F]}},{Weight:1,Entity:{id:"minecraft:zombie",IsBaby:0b,HandItems:[{id:'minecraft:music_disc_cat',Count:1b,tag:{display:{Lore:["{\"text\":\"Dungeon Item\",\"color\":\"red\",\"italic\":false}","{\"text\":\"Song 3 out of 7 from the\",\"color\":\"gray\"}","{\"text\":\"\\\"Now That's What I Call Spooky!\\\" album.\",\"color\":\"gray\"}"]}}},{}],HandDropChances:[0.750F,0.085F]}},{Weight:1,Entity:{id:"minecraft:zombie",IsBaby:0b,HandItems:[{id:'minecraft:music_disc_wait',Count:1b,tag:{display:{Lore:["{\"text\":\"Dungeon Item\",\"color\":\"red\",\"italic\":false}","{\"text\":\"Song 4 out of 7 from the\",\"color\":\"gray\"}","{\"text\":\"\\\"Now That's What I Call Spooky!\\\" album.\",\"color\":\"gray\"}"]}}},{}],HandDropChances:[0.750F,0.085F]}},{Weight:1,Entity:{id:"minecraft:zombie",IsBaby:0b,HandItems:[{id:'minecraft:music_disc_mall',Count:1b,tag:{display:{Lore:["{\"text\":\"Dungeon Item\",\"color\":\"red\",\"italic\":false}","{\"text\":\"Song 5 out of 7 from the\",\"color\":\"gray\"}","{\"text\":\"\\\"Now That's What I Call Spooky!\\\" album.\",\"color\":\"gray\"}"]}}},{}],HandDropChances:[0.750F,0.085F]}},{Weight:1,Entity:{id:"minecraft:zombie",IsBaby:0b,HandItems:[{id:'minecraft:music_disc_stal',Count:1b,tag:{display:{Lore:["{\"text\":\"Dungeon Item\",\"color\":\"red\",\"italic\":false}","{\"text\":\"Song 6 out of 7 from the\",\"color\":\"gray\"}","{\"text\":\"\\\"Now That's What I Call Spooky!\\\" album.\",\"color\":\"gray\"}"]}}},{}],HandDropChances:[0.750F,0.085F]}},{Weight:1,Entity:{id:"minecraft:zombie",IsBaby:0b,HandItems:[{id:'minecraft:music_disc_strad',Count:1b,tag:{display:{Lore:["{\"text\":\"Dungeon Item\",\"color\":\"red\",\"italic\":false}","{\"text\":\"Song 7 out of 7 from the\",\"color\":\"gray\"}","{\"text\":\"\\\"Now That's What I Call Spooky!\\\" album.\",\"color\":\"gray\"}"]}}},{}],HandDropChances:[0.750F,0.085F]}}]} replace
        }
    })();
}
main();