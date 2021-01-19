import graphCardApi from '../DAL/graphCardAPI';

const SET_GRAPH_CARD = 'SET_GRAPH_CARD';
const SET_CURRENT_GRAPH_CARD = 'SET_CURRENT_GRAPH_CARD';
const GRAPH_CARD_IS_LOADING = 'GRAPH_CARD_IS_LOADING';

let initialState = {
    graphCard: [],
    allGraphCard: [],
    pagination: {},
    currentRow: {},
    isLoading: false,
    errorCode: 0
}

const graphCardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_GRAPH_CARD: {
            return {
                ...state,
                currentRow: {...action.current}
            }
        }
        case GRAPH_CARD_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        case SET_GRAPH_CARD: {
            return {
                ...state,
                graphCard: [...action.graphCard],
                pagination: {...action.pagination}
            }
        }
        default:
            return state
    }
}

//AC

export const setCurrentGraphCard = (current) => {
    return {
        type: SET_CURRENT_GRAPH_CARD, current
    }
}

const toggleIsLoading = (isLoading) => {
    return {
        type: GRAPH_CARD_IS_LOADING, isLoading
    }
}

export const setGraphCard = (graphCard, pagination) => {
    return {
        type: SET_GRAPH_CARD, graphCard, pagination
    }
}

//THUNK

export const getGraphCard = (page) => (dispatch) => {
    dispatch(toggleIsLoading(true));
    graphCardApi.all(page).then(res => {
        if (res.data.status) {
            dispatch(setGraphCard(res.data.graphCard, res.data.pagination))
        }
    })
    dispatch(toggleIsLoading(false))
}


export default graphCardReducer;