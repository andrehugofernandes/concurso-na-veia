export const uploadFile = async (file: File, path: string) => {
    console.log('Mock upload:', file.name, path);
    return 'https://mock-url.com/file.jpg';
};

export const uploadToFirebase = uploadFile;
