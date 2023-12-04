const Classified = require('../models/Classified');

exports.create = async (req, res) => {
  try {
    const { name, description, category, image, location, postedAt, price } = req.body;

    // Validate input
    if (!name || !description || !category || !image || !location || !postedAt || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new classified
    const newClassified = new Classified({
      name,
      description,
      category,
      image,
      location,
      postedAt,
      price,
    });

    await newClassified.save();

    res.status(201).json({ message: 'Classified created successfully', classified: newClassified });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    // Implement logic to get all classifieds

    let { page = 1, limit = DEFAULT_LIMIT, category, sortBy, sortOrder, search } = req.query;

    // Set up filters
    const filters = {};
    if (category) {
      filters.category = category;
    }
    if (search) {
      filters.name = { $regex: new RegExp(search, 'i') };
    }

    // Set up sort
    const sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    const allClassifieds = await Classified.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({ classifieds: allClassifieds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve a specific classified by ID
    const classified = await Classified.findById(id);

    if (!classified) {
      return res.status(404).json({ message: 'Classified not found' });
    }

    res.status(200).json({ classified });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Update a specific classified by ID
    const updatedClassified = await Classified.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedClassified) {
      return res.status(404).json({ message: 'Classified not found' });
    }

    res.status(200).json({ message: 'Classified updated successfully', classified: updatedClassified });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete a specific classified by ID
    const deletedClassified = await Classified.findByIdAndDelete(id);

    if (!deletedClassified) {
      return res.status(404).json({ message: 'Classified not found' });
    }

    res.status(200).json({ message: 'Classified deleted successfully', classified: deletedClassified });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
