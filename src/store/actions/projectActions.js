export const createProject = (project) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('projects').add({
      ...project,
      projectStatus: 'new',
      authorName: profile.displayName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
    });
  }
};

export const updateProject = (id, project) => {
  return (dispatch, getState, {getFirestore} ) => {
    const firestore = getFirestore();
    firestore.collection('projects').doc(id).update(project)
    .then(() => {
      dispatch({ type: 'UPDATE_PROJECT_SUCCESS'})
    }).catch(err => {
      dispatch({ type: 'UPDATE_PROJECT_ERROR'}, err);
    })
  }
}

export const deleteProject = (project) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('projects').doc(project).delete()
    .then(() => {
      dispatch({ type: 'DELETE_PROJECT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'DELETE_PROJECT_ERROR'}, err);
    })
  }
}