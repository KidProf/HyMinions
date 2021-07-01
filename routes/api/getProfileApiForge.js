var fetch = require('cross-fetch');
var itemNames = require("./itemNames.json")

exports = module.exports = function (req, res) {
    fetch("https://api.mojang.com/users/profiles/minecraft/"+req.params.name)
    .then(result => result.json())
    .then(({id}) => {
        //console.log(id);
        fetch("https://api.hypixel.net/skyblock/profiles?key="+process.env.HYPIXEL_KEY+"&uuid="+id)
        .then(result => result.json())
        .then(({profiles}) => {
            let profilesAjax = new Array();
            profiles.forEach((profile, index)=>{
                profilesAjax[index] = new Object();
                profilesAjax[index]["rawMinions"] = new Array();
                Object.keys(profile["members"]).forEach((member, index2)=>{
                    if(profile["members"][member]["crafted_generators"]){
                        profilesAjax[index]["rawMinions"].push(...profile["members"][member]["crafted_generators"]);
                    }
                })
                profilesAjax[index]["cuteName"] = profile["cute_name"];
            });
            profilesAjax.sort((a,b)=>{
                return b["rawMinions"].length-a["rawMinions"].length;
            })
            //console.log(profilesAjax);
            return res.json(profilesAjax);
        })
        .catch(()=>{
            console.log("catch from skyblock");
            return res.json(null);
        });
    })
    .catch(()=>{
        console.log("catch from mojang");
        return res.json(null);
    });
};
