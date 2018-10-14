$(document).ready(function () {

    // data structure for the game
    var characters = {
        "rey": {
            name: "Rey",
            hp: 250,
            damage: 25
        },
        "yoda": {
            name: "Yoda",
            hp: 300,
            damage: 30
        },
        "vader": {
            name: "Darth Vader",
            hp: 260,
            damage: 26,
        },        
        "kylo": {
            name: "Kylo Ren",
            hp: 180,
            damage: 18,
        },

    }
    var characterChosen = false;
    var enemyChosen = false;
    var user;
    var enemy;
    var turnCounter = 1;
    var killCount = 0;
    var userObj;
    var enemyObj;

    // fight
    var attack = function () {
        enemyObj.hp = enemyObj.hp - (userObj.damage * turnCounter);
        userObj.hp = userObj.hp - enemyObj.damage;
        $("footer").html("<div>" + userObj.name + " attacked " + enemyObj.name + " for <span style='color:red;'>" + userObj.damage * turnCounter + "</span> damage!</div>");
        $("footer").append(enemyObj.name + " attacked " + userObj.name + " back for <span style='color:red;'>" + enemyObj.damage + "</span> damage!</div>");
        if ( userObj.hp > enemyObj.hp ){
            $("footer").append(" Fear is the path to the dark side!!");
        } else {
            $("footer").append(" Come to the dark side!!");
        }
        $(".box-5 .hp").text(userObj.hp);
        $(".box-4 .hp").text(enemyObj.hp);
        turnCounter++;
    }

    // when user hp is negative, user lose
    var youLose = function () {
        if (userObj.hp < 1 && enemyObj.hp > 0) {
            $("footer").html(enemyObj.name + " has defeated " + userObj + "!!!");
            $(".box-3").html("<img id='restart' src='assets/images/loserestart.png'>");
        } else if (enemyObj.hp < 1 && userObj.hp < 1) {
            $("footer").html("both died.");
            $(".box-3").html("<img id='restart' src='assets/images/loserestart.png'>");
        }
    }

    // GAME OVER!"
    var youWon = function () {
        if (enemyObj.hp < 1 && userObj.hp > 0) {
            if (killCount < 2) {
                $("footer").html(userObj.name + " defeated " + enemyObj.name + "!<br> Choose your next battle.<br> Force be with you.");
                killCount++;
                enemyChosen = false;
                $("#attack").remove();
                $("<div class='choose-battle'>Choose your next battle</div>").appendTo($(".box-3"));
                //$(".box-3").off("click").css("pointer-events", "none");
            } else {
                $("footer").html("You won!<br>Strong in you, the force");
                $(".box-3").html("<img id='restart' src='assets/images/winrestart.png'>");
            }
        } else if (enemyObj.hp < 1 && userObj.hp < 1) {
            $("footer").html("both died.");
            $(".box-3").html("<img id='restart' src='assets/images/loserestart.png'>");
        }
    }

    // on click functions

    $(".character").on("click", function () {

        // pick 1 character
        if ( !characterChosen  && !enemyChosen ) {
            $(".choose-character").replaceWith($(this));
            $(this).children().last().css("background-color", "green");

            // move all divs to the left
            if ($(this).attr("id") == "vader") {
                $("#kylo").appendTo($(".box-3"));
            } else if ($(this).attr("id") == "yoda") {
                $("#vader").appendTo($(".box-2"));
                $("#kylo").appendTo($(".box-3"));
            } else if ($(this).attr("id") == "rey") {
                $("#yoda").appendTo($(".box-1"));
                $("#vader").appendTo($(".box-2"));
                $("#kylo").appendTo($(".box-3"));
            }

            // div box for "choose your battle" in box-4
            $("<div class='choose-battle'>Choose your battle</div>").appendTo($(".box-4"));
            $(".box-5").css("pointer-events", "none");
            characterChosen = true;
            return;
        }

        // pick villain first round
        if (characterChosen && !enemyChosen && killCount === 0) {
            $(".choose-battle").replaceWith($(this));
            $(this).children().last().css("background", "red");

            if ($(".box-1").children().length == 0) {
                $(".box-2").children().appendTo($(".box-1"));
                $(".box-3").children().appendTo($(".box-2"));
            } else if ($(".box-2").children().length == 0) {
                $(".box-3").children().appendTo($(".box-2"));
            }

            enemyChosen = true;
            $(".box-3").append("<img id='attack' src='assets/images/attack.png'>");
        }

        // pick villain second round
        if (characterChosen && !enemyChosen && killCount == 1) {
            $(".box-4").html($(this));
            $(this).children().last().css("background", "red");
            enemyChosen = true;
            $("footer").empty();
            $(".box-3").html("<img id='attack' src='assets/images/attack.png'>");
        }

        // pick villain third round
        if (characterChosen && !enemyChosen && killCount == 2) {
            $(".box-4").html($(this));
            $(this).children().last().css("background", "red");
            enemyChosen = true;
            $("footer").empty();
            $(".box-3").html("<img id='attack' src='assets/images/attack.png'>");
        }
    })

    // fight by clicking on attack button
    // click attack, your attack damage remembers from last enemy and continues to increase by increments
    $(".box-3").on("click", "#attack", function () {
        user = $(".box-5").children("div").eq(0).attr("id");
        enemy = $(".box-4").children("div").eq(0).attr("id");
        // access objects of obj array with [int]
        userObj = characters[user];
        enemyObj = characters[enemy];

        // first round
        if (killCount == 0) {
            attack();
            youLose();
            youWon();
            // second round
        } else if (killCount == 1) {
            attack();
            youLose();
            youWon();
            // third round
        } else if (killCount == 2) {
            attack();
            youLose();
            youWon();
        }
    })

    $(".box-3").on("click", "#restart", function () {
        location.reload();
    })
})