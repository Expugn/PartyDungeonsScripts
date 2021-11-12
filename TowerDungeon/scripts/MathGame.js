/**
 * NONE type script
 *
 * Tower Dungeon - Math Game
 * - Three party members stand on barrels with the digits 1-9 on them while one presses a button to submit the answer.
 * - The barrels the party members stand on must have the digits of the answer.
 * - An answer is incorrect if there are more or less digits than the answer required.
 * - The question given will be formatted like "((x1 + y1) + (x2 + y2))", except the operands are randomized.
 * - There are decimals in the answer, so the players are expected to round the answer to the nearest integer.
 * - The puzzle ends after 5 questions.
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
        const MAX_NUMBER = 10000;
        const BARRELS = {
            // [x, y, z]
            1: [-1994, 84, -1003],
            2: [-1994, 84, -1001],
            3: [-1994, 84, -999],
            4: [-1995, 83, -1002],
            5: [-1995, 83, -1000],
            6: [-1995, 83, -998],
            7: [-1996, 82, -1001],
            8: [-1996, 82, -999],
            9: [-1996, 82, -997]
        };

        return {
            problem: generate_problem,
            check: check_answer,
            grade: get_grade,
            instructions: spooky_instructions,
            comment: spooky_comment,
            barrels: BARRELS,
        }

        function check_answer(party, answer) {
            // GET PLAYER BARREL DIGITS
            let result = [];
            for (const barrel_key in BARRELS) {
                for (const entry of party) {
                    const member = sm.getPlayerFromUUID(entry[0]);
                    const location = member.getLocation();
                    if (is_location_on_barrel(BARRELS[barrel_key], [location.getBlockX(), location.getBlockY(), location.getBlockZ()])) {
                        result.push(barrel_key);
                    }
                }
            }

            // CHECK ANSWER
            answer = answer + "";
            for (const i of result) {
                if (answer.indexOf(i) > -1) {
                    answer = answer.replace(i, "");
                }
                else {
                    return false;
                }
            }
            return [(answer.length === 0), result];

            function is_location_on_barrel(barrel_loc, player_loc) {
                return barrel_loc[0] === player_loc[0]
                    && barrel_loc[1] + 1 === player_loc[1]
                    && barrel_loc[2] === player_loc[2];
            }
        }

        function generate_problem() {
            const ChatColor = Java.type("org.bukkit.ChatColor");
            const answer = generate_answer();
            let result, problem, first, second, third;
            do {
                first = generate_question(answer);
                second = generate_question(first[0]);
                third = generate_question(first[2]);
                problem = `((${second[0]} ${second[1]} ${second[2]}) ${first[1]} (${third[0]} ${third[1]} ${third[2]}))`;
                result = Math.round(eval(problem));
            } while (result !== answer);
            const prettyProblem = `${ChatColor.WHITE}((${ChatColor.GOLD}${second[0]} ${ChatColor.YELLOW}${second[1]} ${ChatColor.GOLD}${second[2]}${ChatColor.WHITE})`
                + ` ${ChatColor.YELLOW}${first[1]}`
                + ` ${ChatColor.WHITE}(${ChatColor.GOLD}${third[0]} ${ChatColor.YELLOW}${third[1]} ${ChatColor.GOLD}${third[2]}${ChatColor.WHITE}))`;
            return [prettyProblem, answer];
        }

        function generate_question(answer) {
            const operation = Math.floor(Math.random() * 4);
            switch (operation) {
                case 0:
                    return addition(answer);
                case 1:
                    return subtraction(answer);
                case 2:
                    return multiplication(answer);
                case 3:
                    return division(answer);
            }
            function addition() {
                const first_number = Math.floor(Math.random() * MAX_NUMBER) * (Math.random() < 0.5 ? -1 : 1);
                const second_number = answer - first_number;
                return [first_number, "+", second_number];
            }
            function subtraction() {
                const first_number = Math.floor(Math.random() * MAX_NUMBER) * (Math.random() < 0.5 ? -1 : 1);
                const second_number = first_number - answer;
                return [first_number, "-", second_number];
            }
            function multiplication() {
                const first_number = (Math.floor(Math.random() * MAX_NUMBER) + 1) * (Math.random() < 0.5 ? -1 : 1);
                const second_number = answer / first_number;
                return [first_number, "*", (second_number % 1 !== 0 ? second_number.toFixed(3) : second_number)];
            }
            function division() {
                const first_number = (Math.floor(Math.random() * MAX_NUMBER) + 1) * (Math.random() < 0.5 ? -1 : 1);
                const second_number = first_number / answer;
                return [first_number, "/", (second_number % 1 !== 0 ? second_number.toFixed(3) : second_number)];
            }
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
            const GRAY = `${ChatColor.GRAY}${ChatColor.ITALIC}`;
            const YELLOW = `${ChatColor.YELLOW}${ChatColor.ITALIC}`;
            return `${GRAY}I love math! Can you all match up to my supreme intellect?\n`
                + `${GRAY}I'll give you a math problem that results in ${YELLOW}three unique digits${GRAY}. The answer may have decimal places, so ${YELLOW}round your answer${GRAY}!\n`
                + `${YELLOW}Stand on the barrels with the digits to the answer ${GRAY}and press the button to submit it!\n`
                + `${YELLOW}Incorrect answers won't do! ${GRAY}Please try to be as correct as possible.`;
        }

        function spooky_comment(grade_value) {
            switch(grade_value) {
                case 4:
                    return "Excellent work! You are all in tip-top shape!";
                case 3:
                    return "One incorrect answer, but still a passing grade!";
                case 2:
                    return "Two incorrect answers... Not bad, but not good either...";
                case 1:
                    return "I would advise you all to brush up on your math skills.";
                default:
                    return "";
            }
        }

        function generate_answer() {
            let result = [];
            for (let i = 0 ; i < 3 ; i++) {
                let random_digit = Math.floor(Math.random() * 9) + 1;
                while (result.indexOf(random_digit) !== -1) {
                    random_digit = Math.floor(Math.random() * 9) + 1;
                }
                result.push(random_digit);
            }
            return parseInt(result.join(''));
        }
    })();
}
main();