/**
 * NONE type script
 *
 * Tower Dungeon - Trivia Game
 * - Players are given a question and they have to collect "tickets" to answer the question.
 * - Tickets are dropped from zombies that are killed.
 * - Players can share tickets with other players.
 * - Trivia questions are based off Minecraft.
 * - Trivia answers should be relatively small, around 16 at most.
 *
 * Grading (based on incorrect answers):
 * - S (4 points): 0 incorrect answers
 * - A (3 points): 1 incorrect answer
 * - B (2 points): 2 incorrect answers
 * - C (1 point):  3+ incorrect answers
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        const trivia = [
            ["How many different colors exist in Minecraft 1.17?", 16],
            ["How many different types of Boats are there as of Minecraft 1.17?", 6],
            ["How many craftable potions with effects exist as of Minecraft 1.16?", 15],
            ["How many Gold Nuggets does it take to make a Glistering Melon Slice?", 8],
            ["How many different types of wood Signs exist as of Minecraft 1.16?", 8],
            ["How many different types of wood Doors exist as of Minecraft 1.16?", 8],
            ["What's the most amount of Gold Nuggets that can be obtained (without fortune) from a Nether Gold Ore?", 6],
            ["What light level do Glowstone blocks emit?", 15],
            ["What was the last version of Minecraft Beta released before the full release (Beta 1.__)?", 8],
            ["What day was the full release of Minecraft released? (November __, 2011)", 18],
            ["What day was the classic version of Minecraft released? (May __, 2009)", 17],
            ["How many different full suit armor variants are there as of Minecraft 1.16?", 6],
            ["What is the highest Y level where lava starts to replace air blocks generated in caves as of Minecraft 1.17?", 10],
            ["How many operations can 1 Blaze Rod perform when used as furnace fuel?", 12],
            ["How many blocks can lava travel horizontally in the Nether?", 7],
            ["How many different helmets exist as of Minecraft 1.13?", 7],
            ["When was the recipe for Enchanted Golden Apple removed? (Minecraft 1.__)", 9],
            ["How many different types of status effects do you need for the \"A Furious Cocktail\" achievement?", 13],
            ["How many Activator Rails do you get per craft?", 6],
            ["How many Rails do you get per craft?", 16],
            ["How much Crying Obsidian do you need to craft a Respawn Anchor?", 6],
            ["How much Glass do you need to craft an End Crystal?", 7],
            ["What percent chance does an Anvil have to degrade? (__%)", 12],
            ["How many Bookshelves do you need for a max power Enchanting Table?", 15]
        ];

        return {
            check: check_item,
            grade: get_grade,
            question: get_question,
            instructions: spooky_instructions,
            comment: spooky_comment,
        }

        function check_item(item, answer) {
            const Material = Java.type("org.bukkit.Material");
            return item.getType() === Material.PAPER
                && item.getItemMeta().getDisplayName().contains("Trivia Ticket")
                && item.getAmount() === answer;
        }

        function get_question() {
            return trivia[Math.floor(Math.random() * trivia.length)];
        }

        function get_grade(incorrect_answers) {
            switch (incorrect_answers) {
                case 0:
                    return 4;
                case 1:
                    return 3;
                case 2:
                    return 2;
                default:
                    return 1;
            }
        }

        function spooky_instructions() {
            const ChatColor = Java.type("org.bukkit.ChatColor");
            const YELLOW = `${ChatColor.YELLOW}${ChatColor.ITALIC}`;
            const GOLD = `${ChatColor.GOLD}${ChatColor.ITALIC}`;
            const GRAY = `${ChatColor.GRAY}${ChatColor.ITALIC}`;
            const RED = `${ChatColor.RED}${ChatColor.ITALIC}`;
            return `${GRAY}I had a trivia game planned, but ${RED}Zombies ${GRAY}stole my ${GOLD}Trivia Ticket${GRAY}s!\n`
                + `${GRAY}Instead, I'll ask you a trivia question and you can ${YELLOW}collect the ${GOLD}Trivia Ticket${YELLOW}s from the ${RED}Zombies${GRAY}!\n`
                + `${GRAY}Press the button ${YELLOW}while holding the ${GOLD}Trivia Ticket${YELLOW}s ${GRAY}to submit an answer ${YELLOW}You MUST have the exact amount of tickets for your answer! No more, no less!\n`
                + `${GRAY}You may share your extra tickets with your party members.\n`
                + `${YELLOW}I will be grading you for accuracy${GRAY}, so please confirm with your party members if your answer is correct!`;
        }

        function spooky_comment(grade_value) {
            switch(grade_value) {
                case 4:
                    return "Excellent, I can see you all are well up to date on trivia!";
                case 3:
                    return "Good work, I hope these questions weren't too hard!";
                case 2:
                    return "Could use a bit more fact checking...";
                case 1:
                    return "Absolutely terrible, you all need to study up more on trivia!";
                default:
                    return "";
            }
        }

        function spawner_nbt() {
            // lol too lazy to write, here's the command:
            // /setblock ~ ~ ~ spawner{SpawnCount:5,SpawnRange:3,MaxNearbyEntities:5,RequiredPlayerRange:40,SpawnData:{id:"minecraft:zombie",IsBaby:0b,HandItems:[{id:'minecraft:paper',Count:1b,tag:{display:{Name:'{"text":"Trivia Ticket","color":"white","italic":false}',Lore:["{\"text\":\"Dungeon Item\",\"color\":\"red\",\"italic\":false}"]}}},{}],HandDropChances:[1.000F,0.085F]}} replace
        }
    })();
}
main();