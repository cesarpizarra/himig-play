import ColorThief from "colorthief";

export async function getDominantColor(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        resolve(`rgb(${dominantColor.join(",")})`);
      } catch (error) {
        reject("Failed to get dominant color.");
      }
    };

    img.onerror = (err) => {
      reject(`Error loading image: ${err}`);
    };
  });
}
