1. Have the server render views/index.ejs that has the form for the user to fill out
	
	app.get('/', function(req, res){
        res.render('survey_form', {title:'Survey Form'});
    }); 

2. The user fills out the form and submits
3.The submitted form gets sent to /result

	app.post('/process', function(req, res){
        console.log('\n\n\nPOST DATA\n\n', req.body);

    req.session.save(function (){
       res.redirect('/result');
       });
    }); 

4. The server recognizes when someone posts things to /result, grabs information from the POST, and sends the POST data back as its renders views/results.ejs

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

* The form information EMIT to the server with the event name "posting_form"

** The server listens for an event called 'posting_form' and when event is triggered, organize all emitted info to form a single message and sends this single message with the event called 'updated_message'

*** The server EMIT event called 'random_number' with number between 1-1000
**** The client listens for an event called 'random_number' and when event is triggered, show the number in HTML
***** The client listens for an event called 'updated_message' and when event is triggered, display message in HTML