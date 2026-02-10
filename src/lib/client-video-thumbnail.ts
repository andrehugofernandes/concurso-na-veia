export const generateVideoThumbnail = async (file: File) => {
    return 'https://mock-url.com/thumbnail.jpg';
};

export const isVideoFile = (file: File) => file.type.startsWith('video/');
