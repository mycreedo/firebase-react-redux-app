const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello, ninjas!");
});

const createNotification = (notification => {
    return admin.firestore().collection('notifications')
        .add(notification)
        .then(doc => console.log('notification added', doc))
})

exports.projectCreated = functions.firestore
    .document('projects/{projectID}')
    .onCreate(doc => {
        
        const project = doc.data();
        const notification = {
            content: "Added a new project",
            user: `${project.authorName}`,
            time: admin.firestore.FieldValue.serverTimestamp(),
            icon: "plus"
        }

    return createNotification(notification)
})

exports.projectDeleted = functions.firestore
    .document('projects/{projectID}')
    .onDelete(doc => {
        
        const project = doc.data();
        const notification = {
            content: "Deleted a existing project",
            user: `${project.authorName}`,
            time: admin.firestore.FieldValue.serverTimestamp(),
            icon: 'trash-alt'
        }

    return createNotification(notification)
})

exports.userJoined = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users')
        .doc(user.uid).get().then(doc => {

            const newUser = doc.data();
            const notification = {
                content: "Joined the party",
                user: `${newUser.displayName}`,
                time: admin.firestore.FieldValue.serverTimestamp(),
                icon: 'user-plus'
            }

            return createNotification(notification)
        })
})

exports.userLeft = functions.auth.user().onDelete(user => {
    return admin.firestore().collection('users')
        .doc(user.uid).get().then(doc => {

            const user = doc.data();
            const notification = {
                content: "Left the party",
                user: `${user.displayName}`,
                time: admin.firestore.FieldValue.serverTimestamp(),
                icon: 'user-times'
            }

            return createNotification(notification)
        })
})