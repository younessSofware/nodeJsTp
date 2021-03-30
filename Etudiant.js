var MongoClient = require('mongodb').MongoClient;
module.exports = class Etudiant {
    url = "mongodb://localhost/mydb";
    ajouterEtudiant(obj){
        //fonction anonyme est une fonction qui execute lorseque la connexion sa passe
        MongoClient.connect(this.url, function(err, db){
            if (err) throw err;
            var dbo = db.db('mydb');
            dbo.collection('etudiants').insertOne(obj, (err, res) => {
                if (err) throw err;
                db.close();
                return res;
            });
        });
    }
    supprimerEtudiant(idE){
        MongoClient.connect(this.url, function(err, db){
            if (err) throw err;
            var dbo = db.db('mydb');
            dbo.collection('etudiants').deleteOne({_id: idE}, function(err, res){
                if(err) throw err;
            });
            db.close();
        });
    }
    modifierEtudiant(id, etudiant){
        MongoClient.connect(this.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var myquery = { _id: id };
            var newvalues = { $set:  etudiant};
            dbo.collection("etudiants").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
              console.log(newvalues)
              db.close();
            });
        });
    }
}

