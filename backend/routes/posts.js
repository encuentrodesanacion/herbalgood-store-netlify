// [PUT] - Editar/Actualizar un artículo existente
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    
    // 1. Buscamos el artículo en la base de datos
    const post = await Post.findByPk(id); // O Post.findOne({ where: { id } })
    
    if (!post) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    // 2. Actualizamos los textos
    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;

    // 3. Si el administrador subió una NUEVA foto, la reemplazamos
    if (req.file) {
      // req.file.path funciona tanto para tu carpeta local como para Cloudinary
      post.image_url = req.file.path; 
    }

    // 4. Guardamos los cambios en la base de datos
    await post.save();

    res.json(post);
  } catch (error) {
    console.error("Error al actualizar el artículo:", error);
    res.status(500).json({ message: "Error interno del servidor al actualizar" });
  }
});