import { 
  GET_SERVICES, 
  GET_SERVICE_BY_ID, 
  NEW_PASSENGER,
  DEL_PASSENGER, 
  NEW_DRIVER,
  NEW_DESTINY,
  DEL_DESTINY,
  NEW_SERVICE_CAR,
  NEW_SERVICE_COMPANY
} 
from "../actions/types";

const INITIAL_STATE = {
  list: {},
  service: {
    passengers:[],
    local:[],
    driver: ""
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SERVICES:
      return {
        ...state,
        list: action.payload
      };
    case GET_SERVICE_BY_ID:
      return {
        ...state,
        service: action.payload
      };
    case NEW_PASSENGER:

      return {
        ...state,
        service: { 
          ...state.service, 
          passengers: [ ...state.service.passengers, action.payload]
        }
      };

    case DEL_PASSENGER:
      const lista = [...state.service.passengers]
      return {
        ...state,
        service: { 
          ...state.service, 
          passengers: [ 
             ...deleteItem(lista , action.payload)
          ]
        }
      };
    case NEW_DRIVER:
      return {
        ...state,
        service: { 
          ...state.service, 
          driver: action.payload
        }
      };
    case NEW_SERVICE_CAR:
      return {
        ...state,
        service: { 
          ...state.service, 
          car: action.payload
        }
      };
    case NEW_SERVICE_COMPANY:
      return {
        ...state,
        service: { 
          ...state.service, 
          company: action.payload
        }
      };
    case NEW_DESTINY:
      return {
        ...state,
        service: { 
          ...state.service, 
          local: [ ...state.service.local, action.payload]
        }
      };
    case DEL_DESTINY:
      const listaDes = [...state.service.local]
      return {
        ...state,
        service: { 
          ...state.service, 
          local: [ 
             ...deleteItemDest(listaDes , action.payload.local)
          ]
        }
      }
    default:
      return state;
  }
};


function deleteItem(lista, item){
  const list = lista;
  list.splice( list.indexOf(item), 1 );
  return list
}

function deleteItemDest(lista, local){
  const index = lista.findIndex(lista => lista.local === local);
  lista.splice( index, 1 );

  return lista
}
