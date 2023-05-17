const fs = require("fs");

//a function that allows you to generate minified, sorted forge variable, to be copied to routes/api/forgeData
module.exports.genForge = () => {
    //sort material name
    forges.forEach((forge)=>{
        forge.materials.sort((a,b)=>{
            if(b.options[0]<a.options[0]) return 1; //name asc
            else return -1;
        });
    })
    //sort forge name
    forges.sort((a,b)=>{
        if(b.name<a.name) return 1; //name asc
        else return -1;
    });
    fs.writeFileSync("./gen/output/forges.js","exports.forges = "+JSON.stringify(forges));
}

//a function that allows you to generate sorted forge variable
module.exports.genForgePretty = () => {
    //sort material name
    forges.forEach((forge)=>{
        forge.materials.sort((a,b)=>{
            if(b.options[0]<a.options[0]) return 1; //name asc
            else return -1;
        });
    })
    //sort forge name
    forges.sort((a,b)=>{
        if(b.name<a.name) return 1; //name asc
        else return -1;
    });
    fs.writeFileSync("./gen/output/genForgePretty.js","exports.forges = "+JSON.stringify(forges,null,4));
}

module.exports.genAuctions = ()=>{
    let auctionsInForge = [];
    let auctionsInForgeApprox = [];
    let auctionsInForgeQuantity = [];
    let auctionsInForgeQuantityApprox = [];
    
    forges.forEach((forge)=>{
        if(!forge.source){ //check if source is auction
            if(forge.approximateMatch){ //check if approx match
                if(!auctionsInForgeApprox.includes(forge.name)&&!auctionsInForgeQuantityApprox.includes(forge.name)){
                    auctionsInForgeApprox.push(forge.name);
                }
            }else{
                if(!auctionsInForge.includes(forge.name)&&!auctionsInForgeQuantity.includes(forge.name)){
                    auctionsInForge.push(forge.name);
                }
            }
        }
    
        forge.materials.forEach((material)=>{
            if(!material.source){//check if source is auction
                material.options.forEach((option,index)=>{
                    if(material.approximateMatch&&material.approximateMatch[index]){
                        if(material.quantity[index]!=1){ //add to quantity
                            if(!auctionsInForgeQuantityApprox.includes(option)){
                                auctionsInForgeQuantityApprox.push(option);
                                auctionsInForgeApprox = auctionsInForgeApprox.filter((auction)=>{
                                    return !(auction==option);
                                });
                            }
                        }else{ //add to normal
                            if(!auctionsInForgeApprox.includes(option)&&!auctionsInForgeQuantityApprox.includes(option)){
                                auctionsInForgeApprox.push(option);
                            }
                        }
                    }else{
                        if(material.quantity[index]!=1){ //add to quantity
                            if(!auctionsInForgeQuantity.includes(option)){
                                auctionsInForgeQuantity.push(option);
                                auctionsInForge = auctionsInForge.filter((auction)=>{
                                    return !(auction==option);
                                });
                            }
                        }else{ //add to normal
                            if(!auctionsInForge.includes(option)&&!auctionsInForgeQuantity.includes(option)){
                                auctionsInForge.push(option);
                            }
                        }
                    }
                });
            }
        });

    });

    auctionsInForge.sort((a,b)=>{
        if(b<a) return 1; //name asc
        else return -1;
    });

    auctionsInForgeQuantity.sort((a,b)=>{
        if(b<a) return 1; //name asc
        else return -1;
    });


    fs.writeFileSync("./gen/output/genAuctions.js",
        "const auctionsInForge = "+JSON.stringify(auctionsInForge)+
        "\nconst auctionsInForgeApprox = "+JSON.stringify(auctionsInForgeApprox)+
        "\nconst auctionsInForgeQuantity = "+JSON.stringify(auctionsInForgeQuantity)+
        "\nconst auctionsInForgeQuantityApprox = "+JSON.stringify(auctionsInForgeQuantityApprox));
}

//END CODE
//copied from forgeData.js

exports.sourceBazaar = 1;
exports.sourceAuction = 2;
exports.sourceWarning = 3;
exports.sourceOthers = 4;

