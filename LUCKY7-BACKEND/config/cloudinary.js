// Cloudinary has been removed from this project.
// This stub file remains to avoid require() errors during transition.
// Do NOT use this module. Remove this file entirely after running
// `npm uninstall cloudinary` in the backend folder.

module.exports = {
  uploader: {
    upload: async () => {
      throw new Error('Cloudinary has been removed. Run `npm uninstall cloudinary` and remove this file.');
    }
  }
};
