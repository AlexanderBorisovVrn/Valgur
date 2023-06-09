import compression from "browser-image-compression";
const imgCompressOpt = {
  maxSizeMB: .5,
  maxWidthOrHeight: 800,
  useWebWorker: true,
};
  
export const loadCompressedImg = (file, handleLoad) => {
  const fileReader = new FileReader();
  compression(file, imgCompressOpt).then((compressed) => {
    fileReader.readAsDataURL(compressed);
    fileReader.onload = () => {
      handleLoad(fileReader.result);
    };
  });
};
