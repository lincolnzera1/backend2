require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// const CadastroRotas = require("./routes")

let cors = require("cors");
app.use(cors());

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("<h1>home</h1>")
})

app.post('/api', (req, res) => {
    const send = (pergunta) => {
        

        const frase = JSON.stringify(req.body.name)

        console.log("Sua pergunta: " + JSON.stringify(req.body.name))
        fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.PASS,
          },
          body: JSON.stringify({
            model: "text-davinci-003",
            prompt: frase,
            max_tokens: 2048, // tamanho da resposta
            temperature: 0.5, // criatividade na resposta
          }),
        })
          .then((response) => response.json())
          .then((json) => {
    
            if (json.error?.message) {
              console.log(`Error: ${json.error.message}`);
            } else if (json.choices?.[0].text) {
              var text = json.choices[0].text || "Sem resposta";
    
              console.log("Chat GPT: " + text)
            }
    
          })
          .catch((error) => console.error("Error:", error))
          .finally(() => {
          });
    
      }

      send("oq é brasil?")
});



app.listen(process.env.PORT || 10000, () => console.log("everythings is all right my master"))