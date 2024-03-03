import app from "./init"
import { addDoc, collection, getDocs, getFirestore, query, where} from 'firebase/firestore'
import bcrypt from 'bcrypt';

const fireStoreApp = getFirestore(app);

export  async function signUpUser(user, callback) {
    if((await getRegisteredUserByEmail(user.email)).length > 0) callback( {success: false ,message: "Email already registered" });
    else{
        // manipulate data
        if(!user.role) user.role = "user";
        user.password = await bcrypt.hash(user.password, 10);
        console.log(user)
        await addDoc(collection(fireStoreApp, 'users'), user).then(() => {
           callback(  {success: true, message: "User created successfully"})
        }).catch((error) => {
            callback( {success: false, message: error})
        })

    }
}

export async function getRegisteredUserByEmail(email) {
    const querySnapshot =  query(collection(fireStoreApp, "users"), where("email", "==", email));
    const querySnapshotArray = await getDocs(querySnapshot);
    const user = querySnapshotArray.docs.map((doc) => ({...doc.data(), id: doc.id}));
    console.log(user)
    return user;
}