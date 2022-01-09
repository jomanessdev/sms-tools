const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

/*const _sid = 'AC6882eec6de6cd830da98e8800749584f';
const _authToken = '2c4d91afdfe8e7ffd788ec88b8ce754d';
const _fromNumber = '+19842082874';
const _mohmFromNumber = '+19193489175'*/

async function sendMessage(_toRef, _message, _fromNumber, _sid, _authToken, options) {

    // _fieldsProto.phoneNumber.stringValue

    functions.logger.info(`sendMessage() called. to: ${_toRef._fieldsProto.phoneNumber.stringValue}, name: ${_toRef._fieldsProto.firstName.stringValue}}, from: ${_fromNumber}, sid: to: ${_sid}, tok: ${_authToken}`);

    // if(_toRef === undefined){
    //     return {success: false, message: 'Could not send mass message. No to number provided.'};
    // }

    // if(_message === undefined || _message.length === 0){
    //     return {success: false, message: 'Could not send mass message. No message body provided.'};
    // }

    // if(_fromNumber === undefined || _fromNumber.length === 0){
    //     return {success: false, message: 'Could not send mass message. No from number provided.'};
    // }

    // if(_sid === undefined || _sid.length === 0){
    //     return {success: false, message: 'Could not send mass message. No twilio sid provided.'};
    // }

    // if(_authToken === undefined || _authToken.length === 0){
    //     return {success: false, message: 'Could not send mass message. No twilio auth token provided.'};
    // }

    const twilioClient = require('twilio')(_sid,_authToken);

    var _outboundMessage = `Hi ${_toRef._fieldsProto.firstName.stringValue}}! ${_message}`;

    twilioClient.messages.create({from: _fromNumber, body: _outboundMessage, to: _toRef._fieldsProto.phoneNumber.stringValue}).then((_rmessage) => {
        functions.logger.info(`Twilio API call should have worked. ${JSON.stringify(_rmessage)}`);

        return {success: true, message: _rmessage};
    }).catch((err) => {
        functions.logger.info(`Twilio API call did not work. ${JSON.stringify(err)}`);

        return {success: false, message: err};
    });
}

function createContact(_prefix = '', _firstName, _lastName, _phoneNumber, _email = '', _suffix = '', _street_address = '', _city = '', _state = '', _country = '', _ext1 = '', _ext2 = '', _ext3 = ''){
   
    if(_firstName === undefined || _firstName.length === 0){
        return {success: false, message: 'First name required.'};
    }
    if(_lastName === undefined || _lastName.length === 0){
        return {success: false, message: 'Last name required.'};
    }
    if(_phoneNumber === undefined || _phoneNumber.length < 7){
        return {success: false, message: '7 digit Phone Number required.'};
    }

    admin.firestore().collection('contacts').add({
        prefix: _prefix ,
        firstName: _firstName,
        lastName: _lastName,
        phoneNumber: _phoneNumber,
        email: _email,
        suffix: _suffix,
        ext1: _ext1,
        ext2: _ext2,
        ext3: _ext3,
        street_address: _street_address,
        city: _city,
        state: _state,
        country: _country,
        id: _id
    });
}

async function sendMassMessages(_contacts, _message, _fromNumber, _sid, _authToken, options) {

    // if (Array.isArray(_contacts) == false ){
    //     return { success: false, message: 'Contacts parameter is not an array.' };
    // }

    // if(_contacts === undefined || _contacts.length === 0 ){
    //     return {success: false, message: 'Could not send mass message. No contacts provided.'};
    // }

    // if(_message === undefined || _message.length === 0){
    //     return {success: false, message: 'Could not send mass message. No message body provided.'};
    // }

    // if(_fromNumber === undefined || _fromNumber.length === 0){
    //     return {success: false, message: 'Could not send mass message. No from number provided.'};
    // }

    // if(_sid === undefined || _sid.length === 0){
    //     return {success: false, message: 'Could not send mass message. No twilio sid provided.'};
    // }

    // if(_authToken === undefined || _authToken.length === 0){
    //     return {success: false, message: 'Could not send mass message. No twilio auth token provided.'};
    // }

    for(let i of _contacts){
        await sendMessage(i,_message,_fromNumber, _sid, _authToken,null);
    }
}

function createGroup(groupName){}

function addToGroup(persionID){}

function removeFromGroup(personID, groupID){}

exports.prepDB = functions.https.onRequest((req,res) => {
    setupDB();
    res.send({success: true, message: 'All Good'});
});