let forges = [
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
        duration : 30, //1 day 6 hours
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
                codedPrices: [
                    0,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 5,
        gemstoneRequirement: 10,
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
                codedPrices: [
                    0,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 5,
        gemstoneRequirement: 10,
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
                codedPrices: [
                    0,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 5,
        gemstoneRequirement: 10,
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
                codedPrices: [
                    0,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 5,
        gemstoneRequirement: 10,
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
                codedPrices: [
                    0,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 5,
        gemstoneRequirement: 10,
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
                codedPrices: [
                    0,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 5,
        gemstoneRequirement: 10,
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
                codedPrices: [
                    0,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 5,
        gemstoneRequirement: 10,
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
        rawId: "BEACON_2",
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
        approximateMatch: true,
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
        source: this.sourceBazaar,
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
        rawId: "FORGE_TRAVEL_SCROLL",
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
                codedPrices: [
                    1,
                ],
                source: [
                    this.sourceOthers,
                ],
            },
        ],
        duration : 5,
        hotmRequirement: 2,
    },{ //22
        name : "Helmet Of Divan",
        approximateMatch: true,
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
        name : "Chestplate Of Divan",
        approximateMatch: true,
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
        name : "Leggings Of Divan",
        approximateMatch: true,
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
        name : "Boots Of Divan",
        approximateMatch: true,
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
        durationText: "Crafting",
        hotmRequirement: 0,
        gemstoneRequirement: 5,
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
        durationText: "Crafting",
        hotmRequirement: 0,
        gemstoneRequirement: 5,
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
        durationText: "Crafting",
        hotmRequirement: 0,
        gemstoneRequirement: 5,
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
        durationText: "Crafting",
        hotmRequirement: 0,
        gemstoneRequirement: 5,
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
        durationText: "Crafting",
        hotmRequirement: 0,
        gemstoneRequirement: 5,
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
        durationText: "Crafting",
        hotmRequirement: 0,
        gemstoneRequirement: 5,
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
        durationText: "Crafting",
        hotmRequirement: 0,
        gemstoneRequirement: 5,
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
        durationText: "Crafting",
        hotmRequirement: 0,
        gemstoneRequirement: 9,
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
        durationText: "Crafting",
        hotmRequirement: 0,
        gemstoneRequirement: 9,
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
        durationText: "Crafting",
        hotmRequirement: 0,
        gemstoneRequirement: 9,
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
        durationText: "Crafting",
        hotmRequirement: 0,
        gemstoneRequirement: 9,
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
        durationText: "Crafting",
        hotmRequirement: 0,
        gemstoneRequirement: 9,
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
        durationText: "Crafting",
        hotmRequirement: 0,
        gemstoneRequirement: 9,
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
        durationText: "Crafting",
        hotmRequirement: 0,
        gemstoneRequirement: 9,
    },{ //40
        name : "Refined Mithril Pickaxe",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Refined Mithril",
                ],
                quantity: [
                    3,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Bejeweled Handle",
                ],
                quantity: [
                    2,
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
            },{
                options: [
                    "Enchanted Gold",
                    "Gold Ingot",
                ],
                quantity: [
                    30,
                    4800,
                ],
                source: [
                    this.sourceBazaar,
                    this.sourceBazaar,
                ],
            }
        ],
        duration : 22,
        hotmRequirement: 3,
    },{ //41
        name : "Mithril Drill SX-R226",
        approximateMatch: true,
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Drill Engine",
                ],
                quantity: [
                    1,
                ],
            },{
                options: [
                    "Refined Mithril",
                ],
                quantity: [
                    3,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },{
                options: [
                    "Fuel Tank",
                ],
                quantity: [
                    1,
                ],
            },
        ],
        duration : 4,
        hotmRequirement: 3,
    },{ //42
        name : "Mithril-Infused Fuel Tank",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Mithril Plate",
                ],
                quantity: [
                    3,
                ],
            },{
                options: [
                    "Fuel Tank",
                ],
                quantity: [
                    5,
                ],
            }
        ],
        duration : 10,
        hotmRequirement: 3,
    },{ //43
        name : "Mithril-Plated Drill Engine",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Mithril Plate",
                ],
                quantity: [
                    3,
                ],
            },{
                options: [
                    "Drill Engine",
                ],
                quantity: [
                    2,
                ],
            }
        ],
        duration : 15,
        hotmRequirement: 3,
    },{ //44
        name : "Beacon III",
        rawId: "BEACON_3",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Beacon II",
                ],
                quantity: [
                    1,
                ],
            },{
                options: [
                    "Refined Mithril",
                ],
                quantity: [
                    10,
                ],
                source:[
                    this.sourceBazaar,
                ]
            }
        ],
        duration : 30, //1 day 6 hours
        hotmRequirement: 3,
    },{ //45
        name : "Titanium Ring",
        approximateMatch: true,
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Titanium Talisman",
                ],
                quantity: [
                    1,
                ],
                approximateMatch: [
                    true,
                ],
            },{
                options: [
                    "Refined Titanium",
                ],
                quantity: [
                    6,
                ],
                source:[
                    this.sourceBazaar,
                ]
            }
        ],
        duration : 20,
        hotmRequirement: 3,
    },{ //46
        name : "Pure Mithril",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Refined Mithril",
                ],
                quantity: [
                    2,
                ],
                source:[
                    this.sourceBazaar,
                ]
            }
        ],
        duration : 12,
        hotmRequirement: 3,
    },{ //47
        name : "Rock Gemstone",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Enchanted Cobblestone",
                    "Cobblestone",
                ],
                quantity: [
                    128,
                    20480,
                ],
                source:[
                    this.sourceBazaar,
                    this.sourceBazaar,
                ]
            },{
                options: [
                    "Treasurite",
                ],
                quantity: [
                    64,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
        ],
        duration : 22,
        hotmRequirement: 3,
    },{ //48
        name : "Petrified Starfall",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Starfall",
                ],
                quantity: [
                    512,
                ],
                source:[
                    this.sourceBazaar,
                ]
            },
        ],
        duration : 14,
        hotmRequirement: 3,
    },{ //49
        name : "Pesto Goblin Omelette",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Green Goblin Egg",
                ],
                quantity: [
                    99,
                ],
                source:[
                    this.sourceBazaar,
                ]
            },{
                options: [
                    "Fine Jade Gemstone",
                ],
                quantity: [
                    1,
                ],
                source:[
                    this.sourceBazaar,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 4,
    },{ //50
        name : "Ammonite",
        approximateMatch: true,
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Helix",
                ],
                quantity: [
                    1,
                ],
            },{
                options: [
                    "Coins",
                ],
                quantity: [
                    300000,
                ],
                codedPrices: [
                    1,
                ],
                source: [
                    this.sourceOthers,
                ],
            },
        ],
        duration : 288, //12 days
        hotmRequirement: 3,
    },{ //50
        name : "Ruby Drill TX-15",
        approximateMatch: true,
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Drill Engine",
                ],
                quantity: [
                    1,
                ],
            },{
                options: [
                    "Fuel Tank",
                ],
                quantity: [
                    1,
                ],
            },{
                options: [
                    "Fine Ruby Gemstone",
                ],
                quantity: [
                    6,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 1,
        hotmRequirement: 3,
    // },{ //51
    //     name : "Travel Scroll to the Crystal Hollows",
    //     rawId: "CRYSTAL_HOLLOWS_TRAVEL_SCROLL",
    //     npcPrice: 0,
    //     materials: [
    //         {
    //             options: [
    //                 "Flawed Ruby Gemstone",
    //             ],
    //             quantity: [
    //                 48,
    //             ],
    //             source: [
    //                 this.sourceBazaar,
    //             ],
    //         },{
    //             options: [
    //                 "Fine Ruby Gemstone",
    //             ],
    //             quantity: [
    //                 80,
    //             ],
    //             source: [
    //                 this.sourceBazaar,
    //             ],
    //         },{
    //             options: [
    //                 "Enchanted Ender Pearl",
    //                 "Ender Pearl",
    //             ],
    //             quantity: [
    //                 16,
    //                 320,

    //             ],
    //             source: [
    //                 this.sourceBazaar,
    //                 this.sourceBazaar,
    //             ],
    //         },{
    //             options: [
    //                 "Coins",
    //             ],
    //             quantity: [
    //                 50000,
    //             ],
    //             codedPrices: [
    //                 1,
    //             ],
    //             source: [
    //                 this.sourceOthers,
    //             ],
    //         },
    //     ],
    //     duration : 10,
    //     hotmRequirement: 3,
    },{ //52
        name : "Mithril Drill SX-R326",
        approximateMatch: true,
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Mithril Drill SX-R226",
                ],
                quantity: [
                    1,
                ],
                approximateMatch: [
                    true,
                ],
            },{
                options: [
                    "Golden Plate",
                ],
                quantity: [
                    10,
                ],
            },{
                options: [
                    "Mithril Plate",
                ],
                quantity: [
                    2,
                ],
            },
        ],
        durationText : "30 secs",
        hotmRequirement: 4,
    },{ //53
        name : "Titanium-Plated Drill Engine",
        rawId: "TITANIUM_DRILL_ENGINE",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Drill Engine",
                ],
                quantity: [
                    10,
                ],
            },{
                options: [
                    "Plasma",
                ],
                quantity: [
                    5,
                ],
            },{
                options: [
                    "Mithril Plate",
                ],
                quantity: [
                    4,
                ],
            },{
                options: [
                    "Refined Titanium",
                ],
                quantity: [
                    5,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
        ],
        duration : 30,
        hotmRequirement: 4,
    },{ //54
        name : "Goblin Omelette",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Goblin Egg",
                ],
                quantity: [
                    99,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
        ],
        duration : 18,
        hotmRequirement: 4,
    },{ //55
        name : "Beacon IV",
        rawId: "BEACON_4",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Beacon III",
                ],
                quantity: [
                    1,
                ],
            },
            {
                options: [
                    "Refined Mithril",
                ],
                quantity: [
                    99,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
            {
                options: [
                    "Plasma",
                ],
                quantity: [
                    1,
                ],
            },
        ],
        duration : 40, //1 day 16 hours
        hotmRequirement: 4,
    },{ //56
        name : "Titanium Artifact",
        approximateMatch: true,
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Titanium Ring",
                ],
                quantity: [
                    1,
                ],
                approximateMatch: [
                    true,
                ]
            },
            {
                options: [
                    "Refined Titanium",
                ],
                quantity: [
                    12,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
        ],
        duration : 36, //1 day 12 hours
        hotmRequirement: 4,
    },{ //57
        name : "Hot Stuff",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Hard Stone",
                ],
                quantity: [
                    128,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
            {
                options: [
                    "Rough Amber Gemstone",
                ],
                quantity: [
                    64,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
        ],
        duration : 24, //1 day
        hotmRequirement: 4,
        collectionsRequirement: [{
            name: "Hard Stone",
            tier: 4,
            rawCollectionId: "HARD_STONE",
        }],
    },{ //58
        name : "Sunny Side Goblin Omelette",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Yellow Goblin Egg",
                ],
                quantity: [
                    99,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
            {
                options: [
                    "Fine Topaz Gemstone",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 6,
    },{ //59
        name : "Gemstone Drill LT-522",
        approximateMatch: true,
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Ruby Drill TX-15",
                ],
                quantity: [
                    1,
                ],
                approximateMatch: [
                    true,
                ]
            },
            {
                options: [
                    "Gemstone Mixture",
                ],
                quantity: [
                    3,
                ],
            },
        ],
        durationText : "30 secs",
        hotmRequirement: 4,
    },{ //60
        name : "Titanium Drill DR-X355",
        rawId: "TITANIUM_DRILL_1",
        approximateMatch: true,
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Drill Engine",
                ],
                quantity: [
                    1,
                ],
            },
            {
                options: [
                    "Fuel Tank",
                ],
                quantity: [
                    1,
                ],
            },
            {
                options: [
                    "Golden Plate",
                ],
                quantity: [
                    6,
                ],
            },
            {
                options: [
                    "Refined Titanium",
                ],
                quantity: [
                    10,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
            {
                options: [
                    "Refined Mithril",
                ],
                quantity: [
                    10,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
        ],
        duration : 64, //2 days 16 hours
        hotmRequirement: 5,
    },{ //61
        name : "Titanium Drill DR-X455",
        rawId: "TITANIUM_DRILL_2",
        approximateMatch: true,
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Titanium Drill DR-X355",
                ],
                quantity: [
                    1,
                ],
                approximateMatch: [
                    true,
                ]
            },
            {
                options: [
                    "Refined Titanium",
                ],
                quantity: [
                    16,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
            {
                options: [
                    "Refined Diamond",
                ],
                quantity: [
                    10,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
            {
                options: [
                    "Mithril Plate",
                ],
                quantity: [
                    6,
                ],
            },
        ],
        durationText : "30 secs",
        hotmRequirement: 5,
    },{ //62
        name : "Titanium Drill DR-X555",
        rawId: "TITANIUM_DRILL_3",
        approximateMatch: true,
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Titanium Drill DR-X455",
                ],
                quantity: [
                    1,
                ],
                approximateMatch: [
                    true,
                ]
            },
            {
                options: [
                    "Refined Titanium",
                ],
                quantity: [
                    32,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
            {
                options: [
                    "Refined Diamond",
                ],
                quantity: [
                    20,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
            {
                options: [
                    "Enchanted Iron Block",
                    "Enchanted Iron",
                    "Iron Ingot",
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
            },
            {
                options: [
                    "Mithril Plate",
                ],
                quantity: [
                    15,
                ],
            },
            {
                options: [
                    "Plasma",
                ],
                quantity: [
                    20,
                ],
            },
        ],
        durationText : "30 secs",
        hotmRequirement: 5,
    },{ //63
        name : "Titanium-Infused Fuel Tank",
        rawId: "TITANIUM_FUEL_TANK",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Refined Titanium",
                ],
                quantity: [
                    10,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
            {
                options: [
                    "Refined Diamond",
                ],
                quantity: [
                    10,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
            {
                options: [
                    "Refined Mithril",
                ],
                quantity: [
                    10,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
            {
                options: [
                    "Fuel Tank",
                ],
                quantity: [
                    10,
                ],
            },
        ],
        duration : 25, //1 day 1 hour
        hotmRequirement: 5,
    },{ //64
        name : "Beacon V",
        rawId: "BEACON_5",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Beacon IV",
                ],
                quantity: [
                    1,
                ],
            },
            {
                options: [
                    "Refined Mithril",
                ],
                quantity: [
                    40,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
            {
                options: [
                    "Plasma",
                ],
                quantity: [
                    5,
                ],
            },
        ],
        duration : 50, //2 day 2 hour
        hotmRequirement: 5,
    },{ //65
        name : "Titanium Relic",
        approximateMatch: true,
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Titanium Artifact",
                ],
                quantity: [
                    1,
                ],
                approximateMatch: [
                    true,
                ]
            },
            {
                options: [
                    "Refined Titanium",
                ],
                quantity: [
                    20,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
        ],
        duration : 72, //3 days
        hotmRequirement: 5,
    },{ //66
        name : "Spicy Goblin Omelette",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Red Goblin Egg",
                ],
                quantity: [
                    99,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
            {
                options: [
                    "Flawless Ruby Gemstone",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 5,
    },{ //67
        name : "Gemstone Chamber",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Worm Membrane",
                ],
                quantity: [
                    100,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
            {
                options: [
                    "Gemstone Mixture",
                ],
                quantity: [
                    1,
                ],
            },
            {
                options: [
                    "Coins",
                ],
                quantity: [
                    25000,
                ],
                codedPrices: [
                    1,
                ],
                source: [
                    this.sourceOthers,
                ],
            },
        ],
        duration : 4,
        hotmRequirement: 5,
    },{ //68
        name : "Topaz Drill KGR-12",
        approximateMatch: true,
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Gemstone Drill LT-522",
                ],
                quantity: [
                    1,
                ],
                approximateMatch: [
                    true
                ],
            },
            {
                options: [
                    "Flawless Topaz Gemstone",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
            {
                options: [
                    "Gemstone Mixture",
                ],
                quantity: [
                    3,
                ],
            },
            {
                options: [
                    "Magma Core",
                ],
                quantity: [
                    5,
                ],
            },
        ],
        durationText : "30 secs",
        hotmRequirement: 5,
    },{ //69
        name : "Ruby-polished Drill Engine",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Mithril-Plated Drill Engine",
                ],
                quantity: [
                    1,
                ],
            },
            {
                options: [
                    "Superlite Motor",
                ],
                quantity: [
                    10,
                ],
            },
            {
                options: [
                    "Fine Ruby Gemstone",
                ],
                quantity: [
                    10,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 5,
    },{ //70
        name : "Gemstone Fuel Tank",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Titanium-Infused Fuel Tank",
                ],
                quantity: [
                    1,
                ],
            },
            {
                options: [
                    "Control Switch",
                ],
                quantity: [
                    30,
                ],
            },
            {
                options: [
                    "Gemstone Mixture",
                ],
                quantity: [
                    10,
                ],
            },
        ],
        duration : 30,
        hotmRequirement: 5,
    },{ //70
        name : "Blue Cheese Goblin Omelette",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Perfect Sapphire Gemstone",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
            {
                options: [
                    "Blue Goblin Egg",
                ],
                quantity: [
                    99,
                ],
                source: [
                    this.sourceBazaar,
                ],
            },
        ],
        duration : 20,
        hotmRequirement: 6,
    },{ //71
        name : "Titanium Drill DR-X655",
        rawId: "TITANIUM_DRILL_4",
        approximateMatch: true,
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Titanium Drill DR-X555",
                ],
                quantity: [
                    1,
                ],
                approximateMatch: [
                    true,
                ]
            },
            {
                options: [
                    "Corleonite",
                ],
                quantity: [
                    30,
                ],
            },
            {
                options: [
                    "Flawless Ruby Gemstone",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
            {
                options: [
                    "Refined Diamond",
                ],
                quantity: [
                    5,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
            {
                options: [
                    "Mithril Plate",
                ],
                quantity: [
                    5,
                ],
            },
            {
                options: [
                    "Gemstone Mixture",
                ],
                quantity: [
                    16,
                ],
            },
            {
                options: [
                    "Refined Titanium",
                ],
                quantity: [
                    12,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
        ],
        durationText : "30 secs",
        hotmRequirement: 6,
    },{ //72
        name : "Jasper Drill X",
        approximateMatch: true,
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Topaz Drill KGR-12",
                ],
                quantity: [
                    1,
                ],
                approximateMatch: [
                    true,
                ]
            },
            {
                options: [
                    "Flawless Jasper Gemstone",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
            {
                options: [
                    "Treasurite",
                ],
                quantity: [
                    1000,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
        ],
        durationText : "30 secs",
        hotmRequirement: 6,
    },{ //73
        name : "Sapphire-polished Drill Engine",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Titanium-Plated Drill Engine",
                ],
                quantity: [
                    1,
                ],
            },
            {
                options: [
                    "Electron Transmitter",
                ],
                quantity: [
                    25,
                ],
            },
            {
                options: [
                    "FTX 3070",
                ],
                quantity: [
                    25,
                ],
            },
            {
                options: [
                    "Fine Sapphire Gemstone",
                ],
                quantity: [
                    20,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
        ],
        duration : 20,
        hotmRequirement: 6,
    },{ //74
        name : "Divan's Drill",
        approximateMatch: true,
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Divan's Alloy",
                ],
                quantity: [
                    1,
                ],
            },
            {
                options: [
                    "Titanium Drill DR-X655",
                ],
                quantity: [
                    1,
                ],
                approximateMatch: [
                    true,
                ],
            },
            {
                options: [
                    "Coins",
                ],
                quantity: [
                    50000000,
                ],
                codedPrices: [
                    1,
                ],
                source: [
                    this.sourceOthers,
                ],
            },
        ],
        duration : 60, //2 days 12 hours
        hotmRequirement: 7,
    },{ //75
        name : "Amber Material",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Golden Plate",
                ],
                quantity: [
                    1,
                ],
            },
            {
                options: [
                    "Fine Amber Gemstone",
                ],
                quantity: [
                    12,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
        ],
        duration : 7,
        hotmRequirement: 6,
    },{ //76
        name : "Amber-polished Drill Engine",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Ruby-polished Drill Engine",
                ],
                quantity: [
                    1,
                ],
            },
            {
                options: [
                    "Sapphire-polished Drill Engine",
                ],
                quantity: [
                    1,
                ],
            },
            {
                options: [
                    "Robotron Reflector",
                ],
                quantity: [
                    50,
                ],
            },
            {
                options: [
                    "Flawless Amber Gemstone",
                ],
                quantity: [
                    1,
                ],
                source: [
                    this.sourceBazaar,
                ]
            },
        ],
        duration : 50, //2 days 2 hours
        hotmRequirement: 7,
    },{ //77
        name : "Perfectly-Cut Fuel Tank",
        npcPrice: 0,
        materials: [
            {
                options: [
                    "Gemstone Fuel Tank",
                ],
                quantity: [
                    1,
                ],
            },
            {
                options: [
                    "Gemstone Mixture",
                ],
                quantity: [
                    25,
                ],
            },
            {
                options: [
                    "Synthetic Heart",
                ],
                quantity: [
                    70,
                ],
            },
        ],
        duration : 50, //2 days 2 hours
        hotmRequirement: 7,
    },
];

//TOTAL: 78 -1 (item 51 commented)
