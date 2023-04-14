module.exports = {
    checklist:function(req, res){
        res.view('checklist');
    }, 
    academic: function(req,res){
        res.view('academic_resources');
    },
    campus: function(req, res){
        res.view('campus_resources');
    }

};