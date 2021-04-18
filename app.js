/*
let express = require('express')
let app = express();

app.get( '/', function(req, res){
    res.send("This is the base port /");
});
app.get( '/contacts', function(req, res){
    console.log('inside GET contacts')
    let response = {
        'fname' : "Marcus",
        'lname' : "Becker"
    }
    console.log(response);
    res.send( JSON.stringify( response) );
    //res.send("These are all the contacts");
});
app.get( '/contacts/id', function(req, res){
    console.log('inside GET one contact')
    res.send("This is one contact");
});
app.post( '/contacts', function(req, res){
    console.log('inside POST contacts')
    res.send('we are posting to contacts')
});
app.put( '/contacts', function(req, res){
    console.log('inside PUT contacts')
    res.send('we are editing contacts')
});
app.delete( '/contacts', function(req, res){
    console.log('inside DELETE contacts')
    res.send('deleting a contact')
});

app.get( '/item', function(req, res){
    console.log('inside GET item')
    let response = {
        'name' : "keychain",
        'weight' : ".5lbs"
    }
    console.log(response);
    res.send( JSON.stringify( response) );
    //res.send("These are all the contacts");
});
app.get( '/item/id', function(req, res){
    console.log('inside GET one item')
    res.send("This is one item");
});
app.post( '/item', function(req, res){
    console.log('inside POST item')
    res.send('we are posting to item')
});
app.put( '/item', function(req, res){
    console.log('inside PUT item')
    res.send('we are editing item')
});
app.delete( '/item', function(req, res){
    console.log('inside DELETE item')
    res.send('deleting an item')
});

app.put( '/claim/id', function(req, res){
    console.log('inside PUT claim')
    res.send('we are editing to claim an item')
});

let port = 3000;
console.log(`Listening on 127.0.0.1:${port}`);
app.listen( port );
*/
