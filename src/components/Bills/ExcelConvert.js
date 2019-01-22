import React,  { Component} from 'react';
import moment from 'moment'

import ReactToExcel from 'react-html-table-to-excel'

import { Table } from "../commonStyles/PopupStyles";
import isEmpyt from  '../../validation/is-empty'

class BillExcel extends Component {

	constructor(props){
		super(props)

		this.state = {
			bills: []
		}
	}

	componentDidMount() {
		this.setState({
			bills: [...this.props.bills]
		})		
	}

	passengerTextHandler(passenger = []){
		const length = passenger.length;
    return passenger.map((val, index) =>
     val.name + (index !== length -1 ? ' /' : "")).join(' ') || ''
  }
  
  localTextHandler(destiny = []){
  	const length = destiny.length;
    return destiny.map((val, index) => 
    	val.local + (index !== length -1 ? ' /' : "")).join(' ') || ''
  }

  renderBill() {
    return this.state.bills.map(bill => (
      <tr key={bill._id}>
      	<td>{moment(bill.os_date).add(1, 'day').format('DD/MM/YYYY')}</td>
        {
         	bill.type === 'receive' ? <td>{bill.driver}</td> : <td>{bill.name}</td> 
        }
        { this.props.typeInput === 'receive' ?
        <td style={{padding:'30px !important'}}>{!isEmpyt(bill.requesters.length) 
          && 
            this.passengerTextHandler(bill.requesters)}</td>
        : <td>{bill.company}</td>

      	}    
        <td style={{padding:'30px !important'}}>{!isEmpyt(bill.passengers.length) 
          && this.passengerTextHandler(bill.passengers)}</td>
        <td className='list-td'>{!isEmpyt(bill.destinys)
          && this.localTextHandler(bill.destinys)}</td>
        
        {this.props.typeInput === 'receive'?
        	<td>{!isEmpyt(bill.car) && bill.car[0].name}</td>
        	: undefined
        }
        <td>R$ {bill.value || '_'}</td>
        {this.props.typeInput === 'payment'? <td>{`${bill.reserve} / cc:${bill.custCenter}`}</td>: undefined}
        <td style={{maxWidth: '110px', overflow: 'hidden'}}>{bill.observation}</td>
       
      </tr>
    ));
  }

	render(){
		return (
			<div>
				<h2 className="text-center">Relatorio de {this.props.typeInput === 'receive'? "Empresas" : "Motoristas"}</h2>
				<Table className="table" id="table-to-xls">
	        <thead className="thead-dark">
	          <tr>
              <th scope="col">Data</th>
              <th scope="col">Nome</th>
              {this.props.typeInput === 'receive'? <th scope="col">Solicitantes</th>
              	:<th scope="col">Empresa</th>}	
              <th scope="col">Passageiros</th>
              <th scope="col">Destinos</th>
              {this.props.typeInput === 'receive'? <th scope="col">Carro</th>
              	: undefined}
              <th scope="col">Valor</th>
              {this.props.typeInput === 'payment'? <th scope="col">Reserva /CC/CTE</th>
              	: undefined}
              <th scope="col">Obs</th>
	          </tr>
	        </thead>
	        <tbody>{this.renderBill()}</tbody>
	      </Table>
	      <ReactToExcel 
          className="btn btn-success btn-block"
          table="table-to-xls"
          filename="contaExcel"
          sheet="sheet 1"
          buttonText="Exportar para Excel"
        />
      </div>
		)
	}
}

export default BillExcel