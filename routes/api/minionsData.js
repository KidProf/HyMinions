exports.minionSlotsCriteria = [5,15,30,50,75,100,125,150,175,200,225,250,275,300,350,400,450,500,550,600];
//                      Slots: 6,7 ,8, 9, ...
//translate to minion slots = position+6
//total available minions must be larger than the last element of minionSlotsCriteria

exports.specialPrices = {
    "Coins": 1,
    // "Free at Revenant Tier 5": 20000*50,
    // "Free at Tarantula Tier 5": 20000*50,
    // "Pelts": 0,
    // "Wooden Hoe": 0,
    // "Wooden Sword": 0,
    // "Wooden Shovel": 0,
    // "Wooden Axe": 0,
    // "Wooden Pickaxe": 0,    
}

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
        tierDelay : [29,29,26,26,23,23,19,19,14.5,14.5,10,8], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
		type: "Combat",
        upgrade:{
            detachTier1: true,
            materials: [
                ["Enchanted Rotten Flesh","Enchanted Diamond","^ For Crystalized Heart","Revenant Flesh","* Requires Revenant Tier 5"],
                ["Revenant Flesh","Rotten Flesh","^ For Zombie Minion Tier 1","* Requires Revenant Tier 5"],
                ["Revenant Flesh","Rotten Flesh","^ For Zombie Minion Tier 2","* Requires Revenant Tier 5"],
                ["Revenant Flesh","Rotten Flesh","^ For Zombie Minion Tier 3","* Requires Revenant Tier 5"],
                ["Revenant Viscera","Rotten Flesh","^ For Zombie Minion Tier 4","* Requires Revenant Tier 5"],
                ["Revenant Viscera","Enchanted Rotten Flesh","Rotten Flesh","^ For Zombie Minion Tier 5","* Requires Revenant Tier 5"],
                ["Revenant Viscera","Enchanted Rotten Flesh","Rotten Flesh","^ For Zombie Minion Tier 6","* Requires Revenant Tier 5"],
                ["Revenant Viscera","Enchanted Rotten Flesh","Rotten Flesh","^ For Zombie Minion Tier 7","* Requires Revenant Tier 5"],
                ["Revenant Viscera","Enchanted Rotten Flesh","Rotten Flesh","^ For Zombie Minion Tier 8","* Requires Revenant Tier 5"],
                ["Revenant Viscera","Enchanted Rotten Flesh","Rotten Flesh","^ For Zombie Minion Tier 9","* Requires Revenant Tier 5"],
                ["Revenant Viscera","Enchanted Rotten Flesh","Rotten Flesh","^ For Zombie Minion Tier 10","* Requires Revenant Tier 5"],
                ["Revenant Viscera","Coins","* Requires Revenant Tier 9"],
            ],
            quantities: [
                [256,256,undefined,80,undefined],
                [140,80,undefined,undefined],
                [280,160+80,undefined,undefined],
                [448,320+160+80,undefined,undefined],
                [7,512+320+160+80,undefined,undefined],
                [14,8,512+320+160+80,undefined,undefined],
                [28,16+8,512+320+160+80,undefined,undefined],
                [56,32+16+8,512+320+160+80,undefined,undefined],
                [112,64+32+16+8,512+320+160+80,undefined,undefined],
                [224,128+64+32+16+8,512+320+160+80,undefined,undefined],
                [448,256+128+64+32+16+8,512+320+160+80,undefined,undefined],
                [64,2000000,undefined,undefined],
            ],
        },
        products : [
            {
                item : "Rotten Flesh",
                perTime : 3,
				npcPrice: 2,
				xp: 0.3,
                xpType: "Combat",
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
				xp: 0.4,
                xpType: "Mining",
                canCompactor: true,
                compactor: {
                    variant: "Block of Diamond (Spreading)",
                    variantEquiv: 9,
                },
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
				xp: 0.4,
                xpType: "Mining",
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
        upgrade:{
            detachTier1: true,
            materials: [
                ["Enchanted Fermented Spider Eye","Tarantula Web","* Requires Tarantula Tier 5"],
                ["Tarantula Web","String","^ For Spider Minion Tier 1","* Requires Tarantula Tier 5"],
                ["Tarantula Web","String","^ For Spider Minion Tier 2","* Requires Tarantula Tier 5"],
                ["Tarantula Web","String","^ For Spider Minion Tier 3","* Requires Tarantula Tier 5"],
                ["Tarantula Silk","String","^ For Spider Minion Tier 4","* Requires Tarantula Tier 5"],
                ["Tarantula Silk","Enchanted String","String","^ For Spider Minion Tier 5","* Requires Tarantula Tier 5"],
                ["Tarantula Silk","Enchanted String","String","^ For Spider Minion Tier 6","* Requires Tarantula Tier 5"],
                ["Tarantula Silk","Enchanted String","String","^ For Spider Minion Tier 7","* Requires Tarantula Tier 5"],
                ["Tarantula Silk","Enchanted String","String","^ For Spider Minion Tier 8","* Requires Tarantula Tier 5"],
                ["Tarantula Silk","Enchanted String","String","^ For Spider Minion Tier 9","* Requires Tarantula Tier 5"],
                ["Tarantula Silk","Enchanted String","String","^ For Spider Minion Tier 10","* Requires Tarantula Tier 5"],
            ],
            quantities: [
                [1,80,undefined,undefined],
                [140,80,undefined,undefined],
                [280,160+80,undefined,undefined],
                [448,320+160+80,undefined,undefined],
                [7,512+320+160+80,undefined,undefined],
                [14,8,512+320+160+80,undefined,undefined],
                [28,16+8,512+320+160+80,undefined,undefined],
                [56,32+16+8,512+320+160+80,undefined,undefined],
                [112,64+32+16+8,512+320+160+80,undefined,undefined],
                [224,128+64+32+16+8,512+320+160+80,undefined,undefined],
                [448,256+128+64+32+16+8,512+320+160+80,undefined,undefined],
            ],
        },
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
        tierDelay : [20,20,18,18,16,16,14,14,12,12,10,8], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Hoe","Potato"],
                ["Potato"],
                ["Potato"],
                ["Enchanted Potato"],
                ["Enchanted Potato"],
                ["Enchanted Potato"],
                ["Enchanted Potato"],
                ["Enchanted Potato"],
                ["Enchanted Potato"],
                ["Enchanted Baked Potato"],
                ["Enchanted Baked Potato"],
                ["Enchanted Baked Potato","Pelts"],
            ],
            quantities: [
                [1,128],
                [256],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16],
                [32,75],
            ],
        },
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
        tierDelay : [26,26,24,24,22,22,20,20,17,17,13,10], //12
        storage: [128,256,256,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Sword","Raw Beef"],
                ["Raw Beef"],
                ["Raw Beef"],
                ["Raw Beef"],
                ["Enchanted Raw Beef"],
                ["Enchanted Raw Beef"],
                ["Enchanted Raw Beef"],
                ["Enchanted Raw Beef"],
                ["Enchanted Raw Beef"],
                ["Enchanted Raw Beef"],
                ["Enchanted Leather"],
                ["Enchanted Leather","Pelts"],
            ],
            quantities: [
                [1,64],
                [128],
                [256],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [256],
                [512,75],
            ],
        },
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
        tierDelay : [26,26,24,24,22,22,20,20,18,18,15,12], //12
        storage: [192,320,320,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Sword","Raw Chicken"],
                ["Raw Chicken"],
                ["Raw Chicken"],
                ["Raw Chicken"],
                ["Enchanted Raw Chicken"],
                ["Enchanted Raw Chicken"],
                ["Enchanted Raw Chicken"],
                ["Enchanted Raw Chicken"],
                ["Enchanted Raw Chicken"],
                ["Enchanted Raw Chicken"],
                ["Enchanted Raw Chicken"],
                ["Enchanted Raw Chicken","Pelts"],
            ],
            quantities: [
                [1,64],
                [128],
                [256],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
                [1024,75],
            ],
        },
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
        tierDelay : [24,24,22,22,20,20,18,18,16,16,12,9], //12
        storage: [128,256,256,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Sword","Mutton"],
                ["Mutton"],
                ["Mutton"],
                ["Mutton"],
                ["Enchanted Mutton"],
                ["Enchanted Mutton"],
                ["Enchanted Mutton"],
                ["Enchanted Mutton"],
                ["Enchanted Mutton"],
                ["Enchanted Mutton"],
                ["Enchanted Cooked Mutton"],
                ["Enchanted Cooked Mutton","Pelts"],
            ],
            quantities: [
                [1,64],
                [128],
                [256],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16,75],
            ],
        },
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
        tierDelay : [29,29,27,27,25,25,23,23,21,21,18,16], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Pickaxe","Lapis Lazuli"],
                ["Lapis Lazuli"],
                ["Enchanted Lapis Lazuli"],
                ["Enchanted Lapis Lazuli"],
                ["Enchanted Lapis Lazuli"],
                ["Enchanted Lapis Lazuli"],
                ["Enchanted Lapis Lazuli"],
                ["Enchanted Lapis Lazuli"],
                ["Enchanted Lapis Block"],
                ["Enchanted Lapis Block"],
                ["Enchanted Lapis Block"],
                ["Enchanted Lapis Block","Coins"],
            ],
            quantities: [
                [1,256],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16],
                [32],
                [64,2000000]
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Shovel","Gravel"],
                ["Gravel"],
                ["Gravel"],
                ["Gravel"],
                ["Enchanted Flint"],
                ["Enchanted Flint"],
                ["Enchanted Flint"],
                ["Enchanted Flint"],
                ["Enchanted Flint"],
                ["Enchanted Flint"],
                ["Enchanted Flint"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Sword","Blaze Rod"],
                ["Blaze Rod"],
                ["Blaze Rod"],
                ["Blaze Rod"],
                ["Enchanted Blaze Powder"],
                ["Enchanted Blaze Powder"],
                ["Enchanted Blaze Powder"],
                ["Enchanted Blaze Powder"],
                ["Enchanted Blaze Powder"],
                ["Enchanted Blaze Powder"],
                ["Enchanted Blaze Rod"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
            ],
        },
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
        tierDelay : [15,15,13,13,11,11,10,10,9,9,8,7], //12
        storage: [128,256,256,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Hoe","Wheat"],
                ["Wheat"],
                ["Wheat"],
                ["Wheat"],
                ["Hay Bale"],
                ["Hay Bale"],
                ["Hay Bale"],
                ["Hay Bale"],
                ["Enchanted Hay Bale"],
                ["Enchanted Hay Bale"],
                ["Enchanted Hay Bale"],
                ["Enchanted Hay Bale","Pelts"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [96],
                [192],
                [384],
                [512],
                [8],
                [16],
                [32],
                [64,75],
            ],
        },
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
        tierDelay : [20,20,18,18,16,16,14,14,12,12,10,8], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Hoe","Carrot"],
                ["Carrot"],
                ["Carrot"],
                ["Enchanted Carrot"],
                ["Enchanted Carrot"],
                ["Enchanted Carrot"],
                ["Enchanted Carrot"],
                ["Enchanted Carrot"],
                ["Enchanted Carrot"],
                ["Enchanted Golden Carrot"],
                ["Enchanted Golden Carrot"],
                ["Enchanted Golden Carrot","Pelts"],
            ],
            quantities: [
                [1,128],
                [256],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16],
                [32,75],
            ],
        },
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
        tierDelay : [32,32,30,30,27,27,24,24,20,20,16,12], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Hoe","Pumpkin"],
                ["Pumpkin"],
                ["Pumpkin"],
                ["Pumpkin"],
                ["Enchanted Pumpkin"],
                ["Enchanted Pumpkin"],
                ["Enchanted Pumpkin"],
                ["Enchanted Pumpkin"],
                ["Enchanted Pumpkin"],
                ["Enchanted Pumpkin"],
                ["Enchanted Pumpkin"],
                ["Enchanted Pumpkin","Pelts"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
                [1024,75],
            ],
        },
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
        tierDelay : [24,24,22.5,22.5,21,21,18.5,18.5,16,16,13,10], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Hoe", "Melon"],
                ["Melon"],
                ["Melon"],
                ["Melon"],
                ["Melon"],
                ["Enchanted Melon"],
                ["Enchanted Melon"],
                ["Enchanted Melon"],
                ["Enchanted Melon"],
                ["Enchanted Melon Block"],
                ["Enchanted Melon Block"],
                ["Enchanted Melon Block","Pelts"],
            ],
            quantities: [
                [1,256],
                [512],
                [128*9],
                [256*9],
                [512*9],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16],
                [32,75],
            ],
        },
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
        tierDelay : [30,30,28,28,26,26,23,23,20,20,16,12], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Hoe","Brown Mushroom"],
                ["Brown Mushroom"],
                ["Brown Mushroom"],
                ["Brown Mushroom"],
                ["Enchanted Brown Mushroom"],
                ["Enchanted Brown Mushroom"],
                ["Enchanted Brown Mushroom"],
                ["Enchanted Brown Mushroom"],
                ["Enchanted Brown Mushroom"],
                ["Enchanted Brown Mushroom"],
                ["Enchanted Brown Mushroom"],
                ["Enchanted Brown Mushroom","Enchanted Red Mushroom","Pelts"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
                [512,512,75],
            ],
            materialsAlt: [
                ["Wooden Hoe","Red Mushroom"],
                ["Red Mushroom"],
                ["Red Mushroom"],
                ["Red Mushroom"],
                ["Enchanted Red Mushroom"],
                ["Enchanted Red Mushroom"],
                ["Enchanted Red Mushroom"],
                ["Enchanted Red Mushroom"],
                ["Enchanted Red Mushroom"],
                ["Enchanted Red Mushroom"],
                ["Enchanted Red Mushroom"],
                undefined,
            ],
            quantitiesAlt: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
                undefined,
            ],
        },
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
        tierDelay : [27,27,25,25,23,23,21,21,18,18,15,12], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Hoe","Cocoa Beans"],
                ["Cocoa Beans"],
                ["Cocoa Beans"],
                ["Cocoa Beans"],
                ["Enchanted Cocoa Bean"],
                ["Enchanted Cocoa Bean"],
                ["Enchanted Cocoa Bean"],
                ["Enchanted Cocoa Bean"],
                ["Enchanted Cocoa Bean"],
                ["Enchanted Cocoa Bean"],
                ["Enchanted Cookie"],
                ["Enchanted Cookie","Pelts"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16,75],
            ],
        },
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
        tierDelay : [27,27,25,25,23,23,21,21,18,18,15,12], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Hoe","Cactus"],
                ["Cactus"],
                ["Cactus"],
                ["Enchanted Cactus Green"],
                ["Enchanted Cactus Green"],
                ["Enchanted Cactus Green"],
                ["Enchanted Cactus Green"],
                ["Enchanted Cactus Green"],
                ["Enchanted Cactus Green"],
                ["Enchanted Cactus"],
                ["Enchanted Cactus"],
                ["Enchanted Cactus","Pelts"],
            ],
            quantities: [
                [1,128],
                [256],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16],
                [32,75],
            ],
        },
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
        tierDelay : [22,22,20,20,18,18,16,16,14.5,14.5,12,9], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Hoe","Sugar Cane"],
                ["Sugar Cane"],
                ["Sugar Cane"],
                ["Enchanted Sugar"],
                ["Enchanted Sugar"],
                ["Enchanted Sugar"],
                ["Enchanted Sugar"],
                ["Enchanted Sugar"],
                ["Enchanted Sugar"],
                ["Enchanted Sugar Cane"],
                ["Enchanted Sugar Cane"],
                ["Enchanted Sugar Cane","Pelts"],
            ],
            quantities: [
                [1,128],
                [256],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16],
                [32,75],
            ],
        },
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
        tierDelay : [26,26,24,24,22,22,20,20,17,17,13,10], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Sword","Raw Porkchop"],
                ["Raw Porkchop"],
                ["Raw Porkchop"],
                ["Raw Porkchop"],
                ["Enchanted Pork"],
                ["Enchanted Pork"],
                ["Enchanted Pork"],
                ["Enchanted Pork"],
                ["Enchanted Pork"],
                ["Enchanted Pork"],
                ["Enchanted Grilled Pork"],
                ["Enchanted Grilled Pork","Pelts"],
            ],
            quantities: [
                [1,64],
                [128],
                [256],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16,75],
            ],
        },
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
        tierDelay : [26,26,24,24,22,22,20,20,17,17,13,10], //12
        storage: [192,320,320,448,448,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Sword","Raw Rabbit"],
                ["Raw Rabbit"],
                ["Raw Rabbit"],
                ["Raw Rabbit"],
                ["Enchanted Rabbit Foot"],
                ["Enchanted Rabbit Foot"],
                ["Enchanted Rabbit Foot"],
                ["Enchanted Rabbit Foot"],
                ["Enchanted Rabbit Foot"],
                ["Enchanted Rabbit Hide"],
                ["Enchanted Rabbit Hide"],
                ["Enchanted Rabbit Hide","Pelts"],
            ],
            quantities: [
                [1,64],
                [128],
                [256],
                [512],
                [32],
                [64],
                [128],
                [256],
                [512],
                [256],
                [512],
                [1024,75],
            ],
        },
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
        tierDelay : [50,50,47,47,44,44,41,41,38,38,32,27], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Hoe","Nether Wart"],
                ["Nether Wart"],
                ["Nether Wart"],
                ["Nether Wart"],
                ["Enchanted Nether Wart"],
                ["Enchanted Nether Wart"],
                ["Enchanted Nether Wart"],
                ["Enchanted Nether Wart"],
                ["Enchanted Nether Wart"],
                ["Enchanted Nether Wart"],
                ["Enchanted Nether Wart"],
                ["Enchanted Nether Wart","Pelts"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
                [1024,75],
            ],
        },
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
        tierDelay : [14,14,12,12,10,10,9,9,8,8,7,6], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Pickaxe","Cobblestone"],
                ["Cobblestone"],
                ["Cobblestone"],
                ["Cobblestone"],
                ["Enchanted Cobblestone"],
                ["Enchanted Cobblestone"],
                ["Enchanted Cobblestone"],
                ["Enchanted Cobblestone"],
                ["Enchanted Cobblestone"],
                ["Enchanted Cobblestone"],
                ["Enchanted Cobblestone"],
                ["Enchanted Cobblestone","Coins"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
                [1024,2000000],
            ],
        },
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
        tierDelay : [22,22,20,20,18,18,16,16,14,14,11,9], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Pickaxe","Gold Ingot"],
                ["Gold Ingot"],
                ["Gold Ingot"],
                ["Gold Ingot"],
                ["Enchanted Gold"],
                ["Enchanted Gold"],
                ["Enchanted Gold"],
                ["Enchanted Gold"],
                ["Enchanted Gold"],
                ["Enchanted Gold"],
                ["Enchanted Gold Block"],
                ["Enchanted Gold Block","Coins"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16,2000000],
            ],
        },
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
        tierDelay : [29,29,27,27,25,25,22,22,19,19,15,12], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Pickaxe","Diamond"],
                ["Diamond"],
                ["Diamond"],
                ["Diamond"],
                ["Enchanted Diamond"],
                ["Enchanted Diamond"],
                ["Enchanted Diamond"],
                ["Enchanted Diamond"],
                ["Enchanted Diamond"],
                ["Enchanted Diamond"],
                ["Enchanted Diamond Block"],
                ["Enchanted Diamond Block","Coins"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16,2000000],
            ],
        },
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
        tierDelay : [28,28,26,26,24,24,21,21,18,18,14,12], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Pickaxe","Emerald"],
                ["Emerald"],
                ["Emerald"],
                ["Emerald"],
                ["Enchanted Emerald"],
                ["Enchanted Emerald"],
                ["Enchanted Emerald"],
                ["Enchanted Emerald"],
                ["Enchanted Emerald"],
                ["Enchanted Emerald"],
                ["Enchanted Emerald Block"],
                ["Enchanted Emerald Block","Coins"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16,2000000],
            ],
        },
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
        ]      
    },{ //24
        name: "Redstone Minion",
        id: 24,
        tierDelay : [29,29,27,27,25,25,23,23,21,21,18,16], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Pickaxe","Redstone"],
                ["Redstone"],
                ["Redstone"],
                ["Enchanted Redstone"],
                ["Enchanted Redstone"],
                ["Enchanted Redstone"],
                ["Enchanted Redstone"],
                ["Enchanted Redstone"],
                ["Enchanted Redstone"],
                ["Enchanted Redstone Block"],
                ["Enchanted Redstone Block"],
                ["Enchanted Redstone Block","Coins"],
            ],
            quantities: [
                [1,128],
                [256],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16],
                [32,2000000],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Pickaxe","Quartz"],
                ["Quartz"],
                ["Quartz"],
                ["Quartz"],
                ["Enchanted Quartz"],
                ["Enchanted Quartz"],
                ["Enchanted Quartz"],
                ["Enchanted Quartz"],
                ["Enchanted Quartz"],
                ["Enchanted Quartz"],
                ["Enchanted Quartz Block"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
            ],
        },
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
        tierDelay : [45,45,42,42,39,39,35,35,30,30,24,21], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Pickaxe","Obsidian"],
                ["Obsidian"],
                ["Obsidian"],
                ["Obsidian"],
                ["Enchanted Obsidian"],
                ["Enchanted Obsidian"],
                ["Enchanted Obsidian"],
                ["Enchanted Obsidian"],
                ["Enchanted Obsidian"],
                ["Enchanted Obsidian"],
                ["Enchanted Obsidian"],
                ["Enchanted Obsidian","Coins"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
                [1024,2000000],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Pickaxe","Glowstone Dust"],
                ["Glowstone Dust"],
                ["Glowstone Dust"],
                ["Enchanted Glowstone Dust"],
                ["Enchanted Glowstone Dust"],
                ["Enchanted Glowstone Dust"],
                ["Enchanted Glowstone Dust"],
                ["Enchanted Glowstone Dust"],
                ["Enchanted Glowstone Dust"],
                ["Enchanted Glowstone"],
                ["Enchanted Glowstone"],
            ],
            quantities: [
                [1,128],
                [256],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Pickaxe","Ice"],
                ["Ice"],
                ["Ice"],
                ["Ice"],
                ["Packed Ice"],
                ["Packed Ice"],
                ["Packed Ice"],
                ["Enchanted Ice"],
                ["Enchanted Ice"],
                ["Enchanted Ice"],
                ["Enchanted Ice"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [128],
                [256],
                [512],
                [64],
                [128],
                [256],
                [512],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Shovel","Sand"],
                ["Sand"],
                ["Sand"],
                ["Sand"],
                ["Enchanted Sand"],
                ["Enchanted Sand"],
                ["Enchanted Sand"],
                ["Enchanted Sand"],
                ["Enchanted Sand"],
                ["Enchanted Sand"],
                ["Enchanted Sand"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Pickaxe","End Stone"],
                ["End Stone"],
                ["End Stone"],
                ["End Stone"],
                ["Enchanted End Stone"],
                ["Enchanted End Stone"],
                ["Enchanted End Stone"],
                ["Enchanted End Stone"],
                ["Enchanted End Stone"],
                ["Enchanted End Stone"],
                ["Enchanted End Stone"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Shovel","Clay"],
                ["Clay"],
                ["Clay"],
                ["Clay"],
                ["Enchanted Clay"],
                ["Enchanted Clay"],
                ["Enchanted Clay"],
                ["Enchanted Clay"],
                ["Enchanted Clay"],
                ["Enchanted Clay"],
                ["Enchanted Clay"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Sword","Rotten Flesh"],
                ["Rotten Flesh"],
                ["Rotten Flesh"],
                ["Rotten Flesh"],
                ["Enchanted Rotten Flesh"],
                ["Enchanted Rotten Flesh"],
                ["Enchanted Rotten Flesh"],
                ["Enchanted Rotten Flesh"],
                ["Enchanted Rotten Flesh"],
                ["Enchanted Rotten Flesh"],
                ["Enchanted Rotten Flesh"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Sword","Bone"],
                ["Bone"],
                ["Bone"],
                ["Bone"],
                ["Enchanted Bone"],
                ["Enchanted Bone"],
                ["Enchanted Bone"],
                ["Enchanted Bone"],
                ["Enchanted Bone"],
                ["Enchanted Bone"],
                ["Enchanted Bone"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Sword","String"],
                ["String"],
                ["String"],
                ["String"],
                ["Enchanted String"],
                ["Enchanted String"],
                ["Enchanted String"],
                ["Enchanted String"],
                ["Enchanted String"],
                ["Enchanted String"],
                ["Enchanted String"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Sword","Spider Eye"],
                ["Spider Eye"],
                ["Spider Eye"],
                ["Spider Eye"],
                ["Enchanted Spider Eye"],
                ["Enchanted Spider Eye"],
                ["Enchanted Spider Eye"],
                ["Enchanted Spider Eye"],
                ["Enchanted Spider Eye"],
                ["Enchanted Spider Eye"],
                ["Enchanted Fermented Spider Eye"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [16],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Sword","Gunpowder"],
                ["Gunpowder"],
                ["Gunpowder"],
                ["Gunpowder"],
                ["Enchanted Gunpowder"],
                ["Enchanted Gunpowder"],
                ["Enchanted Gunpowder"],
                ["Enchanted Gunpowder"],
                ["Enchanted Gunpowder"],
                ["Enchanted Gunpowder"],
                ["Enchanted Firework Rocket"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [16],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Sword","Ender Pearl"],
                ["Ender Pearl"],
                ["Enchanted Ender Pearl"],
                ["Enchanted Ender Pearl"],
                ["Enchanted Ender Pearl"],
                ["Enchanted Ender Pearl"],
                ["Enchanted Eye of Ender"],
                ["Enchanted Eye of Ender"],
                ["Enchanted Eye of Ender"],
                ["Enchanted Eye of Ender"],
                ["Enchanted Eye of Ender"],
            ],
            quantities: [
                [1,64],
                [128],
                [8],
                [24],
                [48],
                [96],
                [8],
                [24],
                [48],
                [96],
                [192],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Sword","Ghast Tear"],
                ["Ghast Tear"],
                ["Ghast Tear"],
                ["Ghast Tear"],
                ["Enchanted Ghast Tear"],
                ["Enchanted Ghast Tear"],
                ["Enchanted Ghast Tear"],
                ["Enchanted Ghast Tear"],
                ["Enchanted Ghast Tear"],
                ["Enchanted Ghast Tear"],
                ["Enchanted Ghast Tear"],
            ],
            quantities: [
                [1,64],
                [128],
                [256],
                [512],
                [256],
                [512],
                [32*25],
                [64*25],
                [128*25],
                [256*25],
                [512*25],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Sword","Slimeball"],
                ["Slimeball"],
                ["Slimeball"],
                ["Slimeball"],
                ["Enchanted Slimeball"],
                ["Enchanted Slimeball"],
                ["Enchanted Slimeball"],
                ["Enchanted Slimeball"],
                ["Enchanted Slimeball"],
                ["Enchanted Slimeball"],
                ["Enchanted Slime Block"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Sword","Magma Cream"],
                ["Magma Cream"],
                ["Magma Cream"],
                ["Magma Cream"],
                ["Enchanted Magma Cream"],
                ["Enchanted Magma Cream"],
                ["Enchanted Magma Cream"],
                ["Enchanted Magma Cream"],
                ["Enchanted Magma Cream"],
                ["Enchanted Magma Cream"],
                ["Enchanted Magma Cream"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Axe","Oak Wood"],
                ["Oak Wood"],
                ["Oak Wood"],
                ["Oak Wood"],
                ["Enchanted Oak Wood"],
                ["Enchanted Oak Wood"],
                ["Enchanted Oak Wood"],
                ["Enchanted Oak Wood"],
                ["Enchanted Oak Wood"],
                ["Enchanted Oak Wood"],
                ["Enchanted Oak Wood"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Axe","Spruce Wood"],
                ["Spruce Wood"],
                ["Spruce Wood"],
                ["Spruce Wood"],
                ["Enchanted Spruce Wood"],
                ["Enchanted Spruce Wood"],
                ["Enchanted Spruce Wood"],
                ["Enchanted Spruce Wood"],
                ["Enchanted Spruce Wood"],
                ["Enchanted Spruce Wood"],
                ["Enchanted Spruce Wood"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Axe","Birch Wood"],
                ["Birch Wood"],
                ["Birch Wood"],
                ["Birch Wood"],
                ["Enchanted Birch Wood"],
                ["Enchanted Birch Wood"],
                ["Enchanted Birch Wood"],
                ["Enchanted Birch Wood"],
                ["Enchanted Birch Wood"],
                ["Enchanted Birch Wood"],
                ["Enchanted Birch Wood"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Axe","Dark Oak Wood"],
                ["Dark Oak Wood"],
                ["Dark Oak Wood"],
                ["Dark Oak Wood"],
                ["Enchanted Dark Oak Wood"],
                ["Enchanted Dark Oak Wood"],
                ["Enchanted Dark Oak Wood"],
                ["Enchanted Dark Oak Wood"],
                ["Enchanted Dark Oak Wood"],
                ["Enchanted Dark Oak Wood"],
                ["Enchanted Dark Oak Wood"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Axe","Acacia Wood"],
                ["Acacia Wood"],
                ["Acacia Wood"],
                ["Acacia Wood"],
                ["Enchanted Acacia Wood"],
                ["Enchanted Acacia Wood"],
                ["Enchanted Acacia Wood"],
                ["Enchanted Acacia Wood"],
                ["Enchanted Acacia Wood"],
                ["Enchanted Acacia Wood"],
                ["Enchanted Acacia Wood"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Axe","Jungle Wood"],
                ["Jungle Wood"],
                ["Jungle Wood"],
                ["Jungle Wood"],
                ["Enchanted Jungle Wood"],
                ["Enchanted Jungle Wood"],
                ["Enchanted Jungle Wood"],
                ["Enchanted Jungle Wood"],
                ["Enchanted Jungle Wood"],
                ["Enchanted Jungle Wood"],
                ["Enchanted Jungle Wood"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
            ],
        },
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
        upgrade:{
            materials: [
                ["Wooden Sword","Raw Fish"],
                ["Raw Fish"],
                ["Raw Fish"],
                ["Raw Fish"],
                ["Enchanted Raw Fish"],
                ["Enchanted Raw Fish"],
                ["Enchanted Raw Fish"],
                ["Enchanted Raw Fish"],
                ["Enchanted Raw Fish"],
                ["Enchanted Raw Fish"],
                ["Enchanted Cooked Fish"],
            ],
            quantities: [
                [1,64],
                [128],
                [256],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
            ],
        },
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
        upgrade:{
            detachTier1: true,
            materials: [
                ["Red Gift","* based on 0.12% drop rate"],
                ["Snow Block"],
                ["Snow Block"],
                ["Snow Block"],
                ["Snow Block"],
                ["Snow Block"],
                ["Enchanted Snow Block"],
                ["Enchanted Snow Block"],
                ["Enchanted Snow Block"],
                ["Enchanted Snow Block"],
                ["Enchanted Snow Block"],
            ],
            quantities: [
                [83.33333,1],
                [32],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
            ],
            materialsAlt: [
                ["White Gift","* based on 0.4% drop rate"],
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
            ],
            quantitiesAlt: [
                [250,1],
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
            ],
        },
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
        tierDelay : [15,15,13,13,12,12,10,10,9,9,7,6], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Pickaxe","Coal"],
                ["Coal"],
                ["Coal"],
                ["Coal"],
                ["Enchanted Coal"],
                ["Enchanted Coal"],
                ["Enchanted Coal"],
                ["Enchanted Coal"],
                ["Enchanted Coal"],
                ["Enchanted Coal"],
                ["Enchanted Block of Coal"],
                ["Enchanted Block of Coal","Coins"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16,2000000],
            ],
        },
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
        tierDelay : [17,17,15,15,14,14,12,12,10,10,8,7], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Pickaxe","Iron Ingot"],
                ["Iron Ingot"],
                ["Iron Ingot"],
                ["Iron Ingot"],
                ["Enchanted Iron"],
                ["Enchanted Iron"],
                ["Enchanted Iron"],
                ["Enchanted Iron"],
                ["Enchanted Iron"],
                ["Enchanted Iron"],
                ["Enchanted Iron Block"],
                ["Enchanted Iron Block","Coins"],

            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16,2000000],
            ],
        },
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
        tierDelay : [80,80,75,75,70,70,65,65,60,60,55,50], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Pickaxe","Mithril"],
                ["Mithril"],
                ["Mithril"],
                ["Mithril"],
                ["Enchanted Mithril"],
                ["Enchanted Mithril"],
                ["Enchanted Mithril"],
                ["Enchanted Mithril"],
                ["Enchanted Mithril"],
                ["Enchanted Mithril"],
                ["Refined Mithril"],
                ["Refined Mithril","Coins"],
            ],
            quantities: [
                [1,80],
                [160],
                [320],
                [512],
                [8],
                [24],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16,2000000],
            ],
        },
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
        tierDelay : [45,45,42,42,39,39,35,35,30,30,24],
        storage: [64,192,192,384,384,576,576,768,768,960,960],
        upgrade:{
            materials: [
                ["Null Sphere","Ender Pearl","^ For Enderman Minion Tier 1","* Requires Voidling Tier 4"],
                ["Null Sphere","Obsidian","^ For Obsidian Minion Tier 1","* Requires Voidling Tier 4"],
                ["Null Sphere","Ender Pearl","^ For Enderman Minion Tier 2","* Requires Voidling Tier 4"],
                ["Null Sphere","Obsidian","^ For Obsidian Minion Tier 3","* Requires Voidling Tier 4"],
                ["Null Ovoid","Enchanted Ender Pearl","Ender Pearl","^ For Enderman Minion Tier 4","* Requires Voidling Tier 4"],
                ["Null Ovoid","Enchanted Obsidian","Obsidian","^ For Obsidian Minion Tier 5","* Requires Voidling Tier 4"],
                ["Null Ovoid","Enchanted Ender Pearl","Ender Pearl","^ For Enderman Minion Tier 6","* Requires Voidling Tier 4"],
                ["Null Ovoid","Enchanted Obsidian","Obsidian","^ For Obsidian Minion Tier 7","* Requires Voidling Tier 4"],
                ["Null Ovoid","Enchanted Eye of Ender","Enchanted Ender Pearl","Ender Pearl","^ For Enderman Minion Tier 8","* Requires Voidling Tier 4"],
                ["Null Ovoid","Enchanted Obsidian","Obsidian","^ For Obsidian Minion Tier 9","* Requires Voidling Tier 4"],
                ["Null Ovoid","Enchanted Eye of Ender","Enchanted Ender Pearl","Ender Pearl","^ For Enderman Minion Tier 10","* Requires Voidling Tier 4"],
            ],
            quantities: [
                [80,64,undefined,undefined],
                [140,80,undefined,undefined],
                [280,128+64,undefined,undefined],
                [448,320+160+80,undefined,undefined],
                [7,24+8,128+64,undefined,undefined],
                [14,8,512+320+160+80,undefined,undefined],
                [28,96+48+24+8,128+64,undefined,undefined],
                [56,32+16+8,512+320+160+80,undefined,undefined],
                [112,24+8,96+48+24+8,128+64,undefined,undefined],
                [224,128+64+32+16+8,512+320+160+80,undefined,undefined],
                [448,96+48+24+8,96+48+24+8,128+64,undefined,undefined],
            ],
        },
        //noDiamondSpreading : 1,
        products : [
            {
                item : "Quartz",
                perTime : 0.4,
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
                perTime : 2.42,
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
    },{ //53
        name: "Hard Stone Minion",
        id: 53,
        rawId: "HARD_STONE",
        tierDelay : [14,14,12,12,10,10,9,9,8,8,7,6], //12
        storage: [64,192,192,384,384,576,576,768,768,960,960,960],
        upgrade:{
            materials: [
                ["Wooden Pickaxe","Hard Stone"],
                ["Hard Stone"],
                ["Enchanted Hard Stone"],
                ["Enchanted Hard Stone"],
                ["Enchanted Hard Stone"],
                ["Enchanted Hard Stone"],
                ["Enchanted Hard Stone"],
                ["Enchanted Hard Stone"],
                ["Enchanted Hard Stone"],
                ["Concentrated Stone"],
                ["Concentrated Stone"],
                ["Concentrated Stone","Coins"],
            ],
            quantities: [
                [1,256],
                [512],
                [8],
                [16],
                [32],
                [64],
                [128],
                [256],
                [512],
                [8],
                [16],
                [32,2000000],
            ],
        },
        products : [
            {
                item : "Hard Stone",
                perTime : 1,
                npcPrice: 1,
                variants: [
                    "Hard Stone",
                    "Enchanted Hard Stone",
                    "Concentrated Stone",
                ],
                variantsEquiv: [
                    1,
                    576,
                    331776,
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
    },{ //54
        name: "Flower Minion",
        id: 54,
        tierDelay : [30,29,28,27,26,25,24,23,22,20,18],
        storage: [960,960,960,960,960,960,960,960,960,960,960],
        warning: "* Auction House prices not supported",
        toolsRequired: ["* Auction House prices not supported"],
        upgrade:{
            putAtLast: 1,
            materials: [
                ["Bought from Dark Auction","* Auction House prices not supported"],
                ["Dandelion","* Auction House prices not supported"],
                ["Dandelion","* Auction House prices not supported"],
                ["Dandelion","* Auction House prices not supported"],
                ["Enchanted Dandelion","* Auction House prices not supported"],
                ["Enchanted Dandelion","* Auction House prices not supported"],
                ["Enchanted Dandelion","* Auction House prices not supported"],
                ["Enchanted Dandelion","* Auction House prices not supported"],
                ["Enchanted Dandelion","* Auction House prices not supported"],
                ["Enchanted Dandelion","* Auction House prices not supported"],
                ["Enchanted Poppy","* Auction House prices not supported"],
            ],
            quantities: [
                [1,1],
                [160,1],
                [320,1],
                [512,1],
                [8,1],
                [24,1],
                [64,1],
                [128,1],
                [256,1],
                [512,1],
                [8,1],
            ],
        },
        products : [
            {
                item : "Flower",
                perTime : 1,
                npcPrice: 1,
                variants: [
                    "Flower",
                ],
                variantsEquiv: [
                    1,
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

    //TOTAL: 55
    //flower minion not functioning
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
