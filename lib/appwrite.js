import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

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
const storageService = new Storage(client);

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
    const { documents: videos } = await dbService.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc('$createdAt')
    ]);
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

export const searchVideos = async (q) => {
  try {
    const { documents: videos } = await dbService.listDocuments(
      databaseId,
      videoCollectionId,
      [ Query.search('name', q) ],
    );
    return videos;
  } catch (e) {
    throw e;
  }
};

export const getFilePreview = async (fileId, selectType) => {
  let fileUrl = '';
  if (selectType === 'image') {
    fileUrl = storageService.getFileView(storageId, fileId);
  } else if (selectType === 'video') {
    fileUrl = storageService.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100);
  }
  if (!fileUrl) throw new Error('no url');
  return fileUrl;
};

export const uploadFile = async (file, selecType) => {
  const { name, mimeType: type, uri, size } = file;
  const uploadedFile = await storageService.createFile(
    storageId, ID.unique(),
    { name, type, uri, size }
  );

  const fileUrl = await getFilePreview(uploadedFile.$id, selecType);
  // Alert.alert('upload', fileUrl);
  return fileUrl;
};

export const createVideo = async (form, creator) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ]);
    dbService.createDocument(databaseId, videoCollectionId, ID.unique(), {
      title: form.title,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      prompt: form.prompt,
      creator,
    });
  } catch(e) {
    throw e;
  }
};

export const updateVideoFollowers = async (videoId, userId) => {
  try {
    const res = await dbService.listDocuments(databaseId, videoCollectionId, [
      Query.equal('$id', videoId),
    ]);
    // console.log('res', JSON.stringify(res));
    const video = res?.documents?.[0] || {};
    const { followers } = video;
    await dbService.updateDocument(
      databaseId,
      videoCollectionId,
      videoId,
      { followers: [userId] },
    );
  } catch (e) {
    console.error('error', e.message);
    throw e;
  } finally {
    // tmp
  }
};
