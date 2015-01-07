module.exports = function Route(app){
	app.get('/', function(req, res){
        res.render('survey_form', {
        	title:'Survey Form'
        });
    }); 

    app.post('/process', function(req, res){
    	console.log('\n\n\nPOST DATA\n\n', req.body);
    	req.session.name = req.body.name;
	    req.session.location = req.body.location;
	    req.session.language = req.body.language;
	    req.session.comment = req.body.comment;
	    req.session.sessionID = req.sessionID;
        req.session.save(function (){
	       	res.redirect('/result');
       	});
    }); 

	app.get('/result', function(req, res){
 	    res.render('survey_result', {
 	    	title:'Submitted Information',
 	    	session_data: req.session
 	    });
    }); 
}