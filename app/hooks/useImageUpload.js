export function useImageUpload(setSelectedImage) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setSelectedImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return { handleImageChange };
}
