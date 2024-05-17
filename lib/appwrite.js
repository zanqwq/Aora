import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: '662633bdc08fdef5a044',
  platform: 'com.zanqwq.aora',
  databaseId: '66266aab84d4eafe8acb',
  userCollectionId: '66266aef869defb06c2a',
  videoCollectionId: '66266b6fce5521b2ae45',
  storageId: '66266f3dbaba081721ed'
};

const { endpoint, projectId, platform, databaseId, userCollectionId, videoCollectionId, storageId } = config;

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform); // Your application ID or bundle ID.

const accountService = new Account(client);
const avatarService = new Avatars(client);
const dbService = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    // Register User
    const account = await accountService.create(ID.unique(), email, password, username)
    if (!account) throw new Error('failed to create account');

    const avatar = avatarService.getInitials(username);

    await signIn(email, password);

    const user = await dbService.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: account.$id,
        username,
        email,
        avatar,
      }
    );
    return user;
  } catch(e) {
    throw e;
  }
};

export const signIn = async (email, password) => {
  try {
    const session = accountService.createEmailSession(email, password);
    return session;
  } catch(e) {
    throw e;
  }
}

export const getCurrentUser = async () => {
  try {
    // get by checking email session
    const currentAccount = await accountService.get();
    if (!currentAccount) throw new Error('please Log In');

    const currentUser = (await dbService.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    ))?.documents?.[0];

    if (!currentUser) throw new Error('no current user');
    return currentUser;

  } catch(e) {
    throw e;
  }
};

export const getAllVideos = async () => {
  try {
    const { documents: videos } = await dbService.listDocuments(databaseId, videoCollectionId);
    return videos;
  } catch (e) {
    throw e;
  }
};


export const getVideos = async () => {
  try {
    const { documents: videos } = await dbService.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc('$createdAt'), Query.limit(7)
    ]);
    return videos;
  } catch (e) {
    throw e;
  }
};