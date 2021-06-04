exports.soulflowItem = {
    item: "Raw Soulflow",
    npcPrice: 0,
    variants: [
        "Raw Soulflow",
        "Soulflow",
    ],
    variantsEquiv: [
        1,
        160,
    ],
}

exports.minions = [
    { //0
        name: "Revenant Minion",
        id: 0,
        tierDelay : [29,29,26,26,23,23,19,19,14.5,14.5,10,8],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Rotten Flesh",
                perTime : 3,
				npcPrice: 2,
                variants: [
                    "Rotten Flesh",
                    "Enchanted Rotten Flesh",
				],
                variantsEquiv: [
                    1,
                    160
                ],
            },
            {
                item : "Diamond",
                perTime : 0.2,
                npcPrice: 8,
                variants: [
                    "Diamond",
                    "Enchanted Diamond",
                    "Enchanted Diamond Block",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //1
        name: "Tarantula Minion",
        id: 1,
        tierDelay : [29,29,26,26,23,23,19,19,14.5,14.5,10],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "String",
                perTime : 3.16,
                npcPrice: 3,
                variants: [
                    "String",
                    "Enchanted String"
                ],
                variantsEquiv: [
                    1,
                    192 //192
                ]
            },
            {
                item : "Spider Eye",
                perTime : 1,
                npcPrice: 3,
                variants: [
                    "Spider Eye",
                    "Enchanted Spider Eye"
                ],
                variantsEquiv: [
                    1,
                    160
                ]
            },
            {
                item : "Iron Ingot",
                perTime : 0.2,
                npcPrice: 3,
                variants: [
                    "Iron Ingot",
                    "Enchanted Iron",
                    "Enchanted Iron Block",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //2
        name: "Potato Minion",
        id: 2,
        tierDelay : [20,20,18,18,16,16,14,14,12,12,10,8],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Potato",
                perTime : 3,
                npcPrice: 1,
                variants: [
                    "Potato",
                    "Enchanted Potato",
                    "Enchanted Baked Potato",
                    "Hot Potato Book",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,
                    25600,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]
    },{ //3
        name: "Cow Minion",
        id: 3,
        tierDelay : [26,26,24,24,22,22,20,20,17,17,13,10],
        storage: [128,256,256,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Raw Beef",
                perTime : 1,
                npcPrice: 4,
                variants: [
                    "Raw Beef",
                    "Enchanted Raw Beef"
                ],
                variantsEquiv: [
                    1,
                    160
                ]
            },
            {
                item : "Leather",
                perTime : 1,
                npcPrice: 3,
                variants: [
                    "Leather",
                    "Enchanted Leather"
                ],
                variantsEquiv: [
                    1,
                    576 //576
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //4 
        name: "Chicken Minion",
        id: 4,
        tierDelay : [26,26,24,24,22,22,20,20,18,18,15,12],
        storage: [192,320,320,384,384,576,576,768,768,960,960,960],
        diamondSpreadingCriteria : 3,
        warning: "Enchanted egg is needed",
        toolsRequired: ["Enchanted Egg"],
        products : [
            {
                item : "Raw Chicken",
                perTime : 1,
                npcPrice: 4,
                variants: [
                    "Raw Chicken",
                    "Enchanted Raw Chicken"
                ],
                variantsEquiv: [
                    1,
                    160
                ]
            },
            {
                item : "Feather",
                perTime : 1,
                npcPrice: 3,
                variants: [
                    "Feather",
                    "Enchanted Feather"
                ],
                variantsEquiv: [
                    1,
                    160
                ]
            },
            {
                item : "Egg",
                perTime : 1,
                npcPrice: 3,
                variants: [
                    "Egg",
                    "Enchanted Egg",
                    "Super Enchanted Egg"
                ],
                variantsEquiv: [
                    1,
                    144, //144
                    20736 
                ]

            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //5
        name: "Sheep Minion",
        id: 5,
        tierDelay : [24,24,22,22,20,20,18,18,16,16,12,9],
        storage: [128,256,256,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Mutton",
                perTime : 1,
                npcPrice: 5,
                variants: [
                    "Mutton",
                    "Enchanted Mutton",
                    "Enchanted Cooked Mutton"
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ]
            },
            {
                item : "White Wool",
                perTime : 1,
                npcPrice: 2,
                variants : [
                    "White Wool",
                    "Enchanted Wool",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //6
        name: "Lapis Minion",
        id: 6,
        tierDelay : [29,29,27,27,25,25,23,23,21,21,18,16],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Lapis Lazuli",
                perTime : 6,
                npcPrice: 1,
                canCompactor: true,
                compactor: {
                    variant: "Lapis Lazuli Block",
                    variantEquiv: 9,
                },
                variants: [
                    "Lapis Lazuli",
                    "Enchanted Lapis Lazuli",
                    "Enchanted Lapis Block"
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //7
        name: "Gravel Minion",
        id: 7,
        tierDelay : [26,26,24,24,22,22,19,19,16,16,13],
        storage: [128,256,256,384,384,576,576,768,768,960,960],
        diamondSpreadingCriteria : 3,
        warning: "Flint shovel is needed",
        toolsRequired: ["Flint shovel"],
        products : [
            {
                item : "Gravel",
                perTime : 1,
                npcPrice: 3,
                variants: [
                    "Gravel",
                ],
                variantsEquiv: [
                    1,
                ],
                variantsNpcPrices: [
                    3,
                ],
                defaultVariant: -1,
            },{
                item : "Flint",
                perTime : 1,
                npcPrice: 4,
                variants: [
                    "Flint",
                    "Enchanted Flint",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //8
        name: "Blaze Minion",
        id: 8,
        tierDelay : [33,33,31,31,28.5,28.5,25,25,21,21,16.5],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Blaze Rod",
                perTime : 1,
                npcPrice: 9,
                variants: [
                    "Blaze Rod",
                    "Enchanted Blaze Powder",
                    "Enchanted Blaze Rod"
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //9
        name: "Wheat Minion",
        id: 9,
        tierDelay : [15,15,13,13,11,11,10,10,9,9,8,7],
        storage: [128,256,256,384,384,576,576,768,768,960,960,960],
        diamondSpreadingCriteria : 3,
        warning: "Both compactor and sc3000 are needed",
        toolsRequired: ["Compactor"],
        products : [
            {
                item : "Wheat",
                perTime : 1,
                npcPrice: 1,
                canCompactor: true,
                compactor: {
                    variant: "Hay Bale",
                    variantEquiv: 9,
                },
                variants: [
                    "Wheat",
                    "Enchanted Hay Bale",
                    "Tightly-Tied Hay Bale",
                    "Hay Bale",
                    "Enchanted Bread",
                ],
                variantsEquiv: [
                    1,
                    1296,
                    186624,
                    9,
                    96
                ],
                variantsIsEnchanted:[
                    0,
                    1,
                    1,
                    0,
                    0
                ]
            },{
                item : "Seeds",
                perTime : 1,
                npcPrice: 0.5,
                variants: [
                    "Seeds",
                    "Enchanted Seeds",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //10
        name: "Carrot Minion",
        id: 10,
        tierDelay : [20,20,18,18,16,16,14,14,12,12,10,8],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Carrot",
                perTime : 3, //3
                npcPrice: 1,
                variants: [
                    "Carrot",
                    "Enchanted Carrot",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //11
        name: "Pumpkin Minion",
        id: 11,
        tierDelay : [32,32,30,30,27,27,24,24,20,20,16,12],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Pumpkin",
                perTime : 1,
                npcPrice: 4,
                variants: [
                    "Pumpkin",
                    "Enchanted Pumpkin",
                    "Polished Pumpkin",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //12
        name: "Melon Minion",
        id: 12,
        tierDelay : [24,24,22.5,22.5,21,21,18.5,18.5,16,16,13,10],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Melon",
                perTime : 6, //6
                npcPrice: 0.5,
                variants: [
                    "Melon",
                    "Enchanted Melon",
                    "Enchanted Melon Block",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,

                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //13
        name: "Mushroom Minion",
        id: 13,
        tierDelay : [30,30,28,28,26,26,23,23,20,20,16,12],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Red Mushroom",
                perTime : 0.5, //0.5
                npcPrice: 4,
                variants: [
                    "Red Mushroom",
                    "Enchanted Red Mushroom",
                ],
                variantsEquiv: [
                    1,
                    160,

                ]
            },{
                item : "Brown Mushroom",
                perTime : 0.5, //0.5
                npcPrice: 4,
                variants: [
                    "Brown Mushroom",
                    "Enchanted Brown Mushroom",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //14
        name: "Cocoa Beans Minion",
        id: 14,
        rawId: "COCOA",
        tierDelay : [27,27,25,25,23,23,21,21,18,18,15,12],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Cocoa Beans",
                perTime : 3, //3
                npcPrice: 3,
                variants: [
                    "Cocoa Beans",
                    "Enchanted Cocoa Bean",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //15
        name: "Cactus Minion",
        id: 15,
        tierDelay : [27,27,25,25,23,23,21,21,18,18,15,12],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        diamondSpreadingCriteria : 2,
        //warning: "Auto smelter/Dwarven super compactor is needed",
        toolsRequired: ["Auto Smelter"],
        products : [
            {
                item : "Cactus",
                perTime : 1,
                npcPrice: 1,
                variants: [
                    "Cactus",
                    "Enchanted Cactus Green",
                    "Enchanted Cactus"
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //16
        name: "Sugar Cane Minion",
        id: 16,
        rawId: "SUGAR_CANE",
        tierDelay : [22,22,20,20,18,18,16,16,14.5,14.5,12,9],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Sugar Cane",
                perTime : 1,
                npcPrice: 2,
                variants: [
                    "Sugar Cane",
                    "Enchanted Sugar",
                    "Enchanted Sugar Cane"
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //17
        name: "Pig Minion",
        id: 17,
        tierDelay : [26,26,24,24,22,22,20,20,17,17,13,10],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Raw Porkchop",
                perTime : 1,
                npcPrice: 5,
                variants: [
                    "Raw Porkchop",
                    "Enchanted Pork",
                    "Enchanted Grilled Pork"
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //18
        name: "Rabbit Minion",
        id: 18,
        tierDelay : [26,26,24,24,22,22,20,20,17,17,13,10],
        storage: [192,320,320,448,448,576,576,768,768,960,960,960],
        products : [
            {
                item : "Raw Rabbit",
                perTime : 1,
                npcPrice: 4,
                variants: [
                    "Raw Rabbit",
                    "Enchanted Raw Rabbit",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },{
                item : "Rabbit\'s Foot",
                perTime : 0.35, //0.35
                npcPrice: 5,
                variants: [
                    "Rabbit\'s Foot",
                    "Enchanted Rabbit Foot",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },{
                item : "Rabbit Hide",
                perTime : 0.35, //0.35
                npcPrice: 5,
                variants: [
                    "Rabbit Hide",
                    "Enchanted Rabbit Hide",
                ],
                variantsEquiv: [
                    1,
                    576, //576
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //19
        name: "Nether Wart Minion",
        id: 19,
        rawId: "NETHER_WARTS",
        tierDelay : [50,50,47,47,44,44,41,41,38,38,32,27],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Nether Wart",
                perTime : 1,
                npcPrice: 3,
                variants: [
                    "Nether Wart",
                    "Enchanted Nether Wart",
                    "Mutant Nether Wart",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //20
        name: "Cobblestone Minion",
        id: 20,
        tierDelay : [14,14,12,12,10,10,9,9,8,8,7,6],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Cobblestone",
                perTime : 1,
                npcPrice: 1,
                variants: [
                    "Cobblestone",
                    "Enchanted Cobblestone",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //21
        name: "Gold Minion",
        id: 21,
        tierDelay : [22,22,20,20,18,18,16,16,14,14,11,9],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        diamondSpreadingCriteria : 2,
        warning: "Auto smelter/Dwarven super compactor is needed",
        toolsRequired: ["Auto Smelter"],
        products : [
            {
                item : "Gold Ingot",
                perTime : 1,
                npcPrice: 4,
                canCompactor: true,
                compactor: {
                    variant: "Block of Gold",
                    variantEquiv: 9,
                },
                variants: [
                    "Gold Ingot",
                    "Enchanted Gold",
                    "Enchanted Gold Block"
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //22
        name: "Diamond Minion",
        id: 22,
        tierDelay : [29,29,27,27,25,25,22,22,19,19,15,12],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Diamond",
                perTime : 1,
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond",
                    "Enchanted Diamond",
                    "Enchanted Diamond Block"
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //23
        name: "Emerald Minion",
        id: 23,
        tierDelay : [28,28,26,26,24,24,21,21,18,18,14,12],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Emerald",
                perTime : 1,
                npcPrice: 6,
                canCompactor: true,
                compactor: {
                    variant: "Block of Emerald",
                    variantEquiv: 9,
                },
                variants: [
                    "Emerald",
                    "Enchanted Emerald",
                    "Enchanted Emerald Block"
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //24
        name: "Redstone Minion",
        id: 24,
        tierDelay : [29,29,27,27,25,25,23,23,21,21,18,16],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Redstone",
                perTime : 4.5,
                npcPrice: 1,
                canCompactor: true,
                compactor: {
                    variant: "Block of Redstone",
                    variantEquiv: 9,
                },
                variants: [
                    "Redstone",
                    "Enchanted Redstone",
                    "Enchanted Redstone Block"
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //25
        name: "Quartz Minion",
        id: 25,
        tierDelay : [22.5,22.5,21,21,19,19,17,17,14.5,14.5,11.5],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Quartz",
                perTime : 1,
                npcPrice: 4,
                canCompactor: true,
                compactor: {
                    variant: "Block of Quartz",
                    variantEquiv: 4, //4
                    minimumEnchanted: 1,
                },
                variants: [
                    "Quartz",
                    "Enchanted Quartz",
                    "Enchanted Quartz Block"
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //26
        name: "Obsidian Minion",
        id: 26,
        tierDelay : [45,45,42,42,39,39,35,35,30,30,24,21],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Obsidian",
                perTime : 1,
                npcPrice: 12,
                variants: [
                    "Obsidian",
                    "Enchanted Obsidian",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //27
        name: "Glowstone Minion",
        id: 27,
        tierDelay : [25,25,23,23,21,21,19,19,16,16,13],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Glowstone Dust",
                perTime : 3, //3
                npcPrice: 2,
                canCompactor: true,
                compactor: {
                    variant: "Glowstone",
                    variantEquiv: 4, //4
                    minimumEnchanted: 1,
                },
                variants: [
                    "Glowstone Dust",
                    "Enchanted Glowstone Dust",
                    "Enchanted Glowstone"
                ],
                variantsEquiv: [
                    1,
                    160,
                    30720, //30720
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //28
        name: "Ice Minion",
        id: 28,
        tierDelay : [14,14,12,12,10,10,9,9,8,8,7],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Ice",
                perTime : 1,
                npcPrice: 0.5,
                canCompactor: true,
                compactor: {
                    variant: "Packed Ice",
                    variantEquiv: 9, //4
                    minimumEnchanted: 1,
                },
                variants: [
                    "Ice",
                    "Enchanted Ice",
                    "Enchanted Packed Ice",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //29
        name: "Sand Minion",
        id: 29,
        tierDelay : [26,26,24,24,22,22,19,19,16,16,13],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Sand",
                perTime : 1,
                npcPrice: 2,
                variants: [
                    "Sand",
                    "Enchanted Sand",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //30
        name: "End Stone Minion",
        id: 30,
        rawId: "ENDER_STONE",
        tierDelay : [26,26,24,24,22,22,19,19,16,16,13],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "End Stone",
                perTime : 1,
                npcPrice: 2,
                variants: [
                    "End Stone",
                    "Enchanted End Stone",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //31
        name: "Clay Minion",
        id: 31,
        tierDelay : [32,32,30,30,27.5,27.5,24,24,20,20,16],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Clay",
                perTime : 4, //4
                npcPrice: 3,
                canCompactor: true,
                compactor: {
                    variant: "Clay Block",
                    variantEquiv: 4, //4
                    minimumEnchanted: 1,
                },
                variants: [
                    "Clay",
                    "Enchanted Clay",
                ],
                variantsEquiv: [
                    1,
                    160,
                ],
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //32
        name: "Zombie Minion",
        id: 32,
        tierDelay : [26,26,24,24,22,22,20,20,17,17,13],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Rotten Flesh",
                perTime : 1,
                npcPrice: 2,
                variants: [
                    "Rotten Flesh",
                    "Enchanted Rotten Flesh",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //33
        name: "Skeleton Minion",
        id: 33,
        tierDelay : [26,26,24,24,22,22,20,20,17,17,13],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Bone",
                perTime : 1,
                npcPrice: 2,
                variants: [
                    "Bone",
                    "Enchanted Bone",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //34
        name: "Spider Minion",
        id: 34,
        tierDelay : [26,26,24,24,22,22,20,20,17,17,13],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "String",
                perTime : 1,
                npcPrice: 3,
                variants: [
                    "String",
                    "Enchanted String",
                ],
                variantsEquiv: [
                    1,
                    192, //192
                ]
            },{
                item : "Spider Eye",
                perTime : 0.5, //0.5
                npcPrice: 3,
                variants: [
                    "Spider Eye",
                    "Enchanted Spider Eye",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //35
        name: "Cave Spider Minion",
        id: 35,
        rawId: "CAVESPIDER",
        tierDelay : [26,26,24,24,22,22,20,20,17,17,13],
        storage: [128,256,256,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "String",
                perTime : 0.5, //0.5
                npcPrice: 3,
                variants: [
                    "String",
                    "Enchanted String",
                ],
                variantsEquiv: [
                    1,
                    192, //192
                ]
            },{
                item : "Spider Eye",
                perTime : 1,
                npcPrice: 3,
                variants: [
                    "Spider Eye",
                    "Enchanted Spider Eye",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //36
        name: "Creeper Minion",
        id: 36,
        tierDelay : [27,27,25,25,23,23,21,21,18,18,14],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Gunpowder",
                perTime : 1,
                npcPrice: 4,
                variants: [
                    "Gunpowder",
                    "Enchanted Gunpowder",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //37
        name: "Enderman Minion",
        id: 37,
        tierDelay : [32,32,30,30,28,28,25,25,22,22,18],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Ender Pearl",
                perTime : 1,
                npcPrice: 7,
                variants: [
                    "Ender Pearl",
                    "Enchanted Ender Pearl",
                    "Absolute Ender Pearl"
                ],
                variantsEquiv: [
                    1,
                    20, //20
                    1600, //1600
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //38
        name: "Ghast Minion",
        id: 38,
        tierDelay : [50,50,47,47,44,44,41,41,38,38,32],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Ghast Tear",
                perTime : 1,
                npcPrice: 16,
                variants: [
                    "Ghast Tear",
                    "Enchanted Ghast Tear",
                ],
                variantsEquiv: [
                    1,
                    5, //5
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //39
        name: "Slime Minion",
        id: 39,
        tierDelay : [26,26,24,24,22,22,19,19,16,16,12],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Slimeball",
                perTime : 1.8,
                npcPrice: 5,
                canCompactor: true,
                compactor: {
                    variant: "Slime Block",
                    variantEquiv: 9,
                },
                variants: [
                    "Slimeball",
                    "Enchanted Slimeball",
                    "Enchanted Slime Block",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //40
        name: "Magma Cube Minion",
        id: 40,
        rawId: "MAGMA_CUBE",
        tierDelay : [32,32,30,30,28,28,25,25,22,22,18],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Magma Cream",
                perTime : 1.8,
                npcPrice: 8,
                variants: [
                    "Magma Cream",
                    "Enchanted Magma Cream",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //41
        name: "Oak Minion",
        id: 41,
        tierDelay : [48,48,45,45,42,42,38,38,33,33,27],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Oak Wood",
                perTime : 4, //4
                npcPrice: 2,
                variants: [
                    "Oak Wood",
                    "Enchanted Oak Wood",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //42
        name: "Spruce Minion",
        id: 42,
        tierDelay : [48,48,45,45,42,42,38,38,33,33,27],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Spruce Wood",
                perTime : 4, //4
                npcPrice: 2,
                variants: [
                    "Spruce Wood",
                    "Enchanted Spruce Wood",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //43
        name: "Birch Minion",
        id: 43,
        tierDelay : [48,48,45,45,42,42,38,38,33,33,27],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Birch Wood",
                perTime : 4, //4
                npcPrice: 2,
                variants: [
                    "Birch Wood",
                    "Enchanted Birch Wood",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //44
        name: "Dark Oak Minion",
        id: 44,
        rawId: "DARK_OAK",
        tierDelay : [48,48,45,45,42,42,38,38,33,33,27],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Dark Oak Wood",
                perTime : 4, //4
                npcPrice: 2,
                variants: [
                    "Dark Oak Wood",
                    "Enchanted Dark Oak Wood",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //45
        name: "Acacia Minion",
        id: 45,
        tierDelay : [48,48,45,45,42,42,38,38,33,33,27],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Acacia Wood",
                perTime : 4, //4
                npcPrice: 2,
                variants: [
                    "Acacia Wood",
                    "Enchanted Acacia Wood",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //46
        name: "Jungle Minion",
        id: 46,
        tierDelay : [48,48,45,45,42,42,38,38,33,33,27],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Jungle Wood",
                perTime : 4, //4
                npcPrice: 2,
                variants: [
                    "Jungle Wood",
                    "Enchanted Jungle Wood",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //47
        name: "Fishing Minion",
        id: 47,
        tierDelay : [78,75,72,72,68,68,62.5,62.5,53,53,35],
        storage: [640,640,640,704,704,768,768,832,832,896,960],
        products : [
            {
                item : "Raw Fish",
                perTime : 0.5, //0.5
                npcPrice: 6,
                variants: [
                    "Raw Fish",
                    "Enchanted Raw Fish",
                    "Enchanted Cooked Fish",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,
                ]
            },{
                item : "Raw Salmon",
                perTime : 0.25, //0.25
                npcPrice: 10,
                variants: [
                    "Raw Salmon",
                    "Enchanted Raw Salmon",
                    "Enchanted Cooked Salmon"
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,
                ]
            },{
                item : "Pufferfish",
                perTime : 0.12, //0.12
                npcPrice: 15,
                variants: [
                    "Pufferfish",
                    "Enchanted Pufferfish",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },{
                item : "Clownfish",
                perTime : 0.04, //0.04
                npcPrice: 20,
                variants: [
                    "Clownfish",
                    "Enchanted Clownfish",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },{
                item : "Prismarine Crystals",
                perTime : 0.03, //0.03
                npcPrice: 5,
                variants: [
                    "Prismarine Crystals",
                    "Enchanted Prismarine Crystals",
                ],
                variantsEquiv: [
                    1,
                    80, //80
                ]
            },{
                item : "Prismarine Shard",
                perTime : 0.03, //0.03
                npcPrice: 5,
                variants: [
                    "Prismarine Shard",
                    "Enchanted Prismarine Shard",
                ],
                variantsEquiv: [
                    1,
                    80, //80
                ]
            },{
                item : "Sponge",
                perTime : 0.03, //0.03
                npcPrice: 50,
                variants: [
                    "Sponge",
                    "Enchanted Sponge",
                    "Enchanted Wet Sponge"
                ],
                variantsEquiv: [
                    1,
                    40, //40
                    1600, //1600
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //48
        name: "Snow Minion",
        id: 48,
        tierDelay : [13,13,12,12,11,11,9.5,9.5,8,8,6.5],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        products : [
            {
                item : "Snowball",
                perTime : 4, //4
                npcPrice: 1,
                canCompactor: true,
                compactor: {
                    variant: "Snow Block",
                    variantEquiv: 4, //4d
                },
                variants: [
                    "Snowball",
                    "Enchanted Snow Block",
                    "Snow Block",
                ],
                variantsEquiv: [
                    1,
                    640, //640
                    4, //4
                ],
                variantsNpcPrices: [
                    1,
                    600,
                    4
                ],
                variantsIsEnchanted:[
                    0,
                    1,
                    0
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //49
        name: "Coal Minion",
        id: 49,
        tierDelay : [15,15,13,13,12,12,10,10,9,9,7,6],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        products : [
            {
                item : "Coal",
                perTime : 1,
                npcPrice: 2,
                canCompactor: true,
                compactor: {
                    variant: "Block of Coal",
                    variantEquiv: 9,
                },
                variants: [
                    "Coal",
                    "Enchanted Coal",
                    "Enchanted Block of Coal"
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //50
        name: "Iron Minion",
        id: 50,
        tierDelay : [17,17,15,15,14,14,12,12,10,10,8,7],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        diamondSpreadingCriteria : 2,
        warning: "Auto smelter/Dwarven super compactor is needed",
        toolsRequired: ["Auto Smelter"],
        products : [
            {
                item : "Iron Ingot",
                perTime : 1,
                npcPrice: 3,
                canCompactor: true,
                compactor: {
                    variant: "Block of Iron",
                    variantEquiv: 9,
                },
                variants: [
                    "Iron Ingot",
                    "Enchanted Iron",
                    "Enchanted Iron Block",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //51
        name: "Mithril Minion",
        id: 51,
        tierDelay : [80,80,75,75,70,70,65,65,60,60,55,50],
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        //noDiamondSpreading : 1,
        //warning: "",
        products : [
            {
                item : "Mithril",
                perTime : 1,
                npcPrice: 10,
                variants: [
                    "Mithril",
                    "Enchanted Mithril",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },{ //52
        name: "Voidling Minion",
        id: 52,
        tierDelay : [45,45,42,42,39,39,35,35,30,30,10],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        //noDiamondSpreading : 1,
        toolsRequired:["","**Experimental feature","Amount of items generated may be inaccurate"],
        products : [
            {
                item : "Quartz",
                perTime : 0.2,
                npcPrice: 4,
                canCompactor: true,
                compactor: {
                    variant: "Block of Quartz",
                    variantEquiv: 4, //4
                    minimumEnchanted: 1,
                },
                variants: [
                    "Quartz",
                    "Enchanted Quartz",
                    "Enchanted Quartz Block"
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600,
                ]
            },
            {
                item : "Obsidian",
                perTime : 1.2,
                npcPrice: 12,
                variants: [
                    "Obsidian",
                    "Enchanted Obsidian",
                ],
                variantsEquiv: [
                    1,
                    160,
                ]
            },
            {
                item: "Diamond (Spreading)",
                npcPrice: 8,
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
                variants: [
                    "Diamond (Spreading)",
                    "Enchanted Diamond (Spreading)",
                    "Enchanted Diamond Block (Spreading)",
                ],
                variantsEquiv: [
                    1,
                    160,
                    25600
                ],
            },
        ]      
    },

    //TOTAL: 52
    //without flower minion
];


// { //10
//     name: "Wheat (Bread) Minion",
//     id: 10,
//     rawId: "WHEAT",
//     tierDelay : [15,15,13,13,11,11,10,10,9,9,8,7],
//     products : [
//         {
//             item : "Wheat",
//             perTime : 1,
//             npcPrice: 1,
//             canCompactor: true,
//             compactor: {
//                 variant: "Hay Bale",
//                 variantEquiv: 9,
//             },
//             variants: [
//                 "Wheat",
//                 "Enchanted Bread",
//                 "Hay Bale"
//             ],
//             variantsEquiv: [
//                 1,
//                 96,
//                 9
//             ],
//             variantsIsEnchanted:[
//                 0,
//                 1,
//                 0
//             ]
//         },{
//             item : "Seeds",
//             perTime : 1,
//             npcPrice: 0.5,
//             variants: [
//                 "Seeds",
//                 "Enchanted Seeds",
//             ],
//             variantsEquiv: [
//                 1,
//                 160,
//             ]
//         },
//     ]      
// }

//exports.storage = [2,4,4,6,6,9,9,12,12,15,15,15];

// exports.diamondSpreadingItem = {
//     item: "Diamond (Spreading)",
//     npcPrice: 8,
//     canCompactor: true,
//     compactor: {
//         variant: "Block of Diamond (Spreading)",
//         variantEquiv: 9,
//     },
//     variants: [
//         "Diamond (Spreading)",
//         "Enchanted Diamond (Spreading)",
//         "Enchanted Diamond Block (Spreading)",
//     ],
//     variantsEquiv: [
//         1,
//         160,
//         25600
//     ],
// }