exports.sendTwilioText = functions.https.onRequest((request, response) => {
    functions.logger.info(`Recieved request to send single text message. Request info: ${JSON.stringify(request.body)}`);

    var resTwilio = sendMessage(request.body.to, request.body.name, request.body.message, request.body.from, request.body.sid, request.body.authToken);

    // response.statusCode = resTwilio.success ? 200 : 500;

    // response.send({success: resTwilio.success, message: resTwilio.message});

    response.send({success: true, message: 'IDK Yet'});

});


function setupDB(){
    let userRefID = '';
    let contactsRefID1 = '';
    let contactsRefID2 = '';
    let groupRefID = '';

    admin.firestore().collection('contacts').add(
        {
            "city": "Raleigh", 
            "country": "USA", 
            "email": "maness.j@gmail.com", 
            "ext1": "", 
            "ext2": "", 
            "ext3": "", 
            "firstName": "Jordan", 
            "id": "", 
            "lastName": "Maness", 
            "phoneNumber": "+19196002049", 
            "prefix": "", 
            "state": "North Carolina",
            "street_address": "417 W Peace Street, APT 636", 
            "suffix": "",
            "_uid":""
        }
    ).then((_contactRes) => {
        contactsRefID1 = _contactRes.id;
    }).then(() => {
        admin.firestore().doc(`contacts/${contactsRefID1}`).update('_uid',contactsRefID1);
    })
    .then(() =>
        admin.firestore().collection('contacts').add(
            {
                "city": "Raleigh", 
                "country": "USA", 
                "email": "bria.holman@gmail.com", 
                "ext1": "", 
                "ext2": "", 
                "ext3": "", 
                "firstName": "Bria", 
                "id": "", 
                "lastName": "Maness", 
                "phoneNumber": "+19192102642", 
                "prefix": "", 
                "state": "North Carolina",
                "street_address": "417 W Peace Street, APT 636", 
                "suffix": ""
            }
        )
    ).then((_contactsRes2) => {
        contactsRefID2 = _contactsRes2.id;
    }).then(() => {
        admin.firestore().doc(`contacts/${contactsRefID2}`).update('_uid',contactsRefID2);
    }).then(() => {
        return admin.firestore().collection('groups').add(
            {
                "contacts" : [contactsRefID1, contactsRefID2],
                "name":"Default Test",
                "users": []
            });
    })
    .then((_groupRes) => {
        groupRefID = _groupRes.id;
        return admin.firestore().collection('users').add(
        {
            "firstName":"Jordan",
            "isActive":true,
            "lastName":"Maness",
            "permissionLevel":"ADMIN",
            "username":"jomaness",
        });
    }).then((_usersRes) => {
        userRefID = _usersRes.id;
        return admin.firestore().doc(`groups/${groupRefID}`).update({'users': [userRefID]});
    })
    .catch((_err) => {
        functions.logger.error(`An error occured setting up DB collections and documents: ${_err}.`)
    });
}

exports.sendTwilioMassText = functions.https.onRequest((request,response) => {

    functions.logger.info(`Recieved request to send mass text message. Request group ID: ${request.body.groupID}`);

    //groupID - use to get contacts
    let _contactsRef = admin.firestore().doc(`groups/${request.body.groupID}`).get();
    let _contacts = [];

    _contactsRef.then((_contactsQueryRes) => {
        if(_contactsQueryRes === null || _contactsQueryRes === undefined){
            functions.logger.info(`[SendMassText]: Did not find contacts doc with id = ${request.body.groupID}`);
            response.status(404).send('Unable to find contact.');
        }
        else{
            _contacts = _contactsQueryRes.data().contacts;
            functions.logger.info(`Get contacts = ${_contacts}`);

            
            return admin.firestore().collection("contacts").where('_uid','in',_contacts).get().then((_res) => {
                functions.logger.info(`calling sendMassMessages()`);
                await sendMassMessages(_res.docs, request.body.message, '+19193489175','AC6882eec6de6cd830da98e8800749584f','2c4d91afdfe8e7ffd788ec88b8ce754d',null);
                response.status(200).send();
            }).catch((err) => {
                response.error(500).send(err);
            });
        }

    })
    .catch((err) => {
        functions.logger.error(`[SendMassText] error: ${JSON.stringify(err)}`);
        response.status(500).send('Error');
    });
});

function sendMassMessages(_contactsList, _fromNumber, _message){

}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
