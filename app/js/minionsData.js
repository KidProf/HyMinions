console.log("START");

var diamondSpreading = {
    item: "Diamond (Spreading)",
    npcPrice: 8,
    variants: [
        "Enchanted Diamond (Spreading)",
        "Enchanted Diamond Block (Spreading)",
    ],
    variantsEquiv: [
        160,
        25600
    ],
}

var minions = [
    { //0
        name: "Revenant Minion",
        tierDelay : [29,29,26,26,23,23,19,19,14.5,14.5,10],
        products : [
            {
                item : "Rotten Flesh",
                perTime : 3,
				npcPrice: 2,
                variants: [
                    "Enchanted Rotten Flesh",
				],
                variantsEquiv: [
                    160
                ],
            },
            {
                item : "Diamond",
                perTime : 0.2,
                npcPrice: 8,
                variants: [
                    "Enchanted Diamond",
                    "Enchanted Diamond Block",
                ],
                variantsEquiv: [
                    160,
                    25600
                ],
            }
        ]      
    },{ //1
        name: "Tarantula Minion",
        tierDelay : [29,29,26,26,23,23,19,19,14.5,14.5,10],
        products : [
            {
                item : "String",
                perTime : 3.16,
                npcPrice: 3,
                variants: [
                    "Enchanted String"
                ],
                variantsEquiv: [
                    192 //192
                ]
            },
            {
                item : "Spider Eye",
                perTime : 1,
                npcPrice: 3,
                variants: [
                    "Enchanted Spider Eye"
                ],
                variantsEquiv: [
                    160
                ]
            },
            {
                item : "Iron Ingot",
                perTime : 0.2,
                npcPrice: 3,
                variants: [
                    "Enchanted Iron",
                    "Enchanted Iron Block",
                ],
                variantsEquiv: [
                    160,
                    25600
                ]
            }
        ]      
    },{ //2
        name: "Potato Minion",
        tierDelay : [20,20,18,18,16,16,14,14,12,12,10],
        products : [
            {
                item : "Potato",
                perTime : 3,
                npcPrice: 1,
                variants: [
                    "Enchanted Potato",
                    "Enchanted Baked Potato",
                    "Hot Potato Book",
                ],
                variantsEquiv: [
                    160,
                    25600,
                    25600,
                ]
            },
        ]
    },{ //3
        name: "Cow Minion",
        tierDelay : [26,26,24,24,22,22,20,20,17,17,13],
        products : [
            {
                item : "Raw Beef",
                perTime : 1,
                npcPrice: 4,
                variants: [
                    "Enchanted Raw Beef"
                ],
                variantsEquiv: [
                    160
                ]
            },
            {
                item : "Leather",
                perTime : 1,
                npcPrice: 3,
                variants: [
                    "Enchanted Leather"
                ],
                variantsEquiv: [
                    576 //576
                ]
            }
        ]      
    },{ //4 
        name: "Chicken Minion",
        tierDelay : [26,26,24,24,22,22,20,20,18,18,15],
        noDiamondSpreading : 1,
        products : [
            {
                item : "Raw Chicken",
                perTime : 1,
                npcPrice: 4,
                variants: [
                    "Enchanted Raw Chicken"
                ],
                variantsEquiv: [
                    160
                ]
            },
            {
                item : "Feather",
                perTime : 1,
                npcPrice: 3,
                variants: [
                    "Enchanted Feather"
                ],
                variantsEquiv: [
                    160
                ]
            },
            {
                item : "Egg",
                perTime : 1,
                npcPrice: 3,
                variants: [
                    "Enchanted Egg",
                    "Super Enchanted Egg"
                ],
                variantsEquiv: [
                    144, //144
                    20736 
                ]

            }
        ]      
    },{ //5
        name: "Sheep Minion",
        tierDelay : [24,24,22,22,20,20,18,18,16,16,12],
        products : [
            {
                item : "Mutton",
                perTime : 1,
                npcPrice: 5,
                variants: [
                    "Enchanted Mutton",
                    "Enchanted Cooked Mutton"
                ],
                variantsEquiv: [
                    160,
                    25600
                ]
            },
            {
                item : "White Wool",
                perTime : 1,
                npcPrice: 2,
                variants : [
                    "Enchanted Wool",
                ],
                variantsEquiv: [
                    160,
                ]
            }
        ]      
    },{ //6
        name: "Lapis Minion",
        tierDelay : [29,29,27,27,25,25,23,23,21,21,18],
        products : [
            {
                item : "Lapis Lazuli",
                perTime : 6,
                npcPrice: 1,
                variants: [
                    "Enchanted Lapis Lazuli",
                    "Enchanted Lapis Block"
                ],
                variantsEquiv: [
                    160,
                    25600
                ]
            },
        ]      
    },{ //7
        name: "Gravel Minion",
        tierDelay : [26,26,24,24,22,22,19,19,16,16,13],
        noDiamondSpreading : 1,
        products : [
            {
                item : "Gravel",
                perTime : 1,
                npcPrice: 3,
                variants: [
                    "No gravel with flint shovel",
                ],
                variantsEquiv: [
                    1
                ],
                variantsNpcPrices: [
                    0
                ]
            },{
                item : "Flint",
                perTime : 1,
                npcPrice: 4,
                variants: [
                    "Enchanted Flint",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //8
        name: "Blaze Minion",
        tierDelay : [33,33,31,31,28.5,28.5,25,25,21,21,16.5],
        products : [
            {
                item : "Blaze Rod",
                perTime : 1,
                npcPrice: 9,
                variants: [
                    "Enchanted Blaze Powder",
                    "Enchanted Blaze Rod"
                ],
                variantsEquiv: [
                    160,
                    25600
                ]
            },
        ]      
    },{ //9
        name: "Wheat Minion",
        tierDelay : [15,15,13,13,11,11,10,10,9,9,8],
        noDiamondSpreading : 1,
        products : [
            {
                item : "Wheat",
                perTime : 1,
                npcPrice: 1,
                variants: [
                    "Enchanted Hay Bale",
                    "Enchanted Bread",
                    "Hay Bale"
                ],
                variantsEquiv: [
                    1296,
                    96,
                    9
                ],
                variantsIsEnchanted:[
                    1,
                    1,
                    0
                ]
            },{
                item : "Seeds",
                perTime : 1,
                npcPrice: 0.5,
                variants: [
                    "Enchanted Seeds",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //10
        name: "Carrot Minion",
        tierDelay : [20,20,18,18,16,16,14,14,12,12,10],
        products : [
            {
                item : "Carrot",
                perTime : 3, //3
                npcPrice: 1,
                variants: [
                    "Enchanted Carrot",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //11
        name: "Pumpkin Minion",
        tierDelay : [32,32,30,30,27,27,24,24,20,20,16],
        products : [
            {
                item : "Pumpkin",
                perTime : 1,
                npcPrice: 4,
                variants: [
                    "Enchanted Pumpkin",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //12
        name: "Melon Minion",
        tierDelay : [24,24,22.5,22.5,21,21,18.5,18.5,16,16,13],
        products : [
            {
                item : "Melon",
                perTime : 6, //6
                npcPrice: 0.5,
                variants: [
                    "Enchanted Melon",
                    "Enchanted Melon Block",
                ],
                variantsEquiv: [
                    160,
                    25600,

                ]
            },
        ]      
    },{ //13
        name: "Mushroom Minion",
        tierDelay : [30,30,28,28,26,26,23,23,20,20,16],
        products : [
            {
                item : "Red Mushroom",
                perTime : 0.5, //0.5
                npcPrice: 4,
                variants: [
                    "Enchanted Red Mushroom",
                ],
                variantsEquiv: [
                    160,

                ]
            },{
                item : "Brown Mushroom",
                perTime : 0.5, //0.5
                npcPrice: 4,
                variants: [
                    "Enchanted Brown Mushroom",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //14
        name: "Cocoa Beans Minion",
        rawId: "COCOA",
        tierDelay : [27,27,25,25,23,23,21,21,18,18,15],
        products : [
            {
                item : "Cocoa Beans",
                perTime : 3, //3
                npcPrice: 3,
                variants: [
                    "Enchanted Cocoa Bean",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //15
        name: "Cactus Minion",
        tierDelay : [27,27,25,25,23,23,21,21,18,18,15],
        noDiamondSpreading: 1,
        products : [
            {
                item : "Cactus",
                perTime : 1,
                npcPrice: 1,
                variants: [
                    "Enchanted Cactus Green",
                    "Enchanted Cactus"
                ],
                variantsEquiv: [
                    160,
                    25600,
                ]
            },
        ]      
    },{ //16
        name: "Sugar Cane Minion",
        rawId: "SUGAR_CANE",
        tierDelay : [22,22,20,20,18,18,16,16,14.5,14.5,12],
        products : [
            {
                item : "Sugar Cane",
                perTime : 1,
                npcPrice: 2,
                variants: [
                    "Enchanted Sugar",
                    "Enchanted Sugar Cane"
                ],
                variantsEquiv: [
                    160,
                    25600,
                ]
            },
        ]      
    },{ //17
        name: "Pig Minion",
        tierDelay : [26,26,24,24,22,22,20,20,17,17,13],
        products : [
            {
                item : "Raw Porkchop",
                perTime : 1,
                npcPrice: 5,
                variants: [
                    "Enchanted Pork",
                    "Enchanted Grilled Pork"
                ],
                variantsEquiv: [
                    160,
                    25600,
                ]
            },
        ]      
    },{ //18
        name: "Rabbit Minion",
        tierDelay : [26,26,24,24,22,22,20,20,17,17,13],
        products : [
            {
                item : "Raw Rabbit",
                perTime : 1,
                npcPrice: 4,
                variants: [
                    "Enchanted Raw Rabbit",
                ],
                variantsEquiv: [
                    160,
                ]
            },{
                item : "Rabbit\'s Foot",
                perTime : 0.35, //0.35
                npcPrice: 5,
                variants: [
                    "Enchanted Rabbit Foot",
                ],
                variantsEquiv: [
                    160,
                ]
            },{
                item : "Rabbit Hide",
                perTime : 0.35, //0.35
                npcPrice: 5,
                variants: [
                    "Enchanted Rabbit Hide",
                ],
                variantsEquiv: [
                    576, //576
                ]
            },
        ]      
    },{ //19
        name: "Nether Wart Minion",
        rawId: "NETHER_WARTS",
        tierDelay : [50,50,47,47,44,44,41,41,38,38,32],
        products : [
            {
                item : "Nether Wart",
                perTime : 1,
                npcPrice: 3,
                variants: [
                    "Enchanted Nether Wart",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //20
        name: "Cobblestone Minion",
        tierDelay : [14,14,12,12,10,10,9,9,8,8,7],
        products : [
            {
                item : "Cobblestone",
                perTime : 1,
                npcPrice: 1,
                variants: [
                    "Enchanted Cobblestone",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //21
        name: "Gold Minion",
        tierDelay : [22,22,20,20,18,18,16,16,14,14,11],
        noDiamondSpreading : 1,
        products : [
            {
                item : "Gold Ingot",
                perTime : 1,
                npcPrice: 4,
                variants: [
                    "Enchanted Gold",
                    "Enchanted Gold Block"
                ],
                variantsEquiv: [
                    160,
                    25600,
                ]
            },
        ]      
    },{ //22
        name: "Diamond Minion",
        tierDelay : [29,29,27,27,25,25,22,22,19,19,15],
        products : [
            {
                item : "Diamond",
                perTime : 1,
                npcPrice: 8,
                variants: [
                    "Enchanted Diamond",
                    "Enchanted Diamond Block"
                ],
                variantsEquiv: [
                    160,
                    25600,
                ]
            },
        ]      
    },{ //23
        name: "Emerald Minion",
        tierDelay : [28,28,26,26,24,24,21,21,18,18,14],
        products : [
            {
                item : "Emerald",
                perTime : 1,
                npcPrice: 6,
                variants: [
                    "Enchanted Emerald",
                    "Enchanted Emerald Block"
                ],
                variantsEquiv: [
                    160,
                    25600,
                ]
            },
        ]      
    },{ //24
        name: "Redstone Minion",
        tierDelay : [29,29,27,27,25,25,23,23,21,21,18],
        products : [
            {
                item : "Redstone",
                perTime : 4.5,
                npcPrice: 1,
                variants: [
                    "Enchanted Redstone",
                    "Enchanted Redstone Block"
                ],
                variantsEquiv: [
                    160,
                    25600,
                ]
            },
        ]      
    },{ //25
        name: "Quartz Minion",
        tierDelay : [22.5,22.5,21,21,19,19,17,17,14.5,14.5,11.5],
        products : [
            {
                item : "Quartz",
                perTime : 1,
                npcPrice: 4,
                variants: [
                    "Enchanted Quartz",
                    "Enchanted Quartz Block"
                ],
                variantsEquiv: [
                    160,
                    25600,
                ]
            },
        ]      
    },{ //26
        name: "Obsidian Minion",
        tierDelay : [45,45,42,42,39,39,35,35,30,30,24],
        products : [
            {
                item : "Obsidian",
                perTime : 1,
                npcPrice: 12,
                variants: [
                    "Enchanted Obsidian",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //27
        name: "Glowstone Minion",
        tierDelay : [25,25,23,23,21,21,19,19,16,16,13],
        products : [
            {
                item : "Glowstone Dust",
                perTime : 3, //3
                npcPrice: 2,
                variants: [
                    "Enchanted Glowstone Dust",
                    "Enchanted Glowstone"
                ],
                variantsEquiv: [
                    160,
                    30720, //30720
                ]
            },
        ]      
    },{ //28
        name: "Ice Minion",
        tierDelay : [14,14,12,12,10,10,9,9,8,8,7],
        products : [
            {
                item : "Ice",
                perTime : 1,
                npcPrice: 0.5,
                variants: [
                    "Enchanted Ice",
                    "Enchanted Packed Ice",
                ],
                variantsEquiv: [
                    160,
                    25600,
                ]
            },
        ]      
    },{ //29
        name: "Sand Minion",
        tierDelay : [26,26,24,24,22,22,19,19,16,16,13],
        products : [
            {
                item : "Sand",
                perTime : 1,
                npcPrice: 2,
                variants: [
                    "Enchanted Sand",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //30
        name: "End Stone Minion",
        rawId: "ENDER_STONE",
        tierDelay : [26,26,24,24,22,22,19,19,16,16,13],
        products : [
            {
                item : "End Stone",
                perTime : 1,
                npcPrice: 2,
                variants: [
                    "Enchanted End Stone",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //31
        name: "Clay Minion",
        tierDelay : [32,32,30,30,27.5,27.5,24,24,20,20,16],
        products : [
            {
                item : "Clay",
                perTime : 4, //4
                npcPrice: 3,
                variants: [
                    "Enchanted Clay",
                ],
                variantsEquiv: [
                    160,
                ],
            },
        ]      
    },{ //32
        name: "Zombie Minion",
        tierDelay : [26,26,24,24,22,22,20,20,17,17,13],
        products : [
            {
                item : "Rotten Flesh",
                perTime : 1,
                npcPrice: 2,
                variants: [
                    "Enchanted Rotten Flesh",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //33
        name: "Skeleton Minion",
        tierDelay : [26,26,24,24,22,22,20,20,17,17,13],
        products : [
            {
                item : "Bone",
                perTime : 1,
                npcPrice: 2,
                variants: [
                    "Enchanted Bone",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //34
        name: "Spider Minion",
        tierDelay : [26,26,24,24,22,22,20,20,17,17,13],
        products : [
            {
                item : "String",
                perTime : 1,
                npcPrice: 3,
                variants: [
                    "Enchanted String",
                ],
                variantsEquiv: [
                    192, //192
                ]
            },{
                item : "Spider Eye",
                perTime : 0.5, //0.5
                npcPrice: 3,
                variants: [
                    "Enchanted Spider Eye",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //35
        name: "Cave Spider Minion",
        rawId: "CAVESPIDER",
        tierDelay : [26,26,24,24,22,22,20,20,17,17,13],
        products : [
            {
                item : "String",
                perTime : 0.5, //0.5
                npcPrice: 3,
                variants: [
                    "Enchanted String",
                ],
                variantsEquiv: [
                    192, //192
                ]
            },{
                item : "Spider Eye",
                perTime : 1,
                npcPrice: 3,
                variants: [
                    "Enchanted Spider Eye",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //36
        name: "Creeper Minion",
        tierDelay : [27,27,25,25,23,23,21,21,18,18,14],
        products : [
            {
                item : "Gunpowder",
                perTime : 1,
                npcPrice: 4,
                variants: [
                    "Enchanted Gunpowder",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //37
        name: "Enderman Minion",
        tierDelay : [32,32,30,30,28,28,25,25,22,22,18],
        products : [
            {
                item : "Ender Pearl",
                perTime : 1,
                npcPrice: 10,
                variants: [
                    "Enchanted Ender Pearl",
                ],
                variantsEquiv: [
                    20, //20
                ]
            },
        ]      
    },{ //38
        name: "Ghast Minion",
        tierDelay : [50,50,47,47,44,44,41,41,38,38,32],
        products : [
            {
                item : "Ghast Tear",
                perTime : 1,
                npcPrice: 16,
                variants: [
                    "Enchanted Ghast Tear",
                ],
                variantsEquiv: [
                    5, //5
                ]
            },
        ]      
    },{ //39
        name: "Slime Minion",
        tierDelay : [26,26,24,24,22,22,19,19,16,16,12],
        products : [
            {
                item : "Slimeball",
                perTime : 1.8,
                npcPrice: 5,
                variants: [
                    "Enchanted Slimeball",
                    "Enchanted Slime Block",
                ],
                variantsEquiv: [
                    160,
                    25600,
                ]
            },
        ]      
    },{ //40
        name: "Magma Cube Minion",
        rawId: "MAGMA_CUBE",
        tierDelay : [32,32,30,30,28,28,25,25,22,22,18],
        products : [
            {
                item : "Magma Cream",
                perTime : 1.8,
                npcPrice: 8,
                variants: [
                    "Enchanted Magma Cream",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //41
        name: "Oak Minion",
        tierDelay : [48,48,45,45,42,42,38,38,33,33,27],
        products : [
            {
                item : "Oak Wood",
                perTime : 4, //4
                npcPrice: 2,
                variants: [
                    "Enchanted Oak Wood",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //42
        name: "Spruce Minion",
        tierDelay : [48,48,45,45,42,42,38,38,33,33,27],
        products : [
            {
                item : "Spruce Wood",
                perTime : 4, //4
                npcPrice: 2,
                variants: [
                    "Enchanted Spruce Wood",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //43
        name: "Birch Minion",
        tierDelay : [48,48,45,45,42,42,38,38,33,33,27],
        products : [
            {
                item : "Birch Wood",
                perTime : 4, //4
                npcPrice: 2,
                variants: [
                    "Enchanted Birch Wood",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //44
        name: "Dark Oak Minion",
        rawId: "DARK_OAK",
        tierDelay : [48,48,45,45,42,42,38,38,33,33,27],
        products : [
            {
                item : "Dark Oak Wood",
                perTime : 4, //4
                npcPrice: 2,
                variants: [
                    "Enchanted Dark Oak Wood",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //45
        name: "Acacia Minion",
        tierDelay : [48,48,45,45,42,42,38,38,33,33,27],
        products : [
            {
                item : "Acacia Wood",
                perTime : 4, //4
                npcPrice: 2,
                variants: [
                    "Enchanted Acacia Wood",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //46
        name: "Jungle Minion",
        tierDelay : [48,48,45,45,42,42,38,38,33,33,27],
        products : [
            {
                item : "Jungle Wood",
                perTime : 4, //4
                npcPrice: 2,
                variants: [
                    "Enchanted Jungle Wood",
                ],
                variantsEquiv: [
                    160,
                ]
            },
        ]      
    },{ //47
        name: "Fishing Minion",
        tierDelay : [78,75,72,72,68,68,62.5,62.5,53,53,35],
        products : [
            {
                item : "Raw Fish",
                perTime : 0.5, //0.5
                npcPrice: 6,
                variants: [
                    "Enchanted Raw Fish",
                    "Enchanted Cooked Fish",
                ],
                variantsEquiv: [
                    160,
                    25600,
                ]
            },{
                item : "Raw Salmon",
                perTime : 0.25, //0.25
                npcPrice: 10,
                variants: [
                    "Enchanted Raw Salmon",
                    "Enchanted Cooked Salmon"
                ],
                variantsEquiv: [
                    160,
                    25600,
                ]
            },{
                item : "Pufferfish",
                perTime : 0.12, //0.12
                npcPrice: 15,
                variants: [
                    "Enchanted Pufferfish",
                ],
                variantsEquiv: [
                    160,
                ]
            },{
                item : "Clownfish",
                perTime : 0.04, //0.04
                npcPrice: 20,
                variants: [
                    "Enchanted Clownfish",
                ],
                variantsEquiv: [
                    160,
                ]
            },{
                item : "Prismarine Crystals",
                perTime : 0.03, //0.03
                npcPrice: 5,
                variants: [
                    "Enchanted Prismarine Crystals",
                ],
                variantsEquiv: [
                    80, //80
                ]
            },{
                item : "Prismarine Shard",
                perTime : 0.03, //0.03
                npcPrice: 5,
                variants: [
                    "Enchanted Prismarine Shard",
                ],
                variantsEquiv: [
                    80, //80
                ]
            },{
                item : "Sponge",
                perTime : 0.03, //0.03
                npcPrice: 50,
                variants: [
                    "Enchanted Sponge",
                    "Enchanted Wet Sponge"
                ],
                variantsEquiv: [
                    40, //40
                    1600, //1600
                ]
            },
        ]      
    },{ //48
        name: "Snow Minion",
        tierDelay : [13,13,12,12,11,11,9.5,9.5,8,8,6.5],
        products : [
            {
                item : "Snowball",
                perTime : 4, //4
                npcPrice: 1,
                variants: [
                    "Enchanted Snow Block",
                    "Snow Block",
                ],
                variantsEquiv: [
                    640, //640
                    4, //4
                ],
                variantsNpcPrices: [
                    600,
                    4
                ],
                variantsIsEnchanted:[
                    1,
                    0
                ]
            },
        ]      
    },{ //49
        name: "Coal Minion",
        tierDelay : [15,15,13,13,12,12,10,10,9,9,7],
        products : [
            {
                item : "Coal",
                perTime : 1,
                npcPrice: 2,
                variants: [
                    "Enchanted Coal",
                    "Enchanted Block of Coal"
                ],
                variantsEquiv: [
                    160,
                    25600,
                ]
            },
        ]      
    },{ //50
        name: "Iron Minion",
        tierDelay : [17,17,15,15,14,14,12,12,10,10,8],
        noDiamondSpreading : 1,
        products : [
            {
                item : "Iron Ingot",
                perTime : 1,
                npcPrice: 3,
                variants: [
                    "Enchanted Iron",
                    "Enchanted Iron Block",
                ],
                variantsEquiv: [
                    160,
                    25600
                ]
            }
        ]      
    },

    //TOTAL: 51
    //without flower minion
];
