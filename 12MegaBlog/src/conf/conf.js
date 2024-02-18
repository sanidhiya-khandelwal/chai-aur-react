/*
    * creating a object and exporting it and we made sure whatever is returned
    * is returned back is in the form of String and it can be a empty string  
*/
const conf = {
    appwriteUrl: String(import.meta.env.VITE__APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE__APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE__APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE__APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE__APPWRITE_BUCKET_ID),
    rteapiKey: String(import.meta.env.VITE_RTE_APIKEY)

}

export default conf;