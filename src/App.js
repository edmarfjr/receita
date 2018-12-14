import React, { Component, Fragment } from 'react'
import './App.css'

import Button from './components/Button'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showAdd:false,
      nomee:'',
      mdf:'',
      ingr:'',
      receitas: [ { nome: 'lista de receitas', ingredientes: ['reactjs', 'tempo', 'internet'], modo: 'BOTE FOGO EM TUDO' }]
    }
  
   
  }

  componentDidMount(){
    var dataString = localStorage.getItem('receitas');
    var receitas =  JSON.parse(dataString);
    console.log(receitas);
    if(receitas){

      this.setState({receitas:receitas});
    }
  }
  add = () => {
      this.setState({
        nomee:"",
        mdf:"",
        ingr:"",
        
        receitas: [...this.state.receitas, { nome: this.state.nomee, ingredientes: this.state.ingr.split(","), modo: this.state.mdf }],
      },
      
      ()=>{
        localStorage.setItem('receitas', JSON.stringify(this.state.receitas));
        this.setState({showAdd:false});
      })

  }
  
  
 removeItem = (item) => {
  this.setState({
    receitas: this.state.receitas.filter((itemList) => {
      return itemList !== item
    })
  },()=>{
    const receitas = [...this.state.receitas];
    localStorage.setItem('receitas', JSON.stringify(this.state.receitas));
  });
  
}
handleChange = (e) => {
  this.setState({
    [e.target.id]: e.target.value
  },()=>{
    const receitas = [...this.state.receitas];
    window.localStorage.setItem('receitas', JSON.stringify(receitas));
  })
  
}
  render(){
    document.title = 'Receitas'
    return <Fragment>
      
        <h1>RECEITAS</h1>
        
       
        <ul>
          
        <section className="flex">
          {this.state.receitas.map(
            
            (item, index) => (             
               <li key={index}  className="item">
                <h3>RECEITA</h3>{item.nome}
                <h3>INGREDIENTES:</h3>{item.ingredientes.map((x,i)=>{ return<li key={x}> {x}</li>})}
                <h3>MODO DE PREPARO:</h3>{item.modo}<br/><br/> 
                <Button value="Deletar Receita" onClick={() => this.removeItem(item)}></Button>
               </li>             
            )
          )}
          </section>
        </ul>
        {
          this.state.showAdd ?
        <div style={{textAlign:"center"}}>
          <h3>Receita</h3>
          <input type="text" id="nomee" value={this.state.receita_text} placeholder="Digite o nome da receita" onChange={this.handleChange}/>
          
          <h3>Ingredientes</h3>
          <input type="text" id="ingr" value={this.state.ingredientes_text} placeholder="Separados por virgula" onChange={this.handleChange}/>
          
          <h3>Modo de fazer</h3>
          <textarea type="text" id="mdf" value={this.state.modo_text} placeholder="Digite o modo de fazer" onChange={this.handleChange}/>
          <br/><br/><Button value="Adicionar" onClick={this.add} />
        </div>
        :
        <div style={{textAlign:"center"}}>
          <Button value="Nova" onClick={()=>{this.setState({showAdd:true})}} />
        </div>      
        }
        
      </Fragment>;
  }
}

export default App