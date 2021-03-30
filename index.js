const express = require('express');
const app = express();
const Etudiant = require('./Etudiant');
var MongoClient = require('mongodb').MongoClient;
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))



//EJS
//var etudiant = new Etudiant();
list_etudiants = [];
app.set('view engine', 'ejs');
app.set('views', './views');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get('/', function(req, res) {
    getEtudiants(res);
});
app.post('/ajouterE', urlencodedParser, function(req, res) {
    etudiant = new Etudiant();
    etudiant.ajouterEtudiant(req.body);
    res.send('good')
});
app.post('/modifierE', urlencodedParser, function(req, res) {
    var obj  = req.body;
    var ObjectId = require('mongodb').ObjectId;
    var id = new ObjectId(req.body.idE);
    var obj = {
        nom: req.body.nom, prenom: req.body.prenom, phone: req.body.phone, adresse: req.body.adresse
    };
    etudiant = new Etudiant();
    etudiant.modifierEtudiant(id, obj);
});
app.post('/supprimerE', urlencodedParser, function(req, res) {
    etudiant = new Etudiant();
    var ObjectId = require('mongodb').ObjectId;
    let idE = new ObjectId(req.body.idE);
    etudiant.supprimerEtudiant(idE);
    
});
function getEtudiants(res){
    var url = "mongodb://localhost/mydb";
    let list = [];
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db('mydb');
        dbo.collection("etudiants").find({}).toArray((err, result) => {
            if(err){
                console.log('error')
            }else{
                res.render('index', {etudiants: result}); 
            }
        })
        db.close();
    })
}
app.listen(5000, () => console.log("port 5000 listening"));
