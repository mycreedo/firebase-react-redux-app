const initState  = {}  

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_USER_SUCCESS':
            console.log("Update success!")
            return {
                ...state,
                userUpdatedType: "success",
                userUpdatedMessage: 'Update success!'
            }
        case 'UPDATE_USER_ERROR':        
            console.log("Update error!")
            return {
                ...state,
                userUpdatedType: "error",
                userUpdatedMessage: action.err.message
            }
        case 'CREATE_ROLE_SUCCESS': 
            console.log("Role created!", action.role, state)
            return {
                ...state
            }
        default:
            return state
    }
}

export default userReducer