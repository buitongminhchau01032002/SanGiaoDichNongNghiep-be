import ResError from '../utils/ResError.js';
import Category from '../models/Category.js';

// [GET] /categories
export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        next(err);
    }
};

// [GET] /categories/:id
export const getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            throw new ResError(404, 'Không tìm thấy danh mục!');
        }
        res.status(200).json(category);
    } catch (err) {
        next(err);
    }
};

// [POST] /categories
export const createCategory = async (req, res) => {
    try {
        const { name, icon } = req.body;
        const newCategory = new Category({ name, icon });
        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
};
