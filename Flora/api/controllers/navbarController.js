module.exports = {
    companionPlanting:function(req, res){
        res.view('companionPlanting');
    }, 
    plantSearch: function(req,res){
        res.view('plantSearch');
    },
    sunlight: function(req, res){
        res.view('sunlight');
    },
    fertilizer: function(req, res){
        res.view('fertilizer');
    },
    diseases_pests_weeds: function(req, res){
        res.view('diseases_pests_weeds');
    },
    agr_zones: function(req, res){
        res.view('agr_zones');
    },
    composting: function(req, res){
        res.view('composting');
    },
    forum: function(req, res){
        res.view('forum');
    },
    my_garden: function(req, res){
        res.view('my_garden');
    },
    journal: function(req, res){
        res.view('journal');
    },
    profile: function(req, res){
        res.view('profile');
    },
    watering: function(req, res){
        res.view('watering');
    }

};
