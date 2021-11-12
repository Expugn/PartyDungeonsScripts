/**
 * NONE type script
 *
 * Tower Dungeon - Number Guess Puzzle
 * - Three party members stand on barrels while one of them presses a button to submit the answer.
 * - The barrels are labeled with numbers from 1 to 6.
 * - The answer is a 3-digit number with unique digits, so 2 players should not stand on the same barrel.
 * - The puzzle ends when the correct number is guessed.
 * - Cave Spiders will come through the window behind the barrels to distract the players.
 *
 * Grading (based on time spent):
 * - S (4 points): ~1:00
 * - A (3 points): ~2:00
 * - B (2 points): ~3:00
 * - C (1 point):  ~4:00+
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        const BARRELS = {
            // [x, y, z]
            1: [-1994, 20, -1000],
            2: [-1995, 19, -1001],
            3: [-1995, 19, -999],
            4: [-1996, 18, -1002],
            5: [-1996, 18, -1000],
            6: [-1996, 18, -998],
        };

        return {
            answer: generate_answer,
            check: check_answer,
            grade: get_grade,
            instructions: spooky_instructions,
            comment: spooky_comment,
            barrels: BARRELS,
        }

        /**
         * Checks the party's position and sees if they are on the correct barrels.
         * @param {Map<UUID, PlayerState>} party
         * @param {String} answer
         * @returns [boolean, Array] - boolean is true if the answer is correct, Array is the party's guess.
         */
        function check_answer(party, answer) {
            let locations = [];
            // COLLECT PARTY MEMBER LOCATIONS
            for (const entry of party) {
                const member = sm.getPlayerFromUUID(entry[0]);
                const location = member.getLocation();
                locations.push([location.getBlockX(), location.getBlockY(), location.getBlockZ()]);
            }

            // GET PARTY'S GUESS
            let result = [];
            for (const barrel_key in BARRELS) {
                for (const location of locations) {
                    const barrel_location = BARRELS[barrel_key];
                    if (barrel_location[0] === location[0]
                        && barrel_location[1] + 1 === location[1]
                        && barrel_location[2] === location[2]) {
                        result.push(barrel_key);
                    }
                }
            }

            // CHECK ANSWER
            for (const i of result) {
                if (answer.indexOf(i) > -1) {
                    answer = answer.replace(i, "");
                }
                else {
                    return false;
                }
            }
            return [(answer.length === 0), result];
        }

        /**
         * Generates a 3-digit number with unique digits and returns it as a String.
         * This should be stored in a dungeon tempVariable to be checked later.
         * @returns {String}
         */
        function generate_answer() {
            let result = [];
            for (let i = 0 ; i < 3 ; i++) {
                let random_digit = Math.floor(Math.random() * 6) + 1;
                while (result.indexOf(random_digit) !== -1) {
                    random_digit = Math.floor(Math.random() * 6) + 1;
                }
                result.push(random_digit);
            }
            return result.join("");
        }

        function get_grade(time_start) {
            const time_end = Date.now();
            const time_taken = time_end - time_start;
            if (time_taken < 60000) {
                return 4;
            }
            else if (time_taken < 120000) {
                return 3;
            }
            else if (time_taken < 180000) {
                return 2;
            }
            else {
                return 1;
            }
        }

        function spooky_instructions() {
            const ChatColor = Java.type("org.bukkit.ChatColor");
            const GRAY = `${ChatColor.GRAY}${ChatColor.ITALIC}`;
            const GOLD = `${ChatColor.GOLD}${ChatColor.ITALIC}`;
            const YELLOW = `${ChatColor.YELLOW}${ChatColor.ITALIC}`;
            const RED = `${ChatColor.RED}${ChatColor.ITALIC}`;
            return `${GRAY}Hello! I've got a ${GOLD}three-digit ${GRAY}number that I'm thinking of now... Can you all guess what it is?\n`
                + `${YELLOW}Stand on the barrels ${GRAY}to make a guess! Remember, the number I'm thinking of is a ${GOLD}three-digit ${GRAY}number, so only three people need to be on the barrels.\n`
                + `${GOLD}One ${GRAY}person will be in charge of ${YELLOW}pressing the button to submit your answer${GRAY}!\n`
                + `${GRAY}I will be grading you all on ${YELLOW}how fast you can guess my number${GRAY}, so work quick, and watch out for the ${RED}Cave Spiders${GRAY}!`;
        }

        function spooky_comment(grade_value) {
            switch(grade_value) {
                case 4:
                    return "Very good! Have you been reading my mind for the answer?";
                case 3:
                    return "Pretty good, you guys have potential!";
                case 2:
                    return "Hmm, there's definitely room for improvement...";
                case 1:
                    return "Sorry, did the spiders distract you all too much? I'll need to do some cleaning...";
                default:
                    return "";
            }
        }
    })();
}
main();