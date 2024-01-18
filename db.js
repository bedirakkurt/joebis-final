const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const uri = "mongodb+srv://traen:BccFkfN4Fm2V5tdc@cluster0.caymlhr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.get("/login", async (req, res) => {

    var OgrMail = req.body.OgrMail;
    var OgrSifre = req.body.OgrSifre;

    var data = {
        "OgrMail": OgrMail,
        "OgrSifre": OgrSifre
    };

    await client.connect()
        .then(() => {
            const db = client.db("joebis");+
            console.log(db.collection('Ogrenciler').findOne(data));
            return db.collection('Ogrenciler').findOne(data);
        })
        .then((result) => {
            if (result) {
                console.log("Record found");
                res.sendFile(__dirname + "/dashboard.html");
            } else {
                console.log("Record not found");
                res.sendFile(__dirname + "/index.html");
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
        })
        .finally(() => {
            client.close();
        });
app.post("/register", (req, res) => {
    var OgrAd = req.body.OgrAd;
    var OgrSoyad = req.body.OgrSoyad;
    var OgrTel = req.body.OgrTel;
    var OgrMail = req.body.OgrMail;
    var OgrSifre = req.body.OgrSifre;

    var data = {
        "OgrAd": OgrAd,
        "OgrSoyad": OgrSoyad,
        "OgrTel": OgrTel,
        "OgrMail": OgrMail,
        "OgrSifre": OgrSifre
    };

    client.connect()
        .then(() => {
            const db = client.db("joebis");
            return db.collection('Ogrenciler').insertOne(data);
        })
        .then(() => {
            console.log("Record inserted successfully");
            res.sendFile(__dirname + "/dashboard.html");
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
        })
        .finally(() => {
            client.close();
        }
        );
}
)
});
app.get('/', (req, res) => {
    res.set({ "Allow-access-Allow-Origin": '*' });
    return res.sendFile(__dirname + "/index.html");
});

app.get('/login', (req, res) => {
    res.set({ "Allow-access-Allow-Origin": '*' });
    return res.sendFile('./login.html', { root: __dirname });
});



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

