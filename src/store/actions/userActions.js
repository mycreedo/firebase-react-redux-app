export const updateUserProfile = (id, data) => {
    return (dispatch, getState, { getFirestore } ) => {
      const firestore = getFirestore();        
      firestore.collection('users').doc(id).update(data)
      .then(() => {
        dispatch({ type: 'UPDATE_USER_SUCCESS'})
      }).catch((err) =>{
        dispatch({ type: 'UPDATE_USER_ERROR', err})
      })
    }
  }

export const createRole = (role) => {
  return (dispatch, getState, { getFirestore } ) => {
    const firestore  = getFirestore();
    firestore.collection('user_roles').doc(role.slug).set(role)
    .then( () => {
      dispatch({ type: 'CREATE_ROLE_SUCCESS', role: role})
    }).catch( (err) => {
      dispatch({ type: 'CREATE_ROLE_ERROR', err})
    })
  }
}

