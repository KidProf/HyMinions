exports.sourceBazaar = 1;
exports.sourceAuction = 2;
exports.sourceWarning = 3;
exports.sourceOthers = 4;


//SAMPLE
// { //3
//     name : "name surrounded by double quotes",
//     npcPrice: find it if you can, if not put 0 here,
//     source: write this.fromBazaar if from bazaar, else do not add the source,
//     materials: [
//         {
//             options: [ //for bazaar, probably may have more than one option
//                 "Enchanted Block of Coal",
//                 "Enchanted Coal",
//                 "Coal",
//             ],
//             quantity: [
//                 2,
//                 320,
//                 51200,
//             ],
//             source: [ //denote they are from bazaar
//                 this.sourceBazaar,
//                 this.sourceBazaar,
//                 this.sourceBazaar,
//             ],
//         },{
//         options: [ //for auction, probably only have one option, enclose that option with [] (let it be a list with 1 element)
//             "Golden Plate",
//         ],
//         quantity: [
//             1,
//         ],
//         //no need add source here
// },
//     ],
//     duration : 10,
//     hotmRequirement: 2, //hotm level
//     gemstoneRequirement: 9 //remove this line of no need
// },

exports.forges = [
    { ///0
        name : "Refined Diamond",
        npcPrice: 4096,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Enchanted Diamond Block",
                    "Enchanted Diamond",
                    "Diamond"
                ],
                quantity: [
                    2,
                    320,
                    51200,
                ],
                source: [
                    this.sourceBazaar,
                    this.sourceBazaar,
                    this.sourceBazaar,
                ],
            }
        ],
        duration : 8,
        hotmRequirement: 2,
    },{ //1
        name : "Refined Mithril",
        npcPrice: 256000,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Enchanted Mithril",
                    "Mithril",
                ],
                quantity: [
                    160,
                    25600,
                ],
                source: [
                    this.sourceBazaar,
                    this.sourceBazaar,
                ],
            }
        ],
        duration : 6,
        hotmRequirement: 2,
    },{ //2
        name : "Refined Titanium",
        npcPrice: 51200,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Enchanted Titanium",
                    "Titanium",
                ],
                quantity: [
                    16,
                    2560,
                ],
                source: [
                    this.sourceBazaar,
                    this.sourceBazaar,
                ],
            }
        ],
        duration : 12,
        hotmRequirement: 2,
    },{ //3
        name : "Fuel Tank",
        npcPrice: 51000,
        materials: [
            {
                options: [
                    "Enchanted Block of Coal",
                    "Enchanted Coal",
                    "Coal",
                ],
                quantity: [
                    2,
                    320,
                    51200,
                ],
                source: [
                    this.sourceBazaar,
                    this.sourceBazaar,
                    this.sourceBazaar,
                ],
            }
        ],
        duration : 10,
        hotmRequirement: 2,
    },{ //4
        name : "Bejeweled Handle",
        npcPrice: 100,
        materials: [
            {
                options: [
                    "Glacite Jewel",
                ],
                quantity: [
                    3,
                ],
            }
        ],
        duration : 0.5,
        hotmRequirement: 2,
    },{ //5
        name : "Drill Engine",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Enchanted Iron Block",
                    "Enchanted Iron",
                    "Iron Ingot",
                ],
                quantity: [
                    1,
                    160,
                    25600,
                ],
                source: [
                    this.sourceBazaar,
                    this.sourceBazaar,
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Enchanted Redstone Block",
                    "Enchanted Redstone",
                    "Redstone",
                ],
                quantity: [
                    3,
                    480,
                    76800,
                ],
                source: [
                    this.sourceBazaar,
                    this.sourceBazaar,
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Golden Plate",
                ],
                quantity: [
                    1,
                ],
            },{
                options: [
                    "Treasurite",
                ],
                quantity: [
                    10,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Refined Diamond",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceBazaar,
                ],
            }
        ],
        duration : 30,
        hotmRequirement: 3,
    },{ //6
        name : "Golden Plate",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Enchanted Gold Block",
                    "Enchanted Gold",
                    "Gold Ingot",
                ],
                quantity: [
                    2,
                    320,
                    51200,
                ],
                source: [
                    this.sourceBazaar,
                    this.sourceBazaar,
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Glacite Jewel",
                ],
                quantity: [
                    5,
                ],
            },{
                options: [
                    "Refined Diamond",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 6,
        hotmRequirement: 3,
    },{ //7
        name : "Mithril Plate",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Refined Mithril",
                ],
                quantity: [
                    5,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Golden Plate",
                ],
                quantity: [
                    1,
                ],
            },{
                options: [
                    "Enchanted Iron Block",
                    "Enchanted Iron",
                    "Iron Ingot",
                ],
                quantity: [
                    1,
                    160,
                    25600,
                ],
                source: [
                    this.sourceBazaar,
                    this.sourceBazaar,
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Refined Titanium",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 18,
        hotmRequirement: 3,
    },{ //8
        name : "Gemstone Mixture",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Fine Jade Gemstone",
                ],
                quantity: [
                    4,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Fine Amber Gemstone",
                ],
                quantity: [
                    4,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Fine Amethyst Gemstone",
                ],
                quantity: [
                    4,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Fine Sapphire Gemstone",
                ],
                quantity: [
                    4,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Sludge Juice",
                ],
                quantity: [
                    320,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 4,
        hotmRequirement: 4,
    },{ //9
        name : "Perfect Jasper Gemstone",
        source: this.sourceBazaar,
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Flawless Jasper Gemstone",
                ],
                quantity: [
                    5,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Jasper Crystal",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceWarning,
                ],
                prices: [
                    0,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 5,
        gemstoneRequirement: 9
    },{ //10
        name : "Perfect Ruby Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Flawless Ruby Gemstone",
                ],
                quantity: [
                    5,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Ruby Crystal",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceWarning,
                ],
                prices: [
                    0,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 5,
        gemstoneRequirement: 9
    },{ //11
        name : "Perfect Jade Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Flawless Jade Gemstone",
                ],
                quantity: [
                    5,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Jade Crystal",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceWarning,
                ],
                prices: [
                    0,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 5,
        gemstoneRequirement: 9
    },{ //12
        name : "Perfect Sapphire Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Flawless Sapphire Gemstone",
                ],
                quantity: [
                    5,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Sapphire Crystal",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceWarning,
                ],
                prices: [
                    0,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 5,
        gemstoneRequirement: 9
    },{ //13
        name : "Perfect Amber Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Flawless Amber Gemstone",
                ],
                quantity: [
                    5,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Amber Crystal",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceWarning,
                ],
                prices: [
                    0,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 5,
        gemstoneRequirement: 9
    },{ //14
        name : "Perfect Topaz Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Flawless Topaz Gemstone",
                ],
                quantity: [
                    5,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Topaz Crystal",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceWarning,
                ],
                prices: [
                    0,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 5,
        gemstoneRequirement: 9
    },{ //15
        name : "Perfect Amethyst Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Flawless Amethyst Gemstone",
                ],
                quantity: [
                    5,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Amethyst Crystal",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceWarning,
                ],
                prices: [
                    0,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 5,
        gemstoneRequirement: 9
    },{ //16
        name : "Mithril Pickaxe",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Enchanted Mithril",
                    "Mithril",
                ],
                quantity: [
                    30,
                    4800,
                ],
                source: [
                    this.sourceBazaar,
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Bejeweled Handle",
                ],
                quantity: [
                    1,
                ],
            },{
                options: [
                    "Enchanted Gold",
                    "Gold Ingot",
                ],
                quantity: [
                    10,
                    1600,
                ],
                source: [
                    this.sourceBazaar,
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 0.75,
        hotmRequirement: 2,
    },{ //17
        name : "Beacon II",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Beacon I",
                ],
                quantity: [
                    1,
                ],
            },{
                options: [
                    "Refined Mithril",
                ],
                quantity: [
                    5,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 20,
        hotmRequirement: 2,
    },{ //18
        name : "Titanium Talisman",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Refined Titanium",
                ],
                quantity: [
                    2,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 14,
        hotmRequirement: 2,
    },{ //19
        name : "Diamonite",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Refined Diamond",
                ],
                quantity: [
                    3,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 6,
        hotmRequirement: 2,
    },{ //20
        name : "Power Crystal",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Starfall",
                ],
                quantity: [
                    256,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 2,
        hotmRequirement: 2,
    },{ //21
        name : "Travel Scroll to the Dwarven Forge",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Mithril",
                ],
                quantity: [
                    48,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Titanium",
                ],
                quantity: [
                    80,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Enchanted Ender Pearl",
                    "Ender Pearl",
                ],
                quantity: [
                    80,
                    1600,
                ],
                source: [
                    this.sourceBazaar,
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Coins",
                ],
                quantity: [
                    25000,
                ],
                prices: [
                    1,
                ],
            },
        ],
        duration : 5,
        hotmRequirement: 2,
    },{ //22
        name : "Helmet of Divan",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Divan Fragment",
                ],
                quantity: [
                    5,
                ],

            },{
                options: [
                    "Gemstone Mixture",
                ],
                quantity: [
                    10,
                ],
            },{
                options: [
                    "Flawless Ruby Gemstone",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceBazaar,
                ],

            },
        ],
        duration : 23,
        hotmRequirement: 6,
    },{ //23
        name : "Chestplate of Divan",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Divan Fragment",
                ],
                quantity: [
                    8,
                ],

            },{
                options: [
                    "Gemstone Mixture",
                ],
                quantity: [
                    10,
                ],
            },{
                options: [
                    "Flawless Ruby Gemstone",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceBazaar,
                ],

            },
        ],
        duration : 23,
        hotmRequirement: 6,
    },{ //24
        name : "Leggings of Divan",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Divan Fragment",
                ],
                quantity: [
                    7,
                ],

            },{
                options: [
                    "Gemstone Mixture",
                ],
                quantity: [
                    10,
                ],
            },{
                options: [
                    "Flawless Ruby Gemstone",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceBazaar,
                ],

            },
        ],
        duration : 23,
        hotmRequirement: 6,	
    },{ //25
        name : "Boots of Divan",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Divan Fragment",
                ],
                quantity: [
                    4,
                ],

            },{
                options: [
                    "Gemstone Mixture",
                ],
                quantity: [
                    10,
                ],
            },{
                options: [
                    "Flawless Ruby Gemstone",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceBazaar,
                ],

            },
        ],
        duration : 23,
        hotmRequirement: 6,
    },{ //26
        name : "Fine Jade Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Flawed Jade Gemstone",
                ],
                quantity: [
                    80,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 0,
        hotmRequirement: 0,
        gemstoneRequirement: 0
    },{ //27
        name : "Fine Amber Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Flawed Amber Gemstone",
                ],
                quantity: [
                    80,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 0,
        hotmRequirement: 0,
        gemstoneRequirement: 0
    },{ //28
        name : "Fine Topaz Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Flawed Topaz Gemstone",
                ],
                quantity: [
                    80,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 0,
        hotmRequirement: 0,
        gemstoneRequirement: 0
    },{ //29
        name : "Fine Sapphire Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Flawed Sapphire Gemstone",
                ],
                quantity: [
                    80,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 0,
        hotmRequirement: 0,
        gemstoneRequirement: 0
    },{ //30
        name : "Fine Amethyst Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Flawed Amethyst Gemstone",
                ],
                quantity: [
                    80,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 0,
        hotmRequirement: 0,
        gemstoneRequirement: 0
    },{ //31
        name : "Fine Jasper Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Flawed Jasper Gemstone",
                ],
                quantity: [
                    80,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 0,
        hotmRequirement: 0,
        gemstoneRequirement: 0
    },{ //32
        name : "Fine Ruby Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Flawed Ruby Gemstone",
                ],
                quantity: [
                    80,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 0,
        hotmRequirement: 0,
        gemstoneRequirement: 0
    },{ //33
        name : "Flawless Jade Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Fine Jade Gemstone",
                ],
                quantity: [
                    80,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 0,
        hotmRequirement: 0,
        gemstoneRequirement: 0
    },{ //34
        name : "Flawless Amber Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Fine Amber Gemstone",
                ],
                quantity: [
                    80,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 0,
        hotmRequirement: 0,
        gemstoneRequirement: 0
    },{ //35
        name : "Flawless Topaz Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Fine Topaz Gemstone",
                ],
                quantity: [
                    80,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 0,
        hotmRequirement: 0,
        gemstoneRequirement: 0
    },{ //36
        name : "Flawless Sapphire Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Fine Sapphire Gemstone",
                ],
                quantity: [
                    80,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 0,
        hotmRequirement: 0,
        gemstoneRequirement: 0
    },{ //37
        name : "Flawless Amethyst Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Fine Amethyst Gemstone",
                ],
                quantity: [
                    80,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 0,
        hotmRequirement: 0,
        gemstoneRequirement: 0
    },{ //38
        name : "Flawless Jasper Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Fine Jasper Gemstone",
                ],
                quantity: [
                    80,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 0,
        hotmRequirement: 0,
        gemstoneRequirement: 0
    },{ //39
        name : "Flawless Ruby Gemstone",
        npcPrice: 0,
        source: this.sourceBazaar,
        materials: [
            {
                options: [
                    "Fine Ruby Gemstone",
                ],
                quantity: [
                    80,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 0,
        hotmRequirement: 0,
        gemstoneRequirement: 0
		},
];

//TOTAL: 16
