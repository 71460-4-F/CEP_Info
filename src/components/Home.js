import { FiSearch } from "react-icons/fi";
import { GiBinoculars } from "react-icons/gi";
import { useState } from "react";

function Home() {
  const [input, setInput] = useState('');
  const [info, setInfo] = useState({});

  async function handlerSearch() {
    if (input === '') {
      alert("Informe o CEP!")
      return
    }
    try {
     await fetch(`https://viacep.com.br/ws/${input}/json/`, {
        method: 'GET',
        headers: {
          Accept: 'aplication/json'
        }
      }).then((res) => {
        return res.json()
      }).then((data) => {
        setInfo(data)
        setInput("")
      }).catch((err) => {
        console.log(+err)
      })
    } catch (error) {
      alert("Error ao bucar CEP, tente novamente")
      setInput("");
    }
  }

  return (
    <div className="home">
      <h1 className="appTitle">CEP Info <GiBinoculars id="icon" size={50}></GiBinoculars></h1>

      <div>
        <input
          type="text"
          placeholder="Digite o CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button className="searchButton" onClick={handlerSearch}>
          <FiSearch size={17}></FiSearch>
        </button>
      </div>
      <main className="mainInfo">
        <h2>CEP: {info.cep}</h2>
        <span>Logradouro: {info.logradouro}</span>
        <span>Complemento: {info.complemento}</span>
        <span>Bairro: {info.bairro}</span>
        <span>Localidade: {info.localidade}</span>
        <span>UF: {info.uf}</span>
        <span>DDD: {info.ddd}</span>
      </main>
    </div>
  );
}

export default Home;